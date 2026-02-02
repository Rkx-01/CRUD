"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    static badRequest(message = "Bad request", details) {
        return new ApiError(400, message, details);
    }
    static notFound(message = "Not found") {
        return new ApiError(404, message);
    }
    static internal(message = "Internal server error", details) {
        return new ApiError(500, message, details);
    }
}
exports.ApiError = ApiError;
