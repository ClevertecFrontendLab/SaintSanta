/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { URL_API } from '../constants/url-api';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const { data, statusText } = await axios.get(`${URL_API}/api/categories/`);

    if (statusText !== 'OK') {
      throw new Error();
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    statusCategories: null,
    errorCategories: null,
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.statusCategories = 'loading';
      state.errorCategories = null;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.statusCategories = 'resolved';
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.statusCategories = 'rejected';
      state.errorCategories = action.payload;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
