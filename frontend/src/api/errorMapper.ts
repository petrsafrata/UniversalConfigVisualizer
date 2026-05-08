import type { AppError } from "../types/api";

export function mapValidationError(yaml: string): AppError | null {
  if (!yaml.trim()) {
    return {
      title: "Empty Input",
      message: "Please provide docker-compose YAML before parsing."
    };
  }
  return null;
}

export async function mapHttpError(response: Response): Promise<AppError> {
  let details = "";
  let apiError = "";

  try {
    const body = (await response.json()) as { error?: string };
    apiError = body.error ?? "";
    details = JSON.stringify(body);
  } catch {
    // Non-JSON response body.
  }

  if (response.status === 400 && /invalid/i.test(apiError)) {
    return {
      title: "Invalid YAML",
      message: apiError || "The provided docker-compose YAML is invalid.",
      status: response.status,
      details
    };
  }

  if (response.status === 400 && /(missing service|depends_on missing|not found)/i.test(apiError)) {
    return {
      title: "Missing Services",
      message: apiError || "Compose file contains dependency references to non-existing services.",
      status: response.status,
      details
    };
  }

  if (response.status === 400) {
    return {
      title: "Invalid Request",
      message: apiError || "The request could not be parsed.",
      status: response.status,
      details
    };
  }

  if (response.status >= 500) {
    return {
      title: "Backend Error",
      message: "Backend failed to process the request.",
      status: response.status,
      details
    };
  }

  return {
    title: "Request Failed",
    message: apiError || `Unexpected response (${response.status}).`,
    status: response.status,
    details
  };
}

export function mapUnknownError(error: unknown): AppError {
  if (error instanceof TypeError) {
    return {
      title: "Backend Unavailable",
      message: "Could not reach backend API. Check server availability."
    };
  }

  if (error instanceof Error) {
    return {
      title: "Unknown Error",
      message: error.message
    };
  }

  return {
    title: "Unknown Error",
    message: "An unexpected error occurred."
  };
}


