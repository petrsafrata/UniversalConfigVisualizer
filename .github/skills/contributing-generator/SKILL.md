---
name: contributing-generator
description: Generate or update a professional, visually structured CONTRIBUTING.md file based on the actual repository conventions, project structure, and contribution workflow.
---

# CONTRIBUTING Generator Skill

Use this skill when creating or updating a `CONTRIBUTING.md` file for a project in this repository.

---

## Goal

Generate a clear, professional, practical, and visually structured `CONTRIBUTING.md` file that matches the actual repository structure, development workflow, and contribution expectations.

The output must be:

- written in English
- suitable for GitHub
- easy to scan
- practical for contributors
- based on real repository contents
- visually consistent with the project documentation style
- richer than generic open-source filler text

---

## Language Rules

- The final `CONTRIBUTING.md` must always be written in English.
- Do not generate Czech contribution text, even if the user prompt or repository notes are written in Czech.
- Keep file names, commands, class names, package names, paths, ports, URLs, and technology names unchanged.
- Translate repository-specific explanations into clear, professional English.

---

## Priority Rules

Follow these rules in this order:

1. **Repository contents are the source of truth.**
2. **The contributing template defines the preferred structure and visual style, if present.**
3. **This skill defines mandatory formatting and contribution behavior.**
4. **Never invent unsupported workflows, tools, branch strategies, CI rules, release rules, licenses, platforms, or contribution requirements.**

---

## Mandatory Template Loading Rule

Before generating or updating `CONTRIBUTING.md`, first check whether this template exists:

```text
.github/templates/contributing-template.md
```

If the file exists:

- read it before generating the output
- use it as the primary structure and formatting source
- preserve its section order, heading names, separators, emoji style, and checklist style as much as possible
- fill it only with information supported by the repository

If the file does not exist:

- use the default structure defined in this skill
- do not stop generation only because the template is missing

---

## Repository Inspection Rules

Before writing or updating `CONTRIBUTING.md`, inspect the repository for:

- project structure
- `README.md`
- `LICENSE`, `LICENCE`, `LICENSE.md`, or `LICENCE.md`
- `.github/workflows/`
- `.github/copilot-instructions.md`
- `.github/instructions/`
- `.github/agents.md`
- `.github/prompts/`
- `.github/templates/`
- existing `CONTRIBUTING.md`
- build files such as `pom.xml`, `build.gradle`, `package.json`, `pyproject.toml`, `requirements.txt`
- Docker-related files such as `Dockerfile`, `docker-compose.yml`, or `docker-compose.dev.yml`
- linting or formatting configuration
- test configuration and test folders
- application configuration files such as `.env.example`, `application.yml`, `application.properties`, `config.yml`
- contribution, branching, commit, issue, PR, or release conventions already documented anywhere in the repository

The generated `CONTRIBUTING.md` must reflect only what is actually found.

---

## Required CONTRIBUTING Structure

Use this structure unless a repository template explicitly overrides it:

1. Title
2. Welcome / contribution introduction
3. How to Contribute
4. Contribution Rules
5. Platform or environment-specific notes
6. Before Submitting a PR
7. License
8. Closing thank-you note

Use this order.

Do not replace it with a short generic guide.

---

## Required Sections

Always include these sections:

- `# 🤝 Contributing to <Project Name>`
- short welcome / contribution introduction
- `## 📌 How to Contribute`
- `## 🧭 Contribution Rules`
- `## 🧪 Before Submitting a PR`

These sections are required even for small projects.

---

## Conditional Sections

Include these sections only when supported by real repository contents.

### Platform or Environment Notes

Include a dedicated environment section only when the repository clearly targets a special environment or deployment mode.

Examples:

- `## 🐳 Docker Compatibility`
- `## 🐳 Docker Deployment Notes`
- `## 🍓 Raspberry Pi Compatibility`
- `## ☁️ Cloud Runtime Compatibility`
- `## 🖥️ Desktop Runtime Notes`
- `## 🌐 Browser Compatibility`

Do not invent unsupported environments.

### License

Include `## 📜 License` only if a real license file exists in the repository.

If included:

- mention the actual license only if it can be determined from the license file
- refer to the actual `LICENSE` or `LICENCE` file
- do not invent custom legal terms

---

## Formatting Rules

- Use exactly one H1 heading.
- The H1 must contain an emoji and the project name.
- All major H2 section headings must contain emojis.
- Use horizontal separators (`---`) between major sections.
- Use H3 headings for grouped contribution rules.
- Use bullet lists for rules and checklists.
- Use numbered lists for contribution flow steps.
- Keep paragraphs short and practical.
- Use GitHub-friendly Markdown only.
- Do not leave placeholder text in the final output.
- Do not output explanations about how the file was generated.

---

## Title Rules

Use this title format:

```md
# 🤝 Contributing to <Project Name>
```

Infer the project name from:

1. existing README title
2. repository name
3. build metadata such as `artifactId`, `name`, or `package.json` name
4. main application name found in source code

Do not invent a project name if a clear one exists.

---

## Introduction Rules

The introduction must be short, welcoming, and project-specific.

It should mention relevant contribution types when supported by the repository, such as:

- bug fixes
- performance improvements
- documentation improvements
- tests
- refactoring
- new features
- new scenes/modules/components/endpoints only if the project has such concepts

Avoid generic filler text.

---

## How to Contribute Rules

Prefer this flow for normal GitHub repositories:

```md
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a Pull Request
```

