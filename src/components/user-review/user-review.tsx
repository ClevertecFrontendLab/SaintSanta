import { FC } from 'react';

import { UserReviewProps } from '../../models/user-review-props.type';
import { Rating } from '../rating/rating';

import './user-review.scss';

export const UserReview: FC<UserReviewProps> = ({ user, name, date, rating, text }) => (
  <div className='review-user'>
    <div className='review-user-content'>
      <img src={user} alt='pic' />
      <div className='user-content-info'>
        <div className='review-user-name'>{name}</div>
        <div className='review-user-date'>{date}</div>
      </div>
    </div>
    <Rating value={rating} />
    <p className='review-user-text'>{text}</p>
  </div>
);
