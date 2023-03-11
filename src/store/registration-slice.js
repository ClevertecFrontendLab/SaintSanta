/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_ENDPOINTS, URL_API } from '../constants/url-api';

export const sendUserInfo = createAsyncThunk('registration/sendUserInfo', async (userInfo) => {
  try {
    const response = await axios.post(`${URL_API}${API_ENDPOINTS.REGISTER}`, userInfo);

    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error();
    }
  }
});

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    regStatus: null,
    regError: null,
    token: {},
    responseStatus: null,
  },
  reducers: {
    clearResponseStatus(state) {
      state.responseStatus = null;
      state.regStatus = null;
    },
    getErrorStatus(state, action) {
      state.regStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(sendUserInfo.pending, (state) => {
      state.regStatus = 'loading';
    });
    builder.addCase(sendUserInfo.fulfilled, (state, action) => {
      state.regStatus = 'resolved';
      state.responseStatus = action.payload.status;
      state.token = action.payload.data;
    });
    builder.addCase(sendUserInfo.rejected, (state, action) => {
      state.regStatus = action.error.message || 'rejected';
    });
  },
});

export const { clearResponseStatus, getErrorStatus } = registrationSlice.actions;
