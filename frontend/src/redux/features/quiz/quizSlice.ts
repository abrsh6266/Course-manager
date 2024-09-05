import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, QuizResult } from "../../../utils";

interface QuizState {
  quiz: Quiz | null;
  quizResults: QuizResult[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quiz: null,
  quizResults: [],
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    //get quiz
    getQuizRequest(state, action: PayloadAction<Quiz | null>) {
      state.loading = false;
      state.quiz = action.payload;
      state.error = null;
    },
    // Taking quiz actions
    takeQuizRequest(
      state,
      action: PayloadAction<{
        courseId?: string;
        lessonId?: string;
        answers: string[];
      }>
    ) {
      console.log(action.payload);
      state.loading = true;
      state.error = null;
    },
    takeQuizSuccess(
      state,
      action: PayloadAction<{ feedback: string; score: number }>
    ) {
      console.log(action.payload);
      state.loading = false;
      state.error = null;
      // Quiz submission feedback can be displayed here if needed
    },
    takeQuizFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetching quiz results actions
    fetchQuizResultsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchQuizResultsSuccess(state, action: PayloadAction<QuizResult[]>) {
      state.loading = false;
      state.quizResults = action.payload;
      state.error = null;
    },
    fetchQuizResultsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  takeQuizRequest,
  takeQuizSuccess,
  takeQuizFailure,
  fetchQuizResultsRequest,
  fetchQuizResultsSuccess,
  fetchQuizResultsFailure,
  getQuizRequest,
} = quizSlice.actions;

export default quizSlice.reducer;
