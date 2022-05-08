import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import emptyimg from '@/img/emptyimg.png';
import { calender } from '@/img';
import { findStudy, getStudyAttend } from '@/api';
import { getColor, defaultLine } from '@/utils';

const JoinedStudyDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [src, setFiles] = useState('');
  const [studyInfo, setInputs] = useState({});
  const [userAttend, setUserAttend] = useState({});

  const loadData = async () => {
    const studyData = await findStudy(params.id);
    const attendData = await getStudyAttend(params.id);
    setInputs(() => studyData);
    setFiles(() => studyData.src);
    setUserAttend(() => attendData);
    console.log(attendData);
  }
  
  useEffect(() => {
    return loadData;
  }, []);

  const showImage = src => {
    if (src == '' || !src) {
      return emptyimg;
    } else if (src.includes('http')) {
      return src;
    } else {
      return URL.createObjectURL(src);
    }
  }

  const getDate = date => {
    return date && date.split('T')[0]
  }

  const selectList = [
    // 나중에 category 조회로 불러올 것
    '관심 분야를 고르세요',
    '코딩',
    '영어',
    '중국어',
    '수학',
    'NCS',
  ];

  const attendStudy = async () => {
    try {
      alert("스터디 출석하기");
      // 스터디 출석 로직 필요
      navigate(-1); // 뒤로가기
    } catch (e) {
      console.log(e);
      alert('에러 발생');
    }
  };

  const calcDeposit = (attendInfo, studyInfo) => {
    return (
      studyInfo.depositPerPerson -
      (attendInfo.lateCnt * studyInfo.lateFee) -
      (attendInfo.absentCnt * studyInfo.absentFee)
    )
  }

  return (
    <Container>
      <FullWidthContainer>
        <Img src={showImage(src)}></Img>
        <TitleContainer>
          <Title>{studyInfo.name}</Title>
        </TitleContainer>
      </FullWidthContainer>
      <FullWidthContainer>
        <SubTitle>출결 현황 보드</SubTitle>
        <BoardContainer>
          <Board>
            <BoardLabel>미팅 횟수</BoardLabel>
            <BoardLabel>{studyInfo.meetingCnt}</BoardLabel>
          </Board>
          <Board>
            <BoardLabel>지각</BoardLabel>
            <BoardLabel>{userAttend.lateCnt}</BoardLabel>
          </Board>
          <Board>
            <BoardLabel>결석</BoardLabel>
            <BoardLabel>{userAttend.absentCnt}</BoardLabel>
          </Board>
          <Board>
            <BoardLabel>인원</BoardLabel>
            <BoardLabel>{userAttend.memberCnt}</BoardLabel>
          </Board>
        </BoardContainer>
        <PointContainer>
          <PointLabelContainer>
            <PointMainLabel>예상 환급액</PointMainLabel>
            <PointMainLabel>{calcDeposit(userAttend, studyInfo)}원</PointMainLabel>
          </PointLabelContainer>
          <PointSubLabel>보증금({studyInfo.depositPerPerson}원) - 지각 {userAttend.lateCnt}회 - 결석 {userAttend.absentCnt}회</PointSubLabel>
        </PointContainer>
        <ReserveBtnContainer>
          <ReserveBtn>
            <ReserveBtnText>스터디 예약하기</ReserveBtnText>
            <Icon />
          </ReserveBtn>
        </ReserveBtnContainer>
        <Line />
        <SubTitle>스터디 정보</SubTitle>
      </FullWidthContainer>
      <ContentsContainer>
        <InputContainer>
          <Label>인당 보증금</Label>
          <LabelContents>{studyInfo.depositPerPerson}</LabelContents>
        </InputContainer>
        <InputContainer>
          <Label>기간</Label>
          <LabelContents>{getDate(studyInfo.startDate)} ~ {getDate(studyInfo.endDate)}</LabelContents>
        </InputContainer>
        <InputContainer>
          <Label>운영시간</Label>
          <LabelContents>{studyInfo.operationTime}</LabelContents>
        </InputContainer>
        <InputContainer>
          <Label>최소 인원</Label>
          <LabelContents>{studyInfo.minPerson}</LabelContents>
        </InputContainer>
        <InputContainer>
          <Label>최대 인원</Label>
          <LabelContents>{studyInfo.maxPerson}</LabelContents>
        </InputContainer>
        <InputContainer>
          <Label>분야</Label>
          <LabelContents>{selectList[studyInfo.categoryId || 0]}</LabelContents>
        </InputContainer>
        <InputContainer>
          <Label>결석 벌금</Label>
          <LabelContents>{studyInfo.absentFee}</LabelContents>
        </InputContainer>
        <InputContainer>
          <Label>지각 벌금</Label>
          <LabelContents>{studyInfo.lateFee}</LabelContents>
        </InputContainer>
        <SubContainer>
          <InputContainer>
            <Label>상세 정보</Label>
          </InputContainer>
          <TextArea
            readOnly={true}
            value={studyInfo.info}
          />
        </SubContainer>
      </ContentsContainer>
      
      <FixedDiv>
        <CreateBtn onClick={attendStudy}>
          <BtnText>출석하기</BtnText>
        </CreateBtn>
      </FixedDiv>
    </Container>
  );
};

