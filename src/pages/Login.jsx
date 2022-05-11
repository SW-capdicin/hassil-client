import React, { useState } from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { getColor } from '@/utils';
import { fail } from '@/img';
const { VITE_GOOGLE_LOGIN } = import.meta.env;

const Login = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <Container>
        <SubContainer>
          <Text onClick={toggleModal}>간편하게 로그인하고</Text>
          <Text>다양한 서비스를 이용해보세요.</Text>
          <LoginBtn href={VITE_GOOGLE_LOGIN}>
            <FcGoogle />
            <BtnText>Google로 계속</BtnText>
          </LoginBtn>
          <GrayText>
            계정 생성 시 HASSIL의 개인정보 처리방침 및 이용약관 (마케팅 정보
            수신동의 포함)에 동의하게 됩니다.
          </GrayText>
        </SubContainer>
      </Container>
      {openModal && (
        <>
          <Modal>
            <Img />
            <WarnText>거리가 너무 멉니다</WarnText>
            <ModalText>출석 실패</ModalText>
          </Modal>
          <BackGround onClick={toggleModal} />
        </>
      )}
    </>
  );
};

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

const WarnText = styled.div`
  color: ${getColor('red')};
  font-size: 1rem;
  margin-bottom: 1rem;
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
  background-image: url(${fail});
  background-repeat: no-repeat;
  background-position: center;
  width: 200px;
  height: 200px;
`;

const Container = styled.div``;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  top: 30%;
  align-items: center;
`;

const Text = styled.div`
  color: ${getColor('black')};
  font-weight: bold;
`;

const LoginBtn = styled.a`
  background-color: #ffffff;
  width: 200px;
  height: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid;
  border-color: ${getColor('gray')};
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const BtnText = styled.div`
  margin-left: 5px;
`;

const GrayText = styled.div`
  font-size: 0.6rem;
  color: ${getColor('gray')};
  width: 60%;
`;

export default Login;
