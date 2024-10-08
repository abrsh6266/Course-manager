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
  addQuizRequest,
  addQuizSuccess,
  addQuizFailure,
  updateQuizRequest,
  updateQuizSuccess,
  updateQuizFailure,
  deleteQuizRequest,
  deleteQuizSuccess,
  deleteQuizFailure,
  enrollCourseRequest,
  enrollCourseSuccess,
  fetchEnrolledCoursesRequest,
} from "./courseSlice";
import { Course, Lesson } from "../../../utils";
import successMsg from "../../../components/Alerts/SuccessMsg";
import errorMsg from "../../../components/Alerts/ErrorMsg";

// Fetch Courses Saga
function* handleFetchCourses() {
  try {
    const response: AxiosResponse<Course[]> = yield call(
      axios.get,
      "https://course-api-liard.vercel.app/api/courses"
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
//handle fetching Enrolled courses
function* handleEnrolledCourses() {
  try {
    const token: string = yield select((state: any) => state.user.token);

    const response: AxiosResponse<Course[]> = yield call(
      axios.get,
      "https://course-api-liard.vercel.app/api/users/enrolled-courses",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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

// enrol Course Saga
function* handleEnrollingCourse(
  action: ReturnType<typeof enrollCourseRequest>
) {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const courseId = action.payload;
    yield call(
      axios.post,
      `https://course-api-liard.vercel.app/api/users/enroll`,
      { courseId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    successMsg("you have enrolled for this course");
    yield put(enrollCourseSuccess());
  } catch (error: any) {
    errorMsg(
      error.response?.data?.message || "Failed to enroll for this course"
    );
    yield put(
      deleteCourseFailure(
        error.response?.data?.message || "Failed to delete course"
      )
    );
  }
}

// Handle fetching assigned courses for instructor
function* handleFetchInstructorCourses() {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const response: AxiosResponse<Course[]> = yield call(
      axios.get,
      "https://course-api-liard.vercel.app/api/courses/instructor",
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
      "https://course-api-liard.vercel.app/api/courses",
      { title, description, instructor },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    successMsg("Course successfully created");

    yield put(createCourseSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Course creation failed");
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
    yield call(axios.delete, `https://course-api-liard.vercel.app/api/courses/${courseId}`);
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
      `https://course-api-liard.vercel.app/api/courses/${courseId}/lessons`,
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

// Add Quiz Saga
function* handleAddQuiz(action: ReturnType<typeof addQuizRequest>) {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const { courseId, lessonId, questions } = action.payload;
    const response: AxiosResponse<Lesson> = yield call(
      axios.post,
      `https://course-api-liard.vercel.app/api/courses/${courseId}/lessons/${lessonId}/quiz`,
      { questions },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    successMsg("Quiz successfully added");

    yield put(addQuizSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Failed to add quiz");
    yield put(
      addQuizFailure(error.response?.data?.message || "Failed to add quiz")
    );
  }
}

// Update Quiz Saga
function* handleUpdateQuiz(action: ReturnType<typeof updateQuizRequest>) {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const { courseId, lessonId, questions } = action.payload;
    const response: AxiosResponse<Lesson> = yield call(
      axios.put,
      `https://course-api-liard.vercel.app/api/courses/${courseId}/lessons/${lessonId}/quiz`,
      { questions },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    successMsg("Quiz successfully updated");

    yield put(updateQuizSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Failed to update quiz");
    yield put(
      updateQuizFailure(
        error.response?.data?.message || "Failed to update quiz"
      )
    );
  }
}

// Delete Quiz Saga
function* handleDeleteQuiz(action: ReturnType<typeof deleteQuizRequest>) {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const { courseId, lessonId } = action.payload;
    const response: AxiosResponse<Lesson> = yield call(
      axios.delete,
      `https://course-api-liard.vercel.app/api/courses/${courseId}/lessons/${lessonId}/quiz`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    successMsg("Quiz successfully deleted");

    yield put(deleteQuizSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Failed to delete quiz");
    yield put(
      deleteQuizFailure(
        error.response?.data?.message || "Failed to delete quiz"
      )
    );
  }
}

export default function* courseSaga() {
  yield takeLatest(
    fetchInstructorCoursesRequest.type,
    handleFetchInstructorCourses
  );
  yield takeLatest(fetchCoursesRequest.type, handleFetchCourses);
  yield takeLatest(fetchEnrolledCoursesRequest.type, handleEnrolledCourses);
  yield takeLatest(enrollCourseRequest.type, handleEnrollingCourse);
  yield takeLatest(deleteCourseRequest.type, handleDeleteCourse);
  yield takeLatest(createCourseRequest.type, handleCreateCourse);
  yield takeLatest(addLessonRequest.type, handleAddLesson);
  yield takeLatest(addQuizRequest.type, handleAddQuiz);
  yield takeLatest(updateQuizRequest.type, handleUpdateQuiz);
  yield takeLatest(deleteQuizRequest.type, handleDeleteQuiz);
}
