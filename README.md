# myJAM

Telegram bot and Mini App for exploring music through Last.fm, running on Telegram Serverless.

## Project structure

- `tgcloud/`: bot handlers, endpoints, shared libraries, and database schema.
- `web/`: Mini App front-end.
- `docs/`: project documentation and technical references.
- `docs/official/`: **reference baseline**, containing dated snapshots extracted from official source pages. Preserve the snapshots verbatim, including their filenames, source URLs, and extraction dates.
- `AGENTS.md`: implementation rules and source-of-truth hierarchy for contributors and coding assistants.
- `CHANGELOG.md`: human-readable history of repository changes.

## Reference baseline

The `docs/official/` folder contains archival copies of official documentation, not project-authored summaries. Its filenames reflect how the source pages were captured and do not need to be normalized. Each snapshot records its original URL and extraction date. When current behavior differs from a snapshot, check the live official page and document the discrepancy rather than silently rewriting the archive.

For the Bot API 10.4 widget experiment, the following snapshots were added on November 10, 2026:

- [Telegram Widgets snapshot](docs/official/2026-11-10-182003-vcpa.md), source: https://core.telegram.org/bots/widgets
- [Telegram Bot API snapshot](docs/official/2026-11-10-182020-b3h3.md), source: https://core.telegram.org/bots/api

Other baseline documents cover Telegram Serverless, the Bot API, and Mini Apps. Consult [AGENTS.md](AGENTS.md) for the full source and testing rules.

## Development

Install project dependencies, then use the Telegram Serverless CLI for inspection and testing:

```sh
npm install
npx tgcloud status
npx tgcloud run <module> '{}'
```

Deployments are explicit: `npx tgcloud push`. Database migrations are separate: `npx tgcloud migrate`. See `AGENTS.md` for runtime restrictions and validation requirements.

## Experimental work

The `feat/widgettest-bot-api-10-4` branch introduces a **draft** `/widgettest` Live Card prototype using Telegram Bot API 10.4 widgets. It does **not** replace `/playing`. Support for the new widget methods and update handlers in the deployed Serverless SDK has not yet been verified. The prototype is not described here as deployed or production-ready.

See [CHANGELOG.md](CHANGELOG.md) for dated repository changes.
