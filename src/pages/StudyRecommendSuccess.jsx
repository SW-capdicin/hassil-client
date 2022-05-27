import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getColor, extractRandomOne, getDateTime, getLastEl, defaultLine, separatorMoney } from '@/utils';
import { clockIcon, getLocationIconText, locationIcon } from '@/img';

const { kakao } = window;

const mockData = {
  latitude: 33.450701,
  longitude: 126.570667,
  radius: 500,
  schedule: [
    {
      studyRoomId: 1000,
      studyId: 1000,
      studyName: '아주대 공간샘',
      latitude: 33.451393,
      longitude: 126.570738,
      roomName: 'A 룸',
      price: '3000',
      datetime: '2022-05-22T00:00',
    },
    {
      studyRoomId: 1002,
      studyId: 1001,
      studyName: '아주대 랭스터디',
      latitude: 33.450936,
      longitude: 126.569477,
      roomName: 'B 룸',
      price: '2000',
      datetime: '2022-05-22T01:00',
    },
    {
      studyRoomId: 1001,
      studyId: 1001,
      studyName: '아주대 랭스터디',
      latitude: 33.450936,
      longitude: 126.569477,
      roomName: 'A 룸',
      price: '2000',
      datetime: '2022-05-22T02:00',
    },
    {
      studyRoomId: 1000,
      studyId: 1000,
      studyName: '아주대 공간샘',
      latitude: 33.451393,
      longitude: 126.570738,
      roomName: 'A 룸',
      price: '3000',
      datetime: '2022-05-22T03:00',
    },
    {
      studyRoomId: 1003,
      studyId: 1000,
      studyName: '아주대 공간샘',
      latitude: 33.451393,
      longitude: 126.570738,
      roomName: 'B 룸',
      price: '3000',
      datetime: '2022-05-22T04:00',
    },
  ]
}

const colorTable = [
  '#2164e8',
  '#70B3EC',
  '#A0D097',
  '#AAA492',
  '#7C9473',
  '#EA5455',
  '#F07B3F',
  '#FFD460',
  '#835858',
  '#FF9999',
  '#7579E7',
  '#3E4149',
]

