import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import sortList from '../../assets/icon/icon_menu.png';
import sortTile from '../../assets/icon/icon_square-four.png';
import { CardList } from '../../components/card-list/card-list';
import { CustomInput } from '../../components/custom-input/custom-input';
import { Error } from '../../components/error';
import { Loader } from '../../components/loader';
import { MenuNavigation } from '../../components/navigation/menu-navigation';
import { SortButton } from '../../components/sort-button/sort-button';
import { fetchBooks } from '../../store/books-slice';

import './main-page.scss';

export const MainPage = () => {
  const [listActive, setListActive] = useState('tile');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.books);
  const { statusCategories, errorCategories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const isBookErrorMessage = Boolean(error);
  const isCategoriesErrorMessage = Boolean(errorCategories);

  const isError = isBookErrorMessage || isCategoriesErrorMessage;

  return (
    <section className='main-page'>
      {isError && (
        <Error error={'Что-то пошло не так. Обновите страницу через некоторое время.' || error || errorCategories} />
      )}
      <div className='menu-navigation'>
        <MenuNavigation />
      </div>
      {(status === 'loading' || statusCategories === 'loading') && <Loader />}
      {!isError && (
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
      )}
    </section>
  );
};
