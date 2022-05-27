import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getUserInfo } from '@/api';
import { checkCircleEmptySelect, checkCircleEmpty, calenderGray, getLocationIcon } from '@/img';
import { getColor, getLocation, getTimestampByDateAndTime } from '@/utils';

const { kakao, daum } = window;

const RECOMMEND_FEE = 0;
const RECOMMEND_ROUTE = 1;
const MAX_RADIUS = 1000;

const StudyRcommendCreate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const [kakaoMap, setKakaoMap] = useState(null);
  const [mapCircle, setMapCircle] = useState(null);
  const container = useRef(null);

  const [address, setAddress] = useState(''); // 주소
  const [lat, setLat] = useState(0); // 위도
  const [lng, setLng] = useState(0); // 경도

  const [startDate, setStartDate] = useState(new Date()); // 진행일
  const [startTime, setStartTime] = useState(new Date()); // 시작 시간
  const [endTime, setEndTime] = useState(new Date()); // 종료 시간
  const [option, setOption] = useState(0); // 추천 기준
  const [radius, setRadius] = useState(500); // 검색 반경
  
  const filterPassedTime = (time) => {
    const currentTime = new Date(); // 5-14 17:24
    const selectedDate = new Date(time); // 5-1
    if (startDate.getDate() == selectedDate.getDate()) {
      return currentTime.getTime() < selectedDate.getTime();
    } else {
      return '00:00';
    }
  };

  const changeStartTime = async (time) => {
    setStartTime(time);
    if (time.getHours() >= endTime.getHours()) {
      const tmp = new Date(time).setHours(time.getHours() + 1)
      setEndTime(new Date(tmp))
    }
  }

  //스터디 스케줄 추천받기
  const recommendStudySchedule = async () => {
    const reservationPerson = await getUserInfo();

    // 위도, 경도, 스터디 진행날짜, 시작 시간, 예약한 사람
    // reservationPersonName, status, longitude, latitude, address, startTime
    const reservationStartTime = getTimestampByDateAndTime(
      startDate.toISOString().split('T')[0],
      startTime.toTimeString().split(' ')[0]
    );
    const reservationEndTime = getTimestampByDateAndTime(
      startDate.toISOString().split('T')[0],
      endTime.toTimeString().split(' ')[0]
    );
    const data = {
      reservatingUserId: reservationPerson.id,
      latitude: lat,
      longitude: lng,
      startTime: reservationStartTime,
      endTime: reservationEndTime,
      radius,
      option,
      address,
    };
    alert('스케줄 추천 받기');
    console.log(data);
    const curPath = location.pathname;
    // await createReservation(
    //   params.id, // studyId
    //   data,
    // );
    await navigate(`${curPath}/success`);
  };

  const initMap = async () => {
    const curLocation = await getLocation();
    if (!curLocation) return;

    const center = new kakao.maps.LatLng(curLocation.latitude, curLocation.longitude);
    const options = {
      center,
      level: 6, // 축적 500m
    };
    const map = new kakao.maps.Map(container.current, options);
    setKakaoMap(map);

    map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    map.setZoomable(false);
  };

  const mkMarker = (position) => {
    return new kakao.maps.Marker({
      map: kakaoMap,
      // 이미지 생기면 넣을것
      image: null,
      // 혹시 클릭하면 카페 이름 나오게 해야할거같아서 넣음
      clickable: true,
      position,
    });
  }

  const mkCircle = (center, radius) => {
    return new kakao.maps.Circle({
      center,
      radius,
      strokeWeight: 1,
      strokeColor: '#70B3EC',
      strokeOpacity: 1,
      fillColor: '#70B3EC',
      fillOpacity: 0.5
    });
  }

  useEffect(() => {
    initMap();
  }, []);

  //위치 검색
  const Post = () => {
    return new daum.Postcode({
      oncomplete: ({ address }) => {
        let geocoder = new kakao.maps.services.Geocoder();
        setAddress(address);

        geocoder.addressSearch(address, (result, status) => {
          if (status !== kakao.maps.services.Status.OK) return;

          const position = new kakao.maps.LatLng(result[0].y, result[0].x);
          setLng(result[0].x);
          setLat(result[0].y);

          kakaoMap.setCenter(position);

          mkMarker(position);

          const circle = mkCircle(position, radius);
          setMapCircle(circle);
          circle.setMap(kakaoMap);
        });
      },
    }).open();
  };

  const timeBlock = (time, method) => (
    <SDatePickerContainer>
      <SDatePicker
        selected={time}
        onChange={method}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        locale={ko}
        filterTime={filterPassedTime}
        dateFormat="hh : mm aa"
      />
    </SDatePickerContainer>
  )

  const selectOption = (opt) => {
    return () => {
      setOption(opt)
    }
  }

  const getSelectIcon = (opt) => opt == option ? checkCircleEmptySelect : checkCircleEmpty;

  const changeRadius = ({ target }) => {
    const radius = Math.min(Number(target.value), MAX_RADIUS);
    setRadius(radius);
    if (mapCircle) {
      mapCircle.setOptions({ radius });
      mapCircle.setMap(kakaoMap);
    }
  }

  return (
    <Container>
      <SubContainer>
        <InputContainer>
          <Title>스터디 진행일</Title>
          <SDatePickerContainer>
            <SDatePicker
              selected={startDate}
              onChange={setStartDate}
              startDate={startDate}
              locale={ko}
              minDate={new Date()}
              dateFormat="yyyy년 MM월 dd일"
            />
            <AbsIcon src={calenderGray}/>
          </SDatePickerContainer>
        </InputContainer>
        <InputContainer>
          <Title>시작 시간</Title>
          {timeBlock(startTime, changeStartTime)}
        </InputContainer>
        <InputContainer>
          <Title>종료 시간</Title>
          {timeBlock(endTime, setEndTime)}
        </InputContainer>

        <ColumnContainer>
          <Title>추천 기준</Title>
          <SelectBox>
            <Select onClick={selectOption(RECOMMEND_FEE)}>
              <CircleIcon src={getSelectIcon(RECOMMEND_FEE)} /> 
              최소 요금
            </Select>
            <Select onClick={selectOption(RECOMMEND_ROUTE)}>
              <CircleIcon src={getSelectIcon(RECOMMEND_ROUTE)} /> 
              최소 환승
            </Select>
          </SelectBox>
        </ColumnContainer>

        <ColumnContainer>
          <Title>검색 기준 위치 찾기</Title>
          <RelativeContainer>
            <AddressInput
              type="text"
              onClick={Post}
              value={address}
              readOnly
            ></AddressInput>
            <AbsIconBox>{getLocationIcon()}</AbsIconBox>
          </RelativeContainer>
        </ColumnContainer>
        <InputContainer>
          <Title>검색 반경 설정 (m)</Title>
          <ContentInput
            type="number"
            value={Number(radius)}
            onChange={changeRadius}
          ></ContentInput>
        </InputContainer>
      </SubContainer>
      <MapContainer>
        <KaKaoMap id="map" ref={container}></KaKaoMap>
      </MapContainer>
      <FixedDiv>
        <Btn onClick={recommendStudySchedule}>
          <BtnText>추천받기</BtnText>
        </Btn>
      </FixedDiv>
    </Container>
  );
};

