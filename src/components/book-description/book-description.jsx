/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import arrow from '../../assets/icon/icon_chevron_up.png';
import { URL_API } from '../../constants/url-api';
import { BookData } from '../../models/book-data';
import { BookDescriptionAPI } from '../../models/book-data-api';
import { fetchBook } from '../../store/book-slice';
import { Error } from '../error';
import { Loader } from '../loader';
import { Rating } from '../rating/rating';
import { Slider } from '../slider/slider';
import { UsersReviewList } from '../users-review-list/users-review-list';

import './book-description.scss';

// type BookParams = {
//   bookId: string;
// };

// interface IBookDescription {
//     book: BookDescriptionAPI;
// }

export const BookDescription = () => {
  const [isOpenReviews, setIsOpenReviews] = useState(true);
  const { bookId } = useParams();
  const { book, status, error } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBook(bookId));
  }, [dispatch, bookId]);

  return (
    <div className='book-description-wrapper'>
      {status === 'loading' ? <Loader /> : ''}
      {error && <Error error={'Что-то пошло не так. Обновите страницу через некоторое время.' || error} />}
      {!error && (
        <div className='book-description'>
          <div className='book-description-general'>
            {book.images === null || undefined ? (
              <div className='card-not-found-img' />
            ) : (
              <div>
                <img className='book-image' src='' alt='Photo not loading...' />
              </div>
            )}

            <div className='book-description-main'>
              <p className='book-name'>{book.title}</p>
              <p className='book-author'>
                {book.authors}, {book.issueYear}
              </p>
              <button className='book-book-button' type='button'>
                Забронировать
              </button>
              <p className='book-annotation'>
                <span className='book-annotation-title'>О книге</span>
                {book.description}
              </p>
            </div>
          </div>
          <div className='book-description-detailed'>
            <div className='detailed-rating'>
              <span className='rating-title'>Рейтинг</span>
              <div className='rating-star'>
                <Rating value={book.rating} />
                <span className='rating-score'>{book.rating}</span>
              </div>
            </div>
            <div className='deatiled-info'>
              <div className='detailed-info-title'>Подробная информация</div>
              <ul className='detailed-info-content'>
                <li className='content-list'>
                  <span className='text-gray-style'>Издательство</span>
                  <span className='text-common-style'>{book.publish}</span>
                </li>
                <li className='content-list'>
                  <span className='text-gray-style'>Год издания</span>
                  <span className='text-common-style'>{book.issueYear}</span>
                </li>
                <li className='content-list'>
                  <span className='text-gray-style'>Страниц</span>
                  <span className='text-common-style'>{book.pages}</span>
                </li>
                <li className='content-list'>
                  <span className='text-gray-style'>Переплёт</span>
                  <span className='text-common-style'>{book.cover}</span>
                </li>
                <li className='content-list'>
                  <span className='text-gray-style'>Формат</span>
                  <span className='text-common-style'>{book.format}</span>
                </li>
                <li className='content-list'>
                  <span className='text-gray-style'>Жанр</span>
                  <span className='text-common-style'>{book.categories}</span>
                </li>
                <li className='content-list'>
                  <span className='text-gray-style'>Вес</span>
                  <span className='text-common-style'>{book.weight}</span>
                </li>
                <li className='content-list'>
                  <span className='text-gray-style'>ISBN</span>
                  <span className='text-common-style'>{book.ISBN}</span>
                </li>
                <li className='content-list'>
                  <span className='text-gray-style'>Изготовитель</span>
                  <span className='text-common-style'>{book.producer}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={isOpenReviews ? 'book-reviews' : 'book-reviews visible'}>
            <div className='book-reviews-title'>
              Отзывы{' '}
              <span className='review-title-value'>{/* {book.comments === null ? 0 : book.comments.length} */}0</span>
              <button
                className='arrow-chevron'
                type='button'
                onClick={() => {
                  setIsOpenReviews(!isOpenReviews);
                }}
                data-test-id='button-hide-reviews'
              >
                <img src={arrow} alt='arrow' />
              </button>
            </div>
            {/* {book.comments === null ? '' : <UsersReviewList />} */}
            <button className='rate-a-book' type='button' data-test-id='button-rating'>
              оценить книгу
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
