// App.tsx
import { Suspense, type JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { injectStore } from '../shared/api/axiosInstance';
import LoadingPage from '../pages/notFoundPage/NotFoundPage';
import RouterProvider from './router/RouterProvider';
// import InitProvider from './InitProvaider/InitProvaider'; // Временно отключите

injectStore(store);

function App(): JSX.Element {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Provider store={store}>
          {/* <InitProvider> */}
          <RouterProvider />
          {/* </InitProvider> */}
        </Provider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
