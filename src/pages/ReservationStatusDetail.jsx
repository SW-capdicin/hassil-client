import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import emptyimg from '@/img/emptyimg.png';
import { calender, checkCircle, fail } from '@/img';
import { findStudy, getStudyAttend, getOneReservationInfo } from '@/api';
import { getColor, defaultLine, separatorMoney } from '@/utils';
import { updateLocation } from '@/api/reservation';

const ReservationStatusDetail = () => {
  const params = useParams();
  const location = useLocation();
  const studyId = location.state.studyId;
  const reservationId = params.id;
  const [openModal, setOpenModal] = useState(false);
  const [src, setFiles] = useState('');
  const [studyInfo, setInputs] = useState({});
  const [userAttend, setUserAttend] = useState({});
  const [reservationData, setReservationData] = useState({});
  const [reservationResult, setReservationResult] = useState('fail');

  const loadData = async () => {
    const studyData = await findStudy(studyId);
    const attendData = await getStudyAttend(studyId);
    const reservationData = await getOneReservationInfo(studyId, reservationId);
    setInputs(() => studyData);
    setFiles(() => studyData.src);
    setUserAttend(() => attendData);
    setReservationData(() => reservationData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showImage = (src) => {
    if (src == '' || !src) {
      return emptyimg;
    } else if (src.includes('http')) {
      return src;
    } else {
      return URL.createObjectURL(src);
    }
  };

  const getDate = (date) => {
    return date && date.split('T')[0];
  };

  const selectList = [
    // 나중에 category 조회로 불러올 것
    '관심 분야를 고르세요',
    '코딩',
    '영어',
    '중국어',
    '수학',
    'NCS',
  ];
  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  const attendStudy = async (lat, lng) => {
    try {
      toggleModal();
      const data = {
        latitude: lat,
        longitude: lng,
      };
      const responseResult = await updateLocation(reservationId, data);
      // 스터디 출석 로직 필요
      setReservationResult(responseResult);
    } catch (e) {
      console.error(e);
    }
  };
  const getLocation = () => {
    let lat, lng;
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;

          attendStudy(lat, lng);
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity,
        },
      );
    } else {
      alert('GPS를 지원하지 않습니다');
      return;
    }
  };

  const calcAbsent = (meetingCnt, lateCnt, attendCnt) => {
    if (!meetingCnt) return 0;
    return meetingCnt - lateCnt - attendCnt;
  };

  const calcExpectedDeposit = () => {
    const deposit = studyInfo.depositPerPerson;
    const late = userAttend.lateCnt * studyInfo.lateFee;
    const absent =
      calcAbsent(
        studyInfo.meetingCnt,
        userAttend.lateCnt,
        userAttend.attendCnt,
      ) * studyInfo.absentFee;
    return deposit + studyInfo.expectedReward - late - absent;
  };

  const setModal = (result) => {
    switch (result) {
      case 'pass':
        return (
          <>
            <Modal>
              <Imo reservationResult="notFail" />
              <ModalText>출석 완료</ModalText>
            </Modal>
            <BackGround onClick={toggleModal} />
          </>
        );
      case 'late':
        return (
          <>
            <Modal>
              <Imo reservationResult="notFail" />
              <WarnText>지각</WarnText>
              <ModalText>출석 완료</ModalText>
            </Modal>
            <BackGround onClick={toggleModal} />
          </>
        );

      case 'fail':
        return (
          <>
            <Modal>
              <Imo reservationResult="fail" />
              <WarnText>거리가 너무 멉니다</WarnText>
              <ModalText>출석 실패</ModalText>
            </Modal>
            <BackGround onClick={toggleModal} />
          </>
        );
      default:
        return;
    }
  };

  return (
    <>
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
              <BoardLabel>출석</BoardLabel>
              <BoardLabel>{reservationData.attendCnt}</BoardLabel>
            </Board>
            <Board>
              <BoardLabel>지각</BoardLabel>
              <BoardLabel>{reservationData.lateCnt}</BoardLabel>
            </Board>

            <Board>
              <BoardLabel>인원</BoardLabel>
              <BoardLabel>{studyInfo.aliveCnt}</BoardLabel>
            </Board>
          </BoardContainer>
          <PointContainer>
            <PointLabelContainer>
              <PointMainLabel>예상 환급액</PointMainLabel>
              <PointMainLabel>
                {separatorMoney(calcExpectedDeposit())}원
              </PointMainLabel>
            </PointLabelContainer>
            <PointSubLabel>
              보증금({separatorMoney(studyInfo.depositPerPerson)}원) - 지각{' '}
              {userAttend.lateCnt}회 - 결석{' '}
              {calcAbsent(
                studyInfo.meetingCnt,
                userAttend.lateCnt,
                userAttend.attendCnt,
              )}
              회 + 리워드 {separatorMoney(studyInfo.expectedReward)} 원
            </PointSubLabel>
          </PointContainer>
          <ReserveBtnContainer></ReserveBtnContainer>
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
            <LabelContents>
              {getDate(studyInfo.startDate)} ~ {getDate(studyInfo.endDate)}
            </LabelContents>
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
            <LabelContents>
              {selectList[studyInfo.categoryId || 0]}
            </LabelContents>
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
            <TextArea readOnly={true} value={studyInfo.info} />
          </SubContainer>
        </ContentsContainer>
        <FixedDiv>
          <CreateBtn onClick={getLocation}>
            <BtnText>출석 하기</BtnText>
          </CreateBtn>
        </FixedDiv>
      </Container>
      {openModal && setModal(reservationResult)}
    </>
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
  max-height: 45vh;
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
const Modal = styled.div`
  position: absolute;
  width: 80%;
  max-width: 350px;
  background-color: ${getColor('white')};
  z-index: 999;
  top: 25%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  padding: 1.5rem 0.5rem 1.5rem 0.5rem;
`;

const ModalText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
const WarnText = styled.div`
  color: ${getColor('red')};
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;
const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${getColor('gray')};
  opacity: 0.7;
  z-index: 500;
`;

const Imo = styled.div`
  display: flex;
  background-image: url(${checkCircle});
  background-image: ${(props) =>
    props.reservationResult == 'notFail'
      ? `url(${checkCircle})`
      : `url(${fail})`};
  background-repeat: no-repeat;
  background-position: center;
  width: 200px;
  height: 200px;
`;
export default ReservationStatusDetail;
