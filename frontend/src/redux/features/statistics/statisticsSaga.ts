import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} from "./statisticsSlice";

function* handleFetchStatistics() {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.get,
      "http://localhost:4000/api/courses/statistics"
    );
    yield put(fetchStatisticsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchStatisticsFailure(error.message));
  }
}

export default function* statisticsSaga() {
  yield takeLatest(fetchStatisticsRequest.type, handleFetchStatistics);
}
