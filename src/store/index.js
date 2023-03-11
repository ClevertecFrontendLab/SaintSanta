import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth-slice';
import { bookReducer } from './book-slice';
import { booksReducer } from './books-slice';
import { categoriesReducer } from './categories-slice';
import { registrationSlice } from './registration-slice';
import { resetInfoSlice } from './reset-slice';

export const store = configureStore({
  reducer: {
    registration: registrationSlice.reducer,
    auth: authSlice.reducer,
    reset: resetInfoSlice.reducer,
    books: booksReducer,
    book: bookReducer,
    categories: categoriesReducer,
  },
});
