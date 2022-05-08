import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PATH_PAYMENT, PATH_REFUND } from '@/constants';
import { getColor } from '@/utils';

const PointHistory = () => {
  const tempData = [
    { date: '04.12', name: '포인트 충전', price: 30000 },
    { date: '04.11', name: '아주대 스터디 참여', price: -30000 },
    { date: '04.11', name: '포인트 충전', price: 30000 },
  ];

  const Point = (point) => (
    <>
      <Line />
      <Log>
        <Text>{point.date}</Text>
        <Text>{point.name}</Text>
        <Text>{point.price} 원</Text>
      </Log>
      <Line />
    </>
  );

  return (
    <Container>
      <SubContainer>
        <PointText>30000원</PointText>
        <ButtonContainer>
          <Link to={PATH_PAYMENT}>
            <Button>충전하기</Button>
          </Link>
          <Link to={PATH_REFUND}>
            <Button>환급하기</Button>
          </Link>
        </ButtonContainer>
      </SubContainer>
      <PointLog>{tempData.map((data) => Point(data))}</PointLog>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span``;

const PointText = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 15px;
  border-style: none;
  cursor: pointer;
`;

const PointLog = styled.div`
  width: 20rem;
  align-self: center;
`;

const Log = styled.p`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${getColor('gray')};
  position: absolute;
  left: 0;
`;

export default PointHistory;
