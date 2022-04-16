import React from 'react';
import styled from 'styled-components';
import logo from '@/img/logo.png';

const Header = () => {
  return (
    <Container>
      <LogoImg></LogoImg>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LogoImg = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 20rem;
  height: 6rem;
`;

export default Header;
