/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_ENDPOINTS, URL_API } from '../constants/url-api';

export const sendUserEmail = createAsyncThunk('reset/sendUserEmail', async (userEmail) => {
  try {
    const response = await axios.post(`${URL_API}${API_ENDPOINTS.FORGOT_PASSWORD}`, userEmail);

    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error();
    }
  }
});

export const sendNewPassword = createAsyncThunk('reset/sendNewPassword', async (userPassword) => {
  try {
    const response = await axios.post(`${URL_API}${API_ENDPOINTS.RESET_PASSWORD}`, userPassword);

    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error();
    }
  }
});

export const resetInfoSlice = createSlice({
  name: 'reset',
  initialState: {
    requestStatus: null,
    requestChangePassword: null,
  },
  reducers: {
    clearRequestStatus(state) {
      state.requestChangePassword = null;
      state.requestStatus = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(sendUserEmail.pending, (state) => {
      state.requestStatus = 'loading';
    });
    builder.addCase(sendUserEmail.fulfilled, (state) => {
      state.requestStatus = 'resolved';
    });
    builder.addCase(sendUserEmail.rejected, (state, action) => {
      state.requestStatus = action.error.message || 'rejected';
    });
    builder.addCase(sendNewPassword.pending, (state) => {
      state.requestChangePassword = 'loading';
    });
    builder.addCase(sendNewPassword.fulfilled, (state) => {
      state.requestChangePassword = 'resolved';
    });
    builder.addCase(sendNewPassword.rejected, (state, action) => {
      state.requestChangePassword = action.error.message || 'rejected';
    });
  },
});

export const { clearRequestStatus } = resetInfoSlice.actions;
