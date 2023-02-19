import { FC } from 'react';

import loaderIcon from '../../assets/icon/loader.svg';

import './loader.scss'

export const Loader: FC = () => (
  <div className='loader' data-test-id='loader'>
    <img className='loaderIcon' src={loaderIcon} alt='Loading...' />
  </div>
);
