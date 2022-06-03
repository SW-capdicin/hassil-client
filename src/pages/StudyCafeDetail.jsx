import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { emptyimg, review, right } from '@/img';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getOneStudyCafe } from '@/api';
import { CafeReview } from '@/components';
import { getColor, separatorMoney } from '@/utils';

const StudyCafeDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [studyCafe, setStudyCafe] = useState({});
  const [showReview, setShowReview] = useState(false);

  const studyId = location?.state?.studyId;
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
    <Container studyId={studyId}>
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
          {Math.round(

            (studyCafe?.Reviews?.reduce((prev, cur) => prev + cur.rating, 0) /
            studyCafe?.Reviews?.length) || 0
          )} ({studyCafe?.Reviews?.length || 0})
          <RightImg style={{ margin: 'auto', 'marginLeft': '5px' }} src={right} width="20" height="15" />
        </Review>
      </StudyCafeHeader>
      <StudyCafeBody>
        {showReview ? (
          <CafeReview reviewList={studyCafe.Reviews} />
        ) : (
          <ContentContainer>
            <SubTitle>스터디 카페 설명</SubTitle>
            <StudyCafeInfo>{studyCafe.info}</StudyCafeInfo>
            <>
              <SubTitle>스터디 룸</SubTitle>
              {studyCafe?.StudyRooms?.map((item, idx) => {
                return (
                    <StudyRoomContainer key={idx}>
                      <RoomImg src={item.src || emptyimg} />
                      <RowBox>
                        <StudyRoomText>{item.name}룸</StudyRoomText>
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
            </>
          </ContentContainer>
        )}
      </StudyCafeBody>

      {studyId && (
        <FixedDiv>
          <CreateBtn onClick={goReserveStudyRoomPage}>
            <BtnText>예약하러 가기</BtnText>
          </CreateBtn>
        </FixedDiv>
      )}
    </Container>
  );
};

const ReviewImg = styled.img`
  margin: auto;
  margin-right: 5px;
`;

const RightImg = styled.img`
  padding-top: 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${(props) => props.studyId ? `calc(100vh - 9rem);` : `calc(100vh - 5rem);`}
`;
const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  width: 90%;
`;
const Img = styled.img`
  width: 90vw;
  height: 12rem;
  border-radius: 10px;
  align-self: center;
  object-fit: cover;
  margin-bottom: 0.5rem;
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

const StudyCafeHeader = styled.div`
  display: flex;
  width: 90vw;
  height: 2rem;
  justify-content: space-between;
  margin-bottom: 5px;
}
`;
const StudyCafeName = styled.div`
  white-space: nowrap;
  line-height: 32px;
  font-size: 18px;
  padding-top: 2px;
`;
const Review = styled.div`
  display: flex;
  white-space: nowrap;
  line-height: 34px;
`;
const StudyCafeBody = styled.div`
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 2rem;
  margin-top: 1rem;
`;
const SubTitle = styled.div`
  color: ${getColor('gray')};
  display: flex;
  margin: auto;
  margin-left: 0px;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 15px;
`;
const StudyCafeInfo = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  white-space: pre-line;
  margin-bottom: 30px;
`;

const StudyRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid ${getColor('gray')};
  border-radius: 10px;
  width: 100%;
  margin-bottom: 15px;
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
