import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './ui/NavBar';
import Loader from './HOCs/Loader';

export default function Layout({ user, logoutHandler }) {
  return (
    <Loader showSpinner={user.status === 'fetching'}>
      <Container>
        <NavBar user={user} logoutHandler={logoutHandler} />
        <Outlet />
      </Container>
    </Loader>
  );
}
