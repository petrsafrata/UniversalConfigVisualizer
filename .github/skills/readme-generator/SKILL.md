---
name: readme-generator
description: Generate or update a visually rich, structured GitHub README.md using the repository contents as the source of truth and strictly following the repository README style template.
---

# README Generator Skill

Use this skill when creating or updating a `README.md` file for a project in this repository.

---

## Mandatory Template Loading Rule

Before generating or updating `README.md`, you MUST explicitly read and use this file as the primary README structure source:

```text
.github/templates/readme-template.md
```

This file is the authoritative README template.

Rules:

- Do not rely only on `.github/prompts/generate-readme.prompt.md`.
- Do not infer the README structure from the prompt alone.
- Do not generate the README until `.github/templates/readme-template.md` has been inspected.
- Preserve the section order, heading names, formatting style, separators, tables, and code block style from `.github/templates/readme-template.md`.
- Treat `.github/prompts/generate-readme.prompt.md` as task instructions only.
- Treat `.github/templates/readme-template.md` as the output structure and formatting source.
- If the template file is missing, report that the template file was not found instead of inventing a new README structure.

---

## Goal

Generate a professional, visually rich, structured GitHub README that follows the repository README style template as closely as possible.

The README must be:

- technically accurate
- based only on real repository contents
- visually structured
- easy to scan
- richer than a minimal technical summary
- consistent with the provided README template
- suitable for GitHub presentation

---

## Priority Rules

Follow these rules in this order:

1. **Repository contents are the source of truth.**
2. **The README template defines the required structure and visual style.**
3. **This skill defines formatting and conditional behavior.**
4. **Never invent unsupported technologies, services, URLs, workflows, licenses, or deployment modes.**

If a section from the template is not relevant to the repository, omit it only when the conditional rules below explicitly allow omission.

---

## Language Rules

- The final `README.md` content must always be written in English.
- Keep all section titles exactly as defined in the README template.
- Do not generate Czech README content, even if the user prompt or repository notes are written in Czech.
- Translate repository-specific descriptions into clear, professional English.
- Keep technology names, file names, commands, package names, class names, and paths unchanged.

---

## Required README Structure

The README must follow this order:

1. Banner
2. Project title
3. Badges
4. Project Description
5. Application Features
6. Technology and Architecture
7. Docker Services
8. Project Structure
9. Prerequisites
10. Installation (Dev and Prod Modes)
11. Access Points
12. API Endpoint Documentation (Swagger)
13. Troubleshooting
14. Licence

Do not rename these sections.

Do not reorder these sections.

Use the exact H2 section names from the template when the section is included.

---

## Required Sections

These sections must always be included:

- `# 🚀 <Project Name>`
- Badges directly below the title
- `## 🧾 Project Description`
- `## ✨ Application Features`
- `## 🧱 Technology and Architecture`
- `## 📁 Project Structure`
- `## ⚙️ Prerequisites`
- `## 🛠️ Installation (Dev and Prod Modes)`
- `## 🧯 Troubleshooting`

These sections are required even for small CLI projects.

If a category inside a section does not apply, omit only that category, not the whole required section.

---

## Conditional Sections

These sections must be included only when supported by real repository contents:

### Banner

Include a banner only if a real banner image or logo exists in the repository and is clearly intended for README usage.

Valid examples:

- `frontend/src/assets/banner.png`
- `assets/banner.png`
- `docs/banner.png`
- `public/banner.png`
- `logo.png`

Do not invent banner paths.

If no suitable image exists, omit the banner line entirely.

### Docker Services

Include `## 🐳 Docker Services` only if the repository contains a `docker-compose.yml` or equivalent Compose file with meaningful service definitions.

If included, use the exact table format from the template:

| Service | Purpose | Container | Image/Build | Ports | Depends | Notes |
|---------|---------|-----------|-------------|-------|---------|-------|

Do not include this section for a project that only has a `Dockerfile` without Compose services.

### Access Points

Include `## 🌐 Access Points` only if the project exposes real usable entry points, such as frontend URL, backend API URL, Swagger URL, OpenAPI JSON URL, Actuator URL, mapped database port, or admin dashboard URL.

Use a Markdown table.

Do not invent URLs.

For local development, only use URLs clearly implied by code or configuration, such as `localhost:8080`, `localhost:3000`, or Compose port mappings.

### API Endpoint Documentation (Swagger)

Include `## 📚 API Endpoint Documentation (Swagger)` only if Swagger/OpenAPI is actually configured or strongly implied by dependencies and configuration.

Typical valid evidence includes `springdoc-openapi`, Swagger configuration, FastAPI, an OpenAPI file, or generated API documentation.

Do not invent endpoint groups.

### Licence

Include `## ⚖️ Licence` only if the repository contains a real license file, such as `LICENSE`, `LICENCE`, `LICENSE.md`, or `LICENCE.md`.

Use the spelling `Licence` to match the template.

Do not invent license type or legal text.

---

## Formatting Rules

- The H1 title must contain an emoji and the project name.
- Every major H2 heading must contain the same emoji and title as the template.
- Badges must be placed directly below the H1 title.
- Use horizontal separators (`---`) between major H2 sections.
- Do not place unrelated prose between the title and badges.
- Use valid GitHub Markdown.
- Prefer clear, polished formatting over minimal output.
- Do not use placeholder text in the final README.
- Do not leave template instructions in the final README.

---

## Badge Rules

Always try to infer and render badges based on actual repository contents.

### Technology badges

Include technology badges only for technologies that are actually present in the repository.

Examples:

- Java
- Spring
- Spring Boot
- Maven
- Gradle
- Python
- FastAPI
- React
- TypeScript
- JavaScript
- Vite
- Tailwind CSS
- PostgreSQL
- MySQL
- MongoDB
- Redis
- Elasticsearch
- Docker
- Node.js

