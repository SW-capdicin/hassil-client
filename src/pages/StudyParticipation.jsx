import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiCheckCircle } from 'react-icons/bi';
import { findStudy, joinStudy, getUserInfo } from '@/api';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_HOME, PATH_JOINED_STUDY_LIST } from '@/constants';
import { separatorMoney } from '@/utils';

const StudyParticipation = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [deposit, setDeposit] = useState(0);
  const [balance, setBalance] = useState(0);
  const loadData = async () => {
    const data = await findStudy(params.id);
    const { point } = await getUserInfo();
    setDeposit(data.depositPerPerson);
    setBalance(point);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await joinStudy(params.id);
    } catch (err) {
      console.log(err);
    }
    navigate(PATH_JOINED_STUDY_LIST);
  };
  const [isAgreed, setIsAgreed] = useState(false);
  const handleAgree = () => {
    setIsAgreed((prevState) => !prevState);
  };
  return (
    <Container>
      <SubContainer>
        <Title>보증금 환불 규정</Title>
        <AgreeStatement>
          <Text>스터디 중도 하차시</Text>
          <Text>보증금 전액 환불 불가합니다.</Text>
        </AgreeStatement>
        <AgreeBtn>
          <CheckBox isAgreed={isAgreed} onClick={handleAgree}>
            <BiCheckCircle style={{
              marginBottom: '-2px',
              marginRight: '3px',
              paddingTop: '1px'
            }}  />
            동의합니다
          </CheckBox>
        </AgreeBtn>
        <PaymentContainer>
          <Price>결제할 금액</Price>
          <Payment>
            <Deposit>{separatorMoney(deposit)}원</Deposit>
            <AmountAfterPay>
              결제 후 잔액: {separatorMoney(balance - deposit)}원
            </AmountAfterPay>
          </Payment>
        </PaymentContainer>
      </SubContainer>
      <FixedDiv>
        <CreateBtn onClick={handleSubmit} disabled={!isAgreed}>
          <BtnText>결제하고 참가하기</BtnText>
        </CreateBtn>
      </FixedDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  /* width: 25rem; */
  align-content: center;
  width: 90%;
`;
const SubContainer = styled.div`
  /* width: 25rem; */
  /* display: flex; */
  /* flex-direction: column; */
`;
const Title = styled.div`
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
  font-size: xx-large;
  /* width: 25rem; */
  text-align: center;
`;
const AgreeStatement = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  border: solid;
  border-radius: 20px;
  border-color: ${({ theme }) => theme.color.gray};
  border-width: 2px;
  /* width: 25rem; */
  height: 10rem;
`;
const Text = styled.div`
  text-align: center;
`;
const AgreeBtn = styled.div`
  display: flex;
  /* width: 25rem; */
  justify-content: flex-end;

  /* justify-items: baseline; */
`;
const CheckBox = styled.div`
  width: 40%;
  border: solid;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isAgreed
      ? ({ theme }) => theme.color.blue
      : ({ theme }) => theme.color.white};
  border-color: ${(props) =>
    props.isAgreed
      ? ({ theme }) => theme.color.blue
      : ({ theme }) => theme.color.gray};
  border-width: 2px;
  text-align: center;
  /* color: ${({ theme }) => theme.color.gray}; */
  color: ${(props) =>
    props.isAgreed
      ? ({ theme }) => theme.color.white
      : ({ theme }) => theme.color.gray};
`;

const PaymentContainer = styled.div`
  /* width: 100%; */
  margin-top: 8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const Price = styled.div`
  font-weight: bold;
  font-size: x-large;
`;
const Deposit = styled.div`
  font-weight: bold;
  font-size: x-large;
  text-align: center;
  /* justify-self: center; */
  /* justify-content: center; */
`;
const AmountAfterPay = styled.div`
  color: ${({ theme }) => theme.color.gray};
  width: 100%;
  height: 5rem;
  border-top: solid 1px;
  text-align: center;
`;
const Payment = styled.div``;
const FixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.color.gray};
`;
const CreateBtn = styled.button`
  background-color: ${({ theme }) => theme.color.blue};
  border: 0;
  outline: 0;
  width: 14rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 20px;
  cursor: pointer;
  margin: auto;
  :disabled {
    background-color: ${({ theme }) => theme.color.gray};
  }
`;
const BtnText = styled.div`
  color: ${({ theme }) => theme.color.white};
  font-size: large;
  font-weight: bold;
`;

export default StudyParticipation;
