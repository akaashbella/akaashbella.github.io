---
title: Spotify IndicLID
summary: A multilingual pipeline that uses IndicLID to organize liked songs into Indian-language playlists, with explicit confidence and review paths.
category: Independent project · language tooling
period: '2026'
status: Source implemented · outcomes unverified
role: Independent project developer
technologies: [Python, IndicLID, SQLite, Spotify API, pandas]
repository: https://github.com/akaashbella/spotify-indic-lid
priority: 6
figure: spotify
verified: '2026-10-22'
sources:
  - label: Pipeline README
    url: https://github.com/akaashbella/spotify-indic-lid/blob/master/README.md
  - label: Pipeline orchestration
    url: https://github.com/akaashbella/spotify-indic-lid/blob/master/main.py
  - label: IndicLID wrapper
    url: https://github.com/akaashbella/spotify-indic-lid/blob/master/indiclid_wrapper.py
---
## Abstract

Spotify IndicLID is a Python pipeline for organizing liked songs into playlists for Hindi, Tamil, Telugu, Malayalam, and Kannada. It uses AI4Bharat IndicLID to recognize native and Romanized scripts, allowing one multilingual track to belong to more than one language playlist.

## Context

Song titles and lyrics do not always follow a single script or language. A pipeline that forces every track into one category loses that ambiguity. This project takes a per-line language-identification approach and preserves multiple language assignments.

## My role

I developed the independent pipeline in this repository, integrating language-identification tooling with Spotify collection and playlist operations. IndicLID is an external AI4Bharat model; this project does not claim to have created or trained it.

## Approach

The source collects Spotify liked tracks, obtains lyrics and metadata, performs line-level language inference, and stores progress in SQLite. Per-language confidence then determines playlist assignment and a separate manual-review export.

The documented automatic-add threshold is confidence at least 0.8. The README specifies a 0.4–0.7 review band; it should not be interpreted as a claim that every remaining confidence is covered by manual review. Multilingual tracks can qualify for multiple playlists.

## Implementation

SQLite provides resumable state for reruns and cluster time limits. CSV exports summarize detected languages, language confidence, playlist membership, and tracks requiring review. The orchestration source finds or creates each language playlist and replaces its tracks from the stored qualifying IDs.

Authentication and model files are local requirements. Headless operation requires prior local Spotify authorization and explicit model paths. No credentials, tokens, personal library exports, or playlist contents are included in this portfolio.

## Observations and outcomes

The public README and source establish the pipeline’s intended behavior and implementation structure. They do not provide a validated classification benchmark, playlist-quality study, or verified runtime results. Confidence thresholds express routing policy, not measured accuracy.

## Limitations

Lyrics availability, mixed-language lines, transliteration, API changes, and model confidence affect the pipeline. Automated playlist replacement has user-visible effects and requires authorized credentials. This portfolio does not execute the pipeline or publish personal listening data.

## References

The README covers setup and documented thresholds. The orchestration and wrapper files expose the integration boundary and processing sequence.
