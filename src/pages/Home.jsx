import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <Title>This is Home</Title>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h2`
  color: ${({ theme }) => theme.color.black};
`;

export default Home;
