import { headerActions } from '@/store/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const useSetShowUserIcon = (showUserIcon = true) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(headerActions.setShowUserIcon({ showUserIcon }));
  }, [location]);
};

export default useSetShowUserIcon;
