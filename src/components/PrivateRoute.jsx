import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PATH_LOGIN, PATH_SIGNUP } from '@/constants';
import { useSetShowUserIcon } from '@/hooks';

const PrivateRoute = ({ element: Element, showUserIcon = true }) => {
  useSetShowUserIcon(showUserIcon);
  const userState = useSelector((state) => state.user);
  useEffect(() => {
    const navigate = useNavigate();
    if (!userState.isLoggedIn) {
      navigate(PATH_LOGIN);
    } else if (!userState.isSignup) {
      navigate(PATH_SIGNUP);
    }
  }, [userState]);

  return <Element />;
};

export default PrivateRoute;
