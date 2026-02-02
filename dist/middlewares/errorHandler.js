"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const ApiError_1 = require("../utils/ApiError");
// Global error-handling middleware
function errorHandler(err, _req, res, _next) {
    console.error(err);
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                details: err.details
            }
        });
    }
    return res.status(500).json({
        error: {
            message: "Something went wrong"
        }
    });
}
