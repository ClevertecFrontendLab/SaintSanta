import sortImg from '../../assets/icon/icon_sort-ascending.png';

import './sort-button.scss';

export const SortButton = ({ sortRating, sortUp }) => (
  <div className='sort'>
    <button className='sort-button' type='button' onClick={sortRating} data-test-id='sort-rating-button'>
      <img className={sortUp ? 'sort-icon sort-up' : 'sort-icon'} src={sortImg} alt='' />
      <span>По рейтингу</span>
    </button>
  </div>
);
