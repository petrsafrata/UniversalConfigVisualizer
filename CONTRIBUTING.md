# 🤝 Contributing to Universal Config Visualizer

Welcome and thanks for taking the time to contribute. This project favors minimal, safe, and maintainable changes that follow the existing structure.

---

## 📌 How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request

In your PR description, please include:

- what changed
- why it was needed
- configuration or migration impact (if any)
- testing notes (what you ran, if anything)

---

## 🧭 Contribution Rules

### Code Quality
- Keep changes minimal, localized, and consistent with the existing codebase.
- Prefer explicit, maintainable solutions over clever ones.
- Avoid adding new dependencies unless clearly justified.

### Backend
- Java 17 + Spring Boot; follow the existing package layout under `src/main/java`.
- Keep API behavior stable and avoid breaking contracts.
- The API base path is configured as `/api` in `src/main/resources/application.yml`.

### Frontend
- React + TypeScript (Vite) in `frontend/`.
- Keep components focused and typed; preserve the existing folder structure in `frontend/src`.

### API
- `POST /api/parse` is the primary endpoint for parsing YAML.
- Do not expose internal details in error responses.

### Docker
- Keep `Dockerfile` and `docker-compose.yml` behavior consistent with documented usage.
- Avoid introducing multi-container complexity unless explicitly requested.

### Documentation
- Update `README.md` when behavior, usage, or setup changes.

### Security
- Never commit secrets, tokens, or environment-specific credentials.

---

## 🛠️ Environment Notes

From `README.md`, local development commonly uses:

- Backend (Java 17): `./mvnw.cmd spring-boot:run`
- Frontend (Node.js 20+): `npm install` then `npm run dev` in `frontend/`

Container usage (as documented): `docker-compose up -d --build`

---

## 🧪 Before Submitting a PR

- [ ] Backend builds and tests pass (CI runs `./mvnw -B clean verify`)
- [ ] Frontend builds (`npm run build` in `frontend/`)
- [ ] App starts locally or via Docker if runtime behavior changed
- [ ] Logs show no new warnings or errors
- [ ] README updated if behavior or usage changed
- [ ] No secrets or debug code committed

---

## 📜 License

This project is licensed under the Apache License 2.0. See `LICENSE` for details.

---

Thanks again for contributing!


