import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { URL_API } from '../../constants/url-api';
import { Button } from '../book-button/book-button';
import { Rating } from '../rating/rating';

import './card.scss';

const btnText = {
  reserve: 'Забронировать',
  booked: 'Забронирована',
  busy: '',
};

export interface BookType {
  image?: {
    url: string;
  };
  rating?: number;
  title?: string;
  authors: string[];
  issueYear?: string;
  booking?: {
    id: number;
    order: boolean;
    dateOrder: string;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
  };
  id?: number;
}

const getDate = (date: string) => {
  let res = '';
  const day = new Date(date).getDay();
  const month = new Date(date).getMonth() + 1;

  if (day < 10) {
    res += `0${day}.`;
  }
  if (month < 10) {
    res += `0${month}`;
  }

  return res;
};

export const Card: FC<BookType> = memo(({ image, rating, title, authors, issueYear, booking, id }) => {
  const buttonText =
    booking?.order && booking.dateOrder
      ? btnText.busy
      : (btnText.booked && booking?.order === false) || null
      ? ''
      : btnText.reserve;

  const classButton =
    buttonText === btnText.reserve ? 'card-button' : buttonText === btnText.booked ? 'button-is-booked' : 'button-busy';

  return (
    <NavLink to={`/books/all/${id}`} key={booking?.id}>
      <li className='card' data-test-id='card'>
        {image === null ? (
          <div className='card-not-found-img' />
        ) : (
          <div className='card-img'>
            <img src={`${URL_API}${image?.url}`} alt={title} />
          </div>
        )}

        <div className='rating rating-text'>
          {rating ? <Rating value={rating} /> : <span className='rating-text'>ещё нет оценок</span>}
        </div>
        <div className='book-title'>{title}</div>
        <div className='book-author'>
          {authors && authors.length > 0 && authors.join(', ')}, {issueYear}
        </div>
        <div className='card-button-wrapper'>
          <Button classButton={classButton} onClick={() => {}} isDisabled={booking?.order}>
            <span>{buttonText}</span>
            {booking?.dateOrder && buttonText === '' ? `Занята до ${getDate(booking?.dateOrder)}` : ''}
          </Button>
        </div>
      </li>
    </NavLink>
  );
});
