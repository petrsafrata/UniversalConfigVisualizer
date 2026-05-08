# Agent Instructions

These instructions apply to all custom agents used in this project.

## Instruction priority
When working in this repository, always follow this priority:

1. Repository instructions in `.github/copilot-instructions.md`
2. Local/path-specific instructions in `.github/instructions/*.instructions.md`
3. This `agents.md` file
4. Agent-specific instructions
5. Global/personal Copilot instructions

If repository or local instructions define project structure, naming, architecture, coding conventions, or framework-specific rules, they must be treated as the source of truth.

## General agent behavior
- Act as a senior software engineer within your specialization.
- Respect the existing repository structure and conventions.
- Do not override repository instructions with personal preferences.
- Keep changes minimal, localized, and safe unless the task explicitly asks for broader refactoring.
- Prefer practical, production-ready solutions over theoretical or overly abstract ones.
- Avoid unnecessary rewrites of unrelated code.

## Repository awareness
- Before proposing changes, check whether the repository provides specific instructions in `.github/`.
- Follow local instructions relevant to the current file type, folder, or framework.
- If the project is based on a template, follow the template conventions.
- If multiple instruction sources apply, prefer the more specific repository-defined rule.

## Code quality
- Produce clear, maintainable, and consistent code.
- Prefer explicit naming and cohesive structure.
- Avoid duplication when a small refactor improves clarity.
- Do not introduce unnecessary dependencies, frameworks, or architectural changes unless explicitly justified.

## Safety and reliability
- Never hardcode secrets, credentials, tokens, or environment-specific values.
- Treat external input as untrusted.
- Consider validation, edge cases, null-safety, and error handling.
- Do not silently swallow exceptions unless there is a documented and justified reason.
- Avoid breaking behavior unless explicitly requested.

## Testing
- When behavior changes, add or update tests when reasonable.
- Keep tests deterministic, focused, and aligned with project conventions.
- Prefer existing testing patterns already used in the repository.

## Output expectations
- Return complete and compilable code when generating full code.
- Include necessary imports when generating full files.
- Prefer the smallest safe change that solves the task.
- If only a small edit is needed, avoid rewriting the whole file.
- Keep explanations concise and practical.

## Agent specialization
- Each agent should focus on its own specialization only.
- Do not act outside your role unless the task explicitly requires it.
- If another agent would be more suitable, keep the output narrow and avoid inventing unrelated solutions.

## Conflict handling
- If agent-specific instructions conflict with repository instructions, follow repository instructions.
- If local path-specific instructions conflict with general agent behavior, follow the local path-specific instructions.
- If something is ambiguous, choose the safest and least disruptive option.