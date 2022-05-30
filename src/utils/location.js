/**
 * Location functions
 * 참고 : https://quiet-ferryboat-2fd.notion.site/GPS-3941eb81fdfd40bf9755a1266ff88d97
 */

export const getLocation = (isMulti = false) => {
  if (!navigator.geolocation) return null;
  return new Promise((res, rej) => {
    // 병렬 처리의 경우 랜덤한 term을 두도록 함.
    const time = isMulti ? Math.random() * 1000 : 0;
    // 같은 시간에 geolocaion 함수를 호출할 경우 완전히 같은 값이 출력
    // 병렬로 처리 할 경우, 처리시간 최대 1초 사이에서 각기 다른 시간에 값을
    // 가져 올 수 있도록 구현
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition((position) => res({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }), rej, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      });
    }, time);
  });
}

export const getLocations = (count) => {
  if (!navigator.geolocation) return null;
  const locations = [];
  for (let i = 0; i < count; i++) {
    locations.push(getLocation(true));
  }
  return Promise.all(locations);
}

const mkLocation = (latitude, longitude) => ({
  latitude,
  longitude
});

const addLocation = ({ latitude: a, longitude: b }, { latitude: aa, longitude: bb }) => mkLocation(a + aa, b + bb);
const diffLocation = ({ latitude: a, longitude: b }, { latitude: aa, longitude: bb }) => mkLocation(a - aa, b - bb);

const getDiffVal = (a, b) => {
  const diff = diffLocation(a, b);
  return (Math.abs(diff.latitude) + Math.abs(diff.longitude));
}

const getMean = locationData => {
  const sum = locationData.reduce((acc, cur) => addLocation(acc, cur), mkLocation(0, 0));
  return mkLocation(sum.latitude / locationData.length, sum.longitude / locationData.length);
}

const sortVal = (desc = false) => ({ val: a }, { val: b }) => desc ? b - a : a - b;

const getRest = (locationData, mean) => locationData.map(cur => Object.assign(cur, {
  val: getDiffVal(cur, mean)
})).sort(sortVal());

const movingMean = (sortedData) => sortedData[0];

const solMovingMeanVal = (locationList, count) => {
  let mean = getMean(locationList);
  let tmp = getRest([...locationList], mean);

  for (let i = 0; i < count; i++) {
    tmp = getRest(tmp, movingMean(tmp));
    tmp.pop();
    tmp = getRest(tmp, getMean(tmp));
  }
  return movingMean(tmp);
}

const DEFAULT_ITER_VAL = 3;

export const getGeneratedLocation = async (count = 10) => {
  const locationList = await getLocations(count);
  if (!locationList) return null;
  return await solMovingMeanVal(locationList, DEFAULT_ITER_VAL);
}