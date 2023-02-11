import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import arrow from '../../assets/icon/icon_chevron_up.png';

import './menu.scss';

export const Menu: FC = () => {
  const [isOpenList, setIsOpenList] = useState(true);

  return (
    <nav className='menu-nav'>
      <ul className='menu-list'>
        <li className='menu-list-item border'>
          <NavLink to='/'>Витрина книг</NavLink>
          <button
            className={isOpenList ? 'arrow-chevron' : 'arrow-chevron rotate'}
            type='button'
            onClick={() => {
              setIsOpenList(!isOpenList);
            }}
            data-test-id='burger-showcase'
          >
            <img src={arrow} alt='arrow' />
          </button>
        </li>
        <div className={isOpenList ? '' : 'category-list-hide'}>
          {/* <NavLink to='/'>{categoryList()}</NavLink> */}
        </div>
        <li className='menu-list-item'>
          <NavLink to='/terms'>Правила пользования</NavLink>
        </li>
        <li className='menu-list-item'>
          <NavLink to='/contract-offer'>Договор оферты</NavLink>
        </li>
        <ul className='menu-list-profile'>
          <li className='menu-list-item'>
            <NavLink to='/profile'>Профиль</NavLink>
          </li>
          <li className='menu-list-item'>
            <NavLink to='/'>Выход</NavLink>
          </li>
        </ul>
      </ul>
    </nav>
  );
};
