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
} from "./courseSlice";
import { Course } from "../../../utils";
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

export default function* courseSaga() {
  yield takeLatest(fetchCoursesRequest.type, handleFetchCourses);
  yield takeLatest(deleteCourseRequest.type, handleDeleteCourse);
  yield takeLatest(createCourseRequest.type, handleCreateCourse);
}
