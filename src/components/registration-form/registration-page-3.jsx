/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

import arrowRight from '../../assets/icon/icon_chevron_arrow-right.png';
import { REGEX_WITH_EMAIL, REGEX_WITH_PHONE, REGEX_WITH_PHONE_MASK } from '../../constants/regex';

export const RegistrationPage3 = ({
  step,
  handleSubmit,
  register,
  getCurrentCredentials,
  errors,
  isValid,
  control,
  getValues,
}) => {
  const [isFirstFocus, setIsFirstFocus] = useState();
  const [isSecondFocus, setIsSecondFocus] = useState(false);
  const [firstInputText, setFirstInputText] = useState('');
  const [secondInputText, setSecondInputText] = useState('');
  const changeFirstInputText = (value) => {
    setFirstInputText(value);
  };
  const changeSecondInputText = (value) => {
    setSecondInputText(value);
  };

  const { phone: phoneError, email: emailError } = errors;

  const isErrorNumber = phoneError?.types.correctNumber;
  const isErrorEmail = emailError?.types.correctEmail;

  const numberVal = getValues('phone');

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
          <label data-content='phone' className='input-field-wrapper'>
            <Controller
              control={control}
              {...register('phone', {
                required: true,
                validate: {
                  correctNumber: (v) => (v?.match(REGEX_WITH_PHONE) ? true : false),
                },
                onChange: (e) => {
                  changeFirstInputText(e.target.value);
                },
              })}
              render={({ field: { onChange, onBlur, value, ref, name } }) => (
                <MaskedInput
                  onFocus={() => setIsFirstFocus(true)}
                  onBlur={() => setIsFirstFocus(false)}
                  name={name}
                  ref={ref}
                  keepCharPositions={true}
                  placeholderChar='x'
                  mask={REGEX_WITH_PHONE_MASK}
                  onChange={onChange}
                  className={isErrorNumber ? 'input-field input-field-error' : 'input-field'}
                />
              )}
            />
            <span className={firstInputText ? 'placeholder-text-up' : 'placeholder-text'}>Номер телефона</span>
          </label>
          {isFirstFocus === undefined ||
            (numberVal?.length > 0 ? (
              <span
                data-test-id='hint'
                className={
                  isErrorNumber
                    ? 'registration-content-input-error error-hint'
                    : 'registration-content-input-error normal-hint'
                }
              >
                <span className={isErrorNumber ? 'error-hint' : ''}>В формате +375 (xx) xxx-xx-xx</span>
              </span>
            ) : (
              <span data-test-id='hint' className='registration-content-input-error error-hint'>
                Поле не может быть пустым
              </span>
            ))}
        </div>
        <div className='registration-section'>
          <label data-content='email' className='input-field-wrapper'>
            <input
              onFocus={() => setIsSecondFocus(true)}
              {...register('email', {
                required: true,
                validate: {
                  correctEmail: (v) => (v.match(REGEX_WITH_EMAIL) ? true : false),
                },
                onBlur: () => {
                  setIsSecondFocus(false);
                },
                onChange: (e) => {
                  changeSecondInputText(e.target.value);
                },
              })}
              className={isErrorEmail ? 'input-field input-field-error' : 'input-field'}
            />
            <span className={secondInputText ? 'placeholder-text-up' : 'placeholder-text'}>E-mail</span>
          </label>
          {emailError?.types.required && !isSecondFocus ? (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              Поле не может быть пустым
            </span>
          ) : (
            isErrorEmail && (
              <span data-test-id='hint' className='registration-content-input-error error-hint'>
                Введите корректный e-mail
              </span>
            )
          )}
        </div>
        <input
          type='submit'
          disabled={isValid ? false : true}
          className={isValid ? 'registration-content-button' : 'registration-content-button GB10'}
          value='зарегистрироваться'
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