After the flow, include a short PR description checklist:

```md
Please describe clearly:
- What you changed
- Why it was needed
- Any configuration or migration impact
- How you tested the change
```

Adapt this only if the repository documents a different contribution model.

Do not invent branch names such as `develop`, `dev`, or `release/*` unless they are documented or clearly used.

---

## Contribution Rules Section

The `## 🧭 Contribution Rules` section must use H3 subsections.

Include only subsections relevant to the repository.

Common subsections:

- `### Code Quality`
- `### Architecture`
- `### Backend`
- `### Frontend`
- `### API`
- `### Database`
- `### Testing`
- `### Logging`
- `### Configuration`
- `### Dependencies`
- `### Docker`
- `### Documentation`
- `### Security`
- `### Scenes`
- `### Hardware Compatibility`

Each subsection must contain practical bullet points.

Do not include irrelevant subsections.

Do not invent rules that are not supported by the repository.

---

## Code Quality Rules

When relevant, prefer these rules:

- Follow the existing project structure.
- Keep code modular and readable.
- Use clear naming conventions.
- Avoid unnecessary complexity.
- Keep comments and documentation in English.
- Do not leave debug code in production-ready contributions.
- Keep changes focused and easy to review.

---

## Architecture Rules

When relevant, infer architecture rules from the repository structure.

Examples:

- keep controllers, services, repositories, and DTOs separated in Spring projects
- keep UI components separated from API or state logic in frontend projects
- keep domain logic separated from infrastructure logic
- keep CLI handling separated from core business logic
- keep rendering logic separated from data-fetching logic when the project has rendering or scene concepts

Do not invent architecture layers that do not exist.

---

## Logging Rules

Include logging rules only if the project uses logging or contains logger configuration.

Prefer practical rules:

- Use the project’s existing logging approach.
- Do not use `print()` / `console.log()` for production-ready debug output when a logger exists.
- Log meaningful warnings and errors.
- Avoid noisy logs.

Adapt wording to the actual language and framework.

---

## Configuration Rules

Include configuration rules when configuration files exist.

Prefer practical rules:

- Keep configuration backward compatible where possible.
- Document new configuration fields when introduced.
- Avoid hardcoding values that belong in configuration files.
- Do not commit secrets or local-only credentials.
- Update `.env.example` when environment variables change.

Only mention files that exist or are clearly used.

---

## Dependency Rules

Include dependency rules when dependency manifests exist.

Prefer practical rules:

- Avoid adding new dependencies unless necessary.
- Update dependency manifests when dependencies are added.
- Keep dependencies compatible with the project runtime.
- Prefer existing libraries already used in the project.
- Explain why a new dependency is needed in the PR description.

Mention actual files such as `pom.xml`, `package.json`, `requirements.txt`, or `pyproject.toml` only when present.

---

## Testing Rules

Include testing rules when the project has tests, testing dependencies, or test folders.

Prefer practical rules:

- Test changes locally before submitting.
- Ensure existing functionality still works.
- Follow the repository’s current testing approach.
- Add or update tests when behavior changes.
- Check logs or output for warnings and errors.

Mention actual commands only when supported by the repository.

Do not invent test commands.

---

## Docker Rules

Include Docker rules only if Docker files exist.

Prefer practical rules:

- Keep Docker builds reproducible.
- Update Compose services only when necessary.
- Do not hardcode local machine paths.
- Keep container configuration aligned with documented environment variables.
- Test Docker startup when Docker-related files change.

---

## Documentation Rules

Include documentation rules when the repository has documentation or README conventions.

Prefer practical rules:

- Update documentation when behavior, setup, configuration, or commands change.
- Keep documentation in English.
- Keep examples accurate and runnable.
- Avoid outdated screenshots or commands.

---

## Security Rules

Include security rules when relevant.

Prefer practical rules:

- Do not commit secrets, passwords, tokens, or private keys.
- Use environment variables or documented configuration files for sensitive values.
- Avoid logging sensitive information.
- Report security-related issues responsibly.

These rules are generally safe for most repositories.

---

## Before Submitting a PR Rules

The `## 🧪 Before Submitting a PR` section must be practical and project-specific.

Use a checklist-style bullet list.

Include items such as:

- test the application locally
- run existing tests if available
- verify startup works
- verify Docker startup if Docker is used
- check logs for warnings or errors
- update documentation if needed
- confirm no secrets or debug code were committed

Do not include commands unless they are supported by the repository.

---

## License Rules

Include the license section only if a real license file exists.

Use this section title:

```md
## 📜 License
```

If the license type is clear, use:

```md
By contributing, you agree that your contributions will be licensed under the <License Name>.
```

If the license type is not clear, use:

```md
By contributing, you agree that your contributions will be licensed under the terms described in the repository license file.
```

Do not invent license terms.

---

## Forbidden Output

Do not output:

- Czech CONTRIBUTING content
- generic filler unrelated to the repository
- invented branch strategies
- invented CI requirements
- invented release processes
- invented deployment modes
- invented platform requirements
- invented test commands
- invented license terms
- placeholder text
- analysis notes
- explanations outside the generated file

---

## Output Expectations

- Output only the final `CONTRIBUTING.md` content.
- Use valid GitHub Markdown.
- Keep the structure easy to scan.
- Prefer practical contribution guidance over generic open-source filler text.
- Use emojis in the title and major H2 headings.
- Use horizontal separators between major sections.
- If information is missing, omit the conditional section or keep guidance generic without inventing repository-specific details.