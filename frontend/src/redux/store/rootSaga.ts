import { all } from "redux-saga/effects";
import userSaga from "../features/user/userSaga";
import courseSaga from "../features/course/courseSaga";
import statisticsSaga from "../features/statistics/statisticsSaga";
import quizSaga from "../features/quiz/quizSaga";

export default function* rootSaga() {
  yield all([userSaga(), courseSaga(), statisticsSaga(), quizSaga()]);
}
