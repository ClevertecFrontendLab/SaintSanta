import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import arrowRight from '../../assets/icon/icon_chevron_arrow-right.png';
import eyeClosed from '../../assets/icon/icon_eye-closed.png';
import eyeOpen from '../../assets/icon/icon_eye-open.png';
import { Loader } from '../../components/loader';
import { RegMessage } from '../../components/reg-message';
import { sendAuthInfo } from '../../store/auth-slice';

import './login-page.scss';

export const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isFirstFocus, setIsFirstFocus] = useState(false);
  const [firstInputText, setFirstInputText] = useState('');
  const [secondInputText, setSecondInputText] = useState('');
  const changeFirstInputText = (value) => {
    setFirstInputText(value);
  };
  const changeSecondInputText = (value) => {
    setSecondInputText(value);
  };

  const dispatch = useDispatch();

  const { authStatus } = useSelector((state) => state.auth);

  const isUserInfoValid = authStatus === 'Request failed with status code 400' ? true : false;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
    },
  });

  const getAuthInfo = (data) => {
    dispatch(sendAuthInfo(data));
  };

  if (authStatus === 'loading') return <Loader />;

  if (authStatus === 'resolved') return <Navigate to='/books/all' />;

  if (authStatus === 'Request failed with status code 405' || authStatus === 'Request failed with status code 500')
    return (
      <RegMessage
        title='Вход не выполнен'
        text='Что-то пошло не так. Попробуйте ещё раз'
        buttonLabel='повторить'
        getValues={getValues}
        type='resendLoginInfo'
      />
    );

  return (
    <div className='user-info-wrapper'>
      <form data-test-id='auth-form' onSubmit={handleSubmit(getAuthInfo)} className='registration-content'>
        <div className='registration-content-wrapper'>
          <div className='registration-content-title'>Bход в личный кабинет</div>
        </div>
        <div className='registration-section'>
          <label data-content='identifier' className='input-field-wrapper'>
            <input
              onFocus={() => setIsFirstFocus(true)}
              {...register('identifier', {
                required: {
                  value: true,
                  message: 'Поле не может быть пустым',
                },
                onBlur: () => {
                  setIsFirstFocus(false);
                },
                onChange: (e) => {
                  changeFirstInputText(e.target.value);
                },
              })}
              className={isUserInfoValid ? 'input-field input-field-error' : 'input-field'}
            />
            <span className={firstInputText ? 'placeholder-text-up' : 'placeholder-text'}>Логин</span>
          </label>
          {errors.identifier?.message && !isFirstFocus ? (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              Поле не может быть пустым
            </span>
          ) : null}
        </div>
        <div className='registration-section'>
          <label data-content='password' className='input-field-wrapper'>
            <input
              onFocus={() => setIsInputFocus(true)}
              {...register('password', {
                required: 'Поле не может быть пустым',
                onBlur: () => {
                  setIsInputFocus(false);
                },
                onChange: (e) => {
                  changeSecondInputText(e.target.value);
                },
              })}
              type={isPasswordVisible ? 'text' : 'password'}
              className={isUserInfoValid ? 'input-field input-field-error' : 'input-field'}
            />
            <span className={secondInputText ? 'placeholder-text-up' : 'placeholder-text'}>Пароль</span>
            {touchedFields?.identifier && (
              <button
                type='button'
                data-test-id={isPasswordVisible ? 'eye-opened' : 'eye-closed'}
                className='registration-content-input-block-hide'
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <img src={isPasswordVisible ? eyeOpen : eyeClosed} alt='pass eye' />
              </button>
            )}
          </label>
          {errors.password && (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              Поле не может быть пустым
            </span>
          )}
        </div>
        {isUserInfoValid && (
          <span data-test-id='hint' className='registration-content-input-error error-hint'>
            Неверный логин или пароль!
          </span>
        )}
        <NavLink className='registration-content-restore' to='/forgot-pass'>
          {isUserInfoValid ? 'Восстановить?' : 'Забыли логин или пароль?'}
        </NavLink>
        <button className='registration-content-button' type='submit' disabled={!isValid}>
          вход
        </button>
        <div className='registration-content-registration'>
          <span className='registration-content-registration-question'>Нет учетной записи?</span>
          <NavLink className='registration-content-registration-link' to='/registration'>
            РЕГИСТРАЦИЯ
            <img className='registration-content-registration-link-arrow' src={arrowRight} alt='arrow right' />
          </NavLink>
        </div>
      </form>
    </div>
  );
};
