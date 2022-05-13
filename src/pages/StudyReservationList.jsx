import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { defaultLine, getDateTime } from '@/utils';
import { getReservation } from '@/api';

const StudyReservationList = () => {
  const [reservationList, setReservationList] = useState([]);
  const userState = useSelector((state) => state.user);

  const compareDate = (objName, desc) => {
    return (a, b) => desc 
      ? new Date(b[objName]) - new Date(a[objName])
      : new Date(a[objName]) - new Date(b[objName])
  }

  useEffect(() => {
    // 가장 나중에 생성한 순으로 정렬
    getReservation(userState.id).then((reservationList) => setReservationList(reservationList.sort(compareDate('createdAt', true))));
  }, []);

  const checkIsReserveStudyRoom = (reserve) => reserve.StudyRoomSchedules.length > 0;

  const getTerm = (schedule) => {
    const sortedTime = schedule.sort(compareDate('time')).map(a => a.time);
    return `${getDateTime(sortedTime[0]).date} (${getDateTime(sortedTime[0]).time} ~ ${getDateTime(sortedTime[schedule.length - 1]).time})`;
  }

  const Reserve = (reserve, key) => {
    const body = checkIsReserveStudyRoom(reserve) ? (
      <Log>
        <Text>{getTerm(reserve.StudyRoomSchedules)}</Text>
        <Text>스터디룸 미팅</Text>
      </Log>
    ) : (
      <Log>
        <Text>{`${getDateTime(reserve.Meeting.startTime).date} (${getDateTime(reserve.Meeting.startTime).time})`}</Text>
        <Text>일반 미팅</Text>
      </Log>
    )
    return (
      <div key={key}>
        <Line />
          <Log>
            {body}
          </Log>
        <Line />
      </div>
    )
  };

  return (
    <Container>
      <SubContainer>
        <Title>스터디 예약 목록</Title>
      </SubContainer>
      <ReservationLog>{reservationList.map((data, idx) => Reserve(data, idx))}</ReservationLog>
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
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
`;

const Text = styled.span``;

const Title = styled.div`
  font-size: 1.2rem;
  margin: 1rem;
`;

const ReservationLog = styled.div`
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
  ${defaultLine}
`;

export default StudyReservationList;
