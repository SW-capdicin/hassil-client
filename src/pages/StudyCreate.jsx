import 'react-datepicker/dist/react-datepicker.css';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME } from '@/constants';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import emptyimg from '@/img/emptyimg.png';
import { uploadOneImage, createStudy } from '@/api';

const CreateStudy = () => {
  const navigate = useNavigate();

  const [src, setFiles] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputs, setInputs] = useState({
    name: '',
    depositPerPerson: 0,
    category: '',
    operationTime: '',
    info: '',
    absentFee: 0,
    lateFee: 0,
    maxPerson: 0,
    minPerson: 0,
  });
  const { name, depositPerPerson, category, operationTime } = inputs;
  const selectList = [
    // 나중에 category 조회로 불러올 것
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
  const handleSubmit = async (e) => {
    try {
      let image = null;
      if (src) {
        //FormData 생성
        const fd = new FormData();
        //FormData에 key, value 추가
        fd.append('image', src);
        const srcUrl = await uploadOneImage(fd);
        image = srcUrl;
      }
      await createStudy({
        ...inputs,
        startDate,
        endDate,
        src: image || src,
      });
      alert("스터디 생성 완료");
      navigate(PATH_HOME);
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
          <Img src={src ? URL.createObjectURL(src) : emptyimg}></Img>
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
          name="name"
          value={name}
          placeholder="STUDY WITH ME"
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>인당 보증금</Label>
        <Input
          name="depositPerPerson"
          type="number"
          defaultValue={depositPerPerson ? depositPerPerson : ''}
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
        <Label>분야</Label>
        <Select name="category" value={category} onChange={handleChange}>
          {selectList.map((item, i) => (
            <option key={item} value={i}>
              {item}
            </option>
          ))}
        </Select>
      </InputContainer>
      <InputContainer>
        <Label>운영시간</Label>
        <Input
          name="operationTime"
          value={operationTime}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>최소 인원</Label>
        <Input
          name="minPerson"
          type="number"
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>최대 인원</Label>
        <Input
          name="maxPerson"
          type="number"
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>결석 벌금</Label>
        <Input
          name="absentFee"
          type="number"
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>지각 벌금</Label>
        <Input
          name="lateFee"
          type="number"
          onChange={handleChange}
        />
      </InputContainer>
      <SubContainer>
        <InputContainer>
          <Label>상세 정보</Label>
        </InputContainer>
        <TextArea
          name="info"
          onChange={handleChange}
        />
      </SubContainer>
      <FixedDiv>
        <CreateBtn onClick={handleSubmit}>
          <BtnText>스터디 생성하기</BtnText>
        </CreateBtn>
      </FixedDiv>
    </Container>
  );
};

const contentWidth = '16rem';
const bottomMargin = '15px';
const labelForVerticalCenter = `padding-top: 3px;`;
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
  font-size: 15px;
  ${labelForVerticalCenter}
`;
const Input = styled.input`
  border-style: none;
  border-bottom: 1px solid ${getGray};
  color: ${getBlack};
  text-align: left;
  width: ${contentWidth};
  padding-left: 5px;
  height: 2rem;
  font-size: 15px;
`;
const SDatePickerContainer = styled.div`
  width: ${contentWidth};
`;
const SDatePicker = styled(DatePicker)`
  align-items: center;
  text-align: center;
  width: ${contentWidth};
  padding-left: 5px;
  border-style: solid;
  border-color: ${getGray};
  border-radius: 20px;
  height: 2rem;
  font-size: 15px;
`;

const Select = styled.select`
  width: ${contentWidth};
  padding-left: 5px;
  text-align: center;
  height: 2rem;
  border-color: ${getGray};
  font-size: 15px;
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
