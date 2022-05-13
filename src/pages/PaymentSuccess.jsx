import React from 'react';
import styled from 'styled-components';
import logo from '@/img/check_circle_fill.png';
import { Link } from 'react-router-dom';
import { PATH_POINT_HISTORY } from '@/constants';
import { getColor } from '@/utils';

const PaymentSuccess = () => {
  return (
    <Container>
      <SignupLogo />
      <Title>포인트 결제 완료</Title>
      <StartBtn>
        <Link to={PATH_POINT_HISTORY}>
          <BtnText>포인트 내역 보기</BtnText>
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
  color: ${getColor('black')};
`;

const StartBtn = styled.button`
  background-color: ${getColor('blue')};
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
  color: ${getColor('white')};
`;

export default PaymentSuccess;
