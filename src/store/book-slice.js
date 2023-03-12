/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_ENDPOINTS,URL_API } from '../constants/url-api';

export const fetchBook = createAsyncThunk('book/fetchBook', async (bookId, { rejectWithValue }) => {
  try {
    const { data, statusText } = await axios.get(`${URL_API}${API_ENDPOINTS.BOOKS}${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });

    if (statusText !== 'OK') {
      throw new Error();
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    book: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.book = action.payload;
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const bookReducer = bookSlice.reducer;
