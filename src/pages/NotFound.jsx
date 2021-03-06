import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiMessageError } from 'react-icons/bi';
import { getColor } from '@/utils';

const NotFound = () => {
  return (
    <Container>
      <BiMessageError size="90" />
      <TextContainer>
        <Text>찾을 수 없는 페이지입니다.</Text>
        <Text>요청하신 페이지가 사라졌거나,</Text>
        <Text>잘못된 경로를 이용하셨어요.</Text>
      </TextContainer>
      <HomeBtn type="submit">
        <Link
          to="/"
          style={{
            textDecoration: 'none',
          }}
        >
          <BtnText>Go to Home</BtnText>
        </Link>
      </HomeBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  height: 20rem;
  width: 18rem;
  align-items: center;
  top: 30%;
`;

const TextContainer = styled.div`
  margin-top: 1rem;
`;

const Text = styled.div`
  color: ${getColor('black')};
  font-weight: bold;
  margin: 2px;
  text-align: center;
`;
const HomeBtn = styled.button`
  background-color: ${getColor('blue')};
  border: 0;
  outline: 0;
  width: 14rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  align-self: center;
  cursor: pointer;
  margin: 2rem;
`;
const BtnText = styled.div`
  color: ${getColor('white')};
`;

export default NotFound;
