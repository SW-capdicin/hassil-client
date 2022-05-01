import React from 'react';
import styled from 'styled-components';
import logo from '@/img/check_circle_fill.png';
import { useSetShowUserIcon } from '@/hooks';
import { Link } from 'react-router-dom';
import { PATH_HOME } from '@/constants';

const SignupComplete = () => {
  useSetShowUserIcon(false);

  return (
    <Container>
      <SignupLogo />
      <Title>회원 가입 완료</Title>
      <StartBtn>
        <Link to={PATH_HOME}>
          <BtnText>스터디 시작하기</BtnText>
        </Link>
      </StartBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 18rem;
  justify-content: center;
  align-items: center;
`;

const SignupLogo = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  width: 10rem;
  height: 12rem;
`;
const Title = styled.h3`
  height: 5rem;
  color: ${({ theme }) => theme.color.black};
`;

const StartBtn = styled.button`
  background-color: ${({ theme }) => theme.color.blue};
  border: 0;
  outline: 0;
  width: 14rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  align-self: center;
  cursor: pointer;
  a {
    text-decoration: none;
  }
`;

const BtnText = styled.div`
  color: ${({ theme }) => theme.color.white};
`;

export default SignupComplete;
