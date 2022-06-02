import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import emptyimg from '@/img/emptyimg.png';
import { uploadOneImage, createStudyCafe } from '@/api';

import { IoMdAddCircle } from 'react-icons/io';
import { Input } from '@/components';
import { getColor, separatorMoney } from '@/utils';
const { kakao, daum } = window;

const StudyCafeCreate = () => {
  const navigate = useNavigate();
  const [src, setFiles] = useState(null);
  const [inputs, setInputs] = useState({
    longitude: '',
    latitude: '',
    name: '',
    address: '',
    region_2depth_name: '',
    shopNumber: '',
    operationTime: '',
    info: '',
  });
  const [studyRooms, setStudyRooms] = useState([]);
  const [studyRoom, setStudyRoom] = useState({
    studyRoomName: '',
    pricePerHour: 0,
    maxPerson: 0,
    src: null,
  });
  const { studyRoomName, pricePerHour, maxPerson } = studyRoom;
  const { name, address, shopNumber, operationTime } = inputs;
  const [openModal, setOpenModal] = useState(false);
  const imgInput = useRef();
  const studyRoomImgInput = useRef();

  const onLoadFile = (e) => {
    console.log(e);
    const file = e.target.files[0];
    setFiles(file);
  };

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
      src: event.target.files[0],
    }));
  };

  const registStudyRoom = async () => {
    let image = null;
    if (studyRoom.src) {
      const fd = new FormData();
      fd.append('image', studyRoom.src);
      const srcUrl = await uploadOneImage(fd);
      image = srcUrl;
    }

    await setStudyRooms((prevInputs) => [
      ...prevInputs,
      { ...studyRoom, src: image },
    ]);
    await setStudyRoom((prevInputs) => ({
      ...prevInputs,
      studyRoomName: '',
      pricePerHour: 0,
      maxPerson: 0,
      src: null,
    }));
    await toggleModal();
  };
  const Post = async () => {
    let geocoder = new kakao.maps.services.Geocoder();
    await new daum.Postcode({
      oncomplete: function (data) {
        let addr = data.address;
        let lng = null;
        let lat = null;
        let loc = null;
        geocoder.addressSearch(data.address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            lng = result[0].x;
            lat = result[0].y;
            loc = result[0].road_address.region_2depth_name;

            setInputs((prevInputs) => ({
              ...prevInputs,
              longitude: lng,
              latitude: lat,
              address: addr,
              region_2depth_name: loc,
            }));
          }
        });
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
      src: null,
    }));
    toggleModal();
  };

  const handleSubmit = async () => {
    let image = null;
    if (src) {
      const fd = new FormData();
      fd.append('image', src);
      const srcUrl = await uploadOneImage(fd);
      image = srcUrl;
    }
    const StudyCafe = {
      ...inputs,
      StudyCafeImages: [{ src: image }],
      studyRooms: [...studyRooms],
    };
    const response = await createStudyCafe(StudyCafe);
    console.log(response);
    navigate('/');
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
            <MSelectImg onClick={() => studyRoomImgInput.current.click()}>
              {studyRoom.src ? (
                <MImg src={URL.createObjectURL(studyRoom.src)}></MImg>
              ) : (
                <>
                  <Mlabel>대표 이미지 등록</Mlabel>
                  <MAddBtnContainer>
                    <CuIoMdAddCircle />
                  </MAddBtnContainer>
                </>
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
          name="shopNumber"
          label="연락처"
          placeholder="010-1234-1234"
          value={shopNumber}
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
                <RoomImg src={item.src} />
                <RowBox>
                  <StudyRoomText>{item.studyRoomName}룸</StudyRoomText>
                  <StudyRoomText>
                    <StudyRoomSub>시간당 가격 :</StudyRoomSub>
                    {separatorMoney(item.pricePerHour)}원
                  </StudyRoomText>
                  <StudyRoomText>
                    <StudyRoomSub>수용 인원 :</StudyRoomSub>
                    {Number(item.maxPerson)}명
                  </StudyRoomText>
                </RowBox>
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
`;
const SubContainer = styled.div``;
const SelectImg = styled.div``;
const Img = styled.img`
  display: flex;
  width: 100%;
  height: 230px;
  object-fit: cover;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const RoomImg = styled.img`
  /* border 가리기 위한 css */
  width: calc(100% + 2px);
  margin-left: -1px;
  margin-top: -1px;

  display: flex;
  height: 130px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${bottomMargin};
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
  border-color: ${getColor('gray')};
  padding-left: 2px;
  border-width: 1px;
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
  &::placeholder {
    color: ${getColor('gray')};
  }
`;
const Modal = styled.div`
  position: absolute;
  width: 80%;
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
  padding: 1.5rem 1rem 1.5rem 1rem;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: large;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const Mlabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 15px;
  width: 50%;
  height: 2rem;
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
  justify-content: space-between;
  width: 100%;
  max-height: 150px;
`;
const MAddBtnContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
`;
const MImg = styled.img`
  display: flex;
  max-width: 100%;
  object-fit: contain;
  border-radius: 10px;
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
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid ${getColor('gray')};
  border-radius: 10px;
  width: 100%;
  margin-bottom: ${bottomMargin};
`;
const StudyRoomSub = styled.div`
  display: flex;
  font-size: 10px;
  font-weight: 400;
  margin: auto;
  margin-right: 5px;
  color: ${getColor('gray')};
`;
const StudyRoomText = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  margin: auto;
`;
const AddBtnContainer = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  border: 1px solid ${getColor('gray')};
  margin-bottom: 20px;
  border-radius: 10px;
`;
const CuIoMdAddCircle = styled(IoMdAddCircle)`
  width: 2rem;
  height: 2rem;
  color: ${getColor('gray')};
  margin: auto;
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
