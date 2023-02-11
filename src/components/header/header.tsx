import { FC } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../assets/img/avatar.png';
import CleverlandLogo from '../../assets/logo/cleverland.png';
import { Burger } from '../burger/burger';

import './header.scss';

export const Header: FC = () => (
  <header className='header'>
    <div className='wrapper'>
      <div className='header-wrapper'>
        <Burger />
        <Link to='/'>
          <img className='logo' src={CleverlandLogo} alt='Cleverland Logo' />
        </Link>
        <h1 className='header-title'>Библиотека</h1>
      </div>
      <div className='profile-wrapper'>
        <span className='subtitle'>Привет, Иван!</span>
        <img src={Avatar} alt='Avatar' />
      </div>
    </div>
  </header>
);
