import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCoursesFailure,
} from "./courseSlice";
import { FetchCoursesResponse } from "../../../utils";

function* handleFetchCourses(action: ReturnType<typeof fetchCoursesRequest>) {
  try {
    const { page = 1 } = action.payload;
    const response: AxiosResponse<FetchCoursesResponse> = yield call(
      axios.get,
      `http://localhost:4000/api/courses?page=${page}`
    );

    yield put(
      fetchCoursesSuccess({
        courses: response.data.courses,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      })
    );
  } catch (error: any) {
    yield put(fetchCoursesFailure(error.response?.data?.message || "Failed to fetch courses"));
  }
}

export default function* courseSaga() {
  yield takeLatest(fetchCoursesRequest.type, handleFetchCourses);
  // Additional watchers for create/update/delete courses
}
