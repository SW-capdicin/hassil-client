import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import emptyimg from '@/img/emptyimg.png';
import { uploadOneImage } from '@/api';

import { IoMdAddCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Input } from '@/components';
import { getColor } from '@/utils';
const { daum } = window;

const StudyCafeCreate = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [src, setFiles] = useState(null);
  const [inputs, setInputs] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    operationTime: '',
    info: '',
  });
  const [studyRooms, setStudyRooms] = useState([]);
  const [studyRoom, setStudyRoom] = useState({
    studyRoomName: '',
    pricePerHour: 0,
    maxPerson: 0,
    img: null,
  });
  const { studyRoomName, pricePerHour, maxPerson } = studyRoom;
  const { name, address, phoneNumber, operationTime } = inputs;
  const [openModal, setOpenModal] = useState(false);
  const imgInput = useRef();
  const studyRoomImgInput = useRef();

  const onLoadFile = (e) => {
    console.log(e);
    const file = e.target.files[0];
    setFiles(file);
  };

  useEffect(() => {
    console.log('studyRoom : ', studyRoom);
    console.log('studyRooms : ', studyRooms);
    console.log(src);
  }, [studyRooms, src]);

  const handleChange = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };
  const addStudyRoom = () => {
    toggleModal();
  };

  const handleChangeStudyRoom = (event) => {
    setStudyRoom((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };
  const handleImgStudyRoom = (event) => {
    setStudyRoom((prevInputs) => ({
      ...prevInputs,
      img: event.target.files[0],
    }));
  };

  const registStudyRoom = async () => {
    // setStudyRooms(studyRooms.concat(studyRoom));
    await setStudyRooms((prevInputs) => [...prevInputs, studyRoom]);
    await setStudyRoom((prevInputs) => ({
      ...prevInputs,
      studyRoomName: '',
      pricePerHour: 0,
      maxPerson: 0,
    }));
    await toggleModal();
  };
  const Post = async () => {
    await new daum.Postcode({
      oncomplete: function (data) {
        let addr = data.address; // 최종 주소 변수
        setInputs((prevInputs) => ({
          ...prevInputs,
          address: addr,
        }));
        console.log(addr);
        console.log(address);
      },
    }).open();
  };
  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };
  const cancelRegistStudyRoom = () => {
    setStudyRoom((prevInputs) => ({
      ...prevInputs,
      studyRoomName: '',
      pricePerHour: 0,
      maxPerson: 0,
      img: null,
    }));
    toggleModal();
  };

  const handleSubmit = () => {
    // studyCafe 등록하는 api 필요
    alert('매장 등록 성공');
    const StudyCafe = {
      ...inputs,
      studyRooms: { ...studyRooms },
    };
    console.log('StudyCafe : ', StudyCafe);
  };
  const setModal = () => {
    return (
      <>
        <Modal>
          <Title>스터디룸 등록</Title>
          <InputContainer>
            <Mlabel>이름</Mlabel>
            <MInput
              type="text"
              name="studyRoomName"
              label="이름"
              value={studyRoomName}
              onChange={handleChangeStudyRoom}
            />
          </InputContainer>
          <InputContainer>
            <Mlabel>시간당 가격</Mlabel>
            <MInput
              type="text"
              name="pricePerHour"
              label="시간당 가격"
              value={pricePerHour}
              onChange={handleChangeStudyRoom}
            />
          </InputContainer>
          <InputContainer>
            <Mlabel>최대 수용 인원</Mlabel>
            <MInput
              type="text"
              name="maxPerson"
              label="최대 수용 인원"
              value={maxPerson}
              onChange={handleChangeStudyRoom}
            />
          </InputContainer>
          <InputContainer>
            <Mlabel>대표 이미지 등록</Mlabel>
            <MSelectImg onClick={() => studyRoomImgInput.current.click()}>
              {/* <CuIoMdAddCircle /> */}
              {studyRoom.img ? (
                <MImg src={URL.createObjectURL(studyRoom.img)}></MImg>
              ) : (
                <CuIoMdAddCircle />
              )}
            </MSelectImg>
            <MInput
              type="file"
              accept="image/*"
              ref={studyRoomImgInput}
              style={{ display: 'none' }}
              onChange={handleImgStudyRoom}
            />
          </InputContainer>
          <BtnContainer>
            <Mbtn onClick={cancelRegistStudyRoom}>취소</Mbtn>
            <Mbtn onClick={registStudyRoom}>등록</Mbtn>
          </BtnContainer>
        </Modal>
        <BackGround onClick={toggleModal} />
      </>
    );
  };

  return (
    <>
      <Container>
        {/* <SubContainer> */}
        <InputContainer>
          <Label>대표 이미지 등록</Label>
        </InputContainer>
        <SelectImg onClick={() => imgInput.current.click()}>
          <Img src={src ? URL.createObjectURL(src) : emptyimg}></Img>
        </SelectImg>
        {/* </SubContainer> */}
        <Input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={imgInput}
          onChange={onLoadFile}
        />
        <Input
          type="text"
          name="name"
          label="매장 이름"
          placeholder="매장 이름을 입력하세요"
          value={name}
          onChange={handleChange}
        />
        <InputContainer>
          <Label>위치</Label>
          <AddressInput
            type="text"
            name="address"
            value={address}
            onClick={Post}
            readOnly
          />
        </InputContainer>
        <Input
          type="tel"
          name="phoneNumber"
          label="연락처"
          placeholder="010-1234-1234"
          value={phoneNumber}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="operationTime"
          label="운영 시간"
          placeholder="오전 11:00~12:00"
          value={operationTime}
          onChange={handleChange}
        />
        <SubContainer>
          <InputContainer>
            <Label>가게 소개</Label>
          </InputContainer>
          <TextArea
            name="info"
            onChange={handleChange}
            placeholder="상세 정보를 입력해주세요"
          />
        </SubContainer>
        <SubContainer>
          <InputContainer>
            <Label>스터디룸 등록</Label>
          </InputContainer>
          {studyRooms.map((item, idx) => {
            return (
              <StudyRoomContainer key={idx}>
                <StudyRoomText>{item.studyRoomName}</StudyRoomText>
                <StudyRoomText>{item.pricePerHour}</StudyRoomText>
                <StudyRoomText>{item.maxPerson}</StudyRoomText>
              </StudyRoomContainer>
            );
          })}
          <AddBtnContainer>
            <CuIoMdAddCircle onClick={addStudyRoom} />
          </AddBtnContainer>
        </SubContainer>
        <FixedDiv>
          <CreateBtn onClick={handleSubmit}>
            <BtnText>매장 등록하기</BtnText>
          </CreateBtn>
        </FixedDiv>
      </Container>
      {openModal && setModal()}
    </>
  );
};