Do not include badges for technologies that are not supported by repository files.

### Workflow badges

Include workflow badges only if `.github/workflows/` exists and contains workflow files.

Use real workflow names and paths.

Do not invent workflow badges.

### License badge

Include a license badge only if a real license file exists.

---

## Repository Inspection Rules

Before generating or updating README.md, inspect relevant repository files and folders.

Check especially:

- `pom.xml`
- `build.gradle`
- `settings.gradle`
- `package.json`
- `vite.config.*`
- `tsconfig.json`
- `pyproject.toml`
- `requirements.txt`
- `Dockerfile`
- `docker-compose.yml`
- `docker-compose.dev.yml`
- `.env.example`
- `.github/workflows/`
- `src/`
- `frontend/`
- `backend/`
- `VERSION`
- existing `README.md`
- license files
- Swagger/OpenAPI configuration
- Actuator configuration
- project assets such as banners, logos, screenshots

The generated README must reflect only what is actually found.

---

## Project Description Rules

The `## 🧾 Project Description` section must:

- contain at least 3 sentences
- explain what the project is
- explain what problem the project solves
- explain what type of application it is, for example CLI tool, web app, API, dashboard, library, semester project, or service
- avoid vague marketing text
- avoid a single-sentence summary

For small projects, still write a useful description based on the real code and project purpose.

---

## Application Features Rules

The `## ✨ Application Features` section must use H3 subsections.

Each feature must have:

- a `### <Feature Name>` heading
- at least 2 bullet points
- concrete behavior based on repository contents

Correct:

```md
### Authentication
- Provides login and logout flow for application users.
- Protects selected routes using Spring Security.
```

Incorrect:

```md
Authentication is implemented using Spring Security.
```

Do not use a flat one-line feature list.

Do not invent features.

---

## Technology and Architecture Rules

Use this structure when relevant:

```md
- **Backend:** <technologies if applicable>
- **Frontend:** <technologies if applicable>
- **Database:** <technologies if applicable>
- **Containerization:** <technologies if applicable>
```

Only include lines that make sense for the repository.

If a category does not apply, omit that line.

For CLI-only Java projects, use for example:

```md
- **Application:** Java CLI application
- **Build Tool:** Maven
- **Testing:** JUnit
```

Do not force backend/frontend/database labels onto projects where they do not apply.

---

## Docker Services Rules

Show the Docker Services section only if Compose services exist.

If shown:

- use the exact Markdown table from the template
- infer services, ports, purpose, dependencies, and notes from the Compose file
- do not invent services
- use `-` where a value is not present

---

## Project Structure Rules

The `## 📁 Project Structure` section must always be included.

It must be rendered as a fenced `text` code block.

Use this style:

```text
<ProjectName>/
|- src/
|  |- main/
|  |  |- java/
|  |- test/
|- pom.xml
|- README.md
```

Rules:

- Reflect the actual repository structure.
- Keep it readable and concise.
- Do not include non-existent folders.
- Prefer meaningful depth over exhaustive depth.
- Do not render project structure as a bullet list.
- Do not render project structure as prose.

---

## Prerequisites Rules

The `## ⚙️ Prerequisites` section must always be included.

Infer prerequisites from actual technologies in the repository.

Mention only relevant items, such as:

- runtime versions
- build tools
- Docker / Docker Compose
- Node.js package manager
- database requirements
- required ports
- environment variables from `.env.example`

Do not invent hardware requirements unless strongly implied.

---

## Installation Rules

The `## 🛠️ Installation (Dev and Prod Modes)` section must always be included.

### Dev Mode

Always include `### 🧪 Dev Mode`.

Describe local setup based on the real repository.

Include commands in `powershell` code blocks when possible.

### Prod Mode (container runtime)

Include `### 🚀 Prod Mode (container runtime)` only if the repository supports container runtime through Docker Compose or a usable Dockerfile.

Do not invent production deployment commands.

### Prod Mode: Backend API only

Include `### 🚀 Prod Mode: Backend API only` only if the repository supports GHCR/container image deployment or equivalent backend-only runtime.

Do not include this subsection without evidence such as a GHCR workflow, Docker image publishing workflow, or documented image.

---

## Access Points Rules

Show access points only when real entry points exist.

Use this table format:

```md
| Access Point | URL | Description |
|--------------|-----|-------------|
| Application | `http://localhost:8080` | Main application entry point |
```

Do not include this section for CLI-only projects with no web/server port.

---

## API Endpoint Documentation Rules

Show Swagger/API documentation only if it exists.

Do not invent endpoint groups or URLs.

If Swagger exists, mention likely local URLs only when supported by project configuration.

---

## Troubleshooting Rules

The `## 🧯 Troubleshooting` section must always be included.

Include realistic, project-relevant troubleshooting topics.

Use H3 headings.

Each troubleshooting item must contain practical bullet points.

---

## Licence Rules

Show the Licence section only if a real license file exists.

Use this section title:

```md
## ⚖️ Licence
```

Include:

- short license explanation
- link to the license file
- short identifier block if clearly available

Do not invent legal terms.

---

## Forbidden Output

Do not output:

- explanations about how the README was generated
- analysis notes
- placeholder values
- fake badges
- fake services
- fake URLs
- fake license
- sections unsupported by repository evidence
- project structure as a bullet list
- features as plain paragraphs

---

## Output Expectations

- Output only the final `README.md` content.
- Use valid GitHub Markdown.
- Follow the repository README style template.
- Preserve the template order.
- Prefer a polished README over a bare summary.
- If information is missing, omit only the conditional section or category that requires that information.