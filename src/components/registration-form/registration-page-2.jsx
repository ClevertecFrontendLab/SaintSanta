import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import arrowRight from '../../assets/icon/icon_chevron_arrow-right.png';

export const RegistrationPage2 = ({ step, handleSubmit, register, getCurrentCredentials, errors, isValid }) => {
  const { firstName: nameErrors, lastName: surnameErrors } = errors;
  const [firstInputText, setFirstInputText] = useState('');
  const [secondInputText, setSecondInputText] = useState('');
  const changeFirstInputText = (value) => {
    setFirstInputText(value);
  };
  const changeSecondInputText = (value) => {
    setSecondInputText(value);
  };

  return (
    <div className='user-info-wrapper'>
      <form
        data-test-id='register-form'
        onSubmit={handleSubmit(getCurrentCredentials)}
        className='registration-content'
      >
        <div className='registration-content-wrapper'>
          <div className='registration-content-title'>Регистрация</div>
          <div className='registration-content-step'>{step} шаг из 3</div>
        </div>
        <div className='registration-section'>
          <label data-content='firstName' className='input-field-wrapper'>
            <input
              {...register('firstName', {
                required: 'Поле не может быть пустым',
                onChange: (e) => {
                  changeFirstInputText(e.target.value);
                },
              })}
              className={nameErrors?.message ? 'input-field input-field-error' : 'input-field'}
            />
            <span className={firstInputText ? 'placeholder-text-up' : 'placeholder-text'}>Имя</span>
          </label>
          {nameErrors?.message && (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              {nameErrors?.message}
            </span>
          )}
        </div>
        <div className='registration-section'>
          <label data-content='lastName' className='input-field-wrapper'>
            <input
              {...register('lastName', {
                required: 'Поле не может быть пустым',
                onChange: (e) => {
                  changeSecondInputText(e.target.value);
                },
              })}
              className={surnameErrors?.message ? 'input-field input-field-error' : 'input-field'}
            />
            <span className={secondInputText ? 'placeholder-text-up' : 'placeholder-text'}>Фамилия</span>
          </label>
          {surnameErrors?.message && (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              {surnameErrors?.message}
            </span>
          )}
        </div>
        <input
          type='submit'
          disabled={isValid ? false : true}
          className={isValid ? 'registration-content-button' : 'registration-content-button GB10'}
          value='последний шаг'
        />
        <div className='registration-content-registration'>
          <span className='registration-content-registration-question'>Есть учетная запись?</span>
          <NavLink className='registration-content-registration-link' to='/auth'>
            ВОЙТИ
            <img className='registration-content-registration-link-arrow' src={arrowRight} alt='arrowRight' />
          </NavLink>
        </div>
      </form>
    </div>
  );
};
