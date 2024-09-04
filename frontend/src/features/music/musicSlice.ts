import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music } from "../../utils";

interface MusicState {
  musics: Music[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  limit: number;
}

const initialState: MusicState = {
  musics: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  limit: 6,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    // Fetching musics
    fetchMusicsRequest(state, action: PayloadAction<{ search?: string }>) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    fetchMusicsSuccess(
      state,
      action: PayloadAction<{
        musics: Music[];
        currentPage: number;
        totalPages: number;
      }>
    ) {
      state.loading = false;
      state.musics = action.payload.musics;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    fetchMusicsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Creating music
    createMusicRequest(state, action) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    createMusicSuccess(state, action: PayloadAction<Music>) {
      state.loading = false;
      state.error = null;
      state.musics.push(action.payload); // Add the newly created music to the list
    },
    createMusicFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Updating music
    updateMusicRequest(
      state,
      action: PayloadAction<{ id: string; data: Partial<Music> }>
    ) {
      console.log(action.payload);

      state.loading = true;
      state.error = null;
    },
    updateMusicSuccess(state, action: PayloadAction<Music>) {
      state.loading = false;
      state.error = null;
      const index = state.musics.findIndex(
        (music) => music.id === action.payload.id
      );
      if (index !== -1) {
        state.musics[index] = action.payload; // Update the existing music
      }
    },
    updateMusicFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Deleting music
    deleteMusicRequest(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    deleteMusicSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.musics = state.musics.filter(
        (music) => music.id !== action.payload
      ); // Remove the deleted music from the list
    },
    deleteMusicFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Pagination
    setPagination(
      state,
      action: PayloadAction<{ page: number; limit: number }>
    ) {
      state.currentPage = action.payload.page;
      state.limit = action.payload.limit;
    },
  },
});

export const {
  fetchMusicsRequest,
  fetchMusicsSuccess,
  fetchMusicsFailure,
  createMusicRequest,
  createMusicSuccess,
  createMusicFailure,
  updateMusicRequest,
  updateMusicSuccess,
  updateMusicFailure,
  deleteMusicRequest,
  deleteMusicSuccess,
  deleteMusicFailure,
  setPagination,
} = musicSlice.actions;

export default musicSlice.reducer;
