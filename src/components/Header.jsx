import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Header = () => {
  const count = useSelector((state) => state.counter.value);
  return <Container>This is Header {count}</Container>;
};

const Container = styled.header`
  color: ${({ theme }) => theme.color.blue};
  margin-bottom: 8px;
`;

export default Header;
