export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  private constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static badRequest(message = "Bad request", details?: unknown) {
    return new ApiError(400, message, details);
  }

  static notFound(message = "Not found") {
    return new ApiError(404, message);
  }

  static internal(message = "Internal server error", details?: unknown) {
    return new ApiError(500, message, details);
  }
}

