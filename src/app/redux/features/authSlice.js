import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// MockAPI URL-ni buraya yapışdır (Bunu mütləq dəyiş!)
const API_URL = "https://67xxxxxxxxx.mockapi.io/users"; 

// Qeydiyyat (Signup) üçün AsyncThunk
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data; // Yeni yaranan istifadəçi
    } catch (error) {
      return rejectWithValue(error.response?.data || "Qeydiyyat alınmadı");
    }
  }
);

// Səhifə yenilənəndə məlumatı localStorage-dan götürən funksiya
const getSavedUser = () => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  }
  return null;
};

const initialState = {
  user: getSavedUser(),
  isAuthenticated: !!getSavedUser(),
  loading: false, // API sorğusu gedəndə true olacaq
  error: null,    // Xəta olarsa bura yazılacaq
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Lokal giriş (lazım olarsa istifadə üçün saxladım)
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    // Xətaları təmizləmək üçün əlavə reducer
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Qeydiyyat prosesi başladı
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Qeydiyyat uğurlu oldu
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      // Qeydiyyat uğursuz oldu
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;