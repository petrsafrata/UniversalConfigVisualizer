import type { GraphResponse } from "../types/graph";
import { mapHttpError, mapUnknownError, mapValidationError } from "./errorMapper";

export async function parseDockerCompose(yaml: string): Promise<GraphResponse> {
  const validationError = mapValidationError(yaml);
  if (validationError) {
    throw validationError;
  }

  try {
    const response = await fetch("/api/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-yaml"
      },
      body: yaml
    });

    if (!response.ok) {
      throw await mapHttpError(response);
    }

    const parsed: unknown = await response.json();
    if (!isGraphResponse(parsed)) {
      throw {
        title: "Invalid Response",
        message: "Backend response does not match expected graph format."
      };
    }

    return parsed;
  } catch (error) {
    if (isMappedError(error)) {
      throw error;
    }
    throw mapUnknownError(error);
  }
}

function isGraphResponse(value: unknown): value is GraphResponse {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value.nodes) || !Array.isArray(value.edges)) {
    return false;
  }

  return value.nodes.every(isNodeLike) && value.edges.every(isEdgeLike);
}

function isNodeLike(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }

  if (typeof value.id !== "string" || typeof value.type !== "string") {
    return false;
  }

  if (value.metadata === undefined) {
    return true;
  }

  return isMetadataLike(value.metadata);
}

function isEdgeLike(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.source === "string" && typeof value.target === "string" && typeof value.type === "string";
}

function isMetadataLike(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }

  return (
    (value.image === undefined || typeof value.image === "string") &&
    (value.build === undefined || typeof value.build === "string") &&
    (value.ports === undefined || isStringArray(value.ports)) &&
    (value.depends_on === undefined || isStringArray(value.depends_on)) &&
    (value.environment === undefined || isRecord(value.environment) || isStringArray(value.environment)) &&
    (value.volumes === undefined || isStringArray(value.volumes)) &&
    (value.healthcheck === undefined || isRecord(value.healthcheck)) &&
    (value.restart === undefined || typeof value.restart === "string") &&
    (value.networks === undefined || isRecord(value.networks) || isStringArray(value.networks))
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isMappedError(error: unknown): error is { title: string; message: string } {
  return typeof error === "object" && error !== null && "title" in error && "message" in error;
}


