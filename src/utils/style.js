// Style util functions

// theme 기본 color 가져오는 함수
export const getColor = (color) => {
  return ({ theme }) => theme.color[color];
};

export const defaultLine = styled => `
  height: 1px;
  width: 100%;
  background-color: ${getColor('gray')(styled)};
  position: absolute;
  left: 0;
`;
