import 'react-datepicker/dist/react-datepicker.css';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import emptyimg from '@/img/emptyimg.png';
import { findStudy } from '@/api';

const CreateStudy = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [src, setFiles] = useState('');
  const [inputs, setInputs] = useState({});

  const loadData = async _ => {
    const data = await findStudy(params.id);
    setInputs(_ => data);
    setFiles(_ => data.src);
  }
  
  useEffect(_ => {
    return loadData;
  }, []);

  const showImage = src => {
    if (src.includes('http')) {
      return src;
    }
    else if (src == '' || !src) {
      return emptyimg;
    }
    else {
      return URL.createObjectURL(src);
    }
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

  const joinStudy = async (e) => {
    try {
      alert("스터디 참가하기");
      // 스터디 참가 로직 필요
    } catch (e) {
      console.log(e);
      alert('에러 발생');
    }
  };

  const imgInput = useRef();
  const onLoadFile = (e) => {
    const file = e.target.files[0];
    setFiles(file);
  };

  return (
    <Container>
      <SubContainer>
        <InputContainer>
          <Label>대표 이미지 등록</Label>
        </InputContainer>
        <SelectImg onClick={() => imgInput.current.click()}>
          <Img src={showImage(src)}></Img>
        </SelectImg>
        <LabelContents
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={imgInput}
          onChange={onLoadFile}
        />
      </SubContainer>
      <InputContainer>
        <Label>제목</Label>
        <LabelContents>{inputs.name}</LabelContents>
      </InputContainer>
      <InputContainer>
        <Label>인당 보증금</Label>
        <LabelContents>{inputs.depositPerPerson}</LabelContents>
      </InputContainer>
      <InputContainer>
        <Label>기간</Label>
        <LabelContents>{
          inputs.startDate &&
          inputs.startDate.split('T')[0]
        } ~ {
          inputs.endDate &&
          inputs.endDate.split('T')[0]
        }</LabelContents>
      </InputContainer>
      <InputContainer>
        <Label>카테고리</Label>
        <LabelContents>{selectList[inputs.categoryId || 0]}</LabelContents>
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
        <TextArea
          readOnly={true}
          value={inputs.info}
        />
      </SubContainer>
      <FixedDiv>
        <CreateBtn onClick={joinStudy}>
          <BtnText>스터디 참가하기</BtnText>
        </CreateBtn>
      </FixedDiv>
    </Container>
  );
};

const contentWidth = '14rem';
const bottomMargin = '15px';
const getGray = ({ theme }) => theme.color.gray;
const getBlack = ({ theme }) => theme.color.black;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 37.4rem;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  overflow: auto;
`;
const SubContainer = styled.div``;
const SelectImg = styled.div``;
const Img = styled.img`
  display: flex;
  width: 22rem;
  margin: auto;
  margin-bottom: ${bottomMargin};
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${bottomMargin};
`;
const Label = styled.label`
  color: ${getGray};
  display: flex;
  margin: auto;
  margin-left: 0px;
`;
const LabelContents = styled.label`
  color: ${getBlack};
  text-align: center;
  width: ${contentWidth};
  height: 2rem;
  padding-left: 5px;
`;

const FixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  border-top: 1px solid ${getGray};
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
  border-color: ${getGray};
  border-radius: 5px;
  padding: 5px;
  margin-bottom: ${bottomMargin};
`;


export default CreateStudy;
