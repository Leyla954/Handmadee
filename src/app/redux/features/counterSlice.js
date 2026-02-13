import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://6988b1ca780e8375a688f34b.mockapi.io/users";

// 1. Məlumatı API-dan gətirmək (Səhifə açılanda)
export const fetchCounter = createAsyncThunk("counter/fetch", async () => {
  const response = await axios.get(API_URL);
  return response.data.value; // Serverdəki 'value' sütunu
});

// 2. Məlumatı API-da yeniləmək (Artıranda və ya azaldanda)
export const updateCounter = createAsyncThunk("counter/update", async (newValue) => {
  const response = await axios.put(API_URL, { value: newValue });
  return response.data.value;
});

const counterSlice = createSlice({
  name: "counter",
  initialState: { 
    value: 0, 
    loading: false 
  },
  reducers: {
    // Lokal reducer-lara ehtiyac qalmır, çünki hər şey API üzərindən idarə olunacaq
  },
  extraReducers: (builder) => {
    builder
      // Fetch Counter
      .addCase(fetchCounter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCounter.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      // Update Counter
      .addCase(updateCounter.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});

export default counterSlice.reducer;