# Repository Copilot Instructions

You are working in a production-oriented software repository.

## General behavior
- Prefer simple, explicit, maintainable solutions over clever ones.
- Keep changes minimal, localized, and consistent with the existing codebase.
- Do not introduce new dependencies, frameworks, or architectural patterns unless clearly justified.
- Preserve public APIs, file structure, and naming unless a change is explicitly requested.
- Follow the existing project conventions before inventing new ones.
- When something is ambiguous, choose the safest default and keep it easy to change later.

## Code quality
- Write production-grade code that is readable, testable, and maintainable.
- Avoid duplication when a small refactor improves clarity.
- Prefer clear naming and cohesive methods/functions.
- Do not leave debug code, commented-out code, or placeholder implementations unless explicitly requested.
- Do not hardcode secrets, credentials, tokens, or environment-specific values.

## Validation and safety
- Treat all external input as untrusted.
- Consider null-safety, validation, error handling, and edge cases.
- Avoid breaking behavior unless explicitly asked.
- Never silently swallow exceptions unless there is a strong reason and it is documented.

## Tests
- When behavior changes, add or update tests when reasonable.
- Keep tests focused, deterministic, and easy to understand.
- Prefer existing test patterns already used in the repository.

## Output expectations
- Return code that is complete and compilable when asked to generate full code.
- Include necessary imports when generating full files.
- Keep explanations concise and practical.
- If a request is better solved by editing only a small part of a file, prefer a minimal change over rewriting the whole file.