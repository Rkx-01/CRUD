"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const Student_1 = require("../models/Student");
const ApiError_1 = require("../utils/ApiError");
const crypto_1 = require("crypto");
class StudentRepository {
    constructor() {
        this.students = [];
    }
    async create(data) {
        const student = new Student_1.Student({
            ...data,
            id: (0, crypto_1.randomUUID)()
        });
        this.students.push(student);
        return student;
    }
    async findById(id) {
        var _a;
        return (_a = this.students.find((s) => s.id === id)) !== null && _a !== void 0 ? _a : null;
    }
    async update(id, data) {
        const student = await this.findById(id);
        if (!student) {
            throw ApiError_1.ApiError.notFound("Student not found");
        }
        student.update(data);
        return student;
    }
    async delete(id) {
        const index = this.students.findIndex((s) => s.id === id);
        if (index === -1) {
            throw ApiError_1.ApiError.notFound("Student not found");
        }
        this.students.splice(index, 1);
    }
    async findAll(query) {
        const { search, department, year, section, minCgpa, maxCgpa, sort, page = 1, limit = 10 } = query;
        let results = [...this.students];
        // search by name/email/rollNumber
        if (search) {
            const s = search.toLowerCase();
            results = results.filter((st) => st.name.toLowerCase().includes(s) ||
                st.email.toLowerCase().includes(s) ||
                st.rollNumber.toLowerCase().includes(s));
        }
        // filters
        if (department) {
            const d = department.toLowerCase();
            results = results.filter((st) => st.department.toLowerCase() === d);
        }
        if (year) {
            results = results.filter((st) => st.year === year);
        }
        if (section) {
            const sec = section.toLowerCase();
            results = results.filter((st) => { var _a; return ((_a = st.section) !== null && _a !== void 0 ? _a : "").toLowerCase() === sec; });
        }
        if (minCgpa !== undefined) {
            results = results.filter((st) => { var _a; return ((_a = st.cgpa) !== null && _a !== void 0 ? _a : 0) >= minCgpa; });
        }
        if (maxCgpa !== undefined) {
            results = results.filter((st) => { var _a; return ((_a = st.cgpa) !== null && _a !== void 0 ? _a : 0) <= maxCgpa; });
        }
        // sort: "name:asc,cgpa:desc"
        if (sort) {
            const fields = sort.split(",");
            results.sort((a, b) => {
                for (const fieldExpr of fields) {
                    const [field, dir = "asc"] = fieldExpr.split(":");
                    const av = a[field];
                    const bv = b[field];
                    if (av === bv)
                        continue;
                    const cmp = av > bv ? 1 : -1;
                    return dir === "desc" ? -cmp : cmp;
                }
                return 0;
            });
        }
        const total = results.length;
        const currentPage = page && page > 0 ? page : 1;
        const perPage = limit && limit > 0 ? limit : 10;
        const offset = (currentPage - 1) * perPage;
        const paginated = results.slice(offset, offset + perPage);
        return { data: paginated, total };
    }
}
exports.StudentRepository = StudentRepository;
