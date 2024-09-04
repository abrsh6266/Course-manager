import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, Lesson, QuizQuestion } from "../../../utils";

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  course: Course | null;
  lesson: Lesson | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
  course: null,
  lesson: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    getLessonDetail(state, action: PayloadAction<Lesson>) {
      state.lesson = action.payload;
      state.loading = false;
    },
    getCourseDetail(state, action: PayloadAction<Course>) {
      state.course = action.payload;
      state.loading = false;
    },
    fetchCoursesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess(state, action: PayloadAction<Course[]>) {
      state.courses = action.payload;
      state.loading = false;
    },
    fetchCoursesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchInstructorCoursesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchInstructorCoursesSuccess(state, action: PayloadAction<Course[]>) {
      state.courses = action.payload;
      state.loading = false;
    },
    fetchInstructorCoursesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add the delete actions
    deleteCourseRequest(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    deleteCourseSuccess(state, action: PayloadAction<string>) {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
      state.loading = false;
    },
    deleteCourseFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add the lesson actions
    addLessonRequest(
      state,
      action: PayloadAction<{ courseId: string; lessonData: Lesson }>
    ) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    addLessonSuccess(state, action: PayloadAction<Lesson>) {
      state.course?.lessons.push(action.payload);
      state.loading = false;
    },
    addLessonFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    //add quiz
    addQuizRequest(
      state,
      action: PayloadAction<{
        courseId?: string;
        lessonId?: string;
        questions: QuizQuestion[];
      }>
    ) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    addQuizSuccess(state, action: PayloadAction<Lesson>) {
      state.lesson = action.payload;
      state.loading = false;
    },
    addQuizFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    //update quiz
    updateQuizRequest(
      state,
      action: PayloadAction<{
        courseId?: string;
        lessonId?: string;
        questions: QuizQuestion[];
      }>
    ) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    updateQuizSuccess(state, action: PayloadAction<Lesson>) {
      state.lesson = action.payload;
      state.loading = false;
    },
    updateQuizFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    //delete quiz
    deleteQuizRequest(
      state,
      action: PayloadAction<{
        courseId?: string;
        lessonId?: string;
      }>
    ) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    deleteQuizSuccess(state, action: PayloadAction<Lesson>) {
      state.lesson = action.payload;
      state.loading = false;
    },
    deleteQuizFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add the create course actions
    createCourseRequest(
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        instructor: string;
      }>
    ) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    createCourseSuccess(state, action: PayloadAction<Course>) {
      state.courses.push(action.payload);
      state.loading = false;
    },
    createCourseFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addLessonRequest,
  addLessonSuccess,
  addLessonFailure,
  getCourseDetail,
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchInstructorCoursesRequest,
  fetchInstructorCoursesSuccess,
  fetchInstructorCoursesFailure,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteCourseFailure,
  createCourseRequest,
  createCourseSuccess,
  createCourseFailure,
  getLessonDetail,
  addQuizFailure,
  addQuizRequest,
  addQuizSuccess,
  updateQuizFailure,
  updateQuizRequest,
  updateQuizSuccess,
  deleteQuizFailure,
  deleteQuizRequest,
  deleteQuizSuccess,
} = courseSlice.actions;

export default courseSlice.reducer;