const topMargin = `margin-top: 0.6rem;`;
const contentHeight = `height: 35px;`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: calc(100vh - 10rem);
  overflow: auto;
`;
const SubContainer = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.div`
  color: ${getColor('gray')};
  font-size: medium;
  text-align: left;
  width: 50%;
  line-height: 32px;
`;
const InputContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${topMargin}
`;

const ColumnContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  ${topMargin}
`;
const SelectBox = styled.div`
  width: 100%;
  display: flex;
  ${topMargin}
`;
const Select = styled.div`
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  border: 1px solid ${getColor('gray')};
  border-radius: 20px;
  color: ${getColor('gray')};
  font-size: 0.9rem;
`;
const CircleIcon = styled.img`
  display: flex;
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

const AbsIcon = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 3%;
  top: 7.5px;
`
const AbsIconBox = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 3%;
  top: 7.5px;
`

const SDatePickerContainer = styled.div`
  /* display: flex; */
  width: 60%;
  position: relative;
`;
const SDatePicker = styled(DatePicker)`
  align-items: center;
  text-align: center;
  width: 100%;
  padding-left: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${getColor('gray')};
  border-radius: 20px;
  ${contentHeight}
  font-size: 15px;
  adding-right: 3%;
`;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  ${topMargin}
`;

const AddressInput = styled.input`
  position: relative;
  border: solid ${getColor('gray')};
  border-width: 1px;
  border-radius: 20px;
  width: 100%;
  ${contentHeight}
  text-align: center;
`;

const ContentInput = styled.input`
  width: 60%;
  text-align: center;
  border: solid ${getColor('gray')};
  border-width: 1px;
  border-radius: 20px;
  ${contentHeight}
`;

const MapContainer = styled.div`
  width: 90%;
`;
const KaKaoMap = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  display: flex;
`;
const FixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${getColor('gray')};
`;
const Btn = styled.button`
  background-color: ${getColor('blue')};
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
  font-size: large;
`;
const BtnText = styled.div`
  color: ${getColor('white')};
`;
export default StudyRcommendCreate;
