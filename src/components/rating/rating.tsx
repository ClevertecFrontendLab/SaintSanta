import { FC } from 'react';

import noStar from '../../assets/icon/icon_empty_star.png';
import star from '../../assets/icon/icon_star.png';

import './rating.scss';

interface RatingI {
    value: number;
}

export const Rating: FC<RatingI> = ({value}) => {
  const ratingStars = [1, 2, 3, 4, 5];

  return (
    <div className='rating-star'>
      {ratingStars.map((rating) => (
        <div className='star' key={rating}>
          {value >= rating ? (<img src={star} alt='star' />) : (<img src={noStar} alt='star' />)}
        </div>
      ))}
    </div>
  );
};
