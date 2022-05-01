import React from 'react';
import { useSetShowUserIcon } from '@/hooks';

const PublicRoute = ({ element: Element, showUserIcon = true }) => {
  useSetShowUserIcon(showUserIcon);

  return <Element />;
};

export default PublicRoute;
