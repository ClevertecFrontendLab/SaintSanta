import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useSearchParams } from 'react-router-dom';

import leftArrow from '../../assets/icon/icon_chevron_arrow-left.png';
import arrowRight from '../../assets/icon/icon_chevron_arrow-right.png';
import { Loader } from '../../components/loader';
import { PasswordRecovery } from '../../components/password-recovery/password-recovery';
import { RegMessage } from '../../components/reg-message';
import { REGEX_WITH_EMAIL } from '../../constants/regex';
import { sendUserEmail } from '../../store/reset-slice';

export const ResetPasswordPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState();
  const [isFirstFocus, setIsFirstFocus] = useState(false);
  const [firstInputText, setFirstInputText] = useState('');
  const { requestStatus } = useSelector((state) => state.reset);

  const code = searchParams.get('code');
  const changeFirstInputText = (value) => {
    setFirstInputText(value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const dispatch = useDispatch();

  const sendResetRequest = (data) => {
    dispatch(sendUserEmail(data))
      .unwrap()
      .catch((error) => {
        setError(error?.message);
      });
  };

  if (code) {
    return <PasswordRecovery code={code} />;
  }

  if (requestStatus === 'loading') return <Loader />;

  if (requestStatus === 'resolved')
    return (
      <RegMessage
        title='Письмо выслано'
        text='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
        type='resetInfo'
      />
    );

  return (
    <div className='user-info-wrapper'>
      <div className='credential-back-wrapper'>
        <Link className='credential-back' to='/auth'>
          <img src={leftArrow} alt='leftArrow' />
          <div className='credential-back-text'>вход в личный кабинет</div>
        </Link>
      </div>
      <form data-test-id='send-email-form' onSubmit={handleSubmit(sendResetRequest)} className='registration-content'>
        <div className='registration-content-wrapper'>
          <div className='registration-content-title'>Восстановление пароля</div>
        </div>
        <div className='registration-section'>
          <label data-content='email' className='input-field-wrapper'>
            <input
              onFocus={() => setIsFirstFocus(true)}
              {...register('email', {
                required: {
                  value: true,
                  message: 'Поле не может быть пустым',
                },
                validate: {
                  correctEmail: (v) => (v.match(REGEX_WITH_EMAIL) ? true : false),
                },
                onBlur: () => {
                  setIsFirstFocus(false);
                },
                onChange: (e) => {
                  changeFirstInputText(e.target.value);
                },
              })}
              className={errors.email ? 'input-field input-field-error' : 'input-field'}
            />
            <span className={firstInputText ? 'placeholder-text-up' : 'placeholder-text'}>Email</span>
          </label>
          <span data-test-id='hint' className='registration-content-input-error'>
            На этот email будет отправлено письмо с инструкциями по восстановлению пароля
          </span>
          {errors.email?.message && !isFirstFocus ? (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              Поле не может быть пустым
            </span>
          ) : null}
          {errors.email?.type === 'correctEmail' ? (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              Введите корректный e-mail
            </span>
          ) : null}
          {error && (
            <span data-test-id='hint' className='registration-content-input-error error-hint'>
              error
            </span>
          )}
        </div>
        <input className='registration-content-button' type='submit' value='восстановить' />
        <div className='registration-content-registration'>
          <span className='registration-content-registration-question'>Нет учетной записи?</span>
          <NavLink className='registration-content-registration-link' to='/registration'>
            РЕГИСТРАЦИЯ
            <img className='registration-content-registration-link-arrow' src={arrowRight} alt='arrowRight' />
          </NavLink>
        </div>
      </form>
    </div>
  );
};
