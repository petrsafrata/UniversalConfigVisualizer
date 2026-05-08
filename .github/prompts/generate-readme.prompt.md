---
description: "Generate or update README.md using the repository README skill and README style template"
---

# Generate README

Generate or update the `README.md` file for this repository.

---

## Mandatory First Step: Load README Template

Before writing or updating `README.md`, first open and read this exact file:

```text
.github/templates/readme-template.md
```

This is mandatory.

The file `.github/templates/readme-template.md` is the authoritative structure and formatting template for the generated README.

The file `.github/prompts/generate-readme.prompt.md` is only the task prompt.

Do not generate the README from this prompt alone.

Do not say that the goal is to prepare the README according to `.github/prompts/generate-readme.prompt.md`.

Instead, generate the README according to:

```text
.github/templates/readme-template.md
```

If `.github/templates/readme-template.md` does not exist, stop and explain that the README template file is missing.

After loading the template, inspect the repository contents and fill the template with real project information.

---

## Primary Requirement

The generated README must follow `.github/templates/readme-template.md` as the authoritative template as closely as possible.

Use the section order, section names, heading style, badge placement, feature formatting, project structure formatting, tables, separators, notes, and installation formatting from `.github/templates/readme-template.md`.

Do not generate a short custom README.

Do not replace the template with your own structure.


---

## Required Behavior

Before writing the README, inspect the repository and use the actual contents as the source of truth.

Inspect especially:

- source folders
- build files
- dependency files
- Docker files
- Docker Compose files
- workflow files
- license files
- version files
- environment examples
- Swagger/OpenAPI configuration
- project assets such as banners, logos, and screenshots
- existing README files

---

## Structure Rules

Use this section order:

1. Banner
2. `# 🚀 <Project Name>`
3. Badges
4. `## 🧾 Project Description`
5. `## ✨ Application Features`
6. `## 🧱 Technology and Architecture`
7. `## 🐳 Docker Services`
8. `## 📁 Project Structure`
9. `## ⚙️ Prerequisites`
10. `## 🛠️ Installation (Dev and Prod Modes)`
11. `## 🌐 Access Points`
12. `## 📚 API Endpoint Documentation (Swagger)`
13. `## 🧯 Troubleshooting`
14. `## ⚖️ Licence`

Do not rename sections.

Do not reorder sections.

Use `---` between major sections.

---

## Always Include

Always include these sections:

- project title
- badges directly under the title
- Project Description
- Application Features
- Technology and Architecture
- Project Structure
- Prerequisites
- Installation (Dev and Prod Modes)
- Troubleshooting

---

## Include Only When Supported

Include these sections only if supported by real repository files:

- Banner
- Docker Services
- Access Points
- API Endpoint Documentation (Swagger)
- Licence
- Prod Mode (container runtime)
- Prod Mode: Backend API only

Do not invent unsupported information.

---

## Description Rules

The Project Description must be detailed.

It must explain:

- what the project is
- what the project does
- what problem it solves
- what type of application it is

Do not write only one sentence.

---

## Feature Rules

The Application Features section must use this format:

```md
### <Feature Name>
- <Feature detail>
- <Feature detail>
```

Each feature must have:

- H3 heading
- at least two bullet points
- real behavior based on the repository

Do not write features as one-line paragraphs.

---

## Project Structure Rules

The Project Structure section must be a fenced `text` block.

Use this style:

```text
<ProjectName>/
|- src/
|  |- main/
|  |- test/
|- pom.xml
|- README.md
```

Do not use a bullet list for project structure.

Do not include folders that do not exist.

---

## Installation Rules

Use PowerShell code blocks for commands.

Always include Dev Mode.

Include Prod Mode only if supported.

Include Backend API only mode only if supported by GHCR/container image workflow or equivalent evidence.

---

## Do Not Invent

Do not invent:

- technologies
- badges
- Docker services
- ports
- URLs
- Swagger documentation
- workflows
- deployment methods
- licenses
- features

If information is missing, omit the conditional section instead of inventing it.

---

## Output

Return only the final `README.md` content.

Do not explain what you changed.

Do not include notes outside the README.

Use valid GitHub Markdown.