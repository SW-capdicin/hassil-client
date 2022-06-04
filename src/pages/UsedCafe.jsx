import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getColor, separatorMoney, getDateTime } from '@/utils';
import { getReservationHistory, postReview } from '@/api';
import StarRatings from 'react-star-ratings';

const UsedCafe = () => {
  const [openModal, setOpenModal] = useState(false);
  const [usedCafeList, setUsedCafeList] = useState([]);
  const [currentId, setCurrentId] = useState(-1);
  const [contents, setContents] = useState('');
  const [rating, setRating] = useState(0);

  const toggleModal = (id) => {
    setOpenModal((prevState) => !prevState);
    setCurrentId(id);
    setContents('');
    setRating(0);
  };
  useEffect(() => {
    getReservationHistory().then((history) => {
      setUsedCafeList(history);
      toggleModal(-1);
    });
  }, []);

  const submit = async () => {
    await postReview(currentId, { contents, rating });
    toggleModal(-1);
  };

  const onChange = (event) => {
    setContents(event.target.value);
  };

  return (
    <>
      <Container>
        <TabContainer>
          <Tab>이용 내역</Tab>
          <Line />
        </TabContainer>
        <SubContainer>
          {usedCafeList.map((cafe, idx) => (
            <Item key={idx}>
              <TextContainer>
                <Date>
                  {getDateTime(cafe.StudyRoomSchedules[0].datetime).date +
                    ' ' +
                    getDateTime(cafe.StudyRoomSchedules[0].datetime).time +
                    ' ~ ' +
                    getDateTime(
                      cafe.StudyRoomSchedules[
                        cafe.StudyRoomSchedules.length - 1
                      ].datetime,
                    )
                      .time.split(':')
                      .map((s, idx) => (idx === 0 ? Number(s) + 1 : s))
                      .join(':')}
                </Date>
                <Name> {cafe.StudyRoomSchedules[0].StudyRoom.name}</Name>
                <Price>
                  결제액{' '}
                  {separatorMoney(cafe.StudyRoomSchedules.length) *
                    cafe.StudyRoomSchedules[0].StudyRoom.pricePerHour}
                  원
                </Price>
              </TextContainer>
              <Button
                onClick={() =>
                  toggleModal(cafe.StudyRoomSchedules[0].StudyRoom.StudyCafe.id)
                }
              >
                리뷰쓰기
              </Button>
            </Item>
          ))}
        </SubContainer>
      </Container>
      {openModal && (
        <>
          <Modal>
            <ModalSubContainer>
              <ModalText>스터디 장소가 마음에 드셨나요?</ModalText>
              <ModalText>다음 이용자를 위해 후기를 남겨주세요.</ModalText>
              <StarContainer>
                <StarRatings
                  rating={rating}
                  starHoverColor="#FFD460"
                  starRatedColor="#FFD460"
                  changeRating={setRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension={'30'}
                />
              </StarContainer>
              <TextArea onChange={onChange} />
              <ModalButton onClick={submit}>리뷰 작성하기</ModalButton>
            </ModalSubContainer>
          </Modal>
          <BackGround onClick={toggleModal} />
        </>
      )}
    </>
  );
};

export default UsedCafe;

const ModalText = styled.div`
  align-self: baseline;
`;

const StarContainer = styled.div`
  margin: 0.5rem 0rem 0.5rem 0rem;
`;

const ModalSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalButton = styled.button`
  color: ${getColor('offwhite')};
  background-color: ${getColor('blue')};
  border: none;
  border-radius: 50px;
  padding: 0.7rem 3rem 0.7rem 3rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 6rem;
  padding: 0.7rem 1rem 1rem 1rem;
  resize: none;
  margin-bottom: 1rem;
`;

const Modal = styled.div`
  position: absolute;
  width: 80%;
  max-width: 350px;
  background-color: ${getColor('offwhite')};
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

const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${getColor('gray')};
  opacity: 0.7;
  z-index: 500;
`;

const Button = styled.button`
  background-color: ${getColor('gray')};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem 0.5rem 1rem;
`;
const SubContainer = styled.div``;

const TextContainer = styled.div``;

const Item = styled.div`
  border: 1px solid ${getColor('gray')};
  border-radius: 20px;
  margin-bottom: 1rem;
  padding: 1rem 0.5rem 1rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Date = styled.div``;
const Name = styled.div`
  font-size: larger;
  margin: 1rem 0rem 1rem 0rem;
`;
const Price = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  width: 80%;
`;

const TabContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const Tab = styled.div`
  color: ${getColor('blue')};
  margin-bottom: 0.5rem;
  margin-left: 1rem;
`;

const Line = styled.hr`
  width: 100%;
  color: ${getColor('gray')};
  margin-bottom: 1rem;
`;
