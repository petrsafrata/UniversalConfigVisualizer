# Changelog

All notable changes to this project are documented in this file.

---

## [1.0.0] - Initial stable release

**Date:** 2026-05-08

### Added
- Docker Compose YAML parsing with services and depends_on graph output.
- REST API endpoint `POST /api/parse` returning graph JSON.
- CLI command `configviz <docker-compose.yml>` for local parsing.
- React + TypeScript frontend with Cytoscape graph visualization.
- Docker-based single-image build including frontend and backend.
