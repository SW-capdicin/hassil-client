export const separatorMoney = (money) => {
  if (!money) return 0;
  return Number(money).toLocaleString();
}

export const getDateTime = (datetime) => {
  const dt = datetime.split('T');
  return {
    date: dt[0],
    time: dt[1].slice(0, 5), // 시:분 까지만 표기
  }
}

export const compareDate = (objName, desc) => {
  return (a, b) =>
    desc
      ? new Date(b[objName]) - new Date(a[objName])
      : new Date(a[objName]) - new Date(b[objName]);
};