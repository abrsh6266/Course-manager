// src/redux/features/course/courseSaga.ts
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteCourseFailure,
  createCourseRequest,
  createCourseSuccess,
  createCourseFailure,
  fetchInstructorCoursesSuccess,
  fetchInstructorCoursesFailure,
  fetchInstructorCoursesRequest,
  addLessonSuccess,
  addLessonFailure,
  addLessonRequest,
} from "./courseSlice";
import { Course, Lesson } from "../../../utils";
import successMsg from "../../../components/Alerts/SuccessMsg";
import errorMsg from "../../../components/Alerts/ErrorMsg";

// Fetch Courses Saga
function* handleFetchCourses() {
  try {
    const response: AxiosResponse<Course[]> = yield call(
      axios.get,
      "http://localhost:4000/api/courses"
    );
    yield put(fetchCoursesSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchCoursesFailure(
        error.response?.data?.message || "Failed to fetch courses"
      )
    );
  }
}
//hadle fetching assigned courses for instructor
function* handleFetchInstructorCourses() {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const response: AxiosResponse<Course[]> = yield call(
      axios.get,
      "http://localhost:4000/api/courses/instructor",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    yield put(fetchInstructorCoursesSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchInstructorCoursesFailure(
        error.response?.data?.message || "Failed to fetch courses"
      )
    );
  }
}
// Create Course Saga
function* handleCreateCourse(action: ReturnType<typeof createCourseRequest>) {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const { title, description, instructor } = action.payload;
    const response: AxiosResponse<Course> = yield call(
      axios.post,
      "http://localhost:4000/api/courses",
      { title, description, instructor },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    successMsg("Course successfully created");

    yield put(createCourseSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "course creation failed");
    yield put(
      createCourseFailure(
        error.response?.data?.message || "Failed to create course"
      )
    );
  }
}

// Delete Course Saga
function* handleDeleteCourse(action: ReturnType<typeof deleteCourseRequest>) {
  try {
    const courseId = action.payload;
    yield call(axios.delete, `http://localhost:4000/api/courses/${courseId}`);
    yield put(deleteCourseSuccess(courseId));
  } catch (error: any) {
    yield put(
      deleteCourseFailure(
        error.response?.data?.message || "Failed to delete course"
      )
    );
  }
}
// Add Lesson Saga
function* handleAddLesson(action: ReturnType<typeof addLessonRequest>) {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const { courseId, lessonData } = action.payload;
    const response: AxiosResponse<Lesson> = yield call(
      axios.put,
      `http://localhost:4000/api/courses/${courseId}/lessons`,
      lessonData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    successMsg("Lesson successfully added");

    yield put(addLessonSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Failed to add lesson");
    yield put(
      addLessonFailure(error.response?.data?.message || "Failed to add lesson")
    );
  }
}
export default function* courseSaga() {
  yield takeLatest(
    fetchInstructorCoursesRequest.type,
    handleFetchInstructorCourses
  );
  yield takeLatest(fetchCoursesRequest.type, handleFetchCourses);
  yield takeLatest(deleteCourseRequest.type, handleDeleteCourse);
  yield takeLatest(createCourseRequest.type, handleCreateCourse);
  yield takeLatest(addLessonRequest.type, handleAddLesson);
}
