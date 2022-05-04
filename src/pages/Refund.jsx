import React, { useState } from 'react';
import styled from 'styled-components';

const Refund = () => {
  const [amount, setAmount] = useState(0);
  const [maxRefund] = useState(30000);
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
      <Text>환급할 포인트를 </Text>
      <Text>입력해주세요.</Text>
      <SubContainer>
        <InputContainer>
          <Input type="number" onChange={handleChange} />
          <Label>최대 환급 가능액 : {maxRefund}</Label>
        </InputContainer>
        <BtnContainer>
          <SubmitBtn onClick={handleSubmit}>
            <BtnText>환급</BtnText>
          </SubmitBtn>
        </BtnContainer>
      </SubContainer>
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
const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 70%;
`;
const Input = styled.input`
  border-style: none none solid none;
  width: 90%;
`;
const Label = styled.div`
  color: ${({ theme }) => theme.color.gray};
  font-size: small;
  margin-top: 10px;
  text-align: left;
  width: 80%;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
  font-size: x-large;
  margin: 1rem;
  text-align: left;
  width: 100%;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  margin-left: 1rem;
  top: 55%;
`;

const SubmitBtn = styled.button`
  background-color: ${({ theme }) => theme.color.gray};
  border: 0;
  outline: 0;
  width: 3rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  align-self: center;
  cursor: pointer;
`;

const BtnText = styled.div`
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
`;

export default Refund;