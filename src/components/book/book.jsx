import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { BookDescription } from '../book-description/book-description';

import './book.scss';

export const Book = () => {
  const { book, error } = useSelector((state) => state.book);
  const { category, bookId } = useParams();
  const isError = Boolean(error);

  return (
    <div>
      <div className='book-wrapper'>
        <div className='breadcrumbs'>
          {isError ? (
            <NavLink to={`/books/${category}`}>
              <span data-test-id='breadcrumbs-link'>{category === 'all' ? 'Все книги /' : `${category} /`}</span>
            </NavLink>
          ) : (
            <React.Fragment>
              <NavLink to={`/books/${category}`}>
                <span data-test-id='breadcrumbs-link'>{category === 'all' ? 'Все книги' : book.categories}</span>
              </NavLink>
              <span>/</span>
              <NavLink to={`/books/${category}/${bookId}`}>
                <span data-test-id='book-name'>{book.title}</span>
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
      <BookDescription />
    </div>
  );
};
