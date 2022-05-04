import React from 'react';
import styled from 'styled-components';

const Input = ({
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
  defaultText,
  selectOptions,
}) => {
  const getInputFieldByType = (type) => {
    switch (type) {
      case 'tel':
      case 'text':
        return (
          <InputField
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete="off"
          />
        );
      case 'sel':
        return (
          <Select name={name} onChange={onChange} value={value}>
            <Option value="" disabled hidden>
              {defaultText}
            </Option>
            {selectOptions.map((option, idx) => (
              <Option value={option} key={idx}>
                {option}
              </Option>
            ))}
          </Select>
        );
      default:
        return;
    }
  };

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      {getInputFieldByType(type)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.color.gray};
`;

const InputField = styled.input`
  width: 12rem;
  border-style: none none solid none;
  padding-left: 2px;
  :focus {
    outline: none;
  }
`;

const Select = styled.select`
  width: 12rem;
  border-style: none none solid none;
  :focus {
    outline: none;
  }
`;

const Option = styled.option``;

export default Input;
