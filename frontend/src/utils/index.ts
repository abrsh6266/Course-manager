// src/utils/index.ts

export interface QuizOption {
  optionText: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  questionText: string;
  options: QuizOption[];
}

export interface Lesson {
  title: string;
  content: string;
  quiz?: {
    questions: QuizQuestion[];
  };
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
