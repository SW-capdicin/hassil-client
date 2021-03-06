import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { PATH_PAYMENT, PATH_REFUND } from '@/constants';
import { defaultLine, separatorMoney, getDateTime, compareDate } from '@/utils';
import { getPointHistory } from '@/api';

const PointHistory = () => {
  const [pointHistory, setPointHistory] = useState([]);
  const userState = useSelector((state) => state.user);
  useEffect(() => {
    getPointHistory(userState.id).then((pointHistory) => {
      setPointHistory(pointHistory.sort(compareDate('createdAt', true)));
    });
  }, []);

  const Point = (point, key) => (
    <div key={key}>
      <Line />
      <Log>
        <Text>{getDateTime(point.createdAt).date}</Text>
        <Text>{point.content}</Text>
        <TextRight>{point.status ? '-' : '+'}{separatorMoney(point.amount)} 원</TextRight>
      </Log>
      <Line />
    </div>
  );

  return (
    <Container>
      <SubContainer>
        <PointText>{separatorMoney(userState.point)} 원</PointText>
        <ButtonContainer>
          <Link to={PATH_PAYMENT}>
            <Button>충전하기</Button>
          </Link>
          <Link to={PATH_REFUND}>
            <Button>환급하기</Button>
          </Link>
        </ButtonContainer>
      </SubContainer>
      <PointLog>{pointHistory.map((data, idx) => Point(data, idx))}</PointLog>
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

const Text = styled.span`
  min-width: 23%;
  text-align: center;
`;

const TextRight = styled.span`
  min-width: 23%;
  text-align: right;
`;

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
  width: 90%;
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
  ${defaultLine}
`;

export default PointHistory;
