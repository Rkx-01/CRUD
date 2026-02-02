"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const ApiError_1 = require("../utils/ApiError");
class StudentService {
    constructor(studentRepo) {
        this.studentRepo = studentRepo;
    }
    async createStudent(data) {
        if (data.year < 1 || data.year > 4) {
            throw ApiError_1.ApiError.badRequest("Year must be between 1 and 4");
        }
        if (data.cgpa !== undefined && (data.cgpa < 0 || data.cgpa > 10)) {
            throw ApiError_1.ApiError.badRequest("CGPA must be between 0 and 10");
        }
        return this.studentRepo.create(data);
    }
    async getStudentById(id) {
        return this.studentRepo.findById(id);
    }
    async getStudents(query) {
        return this.studentRepo.findAll(query);
    }
    async updateStudent(id, data) {
        if (data.year !== undefined && (data.year < 1 || data.year > 4)) {
            throw ApiError_1.ApiError.badRequest("Year must be between 1 and 4");
        }
        if (data.cgpa !== undefined && (data.cgpa < 0 || data.cgpa > 10)) {
            throw ApiError_1.ApiError.badRequest("CGPA must be between 0 and 10");
        }
        return this.studentRepo.update(id, data);
    }
    async deleteStudent(id) {
        return this.studentRepo.delete(id);
    }
}
exports.StudentService = StudentService;
