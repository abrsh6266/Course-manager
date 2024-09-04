import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../../utils";

interface CourseState {
  courses: Course[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    fetchCoursesRequest(state, action: PayloadAction<{ page?: number }>) {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess(
      state,
      action: PayloadAction<{
        courses: Course[];
        currentPage: number;
        totalPages: number;
      }>
    ) {
      state.courses = action.payload.courses;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    fetchCoursesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Additional actions for create/update/delete courses
  },
});

export const {
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCoursesFailure,
} = courseSlice.actions;

export default courseSlice.reducer;
