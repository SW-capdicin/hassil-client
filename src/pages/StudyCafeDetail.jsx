import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { emptyimg, review, right } from '@/img';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getOneStudyCafe } from '@/api';
import { CafeReview } from '@/components';

const StudyCafeDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [studyCafe, setStudyCafe] = useState({});
  const [showReview, setShowReview] = useState(false);

  const studyId = location.state.studyId;
  const StudyCafeId = params.id;
  const findOneStudyCafe = async () => {
    const Cafe = await getOneStudyCafe(StudyCafeId);
    setStudyCafe(Cafe);
  };

  const toggleShowReview = () => {
    setShowReview((prevState) => !prevState);
  };

  useEffect(() => {
    findOneStudyCafe();
  }, []);

  const goReserveStudyRoomPage = () => {
    navigate(`${window.location.pathname}/reserve`, {
      state: { studyId: studyId },
    });
  };
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
          <CafeReview reviewList={studyCafe.Reviews} />
        ) : (
          <>
            <StudyCafeInfo>{studyCafe.info}</StudyCafeInfo>
          </>
        )}
      </StudyCafeBody>

      <FixedDiv>
        <CreateBtn onClick={goReserveStudyRoomPage}>
          <BtnText>예약하러 가기</BtnText>
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
  width: 90vw;
  height: 10rem;
  border-radius: 10px;
  align-self: center;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;
const StudyCafeHeader = styled.div`
  display: flex;
  width: 90vw;
  height: 2rem;
  justify-content: space-between;
`;
const StudyCafeName = styled.div`
  white-space: nowrap;
`;
const Review = styled.div`
  white-space: nowrap;
`;
const StudyCafeBody = styled.div`
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 400px;
  margin-bottom: 5rem;
  margin-top: 1rem;
`;
const StudyCafeInfo = styled.div`
  display: flex;
  justify-content: center;
  /* width: 70vw; */
  height: auto;
  white-space: pre-line;
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
