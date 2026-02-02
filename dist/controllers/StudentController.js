"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const ApiError_1 = require("../utils/ApiError");
class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
        this.createStudent = async (req, res, next) => {
            try {
                const student = await this.studentService.createStudent(req.body);
                res.status(201).json({ data: student });
            }
            catch (err) {
                next(err);
            }
        };
        this.getStudent = async (req, res, next) => {
            try {
                const idParam = req.params.id;
                const id = Array.isArray(idParam) ? idParam[0] : idParam;
                const student = await this.studentService.getStudentById(id);
                if (!student) {
                    throw ApiError_1.ApiError.notFound("Student not found");
                }
                res.json({ data: student });
            }
            catch (err) {
                next(err);
            }
        };
        this.getStudents = async (req, res, next) => {
            try {
                const { search, department, section, sort } = req.query;
                const yearParam = req.query.year;
                const minCgpaParam = req.query.minCgpa;
                const maxCgpaParam = req.query.maxCgpa;
                const pageParam = req.query.page;
                const limitParam = req.query.limit;
                const year = typeof yearParam === "string" ? Number(yearParam) : undefined;
                const minCgpa = typeof minCgpaParam === "string" ? Number(minCgpaParam) : undefined;
                const maxCgpa = typeof maxCgpaParam === "string" ? Number(maxCgpaParam) : undefined;
                const page = typeof pageParam === "string" ? Number(pageParam) : undefined;
                const limit = typeof limitParam === "string" ? Number(limitParam) : undefined;
                const { data, total } = await this.studentService.getStudents({
                    search: search,
                    department: department,
                    section: section,
                    sort: sort,
                    year,
                    minCgpa,
                    maxCgpa,
                    page,
                    limit
                });
                const currentPage = page !== null && page !== void 0 ? page : 1;
                const perPage = limit !== null && limit !== void 0 ? limit : 10;
                res.json({
                    data,
                    meta: {
                        total,
                        page: currentPage,
                        limit: perPage,
                        totalPages: Math.ceil(total / perPage)
                    }
                });
            }
            catch (err) {
                next(err);
            }
        };
        this.updateStudent = async (req, res, next) => {
            try {
                const idParam = req.params.id;
                const id = Array.isArray(idParam) ? idParam[0] : idParam;
                const student = await this.studentService.updateStudent(id, req.body);
                res.json({ data: student });
            }
            catch (err) {
                next(err);
            }
        };
        this.deleteStudent = async (req, res, next) => {
            try {
                const idParam = req.params.id;
                const id = Array.isArray(idParam) ? idParam[0] : idParam;
                await this.studentService.deleteStudent(id);
                res.status(204).send();
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.StudentController = StudentController;
