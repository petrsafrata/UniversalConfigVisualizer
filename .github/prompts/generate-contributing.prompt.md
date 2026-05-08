---
description: "Generate or update CONTRIBUTING.md using the repository CONTRIBUTING skill and template"
---

# Generate CONTRIBUTING

Generate or update the `CONTRIBUTING.md` file for this repository.

---

## Mandatory First Step: Load CONTRIBUTING Template

Before writing or updating `CONTRIBUTING.md`, first check whether this file exists:

```text
.github/templates/contributing-template.md
```

If it exists, open and read it first.

The file `.github/templates/contributing-template.md` is the authoritative structure and formatting template for the generated `CONTRIBUTING.md`.

The file `.github/prompts/generate-contributing.prompt.md` is only the task prompt.

Do not generate the contribution guide from this prompt alone when the template exists.

If the template does not exist, use the structure defined in the `contributing-generator` skill.

---

## Primary Requirement

The generated `CONTRIBUTING.md` must be practical, professional, visually structured, and written in English.

It must use emojis in the H1 title and major H2 headings.

It must be based on real repository contents and must not invent unsupported workflows, tools, platforms, branch strategies, CI rules, release processes, or license terms.

---

## Language Requirement

The generated `CONTRIBUTING.md` must always be written in English.

This applies to:

- introduction
- contribution flow
- contribution rules
- environment notes
- PR checklist
- license text
- closing note

Keep file names, commands, class names, package names, paths, ports, URLs, and technology names unchanged.

Do not generate Czech CONTRIBUTING content.

---

## Required Repository Inspection

Before generating the file, inspect:

- `.github/templates/contributing-template.md` first, if it exists
- `README.md`
- existing `CONTRIBUTING.md`
- `LICENSE`, `LICENCE`, `LICENSE.md`, or `LICENCE.md`
- `.github/workflows/`
- `.github/copilot-instructions.md`
- `.github/instructions/`
- `.github/agents.md`
- `.github/prompts/`
- `.github/templates/`
- project structure
- test folders
- build files such as `pom.xml`, `build.gradle`, `package.json`, `pyproject.toml`, `requirements.txt`
- Docker-related files such as `Dockerfile` and `docker-compose.yml`
- linting, formatting, and test configuration
- configuration files such as `.env.example`, `application.yml`, `application.properties`, or `config.yml`

Use only information supported by these files.

---

## Required Structure

Use this structure unless `.github/templates/contributing-template.md` defines a stricter one:

1. `# 🤝 Contributing to <Project Name>`
2. Welcome / contribution introduction
3. `## 📌 How to Contribute`
4. `## 🧭 Contribution Rules`
5. environment-specific section only if relevant
6. `## 🧪 Before Submitting a PR`
7. `## 📜 License` only if a license exists
8. closing thank-you note

Use horizontal separators (`---`) between major sections.

---

## How to Contribute

Prefer this normal GitHub flow unless the repository documents a different model:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request

Then include a short list asking contributors to describe:

- what changed
- why it was needed
- configuration or migration impact
- testing notes

Do not invent branch names such as `develop`, `dev`, or `release/*` unless documented.

---

## Contribution Rules

Use H3 subsections under `## 🧭 Contribution Rules`.

Include only relevant subsections.

Possible subsections include:

- `### Code Quality`
- `### Architecture`
- `### Backend`
- `### Frontend`
- `### API`
- `### Database`
- `### Logging`
- `### Configuration`
- `### Dependencies`
- `### Testing`
- `### Docker`
- `### Documentation`
- `### Security`
- `### Scenes`
- `### Hardware Compatibility`

Each subsection must contain practical bullet points.

Do not include irrelevant subsections.

Do not invent project-specific rules.

---

## Before Submitting a PR

Use a practical checklist.

Include only items relevant to the repository, such as:

- test the application locally
- run existing tests if available
- verify startup works
- verify Docker startup if Docker is used
- check logs for warnings or errors
- update documentation if needed
- confirm no secrets or debug code were committed

Do not invent commands.

---

## Do Not Invent

Do not invent:

- branch strategy
- CI requirements
- release process
- test commands
- platform support
- Docker support
- license type
- architecture rules
- coding standards not supported by the repository

---

## Output

Return only the final `CONTRIBUTING.md` content.

Do not include explanations, analysis, or notes outside the generated file.

Use valid GitHub Markdown.