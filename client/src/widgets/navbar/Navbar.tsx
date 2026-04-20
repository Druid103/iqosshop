import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink as RouterLink } from 'react-router-dom'; // Измените на react-router-dom
import { useAppDispatch, useAppSelector } from '../../shared/lib/Hooks';
import { AuthStatus } from '../../entities/auth/model/types';
import { logoutThunk } from '../../entities/auth/lib/thunks';
import { Button } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { Book } from 'react-bootstrap-icons';

export default function NavBar(): React.JSX.Element {
  const auth = useAppSelector((store) => store.auth.data);
  const dispatch = useAppDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
      <Container fluid className="px-3">
        <Navbar.Brand className={styles.brand}>
          <div className={styles.brandIconWrapper}>
            <Book size={32} className={styles.brandIcon} />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`me-auto ${styles.navLinks}`}>
            {' '}
            {/* Исправлено: добавлены обратные кавычки */}
            <Nav.Link as={RouterLink} to="/" className={styles.navLink}>
              Главная
            </Nav.Link>
            <Nav.Link as={RouterLink} to="/icoss" className={styles.navLink}>
              Устройства
            </Nav.Link>
            {auth.status === AuthStatus.guest ? (
              <>
                <Nav.Link as={RouterLink} to="/auth" className={styles.navLink}>
                  Вход
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={RouterLink} to="/addicos" className={styles.navLink}>
                  Добавить устройство
                </Nav.Link>
                <Nav.Link as={RouterLink} to="/basket" className={styles.navLink}>
                  Корзина
                </Nav.Link>
                <Button
                  variant="link"
                  onClick={() => {
                    void dispatch(logoutThunk());
                  }}
                  className={styles.navLink}
                >
                  Выход
                </Button>
              </>
            )}
          </Nav>

          {auth.status === AuthStatus.authenticated && (
            <div className={styles.userInfo}>{auth.user?.name}</div> // Добавлен optional chaining
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
