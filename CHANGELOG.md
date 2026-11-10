# Changelog

A human-readable history of **what myJAM can do, how it evolves, which official platform capabilities it follows, and what remains limited or unverified**.

This file records repository development separately from actual deployment. It does not claim production availability without verification. Earlier history will be added only when supported by commits or other project records.

## [Unreleased] — November 10, 2026

### Project evolution
- Introduced an experimental **myJAM Live Card**, designed to display a listening snapshot directly inside a Telegram conversation.
- Added an isolated `/widgettest` entry point for the prototype. The existing `/playing` experience is unchanged.
- The prototype includes views for the current or recent song, its album, and listening statistics, plus an action intended to refresh the displayed information.

### Official platform alignment
- Added dated, unmodified snapshots of the official [Telegram Widgets](docs/official/2026-11-10-182003-vcpa.md) and [Telegram Bot API](docs/official/2026-11-10-182020-b3h3.md) documentation to the reference baseline.
- The prototype targets **Telegram Bot API 10.4** widget capabilities, including sending widgets, handling widget requests, responding to those requests, and updating widget state.
- Updated project guidance so that archived documentation remains attributable and unchanged, while newer official documentation and actual runtime tests take precedence when validating compatibility.

### Capabilities and current status
| Area | Repository status | Confirmed availability |
| --- | --- | --- |
| Existing music features | Existing project functionality; not replaced by this work | Not revalidated in this change |
| Live Card interface | Initial implementation in experimental branch | Not yet tested in Telegram |
| Last.fm data in Live Card | Integration code drafted, with demonstration fallback | Not yet tested end-to-end |
| Widget refresh | Request handler and state-update flow drafted | Not yet tested end-to-end |
| Bot API 10.4 integration | Implemented against archived API reference | Serverless SDK compatibility not confirmed |

### Known limitations and validation pending
- Telegram currently restricts production widgets to private chats with the bot; the prototype deliberately follows that constraint.
- The Telegram Serverless runtime and SDK must be checked for support of the new widget methods and `widget_query` handler.
- The widget HTML must be checked against official size and compression limits.
- Request fields, event payloads, Last.fm refresh, and live rendering still require verification.
- **No deployment, production rollout, or merge is claimed.**

### Documentation and governance
- Reframed the root README as a public-facing presentation rather than an implementation guide.
- Established this changelog to record capability changes, compatibility status, and limitations in plain language.
- Established `docs/official/` as the preserved baseline of official-reference snapshots.

## Earlier project history

myJAM existed before this changelog. Previous milestones will be documented only after reviewing the repository's history, without inventing dates, releases, or capabilities.
