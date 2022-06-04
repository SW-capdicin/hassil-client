export const separatorMoney = (money) => {
  if (!money) return 0;
  return Number(money).toLocaleString();
};

export const getDateTime = (datetime) => {
  if (!datetime) return null;
  const dt = datetime.split('T');
  return {
    date: dt[0],
    time: dt[1].slice(0, 5), // 시:분 까지만 표기
  };
};

export const compareDate = (objName, desc) => {
  return (a, b) =>
    desc
      ? new Date(b[objName]) - new Date(a[objName])
      : new Date(a[objName]) - new Date(b[objName]);
};

export const getTimestampByDateAndTime = (date, time) => {
  return `${date}T${time}+09`;
};

export const getLastEl = (list) => list[list.length - 1];

// warning! list 값 변화됨
export const extractOne = (list, idx) => list.splice(idx, 1)[0];

// warning! list 값 변화됨
export const extractRandomOne = (list) =>
  extractOne(list, Math.floor(Math.random() * list.length));

export const date2KST = (datetime) =>
  new Date(new Date(datetime).getTime() + 540 * 60 * 1000);

export const getDate2KST = (datetime) =>
  getDateTime(date2KST(datetime).toISOString()).date;
