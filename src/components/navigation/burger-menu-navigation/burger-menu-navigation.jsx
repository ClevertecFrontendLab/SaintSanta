import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { menuAllBooks, menuListBasic } from '../../../constants/menu-category';
import { fetchCategories } from '../../../store/categories-slice';
import { createMenuCategories } from '../../../utils/counter-category';
import arrowBottomBlack from '../assets/arrow-bottom-black.svg';
import arrowTopColor from '../assets/arrow-top-color.svg';
import arrowTopColorCollapse from '../assets/arrow-top-color-сollapse.svg';

import './burger-menu-navigation.scss';

export const BurgerMenuNavigation = ({
  children,
  setButtonState,
  burgerMenuNavigation = false,
  dataTestid,
}) => {
  const { pathname } = useLocation();

  const [isMenuBook, setMenuBook] = useState(true);

  const { books } = useSelector((state) => state.books);
  const { categories, errorCategories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const isError = Boolean(errorCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const menuCategories = useMemo(
    () => books && categories && createMenuCategories(books, categories),
    [books, categories]
  );

  return (
    <nav className='burger-navigation' data-test-id={dataTestid}>
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
        data-test-id='burger-showcase'
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
      <div className={isMenuBook ? 'books-burger-menu books' : 'books-burger-menu-hide books'}>
        <ul className={burgerMenuNavigation ? 'nav-burger-menu-nav-list' : 'navList'}>
          <li>
            <NavLink
              to={`/${menuListBasic.books.path}/${menuAllBooks.category}`}
              className={({ isActive }) => (isActive ? 'nav-item nav-item-active' : 'nav-item')}
              onClick={() => setButtonState?.(false)}
            >
              <span data-test-id='burger-books'>{isError ? '' : menuAllBooks.name}</span>
            </NavLink>
          </li>
          {menuCategories &&
            menuCategories.map(({ id, path, name, count }) => (
              <li key={id}>
                <NavLink
                  to={`/books/${path}`}
                  className={({ isActive }) => (isActive ? 'nav-item nav-item-active' : 'nav-item')}
                  onClick={() => {
                    setButtonState?.(false);
                  }}
                  state={{ countBooks: count }}
                >
                  <span data-test-id={`burger-${path}`}>{name}</span>
                </NavLink>
                <span
                  data-test-id={`burger-book-count-for-${path}`}
                  className={pathname.split('/')[2] === path ? 'text-span-active' : 'text-span'}
                >
                  {count}
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
