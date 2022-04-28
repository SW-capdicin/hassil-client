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
} from '@/pages';
import { Header } from '@/components';
import {
  PATH_HOME,
  PATH_LOGIN,
  PATH_SIGNUP,
  PATH_SIGNUP_COMPLETE,
  PATH_NOT_FOUND,
  PATH_STUDY_CREATE,
} from '@/constants';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={PATH_HOME} element={<Home />} />
            <Route path={PATH_LOGIN} element={<Login />} />
            <Route path={PATH_SIGNUP} element={<Signup />} />
            <Route path={PATH_SIGNUP_COMPLETE} element={<SignupComplete />} />
            <Route path={PATH_STUDY_CREATE} element={<StudyCreate />} />
            <Route path={PATH_NOT_FOUND} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
