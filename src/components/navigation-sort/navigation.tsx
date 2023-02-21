import { FC, useEffect, useState } from 'react';

import sortList from '../../assets/icon/icon_menu.png';
import sortTile from '../../assets/icon/icon_square-four.png';
import { CustomInput } from '../custom-input/custom-input';
import { SortButton } from '../sort-button';

import './navigation.scss';

export const Filter: FC = () => {
  const [listActive, setListActive] = useState('tile');

  useEffect(() => {

  }, [listActive]);

  return (
    <nav className='filter-wrapper'>
      <div className='filter-sort-search'>
        <CustomInput />
        <SortButton />
      </div>
      <div className='filter-buttons'>
        <button
          type='button'
          data-test-id='button-menu-view-window'
          onClick={() => setListActive('tile')}
          className={listActive === 'tile' ? 'filter-button active' : 'filter-button'}
        >
          <img className={listActive === 'tile' ? 'white' : 'grey'} src={sortTile} alt='sort tile' />
        </button>
        <button
          type='button'
          data-test-id='button-menu-view-list'
          onClick={() => setListActive('list')}
          className={listActive === 'list' ? 'filter-button active' : 'filter-button'}
        >
          <img className={listActive === 'list' ? 'white' : 'grey'} src={sortList} alt='sort list' />
        </button>
      </div>
    </nav>
  );
};
