import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { BiChevronRight } from 'react-icons/bi';
import { logout } from '@/api';

const MyPage = () => {
  const logoutHandler = async () => {
    await logout();
  };

  return (
    <Container>
      <ProfileContainer>
        <CgProfile size={50} />
        <Nickname>토익하자</Nickname>
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
              <div>내역 보기</div>
              <BiChevronRight size={25} />
            </PointHistory>
            <BtnContainer>
              <Btn>충전</Btn>
              <Btn>환급</Btn>
            </BtnContainer>
          </SecondBox>
        </PointContainer>
        <InputContainer>
          <StudyList>가입한 스터디 목록</StudyList>
          <BiChevronRight size={25} />
        </InputContainer>
        <InputContainer>
          <EditInformation>회원 정보 수정</EditInformation>
          <BiChevronRight size={25} />
        </InputContainer>
        <InputContainer>
          <Logout onClick={logoutHandler}>로그아웃</Logout>
          <BiChevronRight size={25} />
        </InputContainer>
      </InformationContainer>
    </Container>
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
  color: ${({ theme }) => theme.color.black};
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
  border-color: ${({ theme }) => theme.color.gray};
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
  outline: none;
  background-color: ${({ theme }) => theme.color.gray};

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
const Logout = styled.div``;

export default MyPage;
