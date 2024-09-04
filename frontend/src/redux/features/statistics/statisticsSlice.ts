import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatisticsState {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  recentActivity: { description: string; timestamp: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  totalUsers: 0,
  totalCourses: 0,
  totalEnrollments: 0,
  recentActivity: [],
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    fetchStatisticsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess(
      state,
      action: PayloadAction<{
        totalUsers: number;
        totalCourses: number;
        totalEnrollments: number;
        recentActivity: { description: string; timestamp: string }[];
      }>
    ) {
      state.totalUsers = action.payload.totalUsers;
      state.totalCourses = action.payload.totalCourses;
      state.totalEnrollments = action.payload.totalEnrollments;
      state.recentActivity = action.payload.recentActivity;
      state.loading = false;
    },
    fetchStatisticsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
