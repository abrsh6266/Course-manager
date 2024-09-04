import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import userReducer from "../features/user/userSlice";
import coursesReducer from "../features/course/courseSlice";
import statisticReducer from "../features/statistics/statisticsSlice";

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with Saga middleware
const store = configureStore({
  reducer: {
    user: userReducer,
    course: coursesReducer,
    statistics: statisticReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export store and types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
