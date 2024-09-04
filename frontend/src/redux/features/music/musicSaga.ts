import { call, put, takeLatest, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchMusicsRequest,
  fetchMusicsSuccess,
  fetchMusicsFailure,
  createMusicSuccess,
  createMusicFailure,
  createMusicRequest,
  updateMusicSuccess,
  updateMusicFailure,
  updateMusicRequest,
  deleteMusicSuccess,
  deleteMusicFailure,
  deleteMusicRequest,
} from "./musicSlice";
import { FetchMusicsResponse, Music } from "../../utils";
import { PayloadAction } from "@reduxjs/toolkit";
import successMsg from "../../components/Alerts/SuccessMsg";
import errorMsg from "../../components/Alerts/ErrorMsg";
import { RootState } from "../../store"; // Import RootState for typing
import { clearUserDataFromLocalStorage } from "../../utils/localStorage";

// Handle logout if token is invalid or expired
const handleLogout = () => {
  clearUserDataFromLocalStorage();
  window.location.reload();
};

// Fetch Musics Saga
function* fetchMusicsSaga(
  action: PayloadAction<{ search?: string }>
): Generator {
  try {
    const { search } = action.payload;

    // Fetch page and limit from Redux state
    const limit = (yield select(
      (state: RootState) => state.music.limit
    )) as number;
    const page = (yield select(
      (state: RootState) => state.music.currentPage
    )) as number;

    let params = { search, page, limit };
    if (search) {
      params = { search, page: 1, limit: 15 };
    }

    const response = (yield call(
      axios.get,
      "https://music-app-api-cyan.vercel.app/api/v1/musics",
      { params }
    )) as AxiosResponse<FetchMusicsResponse>;

    console.log(response.data);
    yield put(
      fetchMusicsSuccess({
        musics: response.data.musics,
        currentPage: parseInt(response.data.currentPage.toString()),
        totalPages: response.data.totalPages,
      })
    );
  } catch (error: any) {
    errorMsg(error.message);
    yield put(fetchMusicsFailure(error.message));
  }
}

// Create Music Saga with Authorization Header
function* createMusicSaga(action: PayloadAction<Music>): Generator {
  try {
    // Select the token from the Redux state
    const token = (yield select(
      (state: RootState) => state.user.token
    )) as string;

    const formData = new FormData();
    formData.append("title", action.payload.title);
    formData.append("artist", action.payload.artist);
    formData.append("album", action.payload.album);
    formData.append("genre", action.payload.genre);
    if (action.payload.file) {
      formData.append("file", action.payload.file);
    }

    const response = (yield call(
      axios.post,
      "https://music-app-api-cyan.vercel.app/api/v1/musics",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as AxiosResponse<Music>;

    successMsg("Music successfully added to your playlist");
    yield put(createMusicSuccess(response.data));
  } catch (error: any) {
    errorMsg(error?.response?.data?.message);
    if (error?.response?.data?.message === "Expired/Invalid Token") {
      handleLogout();
    }
    yield put(createMusicFailure(error?.response?.data?.message));
  }
}

// Update Music Saga with Authorization Header
function* updateMusicSaga(
  action: PayloadAction<{ id: string; data: Partial<Music> }>
): Generator {
  try {
    const token = (yield select(
      (state: RootState) => state.user.token
    )) as string;
    const { id, data } = action.payload;

    const formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("artist", data.artist || "");
    formData.append("album", data.album || "");
    formData.append("genre", data.genre || "");
    if (data.file) {
      formData.append("file", data.file);
    }

    const response = (yield call(
      axios.put,
      `https://music-app-api-cyan.vercel.app/api/v1/musics/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )) as AxiosResponse<Music>;

    successMsg("Music successfully updated");
    yield put(updateMusicSuccess(response.data));
  } catch (error: any) {
    errorMsg(error?.response?.data?.message);
    if (error?.response?.data?.message === "Expired/Invalid Token") {
      handleLogout();
    }
    yield put(updateMusicFailure(error?.response?.data?.message));
  }
}

// Delete Music Saga
function* deleteMusicSaga(action: PayloadAction<string>): Generator {
  try {
    const token = (yield select(
      (state: RootState) => state.user.token
    )) as string;

    yield call(
      axios.delete,
      `https://music-app-api-cyan.vercel.app/api/v1/musics/${action.payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    successMsg("Music successfully deleted");
    yield put(deleteMusicSuccess(action.payload));
  } catch (error: any) {
    errorMsg(error?.response?.data?.message);
    if (error?.response?.data?.message === "Expired/Invalid Token") {
      handleLogout();
    }
    yield put(deleteMusicFailure(error?.response?.data?.message));
  }
}

// Root Music Saga
export default function* musicSaga() {
  yield takeLatest(fetchMusicsRequest.type, fetchMusicsSaga);
  yield takeLatest(createMusicRequest.type, createMusicSaga);
  yield takeLatest(updateMusicRequest.type, updateMusicSaga);
  yield takeLatest(deleteMusicRequest.type, deleteMusicSaga);
}
