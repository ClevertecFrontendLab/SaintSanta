/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_ENDPOINTS,URL_API } from '../constants/url-api';

export const fetchBooks = createAsyncThunk('book/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const { data, statusText } = await axios.get(`${URL_API}${API_ENDPOINTS.BOOKS}`, {
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

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const booksReducer = booksSlice.reducer;
