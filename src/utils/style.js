// Style util functions

// theme 기본 color 가져오는 함수
export const getColor = (color) => {
  return ({ theme }) => theme.color[color];
};
