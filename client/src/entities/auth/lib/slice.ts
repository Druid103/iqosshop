import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AuthSliceType, UserType } from '../model/types';
import { AuthStatus } from '../model/types';
import { logoutThunk, refreshThunk, signinThunk, signupThunk, updateThunk } from './thunks';

const initialState: AuthSliceType = {
  data: { status: AuthStatus.fetching },
  accessToken: '',
  selectedUser: null,
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
    setSelectedUser: (state, action: PayloadAction<UserType>) => {
      state.selectedUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.fulfilled, (state, action) => {
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
        state.accessToken = '';
        state.data = {
          status: AuthStatus.guest,
        };
      })
      .addCase(updateThunk.fulfilled, (state, action) => {
        state.data = {
          status: AuthStatus.authenticated,
          user: action.payload,
        };
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken, clearAccessToken, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;
