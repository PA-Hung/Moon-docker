import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { BrowserRouter } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';
import AppRoutes from './components/Routes/AppRoutes';
import 'nprogress/nprogress.css'
import { PersistGate } from 'redux-persist/integration/react'
import "react-awesome-lightbox/build/style.css"
// import i18n (needs to be bundled ;))
import './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <ProSidebarProvider>
            <Suspense fallback="...is loading">
              <AppRoutes />
            </Suspense>
          </ProSidebarProvider>
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
