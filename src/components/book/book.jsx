import { useSelector } from 'react-redux';

import { BookDescription } from '../book-description/book-description';

import './book.scss';

export const Book = () => {
  const { book } = useSelector((state) => state.book);

  return (
    <div>
      <div className='book-wrapper'>
        <p className='book'>{`${book.categories} / ${book.title}`}</p>
      </div>
      <BookDescription />
    </div>
  );
};
