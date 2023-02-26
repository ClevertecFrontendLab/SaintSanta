import React, { FC, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { menuListBasic } from '../../constants/menu-category';
import { ButtonMenuBurger } from '../burger-button';
import { MenuNavigation } from '../navigation';
import { BurgerMenuNavigation } from '../navigation/burger-menu-navigation';

import './burger.scss';
import './burger-menu.scss';

export const Burger: FC = () => {
  const [isOpenMenu, setButtonState] = useState(false);

  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (isOpenMenu && dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setButtonState?.(!isOpenMenu);
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('click', clickOutside, true);

    return () => document.removeEventListener('click', clickOutside, true);
  }, [isOpenMenu]);

  useEffect(() => {
    const bodyStyle = document.body.style;

    if (isOpenMenu) {
      bodyStyle.overflow = 'hidden';
    } else {
      bodyStyle.overflowY = 'scroll';
    }
  });

  return (
    <div className='burgerMenu'>
      <ButtonMenuBurger isOpenMenu={isOpenMenu} setOpenMenu={setButtonState} />
      <div
        className={isOpenMenu ? 'burgerMenuNavActive burgerMenuNav' : 'burgerMenuNav'}
        ref={dropRef}
        data-test-id='burger-navigation'
      >
        <BurgerMenuNavigation setButtonState={setButtonState} burgerMenuNavigation={true} dataTestid='burger'>
          <div className={isOpenMenu ? 'burgerMenuNavListUserTop burgerMenuNavListUser' : 'burgerMenuNavListUser'}>
            <hr className='burgerMenuLine' />
            <NavLink
              to={`/${menuListBasic.profile.path}`}
              onClick={() => {
                setButtonState(false);
              }}
              className={({ isActive }) =>
                isActive ? 'burgerMenuNavLink burgerMenuNavLinkActive' : 'burgerMenuNavLink'
              }
            >
              {menuListBasic.profile.name}
            </NavLink>
            <NavLink
              to={`/${menuListBasic.exit.path}`}
              onClick={() => {
                setButtonState(false);
              }}
              className={({ isActive }) =>
                isActive ? 'burgerMenuNavLink burgerMenuNavLinkActive' : 'burgerMenuNavLink'
              }
            >
              {menuListBasic.exit.name}
            </NavLink>
          </div>
        </BurgerMenuNavigation>
      </div>
    </div>
  );
};
