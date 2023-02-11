import { FC } from 'react';

import { BookDescription } from '../book-description/book-description';

import './book.scss';

export const Book: FC = () => (
  <div>
    <div className='book-wrapper'>
      <p className='book'>
        Бизнес книги / Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
      </p>
    </div>
    <BookDescription />
  </div>
);
