"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ApiError_1 = require("../utils/ApiError");
const validate = (schema) => (req, _res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });
    if (error) {
        throw ApiError_1.ApiError.badRequest("Validation error", error.details.map((d) => d.message));
    }
    // replace body with validated, sanitized value
    req.body = value;
    next();
};
exports.validate = validate;
