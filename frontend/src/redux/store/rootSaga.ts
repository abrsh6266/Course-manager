import { all } from "redux-saga/effects";
import userSaga from "../features/user/userSaga";
import courseSaga from "../features/course/courseSaga";
import statisticsSaga from "../features/statistics/statisticsSaga";

export default function* rootSaga() {
  yield all([userSaga(), courseSaga(), statisticsSaga()]);
}
