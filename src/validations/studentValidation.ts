import Joi from "joi";

export const createStudentSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  rollNumber: Joi.string().min(3).max(20).required(),
  department: Joi.string().min(2).max(50).required(),
  year: Joi.number().integer().min(1).max(4).required(),
  section: Joi.string().max(5).optional(),
  cgpa: Joi.number().min(0).max(10).optional()
});

export const updateStudentSchema = createStudentSchema.fork(
  ["name", "email", "rollNumber", "department", "year"],
  (schema) => schema.optional()
);

