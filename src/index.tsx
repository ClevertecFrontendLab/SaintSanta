import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { RoutePath } from './models/route-path.enum';
import { BookPage } from './pages/book';
import { ContractOffer } from './pages/contract-offer/contract-offer';
import { MainPage } from './pages/main';
import { Terms } from './pages/terms/terms';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path={RoutePath.main} element={<Layout />}>
          <Route path={RoutePath.main} element={<Navigate to={RoutePath.booksAll} />} />
          <Route path={RoutePath.booksCategory} element={<MainPage />} />
          <Route path={RoutePath.bookPage} element={<BookPage />} />
          <Route path={RoutePath.terms} element={<Terms />} />
          <Route path={RoutePath.contract} element={<ContractOffer />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
