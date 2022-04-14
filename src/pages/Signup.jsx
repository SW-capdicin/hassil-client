import React from 'react';
import styled from 'styled-components';

const Signup = () => {
  return (
    <Container>
      <Title>This is Signup Page</Title>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h2`
  color: ${({ theme }) => theme.color.black};
`;

export default Signup;
