import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AuthSliceType, BackendAuthType } from '../model/types';
import { AuthStatus } from '../model/types';
import { logoutThunk, refreshThunk, signinThunk, signupThunk } from './thunks';

const initialState: AuthSliceType = {
  data: { status: AuthStatus.fetching },
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.fulfilled, (state, action: PayloadAction<BackendAuthType>) => {
        state.accessToken = action.payload.accessToken;
        state.data = {
          status: AuthStatus.authenticated,
          user: action.payload.user,
        };
      })

      .addCase(signupThunk.rejected, (state) => {
        state.accessToken = '';
        state.data = {
          status: AuthStatus.guest,
        };
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.data = {
          status: AuthStatus.authenticated,
          user: action.payload.user,
        };
      })
      .addCase(signinThunk.rejected, (state) => {
        state.accessToken = '';
        state.data = {
          status: AuthStatus.guest,
        };
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.data = {
          status: AuthStatus.authenticated,
          user: action.payload.user,
        };
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.accessToken = '';
        state.data = {
          status: AuthStatus.guest,
        };
      })
      .addCase(logoutThunk.fulfilled, (state) => {
         console.log('🔵 Logout fulfilled, clearing state');
        state.accessToken = '';
        state.data = {
          status: AuthStatus.guest,
        };
      });
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;
export default authSlice.reducer;
