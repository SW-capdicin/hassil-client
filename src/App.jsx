import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { GlobalStyle, Theme } from '@/style';
import {
  Home,
  Login,
  Signup,
  SignupComplete,
  NotFound,
  StudyCreate,
  Payment,
  Refund,
  MyPage,
  Main,
} from '@/pages';
import { Header, PublicRoute, PrivateRoute } from '@/components';
import {
  PATH_HOME,
  PATH_LOGIN,
  PATH_SIGNUP,
  PATH_SIGNUP_COMPLETE,
  PATH_NOT_FOUND,
  PATH_STUDY_CREATE,
  PATH_PAYMENT,
  PATH_REFUND,
  PATH_MYPAGE,
  PATH_MAIN,
} from '@/constants';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={PATH_HOME} element={<PublicRoute element={Home} />} />
            <Route
              path={PATH_LOGIN}
              element={<PublicRoute element={Login} showUserIcon={false} />}
            />
            <Route
              path={PATH_SIGNUP}
              element={<PrivateRoute element={Signup} showUserIcon={false} />}
            />
            <Route
              path={PATH_SIGNUP_COMPLETE}
              element={
                <PrivateRoute element={SignupComplete} showUserIcon={false} />
              }
            />
            <Route
              path={PATH_MAIN}
              element={<PrivateRoute element={Main} showUserIcon={false} />}
            />
            <Route
              path={PATH_MYPAGE}
              element={<PrivateRoute element={MyPage} />}
            />
            <Route
              path={PATH_STUDY_CREATE}
              element={<PrivateRoute element={StudyCreate} />}
            />
            <Route
              path={PATH_PAYMENT}
              element={<PrivateRoute element={Payment} />}
            />
            <Route
              path={PATH_REFUND}
              element={<PrivateRoute element={Refund} />}
            />
            <Route
              path={PATH_NOT_FOUND}
              element={<PublicRoute element={NotFound} showUserIcon={false} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
