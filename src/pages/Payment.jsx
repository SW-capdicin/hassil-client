import React, { useState } from 'react';
import styled from 'styled-components';

const Payment = () => {
  const [amount, setAmount] = useState(0);
  const handleSubmit = (event) => {
    // eslint-disable-next-line no-undef
    const tossPayments = TossPayments('test_ck_OEP59LybZ8Bdv6A1JxkV6GYo7pRe');
    tossPayments.requestPayment('카드', {
      amount,
      orderId: 'aaa',
      orderName: '포인트 충전',
      customerName: 'aaa',
      successUrl: window.location.origin + '/success',
      failUrl: window.location.origin + '/fail',
    });
  };
  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Container>
      <Text>충전할 포인트를 입력해주세요.</Text>
      <Input type="number" onChange={handleChange} />
      <SubmitBtn onClick={handleSubmit}>
        <BtnText>충전</BtnText>
      </SubmitBtn>
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

const Input = styled.input`
  border-style: none none solid none;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
  margin: 2px;
  text-align: center;
`;

const SubmitBtn = styled.button`
  background-color: ${({ theme }) => theme.color.blue};
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
  color: ${({ theme }) => theme.color.white};
`;

export default Payment;
