import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import emptyimg from '@/img/emptyimg.png';
// 가입된 스터디 목록 api 나오면 그 api로 교체
import { getStudyList } from '@/api';
import { PATH_JOINED_STUDY_DETAIL } from '@/constants';

const JoinedStudyList = () => {
  const navigate = useNavigate();

  const [studies, setStudies] = useState([]);

  const loadStudies = async () => {
    const data = await getStudyList();
    setStudies(() => data);
  }
  useEffect(() => {
    return loadStudies;
  }, []);

  const showImage = src => {
    return src.includes('http') ? src : emptyimg;
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

  return (
    <Container>
      {
        studies.map((item) => {
          return (
            <StudyContainer key={item.id} onClick={() => goDetail(item.id)}>
              <Img src={showImage(item.src)}></Img>
              <Title>{item.name}</Title>
              <ProgressBarContainer>
                <ProgressLabelContainer>
                  <ProgressLabel>{item.startDate}</ProgressLabel>
                  <ProgressLabel>{item.endDate}</ProgressLabel>
                </ProgressLabelContainer>
                <ProgressBar
                  value={calcProgress(item.startDate, item.endDate)}
                  max={100}
                />
              </ProgressBarContainer>
            </StudyContainer>
          )
        })
      }
    </Container>
  )
}

const outerContentsMargin = '50px';
const innerContentsMargin = '7px';
const prgressRadius = '5px';
const getGray = ({ theme }) => theme.color.gray;
const getBlack = ({ theme }) => theme.color.black;
const getLightBlue = ({ theme }) => theme.color.lightBlue;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  color: ${getBlack};
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
  color: ${getGray};
`;

const ProgressBar = styled.progress`
  -webkit-appearance: none;
  border: 1px solid ${getLightBlue};
  border-radius: ${prgressRadius};
  height: 13px;
  padding: 0px 0.5px;
  width: 100%;

  ::-webkit-progress-value {
    height: 100%;
    border-radius: ${prgressRadius};
    background-color: ${getLightBlue};
  }

  ::-webkit-progress-bar {
    height: 100%;
    width: 100%;
    border-radius: ${prgressRadius};
    background-color: white;
  }
`;

export default JoinedStudyList;