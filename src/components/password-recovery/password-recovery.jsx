/* eslint-disable complexity */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import checkPositive from '../../assets/icon/icon_check-positive.png';
import arrowRight from '../../assets/icon/icon_chevron_arrow-right.png';
import eyeClosed from '../../assets/icon/icon_eye-closed.png';
import eyeOpen from '../../assets/icon/icon_eye-open.png';
import { REGEX_WITH_1NUM, REGEX_WITH_UPPERCASE } from '../../constants/regex';
import { sendNewPassword } from '../../store/reset-slice';
import { Loader } from '../loader';
import { RegMessage } from '../reg-message';

export const PasswordRecovery = ({ code }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const [isFirstFocus, setIsFirstFocus] = useState(false);
  const [isSecondFocus, setIsSecondFocus] = useState(false);
  const [firstInputText, setFirstInputText] = useState('');
  const [secondInputText, setSecondInputText] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const { passwordConfirmation: passwordConfirmationErrors, password: passwordErrors } = errors;

  const { minLength, oneInt, oneUppercase } = passwordErrors?.types || {};

  const noFocusPasswordError = !isFirstFocus && touchedFields.password && passwordErrors !== undefined;

  const passwordValue = getValues('password');
  const passwordConfirmation = getValues('passwordConfirmation');

  const isPasswordsEqual = passwordValue === passwordConfirmation;

  const dispatch = useDispatch();

  const { requestChangePassword } = useSelector((state) => state.reset);

  const changeFirstInputText = (value) => {
    setFirstInputText(value);
  };
  const changeSecondInputText = (value) => {
    setSecondInputText(value);
  };
  const createNewPassword = (data) => {
    dispatch(sendNewPassword({ ...data, code }));
  };

  if (requestChangePassword === 'loading') return <Loader />;

  if (requestChangePassword === 'resolved')
    return (
      <RegMessage
        title='Новые данные сохранены'
        text='Зайдите в личный кабинет, используя свои логин и новый пароль'
        type='passChangeSuccessfully'
        buttonLabel='вход'
        linkTo='/auth'
      />
    );

  if (
    requestChangePassword === 'Request failed with status code 405' ||
    requestChangePassword === 'Request failed with status code 400' ||
    requestChangePassword === 'Request failed with status code 500'
  )
    return (
      <RegMessage
        title='Данные не сохранились'
        text='Что-то пошло не так. Попробуйте еще раз'
        type='passNotChange'
        buttonLabel='повторить'
        getValues={getValues}
        code={code}
      />
    );

  return (
    <div className='user-info-wrapper'>
      <form
        data-test-id='reset-password-form'
        onSubmit={handleSubmit(createNewPassword)}
        className='registration-content'
      >
        <div className='registration-content-wrapper'>
          <div className='registration-content-title'>Восстановление пароля</div>
        </div>
        <div className='registration-section'>
          <label data-content='password' className='input-field-wrapper'>
            <input
              onFocus={() => {
                setIsFirstFocus(true);
              }}
              {...register('password', {
                required: true,
                validate: {
                  oneUppercase: (v) => (v.match(REGEX_WITH_UPPERCASE) ? true : false),
                  oneInt: (v) => (v.match(REGEX_WITH_1NUM) ? true : false),
                  minLength: (v) => (v.length >= 8 ? true : false),
                },
                onBlur: () => {
                  setIsFirstFocus(false);
                },
                onChange: (e) => {
                  changeFirstInputText(e.target.value);
                },
              })}
              type={isPasswordVisible ? 'text' : 'password'}
              className={noFocusPasswordError ? 'input-field input-field-error' : 'input-field'}
            />
            <span className={firstInputText ? 'placeholder-text-up' : 'placeholder-text'}>Новый пароль</span>
            <button
              type='button'
              data-test-id={isPasswordVisible ? 'eye-opened' : 'eye-closed'}
              className='registration-content-input-block-hide'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <img src={isPasswordVisible ? eyeOpen : eyeClosed} alt='hide-pass' />
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
          {passwordErrors?.types?.required && !isFirstFocus ? (
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
        <div className='registration-section'>
          <label data-content='password' className='input-field-wrapper'>
            <input
              onFocus={() => setIsSecondFocus(true)}
              {...register('passwordConfirmation', {
                required: true,
                validate: {
                  oneUppercase: (v) => (v.match(REGEX_WITH_UPPERCASE) ? true : false),
                  oneInt: (v) => (v.match(REGEX_WITH_1NUM) ? true : false),
                  minLength: (v) => (v.length >= 8 ? true : false),
                  passEqual: (v) => v === getValues('password'),
                },
                onBlur: () => {
                  setIsSecondFocus(false);
                },
                onChange: (e) => {
                  changeSecondInputText(e.target.value);
                },
              })}
              type={isNewPasswordVisible ? 'text' : 'password'}
              className={
                (!isPasswordsEqual && !isSecondFocus) || passwordConfirmationErrors?.types?.required
                  ? 'input-field input-field-error'
                  : 'input-field'
              }
            />
            <span className={secondInputText ? 'placeholder-text-up' : 'placeholder-text'}>Повторите пароль</span>
            <button
              type='button'
              data-test-id={isNewPasswordVisible ? 'eye-opened' : 'eye-closed'}
              className='registration-content-input-block-hide'
              onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
            >
              <img src={isNewPasswordVisible ? eyeOpen : eyeClosed} alt='hide-pass' />
            </button>
          </label>
          {passwordConfirmationErrors?.types?.required && !isFirstFocus ? (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              Поле не может быть пустым
            </span>
          ) : !isPasswordsEqual && !isSecondFocus ? (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              Пароли не совпадают
            </span>
          ) : null}
        </div>
        <input
          type='submit'
          disabled={!isPasswordsEqual && !isSecondFocus}
          className={
            !isPasswordsEqual && !isSecondFocus ? 'registration-content-button GB10' : 'registration-content-button'
          }
          value='сохранить изменения'
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
