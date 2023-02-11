import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import bookImage from '../../assets/img/book_1.jpg';
import { Books } from '../../constants/books';
import { Button } from '../book-button/book-button';
import { Rating } from '../rating/rating';

import './card.scss';

export const CardTile: FC = () => (
  <div className='card' data-test-id='card'>
    <img className='card-img' src={bookImage} alt='pic' />
    <div className='rating rating-text'>ещё нет оценок</div>
    <div className='book-name'>Грокаем алгоритмы. Иллюстрированное пособие для програ...</div>
    <div className='book-author'>Адитья Бхаргава, 2019</div>
    <button className='card-button' type='submit'>
      Забронировать
    </button>
  </div>
);

export const CardList: FC = () => (
  <div className='card-view-list' data-test-id='card'>
    <img className='card-img card-img-list-320' src={bookImage} alt='pic' />
    <div className='card-content'>
      <div className='book-name'>Грокаем алгоритмы. Иллюстрированное пособие для програ...</div>
      <div className='book-author'>Адитья Бхаргава, 2019</div>
      <div className='rating-and-book'>
        <div className='rating rating-text'>ещё нет оценок</div>
        <button className='card-button' type='submit'>
          Забронировать
        </button>
      </div>
    </div>
  </div>
);

const btnText = {
  reserve: 'Забронировать',
  booked: 'Забронирована',
  busy: '',
};

interface BookType {
  img: string[] | undefined;
  rating?: number;
  name?: string;
  authors: string[];
  publicationDate?: number;
  isBooked?: boolean;
  bookedDate?: string;
  id?: string;
}

export const BookContext = React.createContext(Books);

export const Card: FC<BookType> = ({
  img,
  rating,
  name,
  authors,
  publicationDate,
  isBooked,
  bookedDate,
  id,
}) => {
  const buttonText = isBooked === false ? btnText.reserve : isBooked && bookedDate ? btnText.busy : btnText.booked;

  const classButton =
    buttonText === btnText.reserve ? 'card-button' : buttonText === btnText.booked ? 'button-is-booked' : 'button-busy';

  return (
    <NavLink to={`/books/all/${id}`} key={id}>
      <li
        className='card'
        data-test-id='card'
      >
        <div className={!img?.length ? 'card-not-found-img' : 'card-img'}>
          {img!.length > 0 && <img src={img![0]} alt={name} />}
        </div>
        <div className='rating rating-text'>
          {rating ? <Rating value={rating} /> : <span className='rating-text'>ещё нет оценок</span>}
        </div>
        <div className='book-name'>{name}</div>
        <div className='book-author'>
          {authors && authors.length > 0 && authors.join(', ')}, {publicationDate}
        </div>
        <div className='card-button-wrapper'>
          <Button classButton={classButton} onClick={() => {}} isDisabled={isBooked}>
            <span>{buttonText}</span>
            {bookedDate && buttonText === '' ? `Занята до ${bookedDate}` : ''}
          </Button>
        </div>
      </li>
    </NavLink>
  );
};
