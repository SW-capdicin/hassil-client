import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { v4 } from 'uuid';
import QueryString from 'qs';
import { paymentSuccess } from '@/api';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { getColor } from '@/utils';

const { VITE_TOSS_CK } = import.meta.env;

const Payment = () => {
  const location = useLocation();

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [amount, setAmount] = useState(0);
  const [leastPayment] = useState(1000);
  const doPayment = async () => {
    try {
      if (queryData.paymentKey) {
        await paymentSuccess({
          ...queryData,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    doPayment();
  }, []);

  const handleSubmit = async () => {
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
          <Input type="number" onChange={handleChange} />
          <Label>최소 충전 가능액 : {leastPayment}</Label>
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
