import { headerActions } from '@/store/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useSetShowUserIcon = (showUserIcon = true) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(headerActions.setShowUserIcon({ showUserIcon }));
  }, []);
};

export default useSetShowUserIcon;
