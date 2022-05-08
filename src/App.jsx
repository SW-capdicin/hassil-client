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
  StudyDetail,
  StudyParticipation,
  Payment,
  Refund,
  MyPage,
  PointHistory,
} from '@/pages';
import { Header, PublicRoute } from '@/components';
import {
  PATH_HOME,
  PATH_LOGIN,
  PATH_SIGNUP,
  PATH_USER_EDIT,
  PATH_SIGNUP_COMPLETE,
  PATH_NOT_FOUND,
  PATH_STUDY_CREATE,
  PATH_STUDY_DETAIL,
  PATH_STUDY_PARTICIPATION,
  PATH_PAYMENT,
  PATH_REFUND,
  PATH_MYPAGE,
  PATH_POINT_HISTORY,
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
              element={<PublicRoute element={Signup} showUserIcon={false} />}
            />
            <Route
              path={PATH_USER_EDIT}
              element={<PublicRoute element={Signup} showUserIcon={true} />}
            />
            <Route
              path={PATH_SIGNUP_COMPLETE}
              element={
                <PublicRoute element={SignupComplete} showUserIcon={false} />
              }
            />
            <Route
              path={PATH_MYPAGE}
              element={<PublicRoute element={MyPage} />}
            />
            <Route
              path={PATH_POINT_HISTORY}
              element={<PublicRoute element={PointHistory} />}
            />
            <Route
              path={PATH_STUDY_CREATE}
              element={<PublicRoute element={StudyCreate} />}
            />
            <Route
              path={PATH_STUDY_DETAIL + '/:id'}
              element={<PublicRoute element={StudyDetail} />}
            />
            <Route
              path={PATH_STUDY_PARTICIPATION}
              element={<PublicRoute element={StudyParticipation} />}
            />
            <Route
              path={PATH_PAYMENT}
              element={<PublicRoute element={Payment} />}
            />
            <Route
              path={PATH_REFUND}
              element={<PublicRoute element={Refund} />}
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
