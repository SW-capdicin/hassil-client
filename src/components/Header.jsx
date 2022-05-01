import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PATH_HOME } from '@/constants';
import logo from '@/img/logo.png';
import { CgProfile } from 'react-icons/cg';
import { getUserInfo } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@/store/actions';

const Header = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const headerState = useSelector((state) => state.header);

  useEffect(() => {
    getUserInfo().then((userInfo) => {
      if (userInfo.id) {
        userInfo.nickname
          ? dispatch(
              userActions.setUserInfo({
                id: userInfo.id,
                isLoggedIn: true,
                isSignup: true,
                nickname: userInfo.nickname,
              }),
            )
          : dispatch(
              userActions.setUserInfo({
                id: userInfo.id,
                isLoggedIn: true,
                isSignup: false,
              }),
            );
      } else {
        dispatch(userActions.setUserInfo({ isLoggedIn: false }));
      }
    });
  }, []);

  return (
    <Container>
      {userState.isLoggedIn && !userState.isSignup ? (
        <LogoImg />
      ) : (
        <Link to={PATH_HOME}>
          <LogoImg />
        </Link>
      )}
      {headerState.showUserIcon && <CgProfile size={30} />}
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const LogoImg = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  width: 10rem;
  height: 3rem;
`;

export default Header;
