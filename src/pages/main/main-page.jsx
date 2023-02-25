import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import sortList from '../../assets/icon/icon_menu.png';
import sortTile from '../../assets/icon/icon_square-four.png';
import { CardList } from '../../components/card-list';
import { CustomInput } from '../../components/custom-input/custom-input';
import { Error } from '../../components/error';
import { Loader } from '../../components/loader';
import { MenuNavigation } from '../../components/navigation/menu-navigation';
import { SortButton } from '../../components/sort-button';
import { fetchBooks } from '../../store/books-slice';
import { getFilterBooks, sortBooksByRating } from '../../utils/books-filter';

import './main-page.scss';

export const MainPage = () => {
  const [listActive, setListActive] = useState('tile');
  const dispatch = useDispatch();
  const { books: booksOnDisplay, status, error } = useSelector((state) => state.books);
  const { categories, statusCategories, errorCategories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const isBookErrorMessage = Boolean(error);
  const isCategoriesErrorMessage = Boolean(errorCategories);

  const isError = isBookErrorMessage || isCategoriesErrorMessage;

  const [inDecreasingOrderOfRating, setInDecreasingOrderOfRating] = useState(true);
  const [books, setBooks] = useState(booksOnDisplay);
  const [inputText, setInputText] = useState('');
  const location = useLocation();
  const { category } = useParams();
  const { state } = location;

  const toggleSortBooksByRating = () => {
    setInDecreasingOrderOfRating(!inDecreasingOrderOfRating);
  };

  const changeInputText = (value) => {
    setInputText(value);
  };

  const sortedBooksByRating = useMemo(
    () => books && sortBooksByRating(books, inDecreasingOrderOfRating),
    [books, inDecreasingOrderOfRating]
  );

  useEffect(() => {
    if (booksOnDisplay && category) {
      setBooks(getFilterBooks(booksOnDisplay, inputText, categories, category));
    }
  }, [inputText, booksOnDisplay, categories, category]);

  return (
    <section className='main-page'>
      {isError && (
        <Error error={'Что-то пошло не так. Обновите страницу через некоторое время.' || error || errorCategories} />
      )}
      <div className='menu-navigation'>
        <MenuNavigation />
      </div>
      {statusCategories === 'loading'|| statusCategories === 'loading' && <Loader />}
      {!isError && (
        <div className='main-content'>
          <div className='main-content content'>
            <div>
              <nav className='filter-wrapper'>
                <div className='filter-sort-search'>
                  <CustomInput changeInputText={changeInputText} />
                  <SortButton sortRating={toggleSortBooksByRating} sortUp={!inDecreasingOrderOfRating} />
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
              {sortedBooksByRating.length ? (
                <CardList cardsData={sortedBooksByRating} inputText={inputText} />
              ) : (
                <div className='not-found'>
                  {state && state.countBooks === 0 ? (
                    <p data-test-id='empty-category'>В этой категории книг ещё нет</p>
                  ) : (
                    <p data-test-id='search-result-not-found'>По запросу ничего не найдено</p>
                  )}
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
