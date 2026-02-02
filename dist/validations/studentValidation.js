"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentSchema = exports.createStudentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createStudentSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    email: joi_1.default.string().email().required(),
    rollNumber: joi_1.default.string().min(3).max(20).required(),
    department: joi_1.default.string().min(2).max(50).required(),
    year: joi_1.default.number().integer().min(1).max(4).required(),
    section: joi_1.default.string().max(5).optional(),
    cgpa: joi_1.default.number().min(0).max(10).optional()
});
exports.updateStudentSchema = exports.createStudentSchema.fork(["name", "email", "rollNumber", "department", "year"], (schema) => schema.optional());
