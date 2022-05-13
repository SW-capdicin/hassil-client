import React from 'react';
import styled from 'styled-components';
import { fail } from '@/img';
import { Link } from 'react-router-dom';
import { PATH_HOME } from '@/constants';
import { getColor } from '@/utils';

const PaymentFail = () => {
  return (
    <Container>
      <SignupLogo />
      <Title>포인트 결제를 실패했습니다!</Title>
      <Text>다시 시도해주세요.</Text>
      <StartBtn>
        <Link to={PATH_HOME}>
          <BtnText>홈으로 이동하기</BtnText>
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
  background-image: url(${fail});
  background-repeat: no-repeat;
  background-position: center;
  width: 10rem;
  height: 12rem;
`;
const Title = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${getColor('black')};
`;

const Text = styled.h3`
  margin-bottom: 1rem;
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

export default PaymentFail;
