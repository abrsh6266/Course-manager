import { all } from "redux-saga/effects";
import musicSaga from "../features/music/musicSaga";
import userSaga from "../features/user/userSaga";

export default function* rootSaga() {
  yield all([musicSaga(), userSaga()]);
}
