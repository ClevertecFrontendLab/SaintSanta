import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { Books } from '../../constants/books';
import { fetchBooks } from '../../store/books-slice';
import { /* BookType, */ Card } from '../card/card';

import './card-list.scss';

export const CardList /* : FC<BookType> */ = () => {
  const dispatch = useDispatch();
  const {books} = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <main className='card-list'>
      {books.map((book) => {
        const { image, rating, title, authors, issueYear, booking, id } = book;

        return (
          <Card
            image={image}
            rating={rating}
            title={title}
            authors={authors}
            issueYear={issueYear}
            booking={booking}
            id={id}
            key={id}
          />
        );
      })}
    </main>
  );
};
