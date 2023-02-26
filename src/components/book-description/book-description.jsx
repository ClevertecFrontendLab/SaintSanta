/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import arrow from '../../assets/icon/icon_chevron_up.png';
import noUserImg from '../../assets/img/user.jpg'
import { URL_API } from '../../constants/url-api';
import { fetchBook } from '../../store/book-slice';
import { formatDateReview } from '../../utils/date';
import { Error } from '../error';
import { Loader } from '../loader';
import { Rating } from '../rating';

import './book-description.scss';

export const BookDescription = () => {
  const [isOpenReviews, setIsOpenReviews] = useState(true);
  const { bookId } = useParams();
  const { book, status, error } = useSelector((state) => state.book);
  const bookReview = book.comments;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBook(bookId));
  }, [dispatch, bookId]);

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <div className='book-description-wrapper'>
      {error && <Error error={'Что-то пошло не так. Обновите страницу через некоторое время.' || error} />}
      {!error && (
        <div className='book-description'>
          <div className='book-description-general'>
            {book.images === null || book.images === undefined ? (
              <div className='card-not-found-img' />
            ) : (
              <div>
                <img className='book-image' src={URL_API + book.images[0].url} alt='Photo not loading...' />
              </div>
            )}

            <div className='book-description-main'>
              <p className='book-name' data-test-id='book-title'>{book.title}</p>
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
              <span className='review-title-value'>
                {book.comments === null || book.comments === undefined ? 0 : book.comments.length}
              </span>
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
            {book.comments === null || book.comments === undefined
              ? ''
              : bookReview.map((review) => (
                    <div className='review-user' key={review.user.commentUserId}>
                      <div className='review-user-content'>
                        {review.user.avatarUrl ?
                        <img src={URL_API + review.user.avatarUrl} alt='pic' />
                   : <img src={noUserImg} alt='pic' /> }
                        <div className='user-content-info'>
                          <div className='review-user-name'>{`${review.user.firstName}${review.user.lastName}`}</div>
                          <div className='review-user-date'>{formatDateReview(review.createdAt)}</div>
                        </div>
                      </div>
                      <Rating value={review.rating} />
                      <p className='review-user-text'>{review.text}</p>
                    </div>
                  ))}
            <button className='rate-a-book' type='button' data-test-id='button-rating'>
              оценить книгу
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
