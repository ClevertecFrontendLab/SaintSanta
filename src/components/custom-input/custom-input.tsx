/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';

import close from '../../assets/icon/icon_close.png';
import search from '../../assets/icon/icon_search.png';

import './custom-input.scss';

type Props = {
  inputText: string;
  changeInputText: (value: string) => void;
};

export const CustomInput = ({ inputText, changeInputText }: Props) => {
  const [isOpenInput, setIsOpenInput] = useState(false);

  return (
    <div className={isOpenInput ? 'search-input-wrapper open' : 'search-input-wrapper'}>
      <button
        className='search-button'
        type='button'
        onClick={() => {
          setIsOpenInput(!isOpenInput);
        }}
        data-test-id='button-search-open'
      >
        <img className='search-input-image' src={search} alt='search' />
      </button>

      <input
        className={isOpenInput ? 'search-input visible' : 'search-input'}
        type='text'
        placeholder='Поиск книги или автора…'
        onFocus={() => {
          setIsOpenInput(true);
        }}
        value={inputText}
        onChange={(e) => changeInputText(e.target.value)}
        data-test-id='input-search'
        autoFocus={true}
      />

      <button
        type='button'
        className={isOpenInput ? 'close-input-button visible' : 'close-input-button'}
        onClick={() => {
          setIsOpenInput(!isOpenInput);
        }}
        data-test-id='button-search-close'
      >
        <img src={close} alt='close' />
      </button>
    </div>
  );
};
