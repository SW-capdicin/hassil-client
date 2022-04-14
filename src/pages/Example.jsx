import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { counterActions } from '@/store/actions';

const Example = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Title>This is Example</Title>
      <div>
        <Link to="/">Go to Home</Link>
      </div>
      <div>
        <div>
          <button onClick={() => dispatch(counterActions.increment())}>
            Increment
          </button>
          <button onClick={() => dispatch(counterActions.decrement())}>
            Decrement
          </button>
          <button onClick={() => dispatch(counterActions.incrementByAmount(3))}>
            Add 3
          </button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h2`
  color: ${({ theme }) => theme.color.gray};
`;

export default Example;
