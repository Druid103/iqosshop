import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../Layout';
import MainPage from '../../pages/mainPage/MainPage';
import ProtectedRoute from '../../shared/lib/ProtectedRouter';

function RouterProvider(): React.JSX.Element {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
       
        <Route
          element={
            <ProtectedRoute isAllowed={status === AuthStatus.authenticated} redirectTo="/" />
          }
        >
          
        </Route>
      </Route>
    </Routes>
  );
}

export default RouterProvider;