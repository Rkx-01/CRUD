import { Request, Response, NextFunction } from "express";
import { StudentService } from "../services/StudentService";
import { ApiError } from "../utils/ApiError";

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await this.studentService.createStudent(req.body);
      res.status(201).json({ data: student });
    } catch (err) {
      next(err);
    }
  };

  getStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idParam = req.params.id as unknown;
      const id = Array.isArray(idParam) ? idParam[0] : (idParam as string);

      const student = await this.studentService.getStudentById(id);
      if (!student) {
        throw ApiError.notFound("Student not found");
      }
      res.json({ data: student });
    } catch (err) {
      next(err);
    }
  };

  getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, department, section, sort } = req.query;

      const yearParam = req.query.year;
      const minCgpaParam = req.query.minCgpa;
      const maxCgpaParam = req.query.maxCgpa;
      const pageParam = req.query.page;
      const limitParam = req.query.limit;

      const year = typeof yearParam === "string" ? Number(yearParam) : undefined;
      const minCgpa =
        typeof minCgpaParam === "string" ? Number(minCgpaParam) : undefined;
      const maxCgpa =
        typeof maxCgpaParam === "string" ? Number(maxCgpaParam) : undefined;
      const page = typeof pageParam === "string" ? Number(pageParam) : undefined;
      const limit =
        typeof limitParam === "string" ? Number(limitParam) : undefined;

      const { data, total } = await this.studentService.getStudents({
        search: search as string | undefined,
        department: department as string | undefined,
        section: section as string | undefined,
        sort: sort as string | undefined,
        year,
        minCgpa,
        maxCgpa,
        page,
        limit
      });

      const currentPage = page ?? 1;
      const perPage = limit ?? 10;

      res.json({
        data,
        meta: {
          total,
          page: currentPage,
          limit: perPage,
          totalPages: Math.ceil(total / perPage)
        }
      });
    } catch (err) {
      next(err);
    }
  };

  updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idParam = req.params.id as unknown;
      const id = Array.isArray(idParam) ? idParam[0] : (idParam as string);

      const student = await this.studentService.updateStudent(id, req.body);
      res.json({ data: student });
    } catch (err) {
      next(err);
    }
  };

  deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idParam = req.params.id as unknown;
      const id = Array.isArray(idParam) ? idParam[0] : (idParam as string);

      await this.studentService.deleteStudent(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

