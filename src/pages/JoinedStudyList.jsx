import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import emptyimg from '@/img/emptyimg.png';
// 가입된 스터디 목록 api 나오면 그 api로 교체
import { getStudyList } from '@/api';
import { PATH_JOINED_STUDY_DETAIL } from '@/constants';
import { getColor } from '@/utils';

const JoinedStudyList = () => {
  const navigate = useNavigate();

  const [studies, setStudies] = useState([]);

  const loadStudies = async () => {
    const data = await getStudyList();
    setStudies(() => data);
  }
  useEffect(() => {
    loadStudies();
  }, []);

  const showImage = src => {
    return src && src.includes('http') ? src : emptyimg;
  }

  const calcProgress = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < now) return 100;
    else if (start > now) return 0;

    const rate = (end.getTime() - start.getTime()) / 100;
    return parseInt((now.getTime() - start.getTime()) / rate);
  }

  const goDetail = (id) => {
    navigate(`${PATH_JOINED_STUDY_DETAIL}/${id}`);
  }

  const Study = (study) => (
    <StudyContainer key={study.id} onClick={() => goDetail(study.id)}>
      <Img src={showImage(study.src)}></Img>
      <Title>{study.name}</Title>
      <ProgressBarContainer>
        <ProgressLabelContainer>
          <ProgressLabel>{study.startDate}</ProgressLabel>
          <ProgressLabel>{study.endDate}</ProgressLabel>
        </ProgressLabelContainer>
        <ProgressBar
          value={calcProgress(study.startDate, study.endDate)}
          max={100}
        />
      </ProgressBarContainer>
    </StudyContainer>
  );

  return (
    <Container>
      {studies.map(Study)}
    </Container>
  )
}

const outerContentsMargin = '50px';
const innerContentsMargin = '7px';
const prgressRadius = '5px';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  width: 100%;
  overflow: auto;
`;

const StudyContainer = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: ${outerContentsMargin};
`;

const Img = styled.img`
  display: flex;
  width: 100%;
  height: 12rem;
  margin: auto;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 11px;
`;

const Title = styled.label`
  display: flex;
  margin: auto;
  margin-left: 0px;
  font-size: 20px;
  font-weight: 400;
  color: ${getColor('black')};
  margin-bottom: ${innerContentsMargin};
`;

const ProgressBarContainer = styled.div``;

const ProgressLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProgressLabel = styled.label`
  display: flex;
  font-size: 10px;
  font-weight: 400;
  color: ${getColor('gray')};
`;

const ProgressBar = styled.progress`
  -webkit-appearance: none;
  border: 1px solid ${getColor('lightBlue')};
  border-radius: ${prgressRadius};
  height: 13px;
  padding: 0.5px;
  width: 100%;

  ::-webkit-progress-value {
    height: 100%;
    border-radius: ${prgressRadius};
    background-color: ${getColor('lightBlue')};
  }

  ::-webkit-progress-bar {
    height: 100%;
    width: 100%;
    border-radius: ${prgressRadius};
    background-color: white;
  }
`;

export default JoinedStudyList;