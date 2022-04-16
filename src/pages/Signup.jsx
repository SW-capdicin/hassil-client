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
      {/* <Title>This is Signup Page</Title> */}
      <Tags>
        <Form onSubmit={handleSubmit}>
          <Wrap_input_label>
            <Label>이름</Label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="이름"
              id="inputName"
            />
          </Wrap_input_label>
          <br />
          <Wrap_input_label>
            <Label>닉네임</Label>
            <Input
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleChange}
              placeholder="닉네임"
            />
          </Wrap_input_label>
          <br />
          <Wrap_input_label>
            <Label>휴대폰 번호</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              placeholder="010-1234-1234"
            />
          </Wrap_input_label>
          <br />
          <Wrap_input_label>
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
          </Wrap_input_label>
          <br />
          <Wrap_input_label>
            <Label>계좌번호</Label>
            <Input
              className="box"
              type="text"
              name="bankAccount"
              value={bankAccount}
              onChange={handleChange}
              placeholder="계좌번호"
            />
          </Wrap_input_label>
          <br />
          <SignupBtn type="submit">
            <BtnText>가입하기</BtnText>
          </SignupBtn>
        </Form>
      </Tags>
    </Container>
  );
};
const Container = styled.div`
  background-color: ${({ theme }) => theme.color.offwhite};
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  top: 30%;
  align-items: center;
`;
const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  align-items: center;
`;
const Wrap_input_label = styled.div``;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: static;
  align-items: left;
  width: 200px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 200px;
`;

const Select = styled.select`
  box-sizing: border-box;
  width: 200px;
`;

const SignupBtn = styled.button`
  background-color: #2164e8;
  border: 0;
  outline: 0;
  width: 200px;
  height: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
`;

const BtnText = styled.div`
  color: #ffffff;
  margin-left: 5px;
`;

export default Signup;
