---
title: ResearchSeek
summary: A local-first research-note search architecture with Python orchestration, a C++ boundary, and a deliberately small storage model.
category: Independent software engineering
period: 2026–present
status: Stage 1 foundation · retrieval planned
role: Independent project developer
technologies: [Python, C++17, pybind11, SQLite, FTS5, CMake]
repository: https://github.com/akaashbella/ResearchSeek
priority: 2
figure: search
verified: '2026-10-22'
sources:
  - label: README and current implementation status
    url: https://github.com/akaashbella/ResearchSeek/blob/main/README.md
  - label: Architecture and storage design
    url: https://github.com/akaashbella/ResearchSeek/blob/main/docs/architecture.md
  - label: Stages and exit criteria
    url: https://github.com/akaashbella/ResearchSeek/blob/main/docs/roadmap.md
  - label: Native build diagnostic
    url: https://github.com/akaashbella/ResearchSeek/blob/main/cpp/bindings.cpp
---
## Abstract

ResearchSeek is an independent CLI project for semantic and keyword search over local research notes. Its design keeps note text, metadata, embeddings, and keyword search in SQLite, with an exact cosine-similarity kernel planned in C++17. The current repository implements the Stage 1 foundation; indexing, retrieval, and benchmarking are not yet implemented.

## Context

Research notes are useful only when a relevant passage can be found again. Keyword and semantic retrieval offer different ways into a personal corpus. The project proposes both while keeping data local and avoiding a cloud service or separate vector database.

## My role

I am the developer of this independent software engineering project. The public design documents distinguish current foundation work from the intended MVP. The architecture is a proposal to implement and evaluate, rather than a claim of a completed search engine.

## Approach

The proposed indexing path recursively discovers UTF-8 Markdown and text files, hashes raw bytes, chunks normalized text into deterministic passages, embeds those passages, and reconciles a SQLite database in one transaction. Unchanged notes retain their records; changed notes are replaced; missing notes are removed only after successful discovery.

Semantic search would embed a query, load a consistent vector snapshot, call a C++ top-k kernel, and fetch cited passages from that same snapshot. Keyword search would use FTS5 BM25 without loading an embedding model. Transformer embeddings, initially considering `all-MiniLM-L6-v2`, remain planned.

## Implementation

Stage 1 provides Python packaging, an argparse CLI surface, `python -m researchseek`, an in-memory FTS5 environment probe, and a pybind11 extension that reports the compiler’s C++ standard. The native boundary is a build diagnostic; no similarity code is implemented yet.

```text
# Proposed retrieval boundary, not an implemented API:
float32 matrix (N, d) + query (d,) + int64 IDs + k
    → validate → cosine scan → bounded min-heap
    → sort by score descending, then ID ascending
```

The planned kernel scans all vectors and retains at most `min(k, N)` candidates. Its proposed cost is `O(Nd + N log k)` time and `O(k)` extra selection memory, excluding the input matrix. Python would handle orchestration; C++ would own the similarity and selection kernel.

## Observations and outcomes

The README reports that package setup, CLI help, and the C++ diagnostic work. The repository includes foundation tests, but they were not executed as part of preparing this portfolio. There are no retrieval-quality measurements or verified C++ speedups to report.

The design documents make important choices explicit: deterministic tie ordering, configuration fingerprints, transactional reconciliation, finite-vector validation, and separate timings for model loading, encoding, storage, and native computation.

## Limitations

Document processing, storage services, embeddings, retrieval, and benchmarks remain planned. A web interface, approximate nearest-neighbor search, concurrent indexing, and cloud infrastructure are outside the intended MVP. Chunking defaults, model revision, native copy policy, and benchmark workloads still need to be finalized.

## References

The README gives the current status. The architecture document describes the proposed storage and retrieval contracts; the roadmap separates implementation stages and their exit criteria.
