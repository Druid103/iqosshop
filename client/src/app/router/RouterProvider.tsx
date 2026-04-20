// router/RouterProvider.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Измените на react-router-dom
import { useSelector } from 'react-redux';
import Layout from '../Layout';
import MainPage from '../../pages/mainPage/MainPage';
import ProtectedRoute from '../../shared/lib/ProtectedRouter';
import type { RootState } from '../store/store';

enum AuthStatus {
  authenticated = 'authenticated',
  unauthenticated = 'unauthenticated',
  loading = 'loading',
}

function RouterProvider(): React.JSX.Element {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const status = accessToken ? AuthStatus.authenticated : AuthStatus.unauthenticated;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        
        <Route
          element={
            <ProtectedRoute isAllowed={status === AuthStatus.authenticated} redirectTo="/" />
          }
        >
          <Route path="/basket" element={<div>Basket Page</div>} />
          <Route path="/favorites" element={<div>Favorites Page</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default RouterProvider;