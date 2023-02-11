import { FC, useState } from 'react';

import sortList from '../../assets/icon/icon_menu.png';
import sortTile from '../../assets/icon/icon_square-four.png';
import { CardList } from '../../components/card-list/card-list';
import { CustomInput } from '../../components/custom-input/custom-input';
import { MenuNavigation } from '../../components/navigation/menu-navigation';
// import { Menu } from '../../components/menu/menu';
import { SortButton } from '../../components/sort-button/sort-button';

import './main-page.scss';

export const MainPage: FC = () => {
  const [listActive, setListActive] = useState('tile');

  return (
      <section className='main-page'>
        <div className='menu-navigation'>
        <MenuNavigation />
        </div>
        <div className='main-content'>
          <div className='main-content content'>
            <div>
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
            </div>
            <ul className='card-list'>
              <CardList />
            </ul>
          </div>
        </div>
      </section>
  );
};
