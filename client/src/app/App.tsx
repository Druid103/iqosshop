import { Suspense, type JSX } from 'react';
import { BrowserRouter } from 'react-router';
import RouterProvider from './router/RouterProvider';
import { Provider } from 'react-redux';
import { store } from './store/store';
import InitProvider from '../app/InitProvaider/InitProvaider';
//import styles from './app/App.module.css';
import { injectStore } from '../shared/api/axiosInstance';
import LoadingPage from '../pages/notFoundPage/NotFoundPage';

function App(): JSX.Element {
  return (
    <>
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Provider store={store}>
          <InitProvider>
            <RouterProvider />
          </InitProvider>
        </Provider>
      </BrowserRouter>
    </Suspense>
    </>
  );
}
injectStore (store);
export default App;