const contentWidth = '65%';
const bottomMargin = '12px';
const labelForVerticalCenter = `padding-top: 2px;`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10rem);
  width: 100%;
  overflow: auto;
`;
const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
`;
const SubContainer = styled.div``;
const FullWidthContainer = styled.div`
  width: 100%;
  left: 0;
`;
const TitleContainer = styled.div`
  margin: 0 5%;
  height: 3rem;
  display: flex;
`;
const Title = styled.label`
  display: flex;
  margin: auto;
  margin-left: 0px;
  font-size: 20px;
  font-weight: 400;
  color: ${getColor('black')};
`;
const SubTitle = styled.label`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  margin: 15px 0px 20px 5%;
  color: ${getColor('black')};
`;
const Img = styled.img`
  display: flex;
  width: 100%;
  object-fit: cover;
  margin: auto;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${bottomMargin};
`;
const Label = styled.label`
  color: ${getColor('gray')};
  display: flex;
  margin: auto;
  margin-left: 0px;
  font-size: 15px;
  ${labelForVerticalCenter}
`;
const LabelContents = styled.label`
  color: ${getColor('black')};
  text-align: left;
  width: ${contentWidth};
  padding-left: 5px;
  font-size: 15px;
`;

const FixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  border-top: 1px solid ${getColor('gray')};
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
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 5rem;
  resize: vertical;
  border-color: ${getColor('gray')};
  border-radius: 5px;
  padding: 5px;
  margin-bottom: ${bottomMargin};
`;

const Line = styled.div`
  ${defaultLine}
  position: relative;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  margin: 0 5%;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid ${getColor('gray')};
`;
const Board = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: min-content;
  min-height: 60px;
  margin: 10px;
  padding: 3px;
  border-radius: 10px;
  border: 1px solid ${getColor('gray')};
`;
const BoardLabel = styled.label`
  display: flex;
  margin: auto;
  font-size: 13px;
  font-weight: 400;
`;
const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5%;
`;
const PointLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-bottom: 2px;
`;
const PointMainLabel = styled.label`
  display: flex;
  margin-left: 20px;
`;
const PointSubLabel = styled.label`
  display: flex;
  justify-content: end;
  font-size: 10px;
  font-weight: 300;
  color: ${getColor('gray')};
`;
const ReserveBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
const ReserveBtn = styled.button`
  display: flex;
  border: none;
  background-color: white;
  align-items: center;
  height: 40px;
`;
const ReserveBtnText = styled.label`
  color: ${getColor('lightBlue')};
  display: flex;
  font-size: 15px;
  margin-right: 3px;
`;
const Icon = styled.div`
  display: flex;
  background-image: url(${calender});
  background-repeat: no-repeat;
  background-position: center;
  width: 24px;
  height: 24px;
`;

export default JoinedStudyDetail;
