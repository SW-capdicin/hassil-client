import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { defaultLine, getDateTime, getColor, compareDate } from '@/utils';
import { getReservation } from '@/api';
import { IoMdAddCircle } from 'react-icons/io';

const StudyReservationList = () => {
  const [reservationList, setReservationList] = useState([]);
  const location = useLocation();
  const params = useParams();
  const curPath = location.pathname;

  useEffect(() => {
    // 가장 나중에 생성한 순으로 정렬
    getReservation(params.id).then((reservationList) =>
      setReservationList(reservationList.sort(compareDate('createdAt', true))),
    );
  }, []);

  ////temp
  useEffect(() => {
    const idList = reservationList.map((item) => item.id);
    console.log('scheduleId : ', idList);
  }, [reservationList]);

  const checkIsReserveStudyRoom = (reserve) =>
    reserve.StudyRoomSchedules.length > 0;

  const rmTimezone = (datetime) =>
    `${getDateTime(datetime).date}T${getDateTime(datetime).time}`;
  const formatHour = (hour) => `${String(hour).padStart(2, '0')}:00`;
  const getTerm = (schedule) => {
    const sortedTime = schedule
      .sort(compareDate('datetime'))
      .map((a) => a.datetime);

    return `${getDateTime(sortedTime[0]).date} (${
      getDateTime(sortedTime[0]).time
    } ~ ${formatHour(
      new Date(rmTimezone(sortedTime[schedule.length - 1])).getHours() + 1,
    )})`;
  };

  const Reserve = (reserve, key) => {
    if (!checkIsReserveStudyRoom(reserve) && !reserve.Meeting) return null;
    const body = checkIsReserveStudyRoom(reserve) ? (
      <Log>
        <Text>{getTerm(reserve.StudyRoomSchedules)}</Text>
        <Text>스터디룸 미팅</Text>
      </Log>
    ) : (
      <Log>
        <Text>{`${getDateTime(reserve.Meeting.datetime).date} (${
          getDateTime(reserve.Meeting.datetime).time
        })`}</Text>
        <Text>일반 미팅</Text>
      </Log>
    );
    return (
      <div key={key}>
        <Line />
        <CLink
          to={curPath + '/' + reserve.id + '/detail'}
          state={{ studyId: params.id }}
        >
          <div>{body}</div>
        </CLink>
        <Line />
      </div>
    );
  };

  return (
    <Container>
      <SubContainer>
        <Title>스터디 예약 목록</Title>
      </SubContainer>
      <ReservationLog>
        {reservationList.map((data, idx) => Reserve(data, idx))}
      </ReservationLog>
      <Link to={curPath + '/requirement'}>
        <CuIoMdAddCircle />
      </Link>
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
const CLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.black};
`;
const Line = styled.div`
  ${defaultLine}
`;

const CuIoMdAddCircle = styled(IoMdAddCircle)`
  position: fixed;
  width: 4rem;
  height: 4rem;
  bottom: 5%;
  right: 5%;
  color: ${getColor('blue')};
`;

export default StudyReservationList;
