import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from './pages/pages/MainPage';
import SignUpPage from './pages/pages/SignUpPage';
import SignInPage from './pages/pages/SignInPage';
import XPage from './pages/pages/XPage';
import ProtectedRouter from './pages/HOCs/ProtectedRouter';
import useUser from './hooks/useUser';

function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: '/',
          element: <MainPage user={user} />,
        },
        {
          path: '/my-xs',
          element: (
            <ProtectedRouter isAllowed={user.status === 'logged'} redirect="/auth/signin">
              <XPage user={user} />
            </ProtectedRouter>
          ),
        },
        {
          element: <ProtectedRouter isAllowed={user.status !== 'logged'} />,
          children: [
            {
              path: '/auth/signup',
              element: <SignUpPage signUpHandler={signUpHandler} />,
            },
            {
              path: '/auth/signin',
              element: <SignInPage signInHandler={signInHandler} />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
