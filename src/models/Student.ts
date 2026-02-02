export interface StudentProps {
  id?: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string; // e.g. CSE, ECE
  year: number; // 1–4
  section?: string; // A, B, etc.
  cgpa?: number; // 0–10
  createdAt?: Date;
  updatedAt?: Date;
}

export class Student {
  public id?: string;
  public name: string;
  public email: string;
  public rollNumber: string;
  public department: string;
  public year: number;
  public section?: string;
  public cgpa?: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: StudentProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.rollNumber = props.rollNumber;
    this.department = props.department;
    this.year = props.year;
    this.section = props.section;
    this.cgpa = props.cgpa;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  update(props: Partial<StudentProps>) {
    if (props.name !== undefined) this.name = props.name;
    if (props.email !== undefined) this.email = props.email;
    if (props.rollNumber !== undefined) this.rollNumber = props.rollNumber;
    if (props.department !== undefined) this.department = props.department;
    if (props.year !== undefined) this.year = props.year;
    if (props.section !== undefined) this.section = props.section;
    if (props.cgpa !== undefined) this.cgpa = props.cgpa;
    this.updatedAt = new Date();
  }
}

