import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import musicReducer from "../features/music/musicSlice";
import userReducer from "../features/user/userSlice";
// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with Saga middleware
const store = configureStore({
  reducer: {
    music: musicReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action paths in the serializability check
        ignoredActions: ["music/createMusicRequest"],
        // Ignore these field paths in the state
        ignoredPaths: ["music.musics"],
      },
    }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export store and types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
