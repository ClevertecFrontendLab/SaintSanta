/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useForm } from 'react-hook-form';

import arrow from '../../assets/icon/icon_chevron_arrow-right.png';

import './authorization.scss';

export const Authorization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const onError = (error) => console.log(error);

  return (
    <div className='authorization-wrapper'>
      <h3 className='h3'>Cleverland</h3>
      <form className='authorization' onSubmit={handleSubmit(onSubmit, onError)} autoComplete='off'>
        <fieldset className='authorization-fieldset'>
          <div className='authorization-title'>
            <legend className='h4'>Вход в личный кабинет</legend>
          </div>
          <div className='authorization-section'>
            <input
              className='input-field'
              placeholder='Логин'
              {...register('Login', {
                // validate: (value) => value !== 'bill',
              })}
            />
            {/* {errors.firstName && <p>Your name is not bill</p>} */}
            <input
              className='input-field'
              placeholder='Пароль'
              {...register('Password', {
                // validate: (value) => value.length > 3,
              })}
            />
            {/* {errors.lastName && <p>Your last name is less than 3 characters</p>} */}

            <span className='question-auth'>Забыли логин или пароль?</span>
            <button className='button-enter' type='submit'>
              <span>Вход</span>
            </button>
            <div className='registration-no'>
              <span>Нет учётной записи?</span>
              <button className='button-registration-link'>
                <span className='registration-link'>
                  Регистрация
                  <img src={arrow} alt='arrow-right' />
                </span>
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
