import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from '@/components';
import { man, woman } from '@/img';
import {
  TYPE_USER_GENERAL,
  TYPE_USER_CAFE_OWNER,
  PATH_SIGNUP_COMPLETE,
  TYPE_BANK,
  PATH_USER_EDIT,
  PATH_MYPAGE,
} from '@/constants';
import { useSelector, useDispatch } from 'react-redux';
import { patchUserInfo } from '@/api';
import { getColor } from '@/utils';
import { userActions } from '@/store/actions';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const location = useLocation();

  const [inputs, setInputs] = useState({
    type: 0,
    name: '',
    nickname: '',
    bankName: '',
    phoneNumber: '',
    bankAccount: '',
  });
  const [btnText, setBtnText] = useState('가입하기');
  const { type, name, nickname, bankName, phoneNumber, bankAccount } = inputs;

  useEffect(() => {
    if (userState.isSignup) {
      setInputs((prevState) => ({
        ...prevState,
        type: userState.type,
        name: userState.name,
        nickname: userState.nickname,
        bankName: userState.bankName,
        phoneNumber: userState.phoneNumber,
        bankAccount: userState.bankAccount,
      }));
      setBtnText('수정하기');
    }
  }, [userState, btnText]);

  const handleChange = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      type: event.target.dataset.type,
    }));
  };

  const handleSubmit = async () => {
    const responseStatus = await patchUserInfo(inputs);
    if (responseStatus === 200) {
      dispatch(
        userActions.setUserInfo({
          name,
          type,
          nickname,
          phoneNumber,
          bankName,
          bankAccount,
          isLoggedIn: true,
          isSignup: true,
        }),
      );
      location.pathname === PATH_USER_EDIT
        ? navigate(PATH_MYPAGE)
        : navigate(PATH_SIGNUP_COMPLETE);
    } else {
      alert('에러 발생');
    }
  };

  return (
    <Container>
      {!type ? (
        <UserTypeContainer>
          <UserType
            data-type={TYPE_USER_GENERAL}
            type={TYPE_USER_GENERAL}
            onClick={handleClick}
          >
            <UserText>스터디 이용자</UserText>
          </UserType>
          <UserType
            data-type={TYPE_USER_CAFE_OWNER}
            type={TYPE_USER_CAFE_OWNER}
            onClick={handleClick}
          >
            <UserText>카페 사장님</UserText>
          </UserType>
        </UserTypeContainer>
      ) : (
        <>
          <Input
            type="text"
            name="name"
            label="이름"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="nickname"
            label="닉네임"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={handleChange}
          />
          <Input
            type="tel"
            name="phoneNumber"
            label="연락처"
            placeholder="010-1234-1234"
            value={phoneNumber}
            onChange={handleChange}
          />
          <Input
            type="sel"
            name="bankName"
            label="은행"
            value={bankName}
            onChange={handleChange}
            defaultText="은행을 선택하세요"
            selectOptions={TYPE_BANK}
          />
          <Input
            type="text"
            name="bankAccount"
            label="계좌번호"
            placeholder="계좌번호를 입력하세요"
            value={bankAccount}
            onChange={handleChange}
          />
          <SignupBtn onClick={handleSubmit}>
            <BtnText>{btnText}</BtnText>
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
    props.type === 1 ? `url(${man})` : `url(${woman})`};
  background-repeat: no-repeat;
  background-position: center;
  width: 8rem;
  height: 12rem;
  align-items: flex-end;
  justify-content: center;
  border-style: solid solid solid solid;
  border-width: 0.5px 0.5px 0 0.5px;
  border-color: ${getColor('gray')};
`;

const UserText = styled.div`
  color: ${getColor('black')};
  background-color: ${getColor('lightgray')};
  width: 8rem;
  height: 2.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  border: 0;
`;

const SignupBtn = styled.button`
  background-color: ${getColor('blue')};
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
  color: ${getColor('white')};
`;

export default Signup;
