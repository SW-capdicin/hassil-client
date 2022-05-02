import React from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
const { VITE_GOOGLE_LOGIN } = import.meta.env;

const Login = () => {
  return (
    <Container>
      <SubContainer>
        <Text>간편하게 로그인하고</Text>
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
  );
};

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
  color: ${({ theme }) => theme.color.black};
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
  border-color: ${({ theme }) => theme.color.gray};
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const BtnText = styled.div`
  margin-left: 5px;
`;

const GrayText = styled.div`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.color.gray};
  width: 60%;
`;

export default Login;
