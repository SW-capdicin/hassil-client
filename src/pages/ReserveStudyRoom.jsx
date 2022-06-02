import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { emptyimg } from '@/img';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  findStudy,
  getOneStudyCafe,
  getStudyRoomsInStudyCafe,
  createReservation,
  getStudyRoomSchedulesOfDate,
} from '@/api';
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import { ko } from 'date-fns/esm/locale';

const ReserveStudyRoom = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [study, setStudy] = useState({});
  const [studyCafe, setStudyCafe] = useState({});
  const [studyRooms, setStudyRooms] = useState([]);
  const [isStudyRoomSelected, setIsStudyRoomSelected] = useState(false);
  const [studyRoom, setStudyRoom] = useState({
    id: null,
    maxPerson: 0,
    name: null,
    pricePerHour: null,
    src: null,
    studyCafeId: null,
  });
  const { id, maxPerson, name, pricePerHour } = studyRoom;
  const [selectPersonnel, setSelectPersonnel] = useState([]);
  const [personnel, setPersonnel] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [studyRoomSchedules, setStudyRoomSchedules] = useState([]);

  const studyId = location.state.studyId;
  const StudyCafeId = params.id;

  const findOneStudyCafe = async () => {
    const Cafe = await getOneStudyCafe(StudyCafeId);
    setStudyCafe(Cafe);
  };

  const getStudyRooms = async () => {
    const StudyRooms = await getStudyRoomsInStudyCafe(StudyCafeId);
    setStudyRooms(StudyRooms);
  };

  const toggleIsStudyRoomSelected = (InfoOfStudyRoom) => {
    console.log('isStudyRoomSelected : ', isStudyRoomSelected);
    setIsStudyRoomSelected((prevInputs) => !prevInputs);
    if (isStudyRoomSelected == false) {
      setStudyRoom(InfoOfStudyRoom);
    } else {
      setStudyRoom({
        id: null,
        maxPerson: 0,
        name: null,
        pricePerHour: null,
        src: null,
        studyCafeId: null,
      });
      setStudyRoomSchedules([]);
    }
  };

  const handleChange = (event) => {
    setPersonnel(event.target.value);
  };
  const getStudyInfo = async () => {
    const StudyInfo = await findStudy(studyId);
    setStudy(StudyInfo);
  };

  const getStudyRoomSchedules = async () => {
    const date = startDate
      .toLocaleDateString('ko', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('T')[0]
      .replace(/(\s*)/g, '')
      .replaceAll('.', '-')
      .replace(/-$/, '');

    const StudyRoomSchedules = await getStudyRoomSchedulesOfDate(
      StudyCafeId,
      id,
      { date: date },
    );
    StudyRoomSchedules.forEach((currentElement) => {
      currentElement.selected = false;
    });
    setStudyRoomSchedules(StudyRoomSchedules);
    console.log('date : ', date);
    console.log('startDate : ', startDate);
    console.log('StudyRoomSchedules : ', StudyRoomSchedules);
  };

  const reserveStudyRoom = async () => {
    const idOfstudyRoomSchedules = studyRoomSchedules
      .filter((studyRoom) => studyRoom.selected == true)
      .map((studyRoom) => studyRoom.id);

    const Schedules = [];
    idOfstudyRoomSchedules.forEach((element) => {
      Schedules.push({ id: element });
    });
    const pricePerPerson = Schedules.length * pricePerHour;
    const data = {
      status: 0,
      personCnt: personnel,
      studyRoomSchedules: Schedules,
      pricePerPerson: pricePerPerson,
    };

    console.log('data : ', data);
    const responseSchedule = await createReservation(studyId, data);
    // console.log(responseSchedule);
    for (var key in responseSchedule) {
      console.log('attr: ' + key + ', value: ' + responseSchedule[key]);
    }
    navigate('/');
  };

  const toggleIsTimeSelected = (item) => {
    console.log('item.id : ', item.id);
    setStudyRoomSchedules(
      studyRoomSchedules.map((studyRoom) =>
        studyRoom.id === item.id
          ? { ...studyRoom, selected: !studyRoom.selected }
          : studyRoom,
      ),
    );
  };
  useEffect(() => {
    getStudyInfo();
    findOneStudyCafe();
    getStudyRooms();
  }, []);

  useEffect(() => {
    let temp_arr = [];
    if (isStudyRoomSelected) {
      for (let index = 1; index <= maxPerson; index++) {
        temp_arr.push(index);
      }
      setSelectPersonnel([...temp_arr]);
    } else {
      setSelectPersonnel([]);
    }
  }, [isStudyRoomSelected]);

  useEffect(() => {
    if (studyRoom.id != null) {
      getStudyRoomSchedules();
    }
  }, [startDate]);
  return (
    <Container>
      <Img
        src={
          studyCafe.StudyCafeImages
            ? `${studyCafe.StudyCafeImages[0].src}`
            : emptyimg
        }
      />
      <StudyCafeHeader>
        <StudyCafeName>{studyCafe.name}</StudyCafeName>
      </StudyCafeHeader>
      <StudyCafeBody>
        {isStudyRoomSelected === false ? (
          <>
            <StudyRooms>
              {studyRooms.map((item) => {
                return (
                  <StudyRoom
                    key={item.id}
                    onClick={() => toggleIsStudyRoomSelected(item)}
                  >
                    {`${item.name}(다인실)`} {`${item.maxPerson}인실`}{' '}
                    {`시간당 ${item.pricePerHour}`}
                  </StudyRoom>
                );
              })}
            </StudyRooms>
          </>
        ) : (
          <SubContainer>
            <StudyRoomInfo onClick={toggleIsStudyRoomSelected}>
              {`${name}(다인실)`} *다른 스터디룸 선택
            </StudyRoomInfo>
            <SDatePickerContainer>
              <Text>일정을 선택하세요</Text>
              <SDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                startDate={startDate}
                includeDateIntervals={[
                  {
                    start: subDays(new Date(study.startDate), 1),
                    end: new Date(study.endDate),
                  },
                ]}
                locale={ko}
                minDate={new Date()}
                dateFormat="yyyy년 MM월 dd일"
              />

              <TimeContainer>
                {studyRoomSchedules.map((item) => (
                  <Time
                    key={item.id}
                    onClick={() => toggleIsTimeSelected(item)}
                    isTimeSelected={item.selected}
                  >
                    {`${item.datetime.split('T')[1].split(':')[0]}시`}
                  </Time>
                ))}
              </TimeContainer>
            </SDatePickerContainer>
            <SelectPersonnel>
              <Text>인원/수량을 선택하세요.</Text>
              <Select
                name="personnel"
                value={personnel}
                onChange={handleChange}
              >
                {selectPersonnel.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
              <Text>
                인원/수량 선택은 일정 선택 후 가능합니다.일정을 먼저 선택해
                주세요.
              </Text>
            </SelectPersonnel>
          </SubContainer>
        )}
      </StudyCafeBody>
      {isStudyRoomSelected && (
        <>
          <FixedDiv>
            <CreateBtn onClick={reserveStudyRoom}>
              <BtnText>예약하기</BtnText>
            </CreateBtn>
          </FixedDiv>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Img = styled.img`
  width: 90vw;
  height: 10rem;
  border-radius: 10px;
  align-self: center;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;
const StudyCafeHeader = styled.div`
  display: flex;
  width: 90vw;
  height: 2rem;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const StudyCafeName = styled.div`
  width: 100%;
  text-align: center;
`;

const StudyCafeBody = styled.div`
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: auto;
`;

const StudyRooms = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: auto;
  border-width: 1px;
  border-style: solid none none none;
  border-color: ${({ theme }) => theme.color.gray};
`;

const StudyRoom = styled.div`
  display: flex;
  width: 100vw;
  height: 3rem;
  border-width: 1px;
  border-style: none none solid none;
  border-color: ${({ theme }) => theme.color.gray};
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem 1rem 0rem;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  height: 90vw;
`;
const StudyRoomInfo = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.color.gray};
`;

const CreateBtn = styled.button`
  background-color: ${({ theme }) => theme.color.blue};
  border: 0;
  outline: 0;
  width: 14rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 20px;
  cursor: pointer;
  margin: auto;
`;
const BtnText = styled.div`
  color: ${({ theme }) => theme.color.white};
  font-style: normal;
  font-weight: 700;
  font-size: larger;
`;

const SDatePickerContainer = styled.div`
  display: flex;
  width: 90%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;
const SDatePicker = styled(DatePicker)`
  align-items: center;
  text-align: center;
  width: 100%;
  padding-left: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.color.gray};
  border-radius: 20px;
  height: 2rem;
  font-size: 15px;
`;
const SelectPersonnel = styled.div`
  display: flex;
  flex-direction: column;

  width: 90%;
  height: 50%;
  justify-content: space-between;
`;
const Select = styled.select`
  padding-left: 5px;
  text-align: center;
  height: 2rem;
  border-color: ${({ theme }) => theme.color.gray};
  font-size: 15px;
`;

const Text = styled.div``;
const TimeContainer = styled.div`
  display: flex;

  overflow: auto;
  white-space: nowrap;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
`;
const Time = styled.div`
  display: flex;
  align-items: center;
  border: solid;
  border-color: ${({ theme }) => theme.color.lightBlue};
  border-radius: 10px;
  padding: 1rem;
  height: auto;
  border-width: 0.5px;
  margin-right: 1rem;
  background-color: ${(props) =>
    props.isTimeSelected == false
      ? ({ theme }) => theme.color.offwhite
      : ({ theme }) => theme.color.lightBlue};
  color: ${(props) =>
    props.isTimeSelected == false
      ? ({ theme }) => theme.color.black
      : ({ theme }) => theme.color.offwhite};
`;
export default ReserveStudyRoom;
