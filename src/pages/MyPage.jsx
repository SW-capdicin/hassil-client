import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { BiChevronRight } from 'react-icons/bi';
import { logout } from '@/api';
import {
  PATH_JOINED_STUDY_LIST,
  PATH_USER_EDIT,
  PATH_PAYMENT,
  PATH_REFUND,
  PATH_POINT_HISTORY,
} from '@/constants';
import { getColor } from '@/utils';
import { checkCircle } from '@/img';

const MyPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const goJoinedStudyList = () => {
    navigate(PATH_JOINED_STUDY_LIST);
  };

  const logoutHandler = async () => {
    const responseStatus = await logout();
    if (responseStatus === 200) {
      navigate('/');
    }
  };

  const navigatePage = (path) => {
    navigate(path);
  };

  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <Container>
        <ProfileContainer>
          <CgProfile size={50} />
          <Nickname onClick={toggleModal}>토익하자</Nickname>
          <BiChevronRight size={25} />
        </ProfileContainer>
        <Line>
          <hr size="10px" width="100%" />
        </Line>
        <InformationContainer>
          <PointContainer>
            <FirstBox>
              <div>보유 포인트</div>
              <div>30000원</div>
            </FirstBox>
            <SecondBox>
              <PointHistory>
                <div
                  onClick={() => {
                    navigatePage(PATH_POINT_HISTORY);
                  }}
                >
                  내역 보기
                </div>
                <BiChevronRight size={25} />
              </PointHistory>
              <BtnContainer>
                <Btn
                  onClick={() => {
                    navigatePage(PATH_PAYMENT);
                  }}
                >
                  충전
                </Btn>
                <Btn
                  onClick={() => {
                    navigatePage(PATH_REFUND);
                  }}
                >
                  환급
                </Btn>
              </BtnContainer>
            </SecondBox>
          </PointContainer>
          <InputContainer>
            <StudyList onClick={goJoinedStudyList}>
              가입한 스터디 목록
            </StudyList>
            <BiChevronRight size={25} />
          </InputContainer>
          <Link to={PATH_USER_EDIT}>
            <InputContainer>
              <EditInformation>회원 정보 수정</EditInformation>
              <BiChevronRight size={25} />
            </InputContainer>
          </Link>
          <InputContainer>
            <Logout onClick={logoutHandler}>로그아웃</Logout>
            <BiChevronRight size={25} />
          </InputContainer>
        </InformationContainer>
      </Container>
      {openModal && (
        <>
          <Modal>
            <Img />
            <ModalText>출석 완료</ModalText>
          </Modal>
          <BackGround onClick={toggleModal} />
        </>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  width: 18rem;
  align-items: flex-start;
`;
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Nickname = styled.div`
  color: ${getColor('black')};
  margin-left: 10px;
  font-weight: bold;
  cursor: pointer;
`;
const Line = styled.div`
  width: 100%;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: row;
`;
const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
  height: 16rem;
  justify-content: space-around;
  a {
    color: ${({ theme }) => theme.color.black};
    text-decoration: none;
  }
  a:link {
    text-decoration: none;
  }
`;
const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
  height: 6rem;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-around;
  border-style: solid;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${getColor('gray')};
`;
const FirstBox = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;
const SecondBox = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-between;
`;
const PointHistory = styled.div`
  display: flex;
  cursor: pointer;
`;
const BtnContainer = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  width: 6rem;
`;
const Btn = styled.button`
  border-radius: 20px;
  border-width: 0;
  background-color: ${getColor('gray')};
  font-weight: bold;
  width: 45px;
  cursor: pointer;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 18rem;
  justify-content: space-between;
  cursor: pointer;
`;
const StudyList = styled.div``;
const EditInformation = styled.div``;
const Logout = styled.button`
  background-color: transparent;
  border: none;
`;

const Modal = styled.div`
  position: absolute;
  width: 80%;
  max-width: 350px;
  background-color: ${getColor('white')};
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

const ModalText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${getColor('gray')};
  opacity: 0.7;
  z-index: 500;
`;

const Img = styled.div`
  display: flex;
  background-image: url(${checkCircle});
  background-repeat: no-repeat;
  background-position: center;
  width: 200px;
  height: 200px;
`;

export default MyPage;
