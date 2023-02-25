import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchBooks } from '../../store/books-slice';
import { Card } from '../card';

import './card-list.scss';

export const CardList = ({ cardsData, inputText }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <main className='card-list'>
      {cardsData.map((cardData) => {
        const { image, rating, title, authors, issueYear, booking, id } = cardData;

        return (
          <Card
            cardData={cardData}
            inputText={inputText}
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
