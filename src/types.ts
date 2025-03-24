export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "teacher";
  }
  
  export interface Student {
    id: number;
    name: string;
    class_name: string;
  }
  
  export interface Assessment {
    id: number;
    student_id: number;
    subject: string;
    score: number;
    exam_date: string;
  }
  
  export interface Attendance {
    id: number;
    student_id: number;
    date: string;
    status: "present" | "absent";
  }
  