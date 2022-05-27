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
  JoinedStudyList,
  JoinedStudyDetail,
  StudyParticipation,
  Payment,
  Refund,
  MyPage,
  PointHistory,
  StudyReservationList,
  StudyReservationCreation,
  ReservationStatusDetail,
  PaymentSuccess,
  PaymentFail,
  StudyRoomRequirement,
  StudyRoomReservation,
  StudyRecommendCreate,
  StudyCafeCreate,
} from '@/pages';
import { Header, PublicRoute, PrivateRoute } from '@/components';
import {
  PATH_HOME,
  PATH_LOGIN,
  PATH_SIGNUP,
  PATH_USER_EDIT,
  PATH_SIGNUP_COMPLETE,
  PATH_NOT_FOUND,
  PATH_STUDY_CREATE,
  PATH_STUDY_DETAIL,
  PATH_JOINED_STUDY_LIST,
  PATH_JOINED_STUDY_DETAIL,
  PATH_STUDY_PARTICIPATION,
  PATH_PAYMENT,
  PATH_REFUND,
  PATH_MYPAGE,
  PATH_POINT_HISTORY,
  PATH_STUDY_RESERVATION_LIST,
  PATH_STUDY_RESERVATION_CREATION,
  PATH_RESERVATION_STATUS_DETAIL,
  PATH_STUDYROOM_REQUIREMENT,
  PATH_STUDYROOM_RESERVATION_SELECTION,
  PATH_STUDYROOM_RECOMMEND_CREATE,
  PATH_PAYMENT_SUCCESS,
  PATH_PAYMENT_FAIL,
  PATH_STUDYCAFE_CREATE,
} from '@/constants';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path={PATH_HOME}
              element={<PublicRoute element={Home} showUserIcon={true} />}
            />
            <Route
              path={PATH_LOGIN}
              element={<PublicRoute element={Login} showUserIcon={false} />}
            />
            <Route
              path={PATH_SIGNUP}
              element={<PrivateRoute element={Signup} showUserIcon={false} />}
            />
            <Route
              path={PATH_USER_EDIT}
              element={<PrivateRoute element={Signup} showUserIcon={true} />}
            />
            <Route
              path={PATH_SIGNUP_COMPLETE}
              element={
                <PrivateRoute element={SignupComplete} showUserIcon={false} />
              }
            />
            <Route
              path={PATH_MYPAGE}
              element={<PrivateRoute element={MyPage} />}
            />
            <Route
              path={PATH_POINT_HISTORY}
              element={<PrivateRoute element={PointHistory} />}
            />
            <Route
              path={PATH_STUDY_CREATE}
              element={<PrivateRoute element={StudyCreate} />}
            />
            <Route
              path={PATH_STUDYCAFE_CREATE}
              element={<PrivateRoute element={StudyCafeCreate} />}
            />
            <Route
              path={PATH_STUDY_DETAIL + '/:id'}
              element={<PublicRoute element={StudyDetail} />}
            />
            <Route
              path={PATH_JOINED_STUDY_LIST}
              element={<PrivateRoute element={JoinedStudyList} />}
            />
            <Route
              path={PATH_JOINED_STUDY_DETAIL + '/:id'}
              element={<PrivateRoute element={JoinedStudyDetail} />}
            />
            <Route
              path={PATH_STUDY_PARTICIPATION}
              element={<PrivateRoute element={StudyParticipation} />}
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
              path={PATH_STUDY_RESERVATION_LIST}
              element={<PrivateRoute element={StudyReservationList} />}
            />
            <Route
              path={PATH_STUDYROOM_REQUIREMENT}
              element={<PrivateRoute element={StudyRoomRequirement} />}
            />
            <Route
              path={PATH_STUDY_RESERVATION_CREATION}
              element={<PrivateRoute element={StudyReservationCreation} />}
            />
            <Route
              path={PATH_STUDYROOM_RESERVATION_SELECTION}
              element={<PrivateRoute element={StudyRoomReservation} />}
            />
            <Route
              path={PATH_STUDYROOM_RECOMMEND_CREATE}
              element={<PrivateRoute element={StudyRecommendCreate} />}
            />
            <Route
              path={PATH_RESERVATION_STATUS_DETAIL}
              element={<PrivateRoute element={ReservationStatusDetail} />}
            />
            <Route
              path={PATH_PAYMENT_SUCCESS}
              element={<PrivateRoute element={PaymentSuccess} />}
            />
            <Route
              path={PATH_PAYMENT_FAIL}
              element={<PrivateRoute element={PaymentFail} />}
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
