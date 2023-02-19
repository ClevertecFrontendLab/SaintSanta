import sortImg from '../../assets/icon/icon_sort-ascending.png';

import './sort-button.scss';

export const SortButton = () => (
  <div className='sort'>
    <button className='sort-button' type='button'>
      <img src={sortImg} alt='' />
      <span>По рейтингу</span>
    </button>
  </div>
);
