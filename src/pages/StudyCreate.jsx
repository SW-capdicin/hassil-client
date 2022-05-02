import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import emptyimg from '@/img/emptyimg.png';

const CreateStudy = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputs, setInputs] = useState({
    title: '',
    deposit: 0,
    category: '',
    operating_time: '',
  });
  const { title, deposit, category, operating_time } = inputs;
  const selectList = [
    '관심 분야를 고르세요',
    '코딩',
    '영어',
    '중국어',
    '수학',
    'NCS',
  ];
  const handleChange = (e) => {
    const nextInputs = {
      ...inputs,
      [e.target.name]: e.target.value,
    };
    setInputs(nextInputs);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('제목 : ', { title });
    console.log('보증금 : ', { deposit });
    console.log('시작날짜 : ', { startDate });
    console.log('종료날짜 : ', { endDate });
    console.log('카테고리 : ', { category });
    console.log('운영시간 : ', { operating_time });
    console.log('이미지 : ', { files });
    setInputs({
      title: '',
      deposit: 0,
      category: '',
      operating_time: '',
    });
  };

  const imgInput = useRef();
  const [files, setFiles] = useState('');
  const onLoadFile = (e) => {
    const file = e.target.files[0];
    setFiles(file);
  };

  return (
    <Container>
      <SubContainer>
        <Label>대표 이미지 등록</Label>
        <SelectImg onClick={() => imgInput.current.click()}>
          <Img src={files ? URL.createObjectURL(files) : emptyimg}></Img>
        </SelectImg>
        <Input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={imgInput}
          onChange={onLoadFile}
        />
      </SubContainer>
      <InputContainer>
        <Label>제목</Label>
        <Input
          name="title"
          value={title}
          placeholder="STUDY WITH ME"
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>보증금</Label>
        <Input
          name="deposit"
          type="number"
          defaultValue={deposit ? deposit : ''}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>시작 날짜</Label>
        <SDatePickerContainer>
          <SDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={ko}
            minDate={new Date()}
            dateFormat="yyyy년 MM월 dd일"
          />
        </SDatePickerContainer>
      </InputContainer>
      <InputContainer>
        <Label>종료 날짜</Label>
        <SDatePickerContainer>
          <SDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
          />
        </SDatePickerContainer>
      </InputContainer>
      <InputContainer>
        <Label>카테고리</Label>
        <Select name="category" value={category} onChange={handleChange}>
          {selectList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </InputContainer>
      <InputContainer>
        <Label>운영시간</Label>
        <Input
          name="operating_time"
          value={operating_time}
          onChange={handleChange}
        />
      </InputContainer>
      <CreateBtn onClick={handleSubmit}>
        <BtnText>스터디 생성하기</BtnText>
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
const Input = styled.input`
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
