---
applyTo: "**/*.java"
description: "Guidelines for Java and Spring Boot development"
---

# Java Instructions

You are an experienced Java developer with strong knowledge of modern Java and Spring Boot.

## General rules
- Write production-grade Java code that is readable, maintainable, and explicit.
- Prefer simple solutions over clever or overly abstract ones.
- Keep changes minimal and consistent with the existing project style.
- Use constructor injection; avoid field injection.
- Do not introduce unnecessary dependencies.
- Preserve package structure, naming, and template conventions unless explicitly asked to change them.
- If the project is based on a template, follow the template conventions consistently.

## Project structure
When working on a Spring application, follow the existing project structure:

- `api` – REST API layer
- `config` – configuration classes
- `model` – domain/entity classes
- `repository` – persistence layer
- `service` – business logic

Do not move classes between layers unless explicitly requested.

## API layer conventions
- In the `api` package, each controller should have its own dedicated folder.
- Each controller folder should contain:
  - the controller class
  - a `dtos` subpackage for request/response DTOs
- Keep controllers thin and place business logic in services.
- Use `@RestController` for REST endpoints.
- Validate request DTOs with `@Valid` where appropriate.
- Prefer explicit and stable API contracts.

## DTO conventions
- DTOs used for API communication should be implemented as Java `record` types whenever possible.
- DTO fields should use `@JsonProperty`.
- Keep DTOs focused on API communication only.
- Do not leak internal model/entity classes directly through the API unless the project explicitly does so.

## Model conventions
- Classes in the `model` package should follow the existing domain/entity style of the project.
- Use Lombok getters and setters in model classes where appropriate and consistent with the existing codebase.
- Do not generate boilerplate manually if Lombok is already the project standard.
- Be careful with `equals` and `hashCode` on entities.
- Follow the project's existing ID strategy and persistence annotations.

## Enum conventions
- Enums should include labels when this is the project convention.
- Keep enum values clear and stable.
- Follow the existing serialization and API exposure approach for enums.

## Spring Boot conventions
- Keep controllers thin and place business logic in services.
- Use `@Transactional(readOnly = true)` for read operations and `@Transactional` for writes where appropriate.
- Keep persistence logic out of controllers.
- Prefer Spring Data JPA conventions when they fit the project.
- Use derived queries where readable; use custom queries only when necessary.
- Be aware of N+1 query issues and inefficient database access.

## Java style
- Use intention-revealing names.
- Prefer `final` where it improves clarity.
- Keep methods short and cohesive.
- Prefer early returns over deep nesting.
- Use `Optional` carefully and only where it improves readability.
- Use logging meaningfully; do not log noise.

## Validation and error handling
- Use Bean Validation annotations where appropriate.
- Prefer domain-specific exceptions when they improve clarity.
- Do not expose sensitive internal details in API errors.
- Follow the project's existing exception handling pattern.

## Testing
- Prefer JUnit 5.
- Use Mockito for unit tests when mocking is appropriate.
- Use Spring Boot test slices or integration tests where they fit the existing test style.
- If the project uses Testcontainers, follow the existing conventions.

## Output
- Return compilable Java code when generating full code.
- Include imports when generating full files.
- Prefer the smallest safe change that solves the problem.
- Respect the existing structure, naming, and template conventions.