import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { sendAuthInfo } from '../../store/auth-slice';
import { clearResponseStatus, sendUserInfo } from '../../store/registration-slice';
import { clearRequestStatus, sendNewPassword } from '../../store/reset-slice';

import './reg-message.scss';

export const RegMessage = ({ title, text, buttonLabel, linkTo, reset, setStep, getValues, type, code }) => {
  const dispatch = useDispatch();

  const newRegistrationHandle = () => {
    dispatch(clearResponseStatus());
    reset?.();
    setStep?.(1);
  };

  const userLoginInfo = getValues?.();

  const resendUserLoginInfo = () => {
    dispatch(sendAuthInfo(userLoginInfo));
    dispatch(clearResponseStatus());
  };

  const userInfo = getValues?.();

  const resendUserInfo = () => {
    dispatch(sendUserInfo(userInfo));
    dispatch(clearResponseStatus());
  };

  const userNewPass = getValues?.();

  const resendUserNewPass = () => {
    dispatch(sendNewPassword({ ...userNewPass, code }));
    dispatch(clearRequestStatus());
  };

  return (
    <div data-test-id='status-block' className='reg-message'>
      <div className='reg-message-title'>{title}</div>
      <div className='reg-message-text'>{text}</div>
      {type === 'enter' && (
        <Link to={linkTo || ''}>
          <button className='reg-message-button' type='button'>
            {buttonLabel}
          </button>
        </Link>
      )}

      {type === 'backToReg' && (
        <button onClick={newRegistrationHandle} className='reg-message-button' type='button'>
          {buttonLabel}
        </button>
      )}

      {type === 'resendRegInfo' && (
        <button onClick={resendUserInfo} className='reg-message-button' type='button'>
          {buttonLabel}
        </button>
      )}

      {type === 'resendLoginInfo' && (
        <button onClick={resendUserLoginInfo} className='reg-message-button' type='button'>
          {buttonLabel}
        </button>
      )}

      {type === 'passChangeSuccessfully' && (
        <Link to={linkTo || ''}>
          <button className='reg-message-button' type='button'>
            {buttonLabel}
          </button>
        </Link>
      )}

      {type === 'passNotChange' && (
        <button onClick={resendUserNewPass} className='reg-message-button' type='button'>
          {buttonLabel}
        </button>
      )}
    </div>
  );
};
