import { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

import './layout.scss'

export const Layout: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='layout'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
