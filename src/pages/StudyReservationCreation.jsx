import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PATH_JOINED_STUDY_DETAIL } from '@/constants';
import { getUserInfo, findStudy, createReservation } from '@/api';

const { kakao, daum } = window;
const StudyReservationCreation = () => {
  const [address, setAddress] = useState(''); // 주소
  const [lat, setLat] = useState(0); // 위도
  const [lng, setLng] = useState(0); // 경도

  const [startDate, setStartDate] = useState(new Date()); // 진행일
  const [startTime, setStartTime] = useState(new Date()); // 시작 시간
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  //filterPassedTime
  const filterPassedTime = (time) => {
    const currentTime = new Date(); // 5-14 17:24
    const selectedDate = new Date(time); // 5-1
    // console.log(selectedDate.getDate());
    if (startDate.getDate() == selectedDate.getDate()) {
      return currentTime.getTime() < selectedDate.getTime();
    } else {
      return '00:00';
    }
  };

  //스터디 예약하기
  const reserveStudy = async () => {
    const reservationPerson = await getUserInfo();
    console.log(reservationPerson);
    console.log(reservationPerson.name);
    console.log(params);
    // 위도, 경도, 스터디 진행날짜, 시작 시간, 예약한 사람
    // reservationPersonName, status, longitude, latitude, address, startTime
    const reservationTime =
      startDate.toISOString().split('T')[0] +
      ' ' +
      startTime.toTimeString().split(' ')[0] +
      ' ';
    startTime.toTimeString().split(' ')[1];
    const data = {
      reservatingUserId: reservationPerson.id,
      status: 3,
      latitude: lat,
      longitude: lng,
      address: address,
      datetime: reservationTime,
    };
    alert('스터디 예약하기');
    console.log(startDate.toISOString().split('T')[0]);
    console.log(startTime.toTimeString().split(' ')[0]);
    console.log(startTime.toTimeString().split(' ')[1]);
    console.log(startTime);
    console.log(reservationTime);
    console.log(data);
    const curPath = location.pathname.split('/creation')[0];
    console.log(curPath);
    const resp = await createReservation(
      params.id, // studyId
      data,
    );
    console.log(resp);
    await navigate(`${curPath}`);
  };

  //위치 검색
  const Post = async () => {
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    let geocoder = new kakao.maps.services.Geocoder();
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(33.450701, 126.570667),
    });
    await new daum.Postcode({
      oncomplete: function (data) {
        let addr = data.address; // 최종 주소 변수
        setAddress(addr);
        geocoder.addressSearch(data.address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            console.log('result : ', result[0]);

            let infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">목적지</div>',
            });
            infowindow.open(map, marker);
            container.style.display = 'block';
            map.relayout();

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
            marker.setPosition(coords);
            setLng(result[0].x);
            setLat(result[0].y);
          }
        });
      },
    }).open();
  };

  return (
    <Container>
      <SubContainer>
        <InputContainer>
          <Title> 스터디 진행일</Title>
          <SDatePickerContainer>
            <SDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              locale={ko}
              minDate={new Date()}
              dateFormat="yyyy년 MM월 dd일"
            />
          </SDatePickerContainer>
        </InputContainer>
        <InputContainer>
          <Title> 시작 시간</Title>
          <SDatePickerContainer>
            <SDatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              locale={ko}
              filterTime={filterPassedTime}
              dateFormat="hh : mm aa"
            />
          </SDatePickerContainer>
        </InputContainer>

        <InputContainer>
          <Title>스터디 장소 검색하기</Title>
          <AddressInput
            type="text"
            onClick={Post}
            value={address}
            readOnly
          ></AddressInput>
        </InputContainer>
      </SubContainer>
      <MapContainer>
        <KaKaoMap id="map"></KaKaoMap>
      </MapContainer>
      <FixedDiv>
        <Btn onClick={reserveStudy}>
          <BtnText>스터디 예약하기</BtnText>
        </Btn>
      </FixedDiv>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100vh;
`;
const SubContainer = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.color.gray};
  font-size: medium;
  text-align: left;
  width: 50%;
`;
const InputContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
`;
const SDatePickerContainer = styled.div`
  /* display: flex; */
  width: 60%;
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

const AddressInput = styled.input`
  border: solid ${({ theme }) => theme.color.gray};
  border-width: 1px;
  border-radius: 20px;
  width: 60%;
  height: 2rem;
  text-align: center;
`;

const MapContainer = styled.div`
  height: 70%;
`;
const KaKaoMap = styled.div`
  width: 320px;
  height: 300px;
  margin-top: 20px;
  /* margin-left: 20px; */
  /* margin-right: 20px; */
  display: none;
  z-index: -999;
`;
const FixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.color.gray};
`;
const Btn = styled.button`
  background-color: ${({ theme }) => theme.color.blue};
  border: 0;
  outline: 0;
  width: 10rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 20px;
  cursor: pointer;
  font-size: large;
`;
const BtnText = styled.div`
  color: ${({ theme }) => theme.color.white};
`;
export default StudyReservationCreation;