// const contentWidth = '65%';
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
  justify-content: space-evenly;
`;
const SubContainer = styled.div``;
const SelectImg = styled.div``;
const Img = styled.img`
  display: flex;
  width: 100%;
  max-height: 45vh;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${bottomMargin};
`;
const InputWithLabel = styled.input`
  ${bottomMargin}
`;
const Label = styled.label`
  color: ${({ theme }) => theme.color.gray};
  display: flex;
  margin: auto;
  margin-left: 0px;
  font-size: 15px;
  ${labelForVerticalCenter}
`;
const AddressInput = styled.input`
  width: 12rem;
  border-style: none none solid none;
  padding-left: 2px;
  :focus {
    outline: none;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 5rem;
  resize: vertical;
  border-color: ${({ theme }) => theme.color.gray};
  border-radius: 5px;
  padding: 5px;
  margin-bottom: ${bottomMargin};
`;
const Modal = styled.div`
  position: absolute;
  width: 80%;
  /* height: 60%; */
  /* max-height: max-content; */
  max-width: 350px;
  color: ${getColor('black')};
  font-weight: bold;
  background-color: ${getColor('offwhite')};
  z-index: 999;
  top: 25%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  padding: 1.5rem 0.5rem 1.5rem 0.5rem;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: large;
  font-weight: bold;
`;
const Mlabel = styled.label`
  display: flex;
  /* margin: auto; */
  /* margin-left: 0px; */
  font-size: 15px;
  ${labelForVerticalCenter}
`;
const MInput = styled.input`
  border-style: none none solid none;
  border-color: ${getColor('gray')};
  width: 50%;
  text-align: center;
`;
const MSelectImg = styled.div`
  display: flex;
  justify-content: center;
`;
const MImg = styled.img`
  display: flex;
  max-width: 80%;
  max-height: 100%;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
`;
const Mbtn = styled.button`
  background-color: ${getColor('blue')};
  border: 0;
  outline: 0;
  border-radius: 30px;
  color: ${getColor('offwhite')};
  font-weight: bold;
  width: 30%;
  height: 2rem;
`;
const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${getColor('gray')};
  opacity: 0.7;
  z-index: 500;
`;
const StudyRoomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border: 1px solid ${getColor('gray')};
  height: 2rem;
  width: 100%;
  margin-bottom: ${bottomMargin};
`;
const StudyRoomText = styled.div`
  width: 100%;
  font-weight: bold;
  margin-left: 10px;
  /* display: flex; */
`;
const AddBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid ${getColor('gray')};
  margin-bottom: 20px;
`;
const CuIoMdAddCircle = styled(IoMdAddCircle)`
  width: 2rem;
  height: 2rem;
  color: ${getColor('gray')};
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
  color: ${getColor('offwhite')};
  font-weight: bold;
  font-size: 16px;
`;

export default StudyCafeCreate;
