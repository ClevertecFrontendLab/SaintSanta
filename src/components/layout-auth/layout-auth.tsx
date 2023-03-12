import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { RoutePath } from '../../models/route-path.enum';

import './layout-auth.scss';

export const LayoutAuth: FC = () => {
  const token = localStorage.getItem('token');

  return (
    <div className='layout-auth' data-test-id='auth'>
      <h3 className='h3'>Cleverland</h3>
      {token ? <Navigate to={RoutePath.booksAll} /> : <Outlet />}
    </div>
  );
};
