import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { menuAllBooks, menuListBasic,menuListCategories } from '../../constants/menu-category'

import arrowBottomBlack from './assets/arrow-bottom-black.svg';
import arrowTopColor from './assets/arrow-top-color.svg';
import arrowTopColorCollapse from './assets/arrow-top-color-сollapse.svg';

import './menu-navigation.scss';

type NavigationProps = {
  children?: ReactNode;
  setButtonState?: Dispatch<SetStateAction<boolean>>;
  burgerMenuNavigation?: boolean;
  dataTestid?: string;
};

export const MenuNavigation = ({
  children,
  setButtonState,
  burgerMenuNavigation = false,
  dataTestid,
}: NavigationProps) => {
  const { pathname } = useLocation();

  const [isMenuBook, setMenuBook] = useState(true);

  return (
    <nav className='navigation' data-test-id={dataTestid}>
      <NavLink
        to={
          pathname.split('/')[1] === menuListBasic.books.path && pathname.split('/')[2] !== menuAllBooks.category
            ? `/${menuListBasic.books.path}/${pathname.split('/')[2]}`
            : `/${menuListBasic.books.path}/${menuAllBooks.category}`
        }
        onClick={() => setMenuBook(!isMenuBook)}
        className={({ isActive }) =>
          isActive || pathname.split('/')[1] === menuListBasic.books.path ? 'nav-link nav-link-active' : 'nav-link'
        }
        data-test-id={`${dataTestid}-showcase`}
      >
        {menuListBasic.books.name}
        <img
          src={
            pathname.split('/')[1] === menuListBasic.books.path
              ? isMenuBook
                ? arrowTopColor
                : arrowTopColorCollapse
              : arrowBottomBlack
          }
          alt='icon Arrow'
          className='navImg'
        />
      </NavLink>
      <div className={isMenuBook ? 'burgerMenuNavigation books-burger-menu books' : 'books-burger-menu-hide books'}>
        <ul className={burgerMenuNavigation ? 'navBurgerMenuNavList' : 'navList'}>
          <li>
            <NavLink
              to={`/${menuListBasic.books.path}/${menuAllBooks.category}`}
              className={({ isActive }) => (isActive ? 'nav-item nav-item-active' : 'nav-item')}
              onClick={() => setButtonState?.(false)}
              data-test-id={`${dataTestid}-books`}
            >
              Все книги
            </NavLink>
          </li>

          {menuListCategories.map(({ name, category, id, value }) => (
            <li key={id}>
              <NavLink
                to={`/${menuListBasic.books.path}/${category}`}
                className={({ isActive }) => (isActive ? 'nav-item nav-item-active' : 'nav-item')}
                onClick={() => setButtonState?.(false)}
              >
                {name}
              </NavLink>
              <span className={pathname.split('/')[2] === category ? 'text-span-active' : 'text-span'}>
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={burgerMenuNavigation ? 'nav-burger-menu-terms' : 'terms'}>
        <NavLink
          to={`/${menuListBasic.terms.path}`}
          onClick={() => {
            setMenuBook(false);
            setButtonState?.(false);
          }}
          className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          data-test-id={`${dataTestid}-terms`}
        >
          {menuListBasic.terms.name}
        </NavLink>
        <NavLink
          to={`/${menuListBasic.contract.path}`}
          onClick={() => {
            setMenuBook(false);
            setButtonState?.(false);
          }}
          className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          data-test-id={`${dataTestid}-contract`}
        >
          {menuListBasic.contract.name}
        </NavLink>
        {children}
      </div>
    </nav>
  );
};
