# Changelog

A readable record of **myJAM's evolution**, including new experiences, compatibility with official platform documentation, validation progress, and known user-facing limitations.

**Status matters:** a feature described here may be proposed, implemented in a development branch, verified, or released. Those stages are not interchangeable. Security-sensitive implementation details and unresolved vulnerability information do not belong in this public history.

## [Unreleased] — November 10, 2026

### New experiences
- **Live Card (experimental):** an interactive music card designed to bring listening information into a Telegram conversation.
- Initial card concept includes music, album, listening insights, and an update action.
- The experiment is separate from the existing music experience and does not replace it.

### Documentation and platform alignment
- Added preserved reference snapshots for [Telegram Widgets](docs/official/2026-11-10-182003-vcpa.md) and [Telegram Bot API](docs/official/2026-11-10-182020-b3h3.md), extracted on November 10, 2026.
- Began adapting the Live Card experiment to the capabilities introduced in **Telegram Bot API 10.4**.
- Established a documentation policy: original official-source snapshots are preserved, while compatibility claims are checked against current official documentation and actual platform behavior.

### Capability status

| Capability | Stage | Notes |
| --- | --- | --- |
| Existing music experience | Existing | Not replaced or revalidated as part of this experiment |
| Live Card presentation | Implemented in development branch | Awaiting real-device validation |
| Music information in Live Card | Prototype | End-to-end behavior not yet verified |
| Interactive updates | Prototype | Platform integration not yet verified |
| Bot API 10.4 compatibility | Under evaluation | Support in the project runtime has not yet been confirmed |

### Current limitations
- The Live Card remains **experimental** and is not presented as a released feature.
- Telegram's current production availability for Widgets is limited to private conversations with bots.
- Compatibility, rendering, and interactive behavior require real-world validation before release.
- No production deployment or merge is claimed.

### Project documentation
- Updated the public README to focus on the experience and its value rather than internal implementation.
- Updated contributor and agent guidance to protect sensitive operational information and require explicit approval for production changes.
- Introduced this changelog to make the project's evolution and validation status understandable over time.

## Earlier history

myJAM predates this changelog. Earlier milestones will be added only when supported by repository history or other reliable project records, without inventing dates or releases.
