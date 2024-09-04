import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../../utils";

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
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

    // Add the delete actions
    deleteCourseRequest(state, action: PayloadAction<string>) {
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
    // Add the create course actions
    createCourseRequest(
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        instructor: string;
      }>
    ) {
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
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteCourseFailure,
  createCourseRequest,
  createCourseSuccess,
  createCourseFailure,
} = courseSlice.actions;

export default courseSlice.reducer;
