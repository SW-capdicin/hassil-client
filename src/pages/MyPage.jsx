import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  TYPE_USER_GENERAL,
  PATH_USED_CAFE_LIST,
} from '@/constants';
import { getColor, separatorMoney } from '@/utils';

const MyPage = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const goJoinedStudyList = () => {
    navigate(PATH_JOINED_STUDY_LIST);
  };

  const goUsedStudyCafe = () => {
    navigate(PATH_USED_CAFE_LIST);
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

  return (
    <>
      <Container>
        <ProfileContainer>
          <CgProfile size={50} />
          <Nickname>{userState.nickname}</Nickname>
          <BiChevronRight size={25} />
        </ProfileContainer>
        <Line>
          <hr size="10px" width="100%" />
        </Line>
        <InformationContainer>
          <PointContainer>
            <FirstBox>
              <div>보유 포인트</div>
              <div>{separatorMoney(userState.point)}원</div>
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
                <BiChevronRight size={20} />
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
          {userState.type === TYPE_USER_GENERAL && (
            <>
              <InputContainer>
                <StudyList onClick={goJoinedStudyList}>
                  가입한 스터디 목록
                </StudyList>
                <BiChevronRight size={25} />
              </InputContainer>
              <InputContainer>
                <StudyList onClick={goUsedStudyCafe}>
                  이용한 카페 내역
                </StudyList>
                <BiChevronRight size={25} />
              </InputContainer>
            </>
          )}
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
  font-weight: normal;
`;
const SecondBox = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-between;
`;
const PointHistory = styled.div`
  display: flex;
  cursor: pointer;
  div {
    font-size: 0.9rem;
  }
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
  font-weight: normal;
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

export default MyPage;
