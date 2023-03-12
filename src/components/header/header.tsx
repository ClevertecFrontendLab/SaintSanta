import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Avatar from '../../assets/img/avatar.png';
import CleverlandLogo from '../../assets/logo/cleverland.png';
import { logOut } from '../../store/auth-slice';
import { Burger } from '../burger';

import './header.scss';

export const Header: FC = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <header className='header'>
      <div className='wrapper'>
        <div className='header-wrapper'>
          <Burger />
          <NavLink to='/'>
            <img className='logo' src={CleverlandLogo} alt='Cleverland Logo' />
          </NavLink>
          <h1 className='header-title'>Библиотека</h1>
        </div>
        <button type='button' className='header-menu' onClick={() => setisMenuOpen(!isMenuOpen)}>
          <div className='profile-wrapper'>
            <span className='subtitle'>Привет, Иван!</span>
            <img src={Avatar} alt='Avatar' />
          </div>
        {isMenuOpen && (
          <div className='header-menu-open'>
            <button type='button' className='header-menu-open__button'>
              Профиль
            </button>
            <div data-test-id='exit-button'>
              <NavLink to='/auth'>
                <button type='button' onClick={() => dispatch(logOut())} className='header-menu-open__button'>
                  Выход
                </button>
              </NavLink>
            </div>
          </div>
        )}
        </button>
      </div>
    </header>
  );
};
