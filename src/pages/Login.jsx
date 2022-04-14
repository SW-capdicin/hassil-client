import React from 'react';
import styled from 'styled-components';
import logo from '@/img/logo1.png';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <Container>
      <Logo>
        <Text>Study All - in -One Platform</Text>
        <LogoImg />
        <LoginBtn>
          <FcGoogle />
          <BtnText>Google로 계속</BtnText>
        </LoginBtn>
      </Logo>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.blue};
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  top: 30%;
  align-items: center;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.color.white};
`;

const LogoImg = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 300px;
  height: 100px;
`;

const LoginBtn = styled.div`
  background-color: #ffffff;
  width: 200px;
  height: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
`;

const BtnText = styled.div`
  margin-left: 5px;
`;

export default Login;
