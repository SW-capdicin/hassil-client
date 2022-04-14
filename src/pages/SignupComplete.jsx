import React from 'react';
import styled from 'styled-components';

const SignupComplete = () => {
  return (
    <Container>
      <Title>This is Signup Complete Page</Title>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h2`
  color: ${({ theme }) => theme.color.black};
`;

export default SignupComplete;
