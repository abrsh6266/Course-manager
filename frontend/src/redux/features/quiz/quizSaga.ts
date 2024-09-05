import { call, put, select, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  takeQuizRequest,
  takeQuizSuccess,
  takeQuizFailure,
  fetchQuizResultsRequest,
  fetchQuizResultsSuccess,
  fetchQuizResultsFailure,
} from "./quizSlice";
import { QuizResult } from "../../../utils";
import successMsg from "../../../components/Alerts/SuccessMsg";

interface QuizResponse {
  feedback: string;
  score: number;
}

// Take Quiz Saga
function* handleTakeQuiz(action: ReturnType<typeof takeQuizRequest>) {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const { courseId, lessonId, answers } = action.payload;
    const response: AxiosResponse<QuizResponse> = yield call(
      axios.post,
      `http://localhost:4000/api/users/quiz`,
      { courseId, lessonId, answers },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    successMsg("You have taken the quiz");
    yield put(takeQuizSuccess(response.data));
  } catch (error: any) {
    yield put(
      takeQuizFailure(error.response?.data?.message || "Failed to submit quiz")
    );
  }
}

// Fetch Quiz Results Saga
function* handleFetchQuizResults() {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const response: AxiosResponse<QuizResult[]> = yield call(
      axios.get,
      "http://localhost:4000/api/users/quiz-results",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    yield put(fetchQuizResultsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchQuizResultsFailure(
        error.response?.data?.message || "Failed to fetch quiz results"
      )
    );
  }
}

// Watcher Sagas
export default function* quizSaga() {
  yield takeLatest(takeQuizRequest.type, handleTakeQuiz);
  yield takeLatest(fetchQuizResultsRequest.type, handleFetchQuizResults);
}
