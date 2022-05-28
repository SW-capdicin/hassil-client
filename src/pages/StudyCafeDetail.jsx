import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { emptyimg, review, right } from '@/img';
import { useParams } from 'react-router-dom';
import { getOneStudyCafe, getStudyRoomsInStudyCafe } from '@/api';
import { CafeReview } from '@/components';

const StudyCafeDetail = () => {
  const params = useParams();
  const [studyCafe, setStudyCafe] = useState({});
  const [studyRooms, setStudyRooms] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const StudyCafeId = params.id;
  const findOneStudyCafe = async () => {
    const Cafe = await getOneStudyCafe(StudyCafeId);
    console.log('StudyCafe : ', Cafe);
    setStudyCafe(Cafe);
  };

  const getStudyRooms = async () => {
    const StudyRooms = await getStudyRoomsInStudyCafe(StudyCafeId);
    console.log('StudyRooms : ', StudyRooms);
    setStudyRooms(StudyRooms);
  };

  const toggleShowReview = () => {
    setShowReview((prevState) => !prevState);
  };

  useEffect(() => {
    findOneStudyCafe();
    getStudyRooms();
    console.log(typeof studyCafe);
    console.log(studyCafe);
  }, []);

  return (
    <Container>
      <Img
        src={
          studyCafe.StudyCafeImages
            ? `${studyCafe.StudyCafeImages[0].src}`
            : emptyimg
        }
      />
      <StudyCafeHeader>
        <StudyCafeName>{studyCafe.name}</StudyCafeName>
        <Review onClick={toggleShowReview}>
          <ReviewImg src={review} width="20" />
          4.6 (17)
          <RightImg src={right} width="20" height="15" />
        </Review>
      </StudyCafeHeader>
      <StudyCafeBody>
        {showReview ? (
          <CafeReview />
        ) : (
          <>
            <StudyCafeInfo>{studyCafe.info}</StudyCafeInfo>
            <StudyRoomsContainer>
              {studyRooms.map((item) => {
                return (
                  <StudyRooms key={item.id}>
                    {`${item.name}(다인실)`} {`${item.maxPerson}인실`}{' '}
                    {`시간당 ${item.pricePerHour}`}
                  </StudyRooms>
                );
              })}
            </StudyRoomsContainer>
          </>
        )}
      </StudyCafeBody>
      <FixedDiv>
        <CreateBtn>
          <BtnText>예약하기</BtnText>
        </CreateBtn>
      </FixedDiv>
    </Container>
  );
};

const ReviewImg = styled.img`
  margin-right: 5px;
`;

const RightImg = styled.img``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Img = styled.img`
  width: 80vw;
  height: 10rem;
  border-radius: 10px;
  align-self: center;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;
const StudyCafeHeader = styled.div`
  display: flex;
  width: 80vw;
  height: 2rem;
  justify-content: space-between;
`;
const StudyCafeName = styled.div``;
const Review = styled.div``;
const StudyCafeBody = styled.div`
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 400px;
  margin-bottom: 5rem;
`;
const StudyCafeInfo = styled.div`
  display: flex;
  justify-content: center;
  /* width: 70vw; */
  height: auto;
  white-space: pre-line;
`;
const StudyRoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: auto;
  border-width: 1px;
  border-style: solid none none none;
  border-color: ${({ theme }) => theme.color.gray};
`;

const StudyRooms = styled.div`
  display: flex;
  width: 100vw;
  height: 3rem;
  border-width: 1px;
  border-style: none none solid none;
  border-color: ${({ theme }) => theme.color.gray};
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem 1rem 0rem;
`;

const FixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.color.gray};
  background-color: ${({ theme }) => theme.color.offwhite};
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
  font-style: normal;
  font-weight: 700;
  font-size: larger;
`;

export default StudyCafeDetail;
