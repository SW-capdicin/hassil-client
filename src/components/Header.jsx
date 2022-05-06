import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PATH_HOME, PATH_MYPAGE } from '@/constants';
import logo from '@/img/logo.png';
import profile from '@/img/profile.png';
import { getUserInfo } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@/store/actions';

const Header = () => {
  const dispatch = useDispatch();
  const headerState = useSelector((state) => state.header);
  const userState = useSelector((state) => state.user);

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
    <Container showUserIcon={headerState.showUserIcon}>
      <Link to={PATH_HOME}>
        <LogoImg />
      </Link>
      {userState.isLoggedIn ? <div>로그인 성공</div> : <div>로그인 전</div>}
      {headerState.showUserIcon && (
        <Link to={PATH_MYPAGE}>
          <ProfileImg />
        </Link>
      )}
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.showUserIcon ? 'space-between' : 'center'};
`;

const LogoImg = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  width: 10rem;
  height: 3rem;
`;

const ProfileImg = styled.div`
  background-image: url(${profile});
  background-repeat: no-repeat;
  background-position: center;
  width: 3rem;
  height: 3rem;
`;

export default Header;
