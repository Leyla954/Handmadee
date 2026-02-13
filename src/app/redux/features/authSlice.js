import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Şəkildəki layihə ID-si əsasında qurulmuş URL
const API_URL = "https://6988b1ca780e8375a688f34b.mockapi.io/users"; 

const getSavedUser = () => {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem("user");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      return null;
    }
  }
  return null;
};

// 1. SIGNUP
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Öncə bütün istifadəçiləri yoxlayırıq (Dublikat olmasın deyə)
      const res = await axios.get(API_URL);
      const exists = res.data.find(u => u.email === userData.email);
      
      if (exists) {
        return rejectWithValue("Bu email artıq qeydiyyatdan keçib!");
      }

      // Yeni istifadəçini API-ya göndəririk
      const response = await axios.post(API_URL, userData);
      
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data; 
    } catch (error) {
      return rejectWithValue("Qeydiyyat xətası! API ünvanını yoxlayın.");
    }
  }
);

// 2. LOGIN
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // Bütün istifadəçiləri API-dan çəkirik
      const response = await axios.get(API_URL);
      
      // Məlumatları API-dan gələn datada axtarırıq
      const user = response.data.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user));
        }
        return user;
      }
      return rejectWithValue("Email və ya şifrə yanlışdır!");
    } catch (error) {
      return rejectWithValue("Giriş xətası: API tapılmadı (404 Not Found)!");
    }
  }
);

const savedUser = getSavedUser();

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser,
    isAuthenticated: !!savedUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state, action) => {
        state.loading = false;
        if (action.type.includes('loginUser') || action.type.includes('signupUser')) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;