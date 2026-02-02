import { Router } from "express";
import { StudentRepository } from "../repositories/StudentRepository";
import { StudentService } from "../services/StudentService";
import { StudentController } from "../controllers/StudentController";
import { validate } from "../middlewares/validate";
import { createStudentSchema, updateStudentSchema } from "../validations/studentValidation";

const router = Router();

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

router.post("/", validate(createStudentSchema), studentController.createStudent);
router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudent);
router.put("/:id", validate(updateStudentSchema), studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

export default router;

