import { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

export const Layout: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
