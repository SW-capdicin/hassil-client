import React from 'react';
import styled from 'styled-components';
import logo from '@/img/logo.png';
import { CgProfile } from 'react-icons/cg';

const Header = () => {
  return (
    <Container>
      <LogoImg />
      {false && <CgProfile size={30} />}
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
