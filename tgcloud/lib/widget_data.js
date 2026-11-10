// Dados do protótipo /widgettest. Não altera módulos ou registros do bot.
// Únicos contratos compartilhados, somente leitura:
//  - lib/config.js: chave do Last.fm e identificação do dono;
//  - SQLite: users(tg_id, lastfm_user) e flags(key, value).
// Consultas externas e interpretação de respostas são próprias deste experimento.
import { db, fetch } from 'sdk';
import { sql } from 'sdk/db';
import { LASTFM_API_KEY, isOwner } from './config.js';

const API = 'https://ws.audioscrobbler.com/2.0/';
const USER_AGENT = 'myJAMrobot/1.0 (Telegram bot; https://t.me/myJAMrobot)';
const RETRY_CODES = [8, 11, 16]; // Erros temporários conforme Last.fm
const STOP_CODES = [26, 29]; // Chave suspensa / excesso de requisições
const DEMO_TRACK = {
  name: 'Get Lucky', artist: 'Daft Punk', album: 'Random Access Memories',
  nowPlaying: false, plays: 42,
};

function errorWithCode(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

async function requestLastfm(method, params) {
  const data = { ...params, method, api_key: LASTFM_API_KEY, format: 'json' };
  const query = Object.keys(data).map((key) => key + '=' + encodeURIComponent(data[key])).join('&');
  const url = API + '?' + query;

  for (let attempt = 0; attempt < 2; attempt++) {
    let response;
    for (let networkTry = 0; networkTry < 3; networkTry++) {
      try {
        response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
        break;
      } catch (error) {
        if (networkTry === 2) throw error;
      }
    }

    let body;
    try {
      body = await response.json();
    } catch {
      throw errorWithCode('Resposta inválida do Last.fm', -1);
    }
    if (body && body.error) {
      const code = Number(body.error);
      if (attempt === 0 && RETRY_CODES.includes(code)) continue;
      throw errorWithCode(body.message || 'Erro do Last.fm', code);
    }
    if (!response.ok) throw errorWithCode('Last.fm respondeu ' + response.status, response.status);
    return body;
  }
}

function firstTrack(body) {
  const result = body && body.recenttracks && body.recenttracks.track;
  const track = Array.isArray(result) ? result[0] : result;
  if (!track) return null;
  return {
    name: typeof track.name === 'string' ? track.name : '',
    artist: (track.artist && (track.artist['#text'] || track.artist.name)) || '',
    album: (track.album && track.album['#text']) || '',
    nowPlaying: !!(track['@attr'] && String(track['@attr'].nowplaying) === 'true'),
  };
}

async function trackPlays(username, track) {
  try {
    const body = await requestLastfm('track.getinfo', {
      artist: track.artist, track: track.name, username, autocorrect: '1',
    });
    const raw = body && body.track && body.track.userplaycount;
    const count = Number(raw);
    return raw !== undefined && raw !== '' && Number.isFinite(count) && count >= 0 ? count : 0;
  } catch (error) {
    if (STOP_CODES.includes(Number(error.code))) throw error;
    // A contagem é complementar e não deve impedir a exibição da faixa.
    console.error('widget: contagem Last.fm indisponível', error);
    return 0;
  }
}

// Contagem de bytes após o escape JSON, não apenas de caracteres visíveis.
function utf8Length(value) {
  let bytes = 0;
  for (const char of value) {
    const code = char.codePointAt(0);
    bytes += code < 0x80 ? 1 : code < 0x800 ? 2 : code < 0x10000 ? 3 : 4;
  }
  return bytes;
}

function widgetText(value, maxBytes) {
  let output = '';
  let bytes = 0;
  for (const char of typeof value === 'string' ? value : '') {
    const escapedBytes = utf8Length(JSON.stringify(char)) - 2;
    if (bytes + escapedBytes > maxBytes) break;
    output += char;
    bytes += escapedBytes;
  }
  return output;
}

export async function widgetState(userId) {
  // Parâmetro associado ao remetente autenticado pelo Telegram.
  const linked = await db.get(sql`SELECT lastfm_user FROM users WHERE tg_id = ${userId} LIMIT 1`);
  if (!linked || !linked.lastfm_user || !LASTFM_API_KEY) {
    return { track: DEMO_TRACK, mode: 'demo', updatedAt: Date.now() };
  }

  const body = await requestLastfm('user.getrecenttracks', { user: linked.lastfm_user, limit: '1' });
  const track = firstTrack(body);
  if (!track) return { track: null, mode: 'live', updatedAt: Date.now() };

  const plays = await trackPlays(linked.lastfm_user, track);
  return {
    track: {
      name: widgetText(track.name, 240),
      artist: widgetText(track.artist, 220),
      album: widgetText(track.album, 220),
      nowPlaying: track.nowPlaying,
      plays,
    },
    mode: 'live',
    updatedAt: Date.now(),
  };
}

export async function widgetRefreshAllowed(userId) {
  if (isOwner(userId)) return true;
  const mode = await db.get(sql`SELECT value FROM flags WHERE key = ${'silent'} LIMIT 1`);
  return !mode || mode.value !== '1';
}
