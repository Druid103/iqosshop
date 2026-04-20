import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../api/service';

export const signupThunk = createAsyncThunk('auth/signupThunk', (formData: FormData) =>
  authService.signup(formData),
);

export const signinThunk = createAsyncThunk('auth/signinThunk', (formData: FormData) =>
  authService.signin(formData),
);

export const refreshThunk = createAsyncThunk('auth/refreshThunk', () => authService.refresh());

export const logoutThunk = createAsyncThunk('auth/logoutThunk', () => authService.logout());