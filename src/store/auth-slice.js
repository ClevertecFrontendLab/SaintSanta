/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_ENDPOINTS, URL_API } from '../constants/url-api';

export const sendAuthInfo = createAsyncThunk('auth/sendAuthInfo', async (authInfo) => {
  try {
    const response = await axios.post(`${URL_API}${API_ENDPOINTS.AUTH}`, authInfo);

    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error();
    }
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authStatus: null,
    userToken: {},
    authResponseStatus: null,
    isAuth: false,
  },
  reducers: {
    clearAuthResponseStatus(state) {
      state.authResponseStatus = null;
    },
    logOut(state) {
      state.authStatus = null;
      state.authResponseStatus = null;
      state.userToken = {};
      state.isAuth = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers(builder) {
    builder.addCase(sendAuthInfo.pending, (state) => {
      state.authStatus = 'loading';
    });
    builder.addCase(sendAuthInfo.fulfilled, (state, action) => {
      state.authStatus = 'resolved';
      state.authResponseStatus = action.payload.status;
      state.userToken = action.payload.data;
      localStorage.setItem('token', action.payload.data.jwt);
      state.isAuth = true;
    });
    builder.addCase(sendAuthInfo.rejected, (state, action) => {
      state.authStatus = action.error.message || 'rejected';
    });
  },
});

export const { clearAuthResponseStatus, logOut } = authSlice.actions;
