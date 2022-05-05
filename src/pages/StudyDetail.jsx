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
        <Label>대표 이미지 등록</Label>
        <SelectImg onClick={() => imgInput.current.click()}>
          <Img src={src ? URL.createObjectURL(src) : emptyimg}></Img>
        </SelectImg>
        <LabelUnderLine
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={imgInput}
          onChange={onLoadFile}
        />
      </SubContainer>
      <InputContainer>
        <Label>제목</Label>
        <LabelUnderLine>{inputs.name}</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>내용</Label>
        <LabelUnderLine>{inputs.info}</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>인당 보증금</Label>
        <LabelUnderLine>{inputs.depositPerPerson}</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>시작 날짜</Label>
        <LabelUnderLine>{
          inputs.startDate &&
          inputs.startDate.split('T')[0]
        }</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>종료 날짜</Label>
        <LabelUnderLine>{
          inputs.endDate &&
          inputs.endDate.split('T')[0]
        }</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>카테고리</Label>
        <LabelUnderLine>{selectList[inputs.categoryId || 0]}</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>운영시간</Label>
        <LabelUnderLine>{inputs.operationTime}</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>최소 인원</Label>
        <LabelUnderLine>{inputs.minPerson}</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>최대 인원</Label>
        <LabelUnderLine>{inputs.maxPerson}</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>결석 벌금</Label>
        <LabelUnderLine>{inputs.absentFee}</LabelUnderLine>
      </InputContainer>
      <InputContainer>
        <Label>지각 벌금</Label>
        <LabelUnderLine>{inputs.lateFee}</LabelUnderLine>
      </InputContainer>
      <CreateBtn onClick={joinStudy}>
        <BtnText>스터디 참가하기</BtnText>
      </CreateBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  width: 18rem;
  justify-content: space-around;
`;
const SubContainer = styled.div``;
const SelectImg = styled.div``;
const Img = styled.img`
  display: flex;
  width: 18rem;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.color.gray};
`;
const Input = styled.input``;
const LabelUnderLine = styled.label`
  border-style: none none solid none;
  font-weight: bold;
  color: ${({ theme }) => theme.color.black};
  text-align: center;
  width: 12rem;
  padding-left: 5px;
`;
const SDatePickerContainer = styled.div`
  width: 12rem;
`;
const SDatePicker = styled(DatePicker)`
  align-items: center;
  text-align: center;
  width: 12rem;
  padding-left: 5px;
  border-radius: 20px;
`;

const Select = styled.select`
  width: 12rem;
  padding-left: 5px;
  text-align: center;
`;
const CreateBtn = styled.button`
  background-color: ${({ theme }) => theme.color.blue};
  border: 0;
  outline: 0;
  width: 14rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 20px;
  cursor: pointer;
`;
const BtnText = styled.div`
  color: ${({ theme }) => theme.color.white};
`;
export default CreateStudy;
