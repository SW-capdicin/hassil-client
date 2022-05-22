import React from 'react';
import { useSelector } from 'react-redux';
import { TYPE_USER_CAFE_OWNER } from '@/constants';
import { UserHome, CafeHome } from '@/components';

const Home = () => {
  const userState = useSelector((state) => state.user);
  return userState.type === TYPE_USER_CAFE_OWNER ? <CafeHome /> : <UserHome />;
};

export default Home;
