# Changelog

Human-readable record of notable repository changes. Entries describe repository changes, not necessarily deployed releases. Unverified features are labeled explicitly; historical changes are not reconstructed without supporting records.

## [Unreleased]

### Added
- Experimental `/widgettest` command for private chats, implemented separately from `/playing`.
- Initial myJAM Live Card widget HTML with Music, Album, and Statistics views.
- `widget_query` handler for refresh requests, using the Bot API 10.4 widget methods.
- Dated official-reference snapshots in `docs/official/` for Telegram Widgets and Bot API 10.4, captured November 10, 2026.
- Root `README.md` describing the project, documentation baseline, and development workflow.
- Root `CHANGELOG.md` for readable, ongoing repository history.

### Changed
- `AGENTS.md` now explicitly treats `docs/official/` as an immutable archival reference baseline and requires recording notable changes in this changelog.

### Validation pending
- Check Bot API 10.4 request/response field names against the archived official reference.
- Confirm Telegram Serverless SDK support for `sendWidget`, `answerWidgetQuery`, `editMessageWidgetData`, and `handlers/widget_query`.
- Verify widget HTML size limits, run-time behavior, and refresh flow in a private Telegram chat.
- No deployment or merge of this prototype is claimed.

## Earlier history

The repository predates this changelog. Prior releases and changes are intentionally not backfilled without reviewing their commit history.
