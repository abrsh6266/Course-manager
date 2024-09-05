// src/utils/index.ts

export interface QuizOption {
  optionText: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  questionText: string;
  options: QuizOption[];
}
export interface Quiz {
  questions: QuizQuestion[];
}
export interface Lesson {
  _id?: string;
  title: string;
  content: string;
  quiz?: {
    questions: QuizQuestion[];
  };
}
export interface QuizResult {
  _id: string;
  courseId: { title: string };
  lessonId: { title: string };
  score: number;
  feedback: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  lessons: Lesson[];
}

export interface FetchCoursesResponse {
  courses: Course[];
  totalCourses: number;
  totalPages: number;
  currentPage: number;
}
