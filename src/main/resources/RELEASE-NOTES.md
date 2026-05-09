# Changelog

All notable changes to this project are documented in this file.

---

## [1.0.3] - Initial release fixes

**Date:** 2026-05-09

### Fixed
- Incorrect context path for API endpoints in tests
- Dependency and config for log4j2
- Dockerfile build issues with multi-stage build and missing files
- GHCR deploy workflow issues with build and push steps

---

## [1.0.0] - Initial stable release

**Date:** 2026-05-08

### Added
- Docker Compose YAML parsing with services and depends_on graph output.
- REST API endpoint `POST /api/parse` returning graph JSON.
- CLI command `configviz <docker-compose.yml>` for local parsing.
- React + TypeScript frontend with Cytoscape graph visualization.
- Docker-based single-image build including frontend and backend.
