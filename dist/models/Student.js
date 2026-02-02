"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(props) {
        var _a, _b;
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.rollNumber = props.rollNumber;
        this.department = props.department;
        this.year = props.year;
        this.section = props.section;
        this.cgpa = props.cgpa;
        this.createdAt = (_a = props.createdAt) !== null && _a !== void 0 ? _a : new Date();
        this.updatedAt = (_b = props.updatedAt) !== null && _b !== void 0 ? _b : new Date();
    }
    update(props) {
        if (props.name !== undefined)
            this.name = props.name;
        if (props.email !== undefined)
            this.email = props.email;
        if (props.rollNumber !== undefined)
            this.rollNumber = props.rollNumber;
        if (props.department !== undefined)
            this.department = props.department;
        if (props.year !== undefined)
            this.year = props.year;
        if (props.section !== undefined)
            this.section = props.section;
        if (props.cgpa !== undefined)
            this.cgpa = props.cgpa;
        this.updatedAt = new Date();
    }
}
exports.Student = Student;
