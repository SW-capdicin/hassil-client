import 'react-datepicker/dist/react-datepicker.css';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME, TYPE_STUDY_CATEGORY } from '@/constants';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import emptyimg from '@/img/emptyimg.png';
import { uploadOneImage, createStudy } from '@/api';
import { getColor } from '@/utils';
import { useSelector } from 'react-redux';

const CreateStudy = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [src, setFiles] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputs, setInputs] = useState({
    name: '',
    depositPerPerson: 1000,
    categoryId: 1,
    operationTime: '',
    info: '',
    absentFee: 500,
    lateFee: 500,
    maxPerson: 1,
    minPerson: 1,
  });
  const { name, depositPerPerson, categoryId, operationTime } = inputs;
  const selectList = [
    // 나중에 category 조회로 불러올 것
    ...TYPE_STUDY_CATEGORY,
  ];
  const handleChange = (e) => {
    const nextInputs = {
      ...inputs,
      [e.target.name]: e.target.value,
    };
    setInputs(nextInputs);
  };
  const handleSubmit = async () => {
    if (Number(userState.point) < Number(inputs.depositPerPerson)) {
      alert('포인트가 부족합니다');
      return;
    }
    if (
      Number(inputs.maxPerson) < Number(inputs.minPerson) ||
      inputs.maxPerson === '0'
    ) {
      alert('인원 수를 확인해주세요.');
      return;
    }
    if (
      Number(inputs.maxPerson) < 0 ||
      Number(inputs.minPerson) < 0 ||
      Number(inputs.lateFee) < 0 ||
      Number(inputs.absentFee) < 0 ||
      Number(inputs.depositPerPerson) < 0
    ) {
      alert('잘못된 값이 있습니다');
      return;
    }

    try {
      let image = null;
      if (src) {
        const fd = new FormData();
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
      navigate(PATH_HOME);
    } catch (e) {
      console.error(e);
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
          value={inputs.value}
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
        <Select name="categoryId" value={categoryId} onChange={handleChange}>
          {selectList.map((item) => (
            <option key={item.name} value={item.id}>
              {item.name}
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
          placeholder="오전 11:00~12:00"
        />
      </InputContainer>
      <InputContainer>
        <Label>최소 인원</Label>
        <Input
          name="minPerson"
          type="number"
          onChange={handleChange}
          value={inputs.minPerson}
        />
      </InputContainer>
      <InputContainer>
        <Label>최대 인원</Label>
        <Input
          name="maxPerson"
          type="number"
          onChange={handleChange}
          value={inputs.maxPerson}
        />
      </InputContainer>
      <InputContainer>
        <Label>결석 벌금</Label>
        <Input
          name="absentFee"
          type="number"
          onChange={handleChange}
          value={inputs.absentFee}
        />
      </InputContainer>
      <InputContainer>
        <Label>지각 벌금</Label>
        <Input
          name="lateFee"
          type="number"
          onChange={handleChange}
          value={inputs.lateFee}
        />
      </InputContainer>
      <SubContainer>
        <InputContainer>
          <Label>상세 정보</Label>
        </InputContainer>
        <TextArea
          name="info"
          onChange={handleChange}
          placeholder="상세 정보를 입력해주세요"
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

const contentWidth = '65%';
const bottomMargin = '15px';
const labelForVerticalCenter = `padding-top: 3px;`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10rem);
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  overflow: auto;
`;
const SubContainer = styled.div``;
const SelectImg = styled.div``;
const Img = styled.img`
  display: flex;
  width: 100%;
  max-height: 45vh;
  margin-bottom: ${bottomMargin};
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
const Input = styled.input`
  border-style: none;
  border-bottom: 1px solid ${getColor('gray')};
  color: ${getColor('black')};
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
  width: 100%;
  padding-left: 5px;
  border-style: solid;
  border-color: ${getColor('gray')};
  border-radius: 20px;
  height: 2rem;
  font-size: 15px;
`;

const Select = styled.select`
  width: ${contentWidth};
  padding-left: 5px;
  text-align: center;
  height: 2rem;
  border-color: ${getColor('gray')};
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

export default CreateStudy;
