import { all } from "redux-saga/effects";
import userSaga from "../features/user/userSaga";
import courseSaga from "../features/course/courseSaga";

export default function* rootSaga() {
  yield all([userSaga(),courseSaga()]);
}
