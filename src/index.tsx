import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { LayoutAuth } from './components/layout-auth';
import { TokenCheck } from './components/token-check/token-check';
import { RoutePath } from './models/route-path.enum';
import { LoginPage } from './pages/auth/login-page';
import { BookPage } from './pages/book';
import { ContractOffer } from './pages/contract-offer';
import { MainPage } from './pages/main';
import { Registration } from './pages/registration';
import { ResetPasswordPage } from './pages/reset-password';
import { Terms } from './pages/terms';
import { store } from './store';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route element={<LayoutAuth />}>
            <Route path={RoutePath.authorization} element={<LoginPage />} />
            <Route path={RoutePath.registration} element={<Registration />} />
            <Route path={RoutePath.forgotPass} element={<ResetPasswordPage />} />
          </Route>
        </Routes>
        <Routes>
          <Route
            path={RoutePath.main}
            element={
              <TokenCheck>
                <Layout />
              </TokenCheck>
            }
          >
            <Route path={RoutePath.main} element={<Navigate to={RoutePath.booksAll} />} />
            <Route path={RoutePath.booksCategory} element={<MainPage />} />
            <Route path={RoutePath.bookPage} element={<BookPage />} />
            <Route path={RoutePath.terms} element={<Terms />} />
            <Route path={RoutePath.contract} element={<ContractOffer />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
