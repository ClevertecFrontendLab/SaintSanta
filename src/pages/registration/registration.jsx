import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/loader';
import { RegMessage } from '../../components/reg-message';
import { RegistrationPage1,RegistrationPage2, RegistrationPage3 } from '../../components/registration-form';
import { sendUserInfo } from '../../store/registration-slice';

export const Registration = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    formState: { errors, isValid, touchedFields },
    handleSubmit,
    reset,
    control,
    getValues,
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
  });

  const dispatch = useDispatch();
  const { responseStatus, regStatus } = useSelector((state) => state.registration);

  const getCurrentCredentials = (data) => {
    setStep(step + 1);

    if (step === 3) {
      dispatch(sendUserInfo(data));
    }
  };

  switch (step) {
    case 2:
      return (
        <RegistrationPage2
          errors={errors}
          step={step}
          handleSubmit={handleSubmit}
          getCurrentCredentials={getCurrentCredentials}
          register={register}
          touchedFields={touchedFields}
          isValid={isValid}
        />
      );

    case 3: {
      return (
        <RegistrationPage3
          errors={errors}
          step={step}
          handleSubmit={handleSubmit}
          getCurrentCredentials={getCurrentCredentials}
          register={register}
          touchedFields={touchedFields}
          isValid={isValid}
          control={control}
          getValues={getValues}
        />
      );
    }
    default:
  }

  if (regStatus === 'loading') return <Loader />;

  if (regStatus === 'Request failed with status code 400')
    return (
      <RegMessage
        title='Данные не сохранились'
        text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'
        buttonLabel='НАЗАД К РЕГИСТРАЦИИ'
        reset={reset}
        setStep={setStep}
        type='backToReg'
      />
    );

  if (regStatus === 'Request failed with status code 405' || regStatus === 'Request failed with status code 500')
    return (
      <RegMessage
        title='Данные не сохранились'
        text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
        buttonLabel='ПОВТОРИТЬ'
        getValues={getValues}
        type='resendRegInfo'
      />
    );

  if (responseStatus === 200)
    return (
      <RegMessage
        title='Регистрация успешна'
        text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
        buttonLabel='вход'
        linkTo='/auth'
        type='enter'
      />
    );

  return (
    <RegistrationPage1
      errors={errors}
      step={step}
      handleSubmit={handleSubmit}
      getCurrentCredentials={getCurrentCredentials}
      register={register}
      touchedFields={touchedFields}
      isValid={isValid}
      getValues={getValues}
    />
  );
};
