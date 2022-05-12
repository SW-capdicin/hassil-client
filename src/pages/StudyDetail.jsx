import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import emptyimg from '@/img/emptyimg.png';
import { findStudy } from '@/api';
import { getColor } from '@/utils';

const StudyDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [src, setFiles] = useState('');
  const [inputs, setInputs] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const loadData = async () => {
    const data = await findStudy(params.id);
    setInputs(() => data);
    setFiles(() => data.src);
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

  const joinStudy = () => {
    try {
      navigate(`${window.location.pathname}/participation`);
      // 스터디 참가 로직 필요
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container>
        <FullWidthContainer>
          <Img src={showImage(src)}></Img>
          <TitleContainer>
            <Title>{inputs.name}</Title>
          </TitleContainer>
        </FullWidthContainer>
        <ContentsContainer>
          <InputContainer>
            <Label>인당 보증금</Label>
            <LabelContents>{inputs.depositPerPerson}</LabelContents>
          </InputContainer>
          <InputContainer>
            <Label>기간</Label>
            <LabelContents>
              {getDate(inputs.startDate)} ~ {getDate(inputs.endDate)}
            </LabelContents>
          </InputContainer>
          <InputContainer>
            <Label>운영시간</Label>
            <LabelContents>{inputs.operationTime}</LabelContents>
          </InputContainer>
          <InputContainer>
            <Label>최소 인원</Label>
            <LabelContents>{inputs.minPerson}</LabelContents>
          </InputContainer>
          <InputContainer>
            <Label>최대 인원</Label>
            <LabelContents>{inputs.maxPerson}</LabelContents>
          </InputContainer>
          <InputContainer>
            <Label>분야</Label>
            <LabelContents>{selectList[inputs.categoryId || 0]}</LabelContents>
          </InputContainer>
          <InputContainer>
            <Label>결석 벌금</Label>
            <LabelContents>{inputs.absentFee}</LabelContents>
          </InputContainer>
          <InputContainer>
            <Label>지각 벌금</Label>
            <LabelContents>{inputs.lateFee}</LabelContents>
          </InputContainer>
          <SubContainer>
            <InputContainer>
              <Label>상세 정보</Label>
            </InputContainer>
            <TextArea readOnly={true} value={inputs.info} />
          </SubContainer>
        </ContentsContainer>
        <FixedDiv>
          <CreateBtn onClick={toggleModal}>
            <BtnText>스터디 참가하기</BtnText>
          </CreateBtn>
        </FixedDiv>
      </Container>
      {openModal && (
        <>
          <Modal>
            <ModalTextContainer>
              <ModalText>포인트 충전 필요</ModalText>
              <ModalText>포인트 충전 화면으로 이동할까요?</ModalText>
            </ModalTextContainer>
            <ModalBtnContainer>
              <ModalBtn onClick={toggleModal}>취소</ModalBtn>
              <ModalBtn onClick={joinStudy}>충전</ModalBtn>
            </ModalBtnContainer>
          </Modal>
          <BackGround onClick={toggleModal} />
        </>
      )}
    </>
  );
};

const contentWidth = '65%';
const bottomMargin = '12px';
const labelForVerticalCenter = `padding-top: 3px;`;

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
  margin: 3% 5%;
  height: 3rem;
  display: flex;
`;
const Title = styled.label`
  display: flex;
  margin: auto;
  margin-left: 0px;
  font-size: 20px;
  font-weight: 700;
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
  margin: auto;
`;
const BtnText = styled.div`
  color: ${getColor('white')};
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
const Modal = styled.div`
  position: absolute;
  width: 80%;
  max-width: 350px;
  background-color: ${getColor('white')};
  z-index: 999;
  top: 35%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0.5rem 1.5rem 0.5rem;
`;

const ModalTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 300px;
`;

const ModalBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  width: 65%;
  max-width: 200px;
  justify-content: space-around;
`;

const ModalBtn = styled.button`
  width: 4rem;
  height: 2rem;
  border: none;
  border-radius: 20px;
  color: ${getColor('white')};
  background-color: ${getColor('blue')};
`;

const ModalText = styled.div`
  margin-bottom: 1rem;
`;

const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${getColor('gray')};
  opacity: 0.7;
  z-index: 500;
`;

export default StudyDetail;
