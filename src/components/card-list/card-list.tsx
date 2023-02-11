import { FC } from 'react';

import { Books } from '../../constants/books';
import { Card } from '../card/card';

import './card-list.scss';

export const CardList: FC = () => (
  <main className='card-list'>
    {Books.map((book) => {
      const { img, rating, name, authors, publicationDate, isBooked, bookedDate, id } = book;

      return (
        <Card
          img={img}
          rating={rating}
          name={name}
          authors={authors}
          publicationDate={publicationDate}
          isBooked={isBooked}
          bookedDate={bookedDate}
          id={id}
          key={id}
        />
      );
    })}
  </main>
);
