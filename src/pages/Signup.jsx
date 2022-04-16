import React, { useState } from 'react';
import styled from 'styled-components';

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
    bank: '',
    phoneNumber: '',
    bankAccount: '',
  });
  const { name, nickname, phoneNumber, bank, bankAccount } = inputs;
  const handleChange = (e) => {
    const nextInputs = {
      ...inputs,
      [e.target.name]: e.target.value,
    };
    setInputs(nextInputs);
  };

  const selectList = [
    '===== 은행선택 =====',
    '국민은행',
    '신한은행',
    '농협은행',
    '하나은행',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('이름 : ', { name });
    console.log('닉네임 : ', { nickname });
    console.log('전번 : ', { phoneNumber });
    console.log('은행 : ', { bank });
    console.log('계좌번호 : ', { bankAccount });
    setInputs({
      name: '',
      nickname: '',
      bank: '',
      phoneNumber: '',
      bankAccount: '',
    });
  };

  return (
    <Container>
      <InputContainer>
        <Label>이름</Label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="이름"
          id="inputName"
        />
      </InputContainer>
      <InputContainer>
        <Label>닉네임</Label>
        <Input
          type="text"
          name="nickname"
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임"
        />
      </InputContainer>
      <InputContainer>
        <Label>연락처</Label>
        <Input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
          placeholder="010-1234-1234"
        />
      </InputContainer>
      <InputContainer>
        <Label>은행</Label>
        <Select
          className="box"
          name="bank"
          onChange={handleChange}
          value={bank}
        >
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </Select>
      </InputContainer>
      <InputContainer>
        <Label>계좌번호</Label>
        <Input
          className="box"
          type="text"
          name="bankAccount"
          value={bankAccount}
          onChange={handleChange}
          placeholder="계좌번호"
        />
      </InputContainer>
      <SignupBtn type="submit" onClick={handleSubmit}>
        <BtnText>가입하기</BtnText>
      </SignupBtn>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 18rem;
  justify-content: space-around;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.color.gray};
`;

const Input = styled.input`
  width: 12rem;
  border-style: none none solid none;
  padding-left: 5px;
`;

const Select = styled.select`
  width: 12rem;
  padding-left: 5px;
`;

const SignupBtn = styled.button`
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
`;

const BtnText = styled.div`
  color: ${({ theme }) => theme.color.white};
`;

export default Signup;
