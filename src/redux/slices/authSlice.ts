// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import users from '../../data/users.json';

interface User {
  id: number;
  name: string;
  phone: string;
  profilePicture: string;
  bio: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<{ phone: string; otp: string }>) => {
      const user = users.find((u) => u.phone === action.payload.phone);
      if (user && action.payload.otp === '123456') {
        state.user = user;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        state.error = 'Invalid phone number or OTP';
      }
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { authenticate, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
