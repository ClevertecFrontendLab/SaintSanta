import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import arrow from '../../assets/icon/icon_chevron_up.png';
import { Books } from '../../constants/books';
import { BookData } from '../../models/book-data';
import { Rating } from '../rating/rating';
import { Slider } from '../slider/slider';
import { UsersReviewList } from '../users-review-list/users-review-list';

import './book-description.scss';

type BookParams = {
  bookId: string;
};

const getBookById = (id: string) => Books.find((card) => card.id === id);

export const BookDescription: FC = () => {
  const [isOpenReviews, setIsOpenReviews] = useState(true);
  const { bookId } = useParams<keyof BookParams>() as BookParams;
  const book = getBookById(bookId) as BookData;

  return (
    <div className='book-description-wrapper'>
      <div className='book-description'>
        <div className='book-description-general'>
          {book.img?.length === 0 ? <div className='card-not-found-img' /> : <Slider images={book.img!} />}
          <div className='book-description-main'>
            <p className='book-name'>Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих</p>
            <p className='book-author'>Адитья Бхаргава, 2019</p>
            <button className='book-book-button' type='button'>
              Забронировать
            </button>
            <p className='book-annotation'>
              <span className='book-annotation-title'>О книге</span>
              Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
              решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
              изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
              время?
              <br />
              <br />
              Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
              алгоритмы — это веселое и увлекательное занятие.
            </p>
          </div>
        </div>
        <div className='book-description-detailed'>
          <div className='detailed-rating'>
            <span className='rating-title'>Рейтинг</span>
            <div className='rating-star'>
              <Rating value={4} />
              <span className='rating-score'>4.3</span>
            </div>
          </div>
          <div className='deatiled-info'>
            <div className='detailed-info-title'>Подробная информация</div>
            <ul className='detailed-info-content'>
              <li className='content-list'>
                <span className='text-gray-style'>Издательство</span>
                <span className='text-common-style'>Питер</span>
              </li>
              <li className='content-list'>
                <span className='text-gray-style'>Год издания</span>
                <span className='text-common-style'>2019</span>
              </li>
              <li className='content-list'>
                <span className='text-gray-style'>Страниц</span>
                <span className='text-common-style'>288</span>
              </li>
              <li className='content-list'>
                <span className='text-gray-style'>Переплёт</span>
                <span className='text-common-style'>Мягкая обложка</span>
              </li>
              <li className='content-list'>
                <span className='text-gray-style'>Формат</span>
                <span className='text-common-style'>70х100</span>
              </li>
              <li className='content-list'>
                <span className='text-gray-style'>Жанр</span>
                <span className='text-common-style'>Компьютерная литература</span>
              </li>
              <li className='content-list'>
                <span className='text-gray-style'>Вес</span>
                <span className='text-common-style'>370 г</span>
              </li>
              <li className='content-list'>
                <span className='text-gray-style'>ISBN</span>
                <span className='text-common-style'>978-5-4461-0923-4</span>
              </li>
              <li className='content-list'>
                <span className='text-gray-style'>Изготовитель</span>
                <span className='text-common-style'>
                  ООО «Питер Мейл». РФ, 198 206, г.Санкт-Петербург, Петергофское ш, д. 73, лит. А29
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className={isOpenReviews ? 'book-reviews' : 'book-reviews visible'}>
          <div className='book-reviews-title'>
            Отзывы <span className='review-title-value'>3</span>
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
          <UsersReviewList />
          <button className='rate-a-book' type='button' data-test-id='button-rating'>
            оценить книгу
          </button>
        </div>
      </div>
    </div>
  );
};
