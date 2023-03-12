import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import checkPositive from '../../assets/icon/icon_check-positive.png';
import arrowRight from '../../assets/icon/icon_chevron_arrow-right.png';
import eyeClosed from '../../assets/icon/icon_eye-closed.png';
import eyeOpen from '../../assets/icon/icon_eye-open.png';
import { REGEX_WITH_1NUM, REGEX_WITH_LATIN_ABC, REGEX_WITH_UPPERCASE } from '../../constants/regex';

import './registration-form.scss';

// eslint-disable-next-line complexity
export const RegistrationPage1 = ({
  step,
  handleSubmit,
  register,
  getCurrentCredentials,
  errors,
  touchedFields,
  isValid,
  getValues,
}) => {
  const [firstInputText, setFirstInputText] = useState('');
  const [secondInputText, setSecondInputText] = useState('');
  const [isFirstFocus, setIsFirstFocus] = useState(false);
  const [isSecondFocus, setIsSecondFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { username: loginErrors, password: passwordErrors } = errors;
  const { minLength, oneInt, oneUppercase } = passwordErrors?.types || {};
  const { latinAlphabet, shouldContainNumber } = loginErrors?.types || {};

  const noFocusLoginError = !isFirstFocus && touchedFields.username && loginErrors !== undefined;
  const noFocusPasswordError = !isSecondFocus && touchedFields.password && passwordErrors !== undefined;
  const passwordValue = getValues('password');

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
          <label data-content='username' className='input-field-wrapper'>
            <input
              onFocus={() => setIsFirstFocus(true)}
              {...register('username', {
                required: true,
                validate: {
                  latinAlphabet: (v) => (v.match(REGEX_WITH_LATIN_ABC) ? true : false),
                  shouldContainNumber: (v) => (v.match(REGEX_WITH_1NUM) ? true : false),
                },
                onBlur: () => {
                  setIsFirstFocus(false);
                },
                onChange: (e) => {
                  changeFirstInputText(e.target.value);
                },
              })}
              className={noFocusLoginError ? 'input-field input-field-error' : 'input-field'}
            />
            <span className={firstInputText ? 'placeholder-text-up' : 'placeholder-text'}>
              Придумайте логин для входа
            </span>
          </label>
          {loginErrors?.types?.required && !isFirstFocus ? (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              Поле не может быть пустым
            </span>
          ) : (
            <span
              className={
                noFocusLoginError
                  ? 'registration-content-input-error error-hint'
                  : 'registration-content-input-error normal-hint'
              }
              data-test-id='hint'
            >
              Используйте для логина <span className={latinAlphabet ? 'error-hint' : ''}>латинский алфавит</span> и{' '}
              <span className={shouldContainNumber ? 'error-hint' : ''}>цифры</span>
            </span>
          )}
        </div>
        <div className='registration-section'>
          <label data-content='password' className='input-field-wrapper'>
            <input
              onFocus={() => setIsSecondFocus(true)}
              {...register('password', {
                required: true,
                validate: {
                  oneUppercase: (v) => (v.match(REGEX_WITH_UPPERCASE) ? true : false),
                  oneInt: (v) => (v.match(REGEX_WITH_1NUM) ? true : false),
                  minLength: (v) => (v.length >= 8 ? true : false),
                },
                onBlur: () => {
                  setIsSecondFocus(false);
                },
                onChange: (e) => {
                  changeSecondInputText(e.target.value);
                },
              })}
              type={isPasswordVisible ? 'text' : 'password'}
              className={noFocusPasswordError ? 'input-field input-field-error' : 'input-field'}
            />
            <span className={secondInputText ? 'placeholder-text-up' : 'placeholder-text'}>Пароль</span>
            <button
              type='button'
              data-test-id={isPasswordVisible ? 'eye-opened' : 'eye-closed'}
              className='registration-content-input-block-hide'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <img src={isPasswordVisible ? eyeOpen : eyeClosed} alt='pass eye' />
            </button>
            {passwordErrors === undefined && passwordValue !== '' && passwordValue !== undefined && (
              <img
                data-test-id='checkmark'
                src={checkPositive}
                alt='pass-valid'
                className='registration-content-input-block-validation'
              />
            )}
          </label>
          {passwordErrors?.types?.required && !isSecondFocus ? (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              Поле не может быть пустым
            </span>
          ) : (
            <span
              data-test-id='hint'
              className={
                noFocusPasswordError
                  ? 'registration-content-input-error error-hint'
                  : 'registration-content-input-error normal-hint'
              }
            >
              Пароль <span className={minLength ? 'error-hint' : ''}>не менее 8 символов</span>,{' '}
              <span className={oneUppercase ? 'error-hint' : ''}>с заглавной буквой</span> и{' '}
              <span className={oneInt ? 'error-hint' : ''}>цифрой</span>
            </span>
          )}
        </div>
        <input
          type='submit'
          disabled={isValid ? false : true}
          className={isValid ? 'registration-content-button' : 'registration-content-button GB10' }
          value='следующий шаг'
        />
        <div className='registration-content-registration'>
          <span className='registration-content-registration-question'>Есть учетная запись?</span>
          <NavLink className='registration-content-registration-link' to='/auth'>
            ВОЙТИ
            <img className='registration-content-registration-link-arrow' src={arrowRight} alt='arrow right' />
          </NavLink>
        </div>
      </form>
    </div>
  );
};
