import React from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

const StudyRoomRequirement = () => {
  const location = useLocation();
  const curPath = location.pathname;
  console.log(curPath);
  return (
    <Container>
      <Link to={curPath + '/selection'}>
        <DontNeedReservation> 스터디룸 예약 필요해요</DontNeedReservation>
      </Link>

      <Link to={curPath + '/creation'}>
        <DontNeedReservation>스터디룸 예약 필요 없어요</DontNeedReservation>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 20%;
  height: 60vh;
  width: 375px;
  a:link {
    color: ${({ theme }) => theme.color.black};
    text-decoration: none;
    display: flex;
    height: 40%;
    width: 80%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: solid 1px;
    border-radius: 30px;
    border-color: ${({ theme }) => theme.color.gray};
    font-weight: bold;
    font-size: larger;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  a:visited {
    color: ${({ theme }) => theme.color.black};
    border-color: ${({ theme }) => theme.color.gray};
  }
`;
const NeedReservation = styled.div`
  display: flex;
  height: 40%;
  width: 80%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 1px;
  border-radius: 30px;
  border-color: ${({ theme }) => theme.color.gray};
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
  font-size: larger;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
const DontNeedReservation = styled.div``;
export default StudyRoomRequirement;
