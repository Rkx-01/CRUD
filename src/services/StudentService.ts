import { StudentRepository, StudentQuery } from "../repositories/StudentRepository";
import { Student, StudentProps } from "../models/Student";
import { ApiError } from "../utils/ApiError";

export class StudentService {
  constructor(private readonly studentRepo: StudentRepository) {}

  async createStudent(data: StudentProps): Promise<Student> {
    if (data.year < 1 || data.year > 4) {
      throw ApiError.badRequest("Year must be between 1 and 4");
    }
    if (data.cgpa !== undefined && (data.cgpa < 0 || data.cgpa > 10)) {
      throw ApiError.badRequest("CGPA must be between 0 and 10");
    }
    return this.studentRepo.create(data);
  }

  async getStudentById(id: string): Promise<Student | null> {
    return this.studentRepo.findById(id);
  }

  async getStudents(query: StudentQuery) {
    return this.studentRepo.findAll(query);
  }

  async updateStudent(id: string, data: Partial<StudentProps>): Promise<Student> {
    if (data.year !== undefined && (data.year < 1 || data.year > 4)) {
      throw ApiError.badRequest("Year must be between 1 and 4");
    }
    if (data.cgpa !== undefined && (data.cgpa < 0 || data.cgpa > 10)) {
      throw ApiError.badRequest("CGPA must be between 0 and 10");
    }
    return this.studentRepo.update(id, data);
  }

  async deleteStudent(id: string): Promise<void> {
    return this.studentRepo.delete(id);
  }
}

