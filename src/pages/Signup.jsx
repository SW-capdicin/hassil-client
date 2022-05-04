import React, { useState } from 'react';
import styled from 'styled-components';
import logo_man from '@/img/man.png';
import logo_woman from '@/img/woman.png';

const Signup = () => {
  const [inputs, setInputs] = useState({
    needToSelect: 1,
    userType: '',
    name: '',
    nickname: '',
    bank: '',
    phoneNumber: '',
    bankAccount: '',
  });
  const {
    needToSelect,
    userType,
    name,
    nickname,
    phoneNumber,
    bank,
    bankAccount,
  } = inputs;
  const handleChange = (e) => {
    const nextInputs = {
      ...inputs,
      [e.target.name]: e.target.value,
    };
    setInputs(nextInputs);
  };
  const handleClick = (e) => {
    const nextInputs = {
      ...inputs,
      needToSelect: 0,
      userType: e.target.innerText,
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

    console.log('유저 타입 : ', { userType });
    console.log('이름 : ', name);
    console.log('name : ', { name });
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
      {needToSelect ? (
        <>
          <UserTypeContainer>
            <UserType gender={0} onClick={handleClick}>
              <UserText>카페 사장님</UserText>
            </UserType>
            <UserType gender={1} onClick={handleClick}>
              <UserText>스터디 이용자</UserText>
            </UserType>
          </UserTypeContainer>
        </>
      ) : (
        <>
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
        </>
      )}
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

const UserTypeContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UserType = styled.div`
  display: flex;
  background-image: ${(props) =>
    props.gender === 0 ? `url(${logo_man})` : `url(${logo_woman})`};
  background-repeat: no-repeat;
  background-position: center;
  width: 8rem;
  height: 12rem;
  /* flex-direction: column-reverse; */
  align-items: flex-end;
  justify-content: center;
  border-style: solid solid solid solid;
  border-width: 0.5px 0.5px 0 0.5px;
  border-color: ${({ theme }) => theme.color.gray};
`;

const UserText = styled.div`
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.lightgray};
  width: 8rem;
  height: 2.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  border: 0;
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
