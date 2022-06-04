import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getColor, getDateTime, getLastEl } from '@/utils';
import { right } from '@/img';

const StudyRecommendSubstitute = () => {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const [rowData, setRowData] = useState({});
  const [dateSub, setDateSub] = useState([]);
  const [radiusSub, setRadiusSub] = useState([]);
  const [bothSub, setBothSub] = useState([]);

  useEffect(() => {
    const data = state.response;
    setRowData(data);
    setRadiusSub(data.number1);
    setDateSub(data.number2);
    setBothSub(data.number3);
  }, []);

  const formatHour = (hour) => `${String(hour).padStart(2, '0')}:00`
  const rmTimezone = (datetime) => `${getDateTime(datetime).date}T${getDateTime(datetime).time}`

  const getTimestamp = (schedule, isSchedule = true) => {
    if (schedule.length == 0) return null;
    const start = getDateTime(schedule[0].datetime);
    const end = getLastEl(schedule).datetime;
    if (isSchedule) {
      return `${start.date} ${start.time} ~ ${formatHour(new Date(rmTimezone(end)).getHours() + 1)}`;
    }
    else {
      return `${start.date} ${start.time} ~ ${getDateTime(end).time}`;
    }
    
  };

  const getMainTitleText = () =>
    getTimestamp(
      [state.data.startTime, state.data.endTime].map((a) => ({ datetime: a })),
      false
    );

  const successPath = `${pathname.split('/substitute')[0]}/success`;
  const clickBlock = (data, schedule) => {
    return () =>
      navigate(successPath, {
        state: {
          ...data,
          schedule,
        },
      });
  };
  const goBack = () => {
    navigate(-1);
  };

  const mkTitleLabel = (date, radius) => {
    return (
      <ContentBox>
        <LabelLarge>{date}</LabelLarge> <MediumSmall>까지</MediumSmall>
        <br />
        <LabelLarge>반경 {radius}m</LabelLarge>{' '}
        <MediumSmall>이내 이용 가능한 스터디 스케줄이 없어요!</MediumSmall>
      </ContentBox>
    );
  };

  const getBlockLabel = (text) => <BlockLabel>{text}</BlockLabel>;
  const getBlockBoldLabel = (text) => <BlockBoldLabel>{text}</BlockBoldLabel>;
  const checkInclude = (list, val) => list.includes(val);
  const mkBlock = (bool, text) =>
    bool ? getBlockBoldLabel(text) : getBlockLabel(text);

  const mkBlockLabel = (schedule, radius, focus) => {
    const date = getTimestamp(schedule);
    if (!date || !radius)
      return <NoneLabel>이용 가능한 스케줄이 없어요</NoneLabel>;

    const dateBlock = (date) => mkBlock(checkInclude(focus, 'date'), date);
    const radiusBlock = (radius) =>
      mkBlock(checkInclude(focus, 'radius'), `반경 ${radius}m`);

    return (
      <BlcokContainer
        onClick={clickBlock(
          {
            ...rowData,
            radius,
          },
          schedule,
        )}
      >
        <LabelBox>
          {dateBlock(date)} {radiusBlock(radius)}{' '}
          <BlockLabel>
            <br />
            이용 가능한 스터디 스케줄이 있어요!
          </BlockLabel>
        </LabelBox>
        <Icon src={right} />
      </BlcokContainer>
    );
  };

  return (
    <Container>
      {mkTitleLabel(getMainTitleText(), state.data.radius)}
      <ContentBox>
        <SubTitleBox>
          <BlueTitle>이런 조건은 어떠세요?</BlueTitle>
        </SubTitleBox>
        <SubTitle>검색 반경을 변경</SubTitle>
        {mkBlockLabel(radiusSub, 1000, ['radius'])}
        <SubTitle>검색 시간을 변경</SubTitle>
        {mkBlockLabel(dateSub, state.data.radius, ['date'])}
        <SubTitle>검색 시간과 반경을 변경</SubTitle>
        {mkBlockLabel(bothSub, 1000, ['radius', 'date'])}
      </ContentBox>
      <FixedDiv>
        <Btn onClick={goBack}>
          <BtnText>조건 다시 설정하기</BtnText>
        </Btn>
      </FixedDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: calc(100vh - 10rem);
  overflow: auto;
`;

const ContentBox = styled.div`
  width: 90%;
  flex-direction: column;
  margin-bottom: 30px;
`;

const LabelLarge = styled.label`
  font-weight: bold;
  font-size: 17px;
`;
const MediumSmall = styled.label`
  font-size: 13px;
`;

const SubTitleBox = styled.div`
  width: 90%;
  margin-bottom: 15px;
`;

const BlueTitle = styled.label`
  width: 90%;
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 10px;
  color: ${getColor('lightBlue')};
`;

const SubTitle = styled.label`
  font-size: 15px;
  font-weight: bold;
  color: ${getColor('gray')};
  margin-bottom: 10px;
`;

const BlcokContainer = styled.div`
  display: flex;
  height: 70px;
  border: 0.1px solid ${getColor('gray')};
  border-radius: 20px;
  margin: 10px;
  margin-bottom: 25px;
  padding: 10px;
  padding-right: 5px;
`;

const LabelBox = styled.div``;

const BlockBoldLabel = styled.label`
  font-size: 13px;
  font-weight: bold;
  color: ${getColor('darkgray')};
`;

const BlockLabel = styled.label`
  font-size: 13px;
  font-weight: 300;
  color: ${getColor('darkgray')};
`;

const Icon = styled.img`
  margin: auto;
  margin-right: 0;
  padding-top: 1px;
`;

const NoneLabel = styled.div`
  color: ${getColor('gray')};
  font-size: 15px;
  margin: 10px 0 25px 0;
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

export default StudyRecommendSubstitute;
