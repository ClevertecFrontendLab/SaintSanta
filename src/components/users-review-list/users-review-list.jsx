import React from 'react';

import { UserBookReviews } from '../../constants/user-reviews';
import { UserReview } from '../user-review/user-review';

export const UsersReviewList = () => (
  <React.Fragment>
    {UserBookReviews.map(({ user, name, date, rating, text }) => (
<UserReview  user={user} name={name} date={date} rating={rating} text={text} key={name}/>
    ))}
  </React.Fragment>
);
