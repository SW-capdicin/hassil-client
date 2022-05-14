import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { v4 } from 'uuid';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { getColor, separatorMoney } from '@/utils';

const { VITE_TOSS_CK } = import.meta.env;

const Payment = () => {
  const [amount, setAmount] = useState(0);
  const [isCharge, setIsCharge] = useState(true);

  const leastPayment = 1000;

  const handleSubmit = async () => {
    if (leastPayment > Number(amount)) {
      setIsCharge(false);
      return;
    }
    const tossPayments = await loadTossPayments(VITE_TOSS_CK);
    await tossPayments
      .requestPayment('카드', {
        amount,
        orderId: v4(),
        orderName: '포인트 충전',
        customerName: 'aaa',
        successUrl: window.location.origin + '/payment/success',
        failUrl: window.location.origin + '/payment/success/fail',
      })
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          alert('결제취소');
        }
      });
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Container>
      <Text>충전할 포인트를 </Text>
      <Text>입력해주세요.</Text>
      <SubContainer>
        <InputContainer>
          <Input error={!isCharge} type="number" onChange={handleChange} />
          <Label error={!isCharge}>최소 충전 가능액 : {separatorMoney(leastPayment)}</Label>
        </InputContainer>
        <BtnContainer>
          <SubmitBtn onClick={handleSubmit}>
            <BtnText>충전</BtnText>
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
  ${props => props.error && css`
    color: ${getColor('error')};
    border-color: ${getColor('error')};
  `}
  font-size: 1.5rem;
  border-style: none none solid none;
  width: 90%;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    outline: none;
  }
`;

const Label = styled.div`
  color: ${getColor('gray')};
  font-size: small;
  margin-top: 10px;
  text-align: left;
  width: 80%;
  ${props => props.error && css`
    color: ${getColor('error')};
    border-color: ${getColor('error')};
  `}
`;

const Text = styled.div`
  color: ${getColor('black')};
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
  background-color: ${getColor('gray')};
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
  color: ${getColor('black')};
  font-weight: bold;
`;

export default Payment;
