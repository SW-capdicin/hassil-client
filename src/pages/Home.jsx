import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <Title>This is Home</Title>
      <div>
        <Link to="/example">Go to Example Page</Link>
      </div>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h2`
  color: ${({ theme }) => theme.color.black};
`;

export default Home;