const StudyRecommendSuccess = () => {
  const loadData = () => mockData;

  const [colorMap] = useState({});
  const [schedule, setSchedule] = useState([]);

  const container = useRef(null);

  const assignColor2Study = (list) => {
    const tmp = [...colorTable];
    list.map(({ studyId }) => (colorMap[studyId] = extractRandomOne(tmp)));
  }

  const mkMarker = (map, position, image) => {
    return new kakao.maps.Marker({
      clickable: true,
      image,
      position,
      map,
    });
  }

  const getSvgFromText = (text) => {
    const svg = new Blob([text], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svg);
    return url;
  }

  const mkInfoWindow = (name) => {
    return new kakao.maps.InfoWindow({
      content: `<div>${name}</div>`,
    });
  }

  const makeOverListener = (map, marker, infowindow) => {
    return () => {
      infowindow.open(map, marker);
    };
  }

  const makeOutListener = (infowindow) => {
    return () => {
      infowindow.close();
    };
  }
  
  const assignMarker2Map = (list, map) => {
    const studyMap = {};
    list.map(({
      studyId,
      studyName,
      latitude,
      longitude
    }) => (studyMap[studyId] = { latitude, longitude, studyName }));

    Object.keys(studyMap).map(key => {
      const position = new kakao.maps.LatLng(studyMap[key].latitude, studyMap[key].longitude);
      
      const markerImage = new kakao.maps.MarkerImage(
        getSvgFromText(getLocationIconText(colorMap[key])),
        new kakao.maps.Size(24, 35)
      ); 

      const marker = mkMarker(map, position, markerImage);
      const infowindow = mkInfoWindow(studyMap[key].studyName);

      kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(map, 'click', makeOutListener(infowindow));
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
      fillOpacity: 0.2
    });
  }

  const initMap = (cur, radius) => {
    const center = new kakao.maps.LatLng(cur.latitude, cur.longitude);
    const options = {
      center,
      level: 5, // 축적 250m
    };
    const map = new kakao.maps.Map(container.current, options);

    map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    map.setZoomable(false);
    mkCircle(center, radius).setMap(map);
    return map;
  };

  useEffect(() => {
    const data = loadData();
    setSchedule(data.schedule);
    const map = initMap({
      latitude: data.latitude,
      longitude: data.longitude,
    }, data.radius);
    assignColor2Study(data.schedule);
    assignMarker2Map(data.schedule, map);
  }, []);

  const getTimestamp = (schedule) => {
    if (schedule.length == 0) return;
    const start = getDateTime(schedule[0].datetime);
    const end = new Date(getLastEl(schedule).datetime);
    return `${start.date} ${start.time} ~ ${formatHour(end.getHours() + 1)}`;
  }

  const formatHour = (hour) => `${String(hour).padStart(2, '0')}:00`

  const getOneHourTerm = (datetime) => {
    const dt = new Date(datetime);
    return `${formatHour(dt.getHours())} ~ ${formatHour(dt.getHours() + 1)}`
  }

  const getScheduleContent = (schedule, idx) => (
    <ScheduleBox key={idx}>
      <ColorBlock style={{ backgroundColor: colorMap[schedule.studyId] }} />
      <ColumnBox>
        <RowBox>
          <Icon src={clockIcon} />
          <ScheduleLabelSmall>{getOneHourTerm(schedule.datetime)}</ScheduleLabelSmall>
        </RowBox>
        <ScheduleLabelLarge>{schedule.studyName}</ScheduleLabelLarge>
      </ColumnBox>
      <ScheduleLabelSmall>{schedule.price}원</ScheduleLabelSmall>
    </ScheduleBox>
  )

  return (
    <Container>
      <Timestap>{getTimestamp(schedule)}</Timestap>
      <ScheduleContainer>
        {schedule.map(getScheduleContent)}
      </ScheduleContainer>
      <PayContainer>
        <Line />
        <PayLabel>총 이용 금액 : </PayLabel>
        <PayLabelImport>{separatorMoney(1000)}원</PayLabelImport>
      </PayContainer>
      <MapContainer>
        <KaKaoMap id="map" ref={container}></KaKaoMap>
      </MapContainer>
      <FixedDiv>
        <Btn>
          <BtnText>이 스케줄로 예약하기</BtnText>
        </Btn>
      </FixedDiv>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: calc(100vh - 10rem);
  overflow: auto;
`;

const Timestap = styled.label`
  width: 90%;
  font-weight: bold;
`;

const ScheduleContainer = styled.div`
  width: 90%;
  height: 50%;
  overflow: auto;
  margin-top: 10px;
`;

const ScheduleBox = styled.div`
  height: 20%;
  border: 1px solid ${getColor('gray')};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px;
  padding-right: 10px;
  margin-bottom: 10px;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColorBlock = styled.div`
  display: flex;
  width: 15px;
  height: 80%;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
`

const ScheduleLabelLarge = styled.label`
  display: flex;
  font-weight: bold;
  font-size: 20px;
`;
const ScheduleLabelSmall = styled.label`
  display: flex;
  font-size: 13px;
`;

const Icon = styled.img`
  margin-right: 10px;
  padding-top: 1px;
`;

const Line = styled.div`
  ${defaultLine}
`;

const PayContainer = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  justify-content: right;
  align-items: baseline;
  height: 35px;
`;

const PayLabel = styled.label`
  display: flex;
  font-size: 14px;
  font-weight: normal;
  margin-top: auto;
  margin-right: 3px;
`;
const PayLabelImport = styled.label`
  display: flex;
  font-size: 18px;
  font-weight: normal;
  margin-top: auto;
`;

const MapContainer = styled.div`
  width: 90%;
`;
const KaKaoMap = styled.div`
  width: 100%;
  min-height: 230px;
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

export default StudyRecommendSuccess;