import close from '../../assets/icon/icon_close.png';
import warningCircle from '../../assets/icon/icon_warning-circle.svg';

import './error.scss';

export const Error = ({ error }) => (
  <div className='error-toast' data-test-id='error'>
    <img className='warning' src={warningCircle} alt='warning' />
    <p className='text__warning'>{error}</p>
    <button type='button' className='btn__closeWarn'>
      <img className='warning' src={close} alt='close' />
    </button>
  </div>
);
