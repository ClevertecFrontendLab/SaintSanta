import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BookDescription } from '../book-description/book-description';

import './book.scss';

export const Book = () => {
  const { book, error } = useSelector((state) => state.book);
  const { category } = useParams();
  const isError = Boolean(error);

  return (
    <div>
      <div className='book-wrapper'>
        {isError ? <p className='book'>{category === 'all' ? 'Все книги /' : `${category} /` }</p> : <p className='book'>{`${book.categories} / ${book.title}`}</p>}
      </div>
      <BookDescription />
    </div>
  );
};
