import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://6988b1ca780e8375a688f34b.mockapi.io/activities"; // Bura öz URL-ni qoy

// 1. İstifadəçinin bütün dizaynlarını gətirmək
export const fetchMyActivities = createAsyncThunk(
  "activities/fetchMyActivities",
  async (userId) => {
    const response = await axios.get(`${API_URL}?userId=${userId}`);
    return response.data;
  }
);

// 2. Yeni dizaynı yadda saxlamaq (Business Card, Logo və s.)
export const saveNewActivity = createAsyncThunk(
  "activities/saveNewActivity",
  async (activityData) => {
    const response = await axios.post(API_URL, activityData);
    return response.data;
  }
);

// 3. Konkret bir dizaynı silmək (Selective Delete)
export const deleteSingleActivity = createAsyncThunk(
  "activities/deleteSingleActivity",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const activitySlice = createSlice({
  name: "activities",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMyActivities.pending, (state) => { state.loading = true; })
      .addCase(fetchMyActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Save
      .addCase(saveNewActivity.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // Yeni dizaynı siyahının əvvəlinə at
      })
      // Delete
      .addCase(deleteSingleActivity.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default activitySlice.reducer;