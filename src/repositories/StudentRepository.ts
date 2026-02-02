import { Student, StudentProps } from "../models/Student";
import { ApiError } from "../utils/ApiError";
import { randomUUID } from "crypto";

export interface StudentQuery {
  search?: string;
  department?: string;
  year?: number;
  section?: string;
  minCgpa?: number;
  maxCgpa?: number;
  sort?: string; // e.g. "name:asc,cgpa:desc"
  page?: number;
  limit?: number;
}

export class StudentRepository {
  private students: Student[] = [];

  async create(data: StudentProps): Promise<Student> {
    const student = new Student({
      ...data,
      id: randomUUID()
    });
    this.students.push(student);
    return student;
  }

  async findById(id: string): Promise<Student | null> {
    return this.students.find((s) => s.id === id) ?? null;
  }

  async update(id: string, data: Partial<StudentProps>): Promise<Student> {
    const student = await this.findById(id);
    if (!student) {
      throw ApiError.notFound("Student not found");
    }
    student.update(data);
    return student;
  }

  async delete(id: string): Promise<void> {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) {
      throw ApiError.notFound("Student not found");
    }
    this.students.splice(index, 1);
  }

  async findAll(query: StudentQuery): Promise<{ data: Student[]; total: number }> {
    const {
      search,
      department,
      year,
      section,
      minCgpa,
      maxCgpa,
      sort,
      page = 1,
      limit = 10
    } = query;

    let results = [...this.students];

    // search by name/email/rollNumber
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(
        (st) =>
          st.name.toLowerCase().includes(s) ||
          st.email.toLowerCase().includes(s) ||
          st.rollNumber.toLowerCase().includes(s)
      );
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
      results = results.filter((st) => (st.section ?? "").toLowerCase() === sec);
    }
    if (minCgpa !== undefined) {
      results = results.filter((st) => (st.cgpa ?? 0) >= minCgpa);
    }
    if (maxCgpa !== undefined) {
      results = results.filter((st) => (st.cgpa ?? 0) <= maxCgpa);
    }

    // sort: "name:asc,cgpa:desc"
    if (sort) {
      const fields = sort.split(",");
      results.sort((a: any, b: any) => {
        for (const fieldExpr of fields) {
          const [field, dir = "asc"] = fieldExpr.split(":");
          const av = a[field];
          const bv = b[field];
          if (av === bv) continue;
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

