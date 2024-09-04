import { call, put, takeLatest, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFailure,
  logout,
} from "./userSlice";
import successMsg from "../../components/Alerts/SuccessMsg";
import errorMsg from "../../components/Alerts/ErrorMsg";

interface LoginResponse {
  id: string;
  email: string;
  username: string;
  token: string;
}

interface RegisterResponse {
  email: string;
  username: string;
  token: string;
}

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(
      axios.post,
      "https://music-app-api-cyan.vercel.app/api/v1/users/login",
      action.payload
    );
    successMsg("User successfully logged in");
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Login failed");
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

function* handleRegister(action: ReturnType<typeof registerRequest>) {
  try {
    const response: AxiosResponse<RegisterResponse> = yield call(
      axios.post,
      "https://music-app-api-cyan.vercel.app/api/v1/users/register",
      action.payload
    );
    successMsg("User successfully registered");
    yield put(registerSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Registration failed");
    yield put(
      registerFailure(error.response?.data?.message || "Registration failed")
    );
  }
}

function* handleFetchProfile() {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const response: AxiosResponse<LoginResponse> = yield call(
      axios.get,
      "https://music-app-api-cyan.vercel.app/api/v1/users/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    yield put(
      fetchProfileSuccess({
        id: response.data.id,
        email: response.data.email,
        username: response.data.username,
      })
    );
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Fetching profile failed");
    yield put(
      fetchProfileFailure(
        error.response?.data?.message || "Fetching profile failed"
      )
    );
  }
}

function* handleUpdateProfile(action: ReturnType<typeof updateProfileRequest>) {
  try {
    const token: string = yield select((state: any) => state.user.token);
    const response: AxiosResponse<LoginResponse> = yield call(
      axios.put,
      "https://music-app-api-cyan.vercel.app/api/v1/users/profile",
      action.payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    successMsg("Profile successfully updated");
    yield put(updateProfileSuccess(response.data));
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Updating profile failed");
    yield put(
      updateProfileFailure(
        error.response?.data?.message || "Updating profile failed"
      )
    );
  }
}

function* handleDeleteProfile() {
  try {
    const token: string = yield select((state: any) => state.user.token);
    yield call(axios.delete, "https://music-app-api-cyan.vercel.app/api/v1/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    successMsg("Profile successfully deleted");
    yield put(deleteProfileSuccess());
    yield put(logout());
  } catch (error: any) {
    errorMsg(error.response?.data?.message || "Deleting profile failed");
    yield put(
      deleteProfileFailure(
        error.response?.data?.message || "Deleting profile failed"
      )
    );
  }
}

export default function* userSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(fetchProfileRequest.type, handleFetchProfile);
  yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
  yield takeLatest(deleteProfileRequest.type, handleDeleteProfile);
}
