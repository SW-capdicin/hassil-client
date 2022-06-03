import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { getColor } from '@/utils';

const Input = forwardRef(
  (
    {
      type,
      name,
      label,
      placeholder,
      value,
      onChange,
      defaultText,
      selectOptions,
    },
    ref,
  ) => {
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
        case 'file':
          return (
            <InputField
              type={type}
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              ref={ref}
              onChange={onChange}
            />
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
  },
);
Input.displayName = 'Input';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Label = styled.label`
  color: ${getColor('gray')};
  line-height: 25px;
`;

const InputField = styled.input`
  width: 12rem;
  border-style: none none solid none;
  border-color: ${getColor('gray')};
  border-width: 1px;
  padding-left: 2px;
  line-height: 25px;
  :focus {
    outline: none;
  }
  &::placeholder {
    color: ${getColor('gray')};
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
