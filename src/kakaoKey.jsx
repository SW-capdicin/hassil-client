const { VITE_APP_KAKAO_MAP_KEY_API } = import.meta.env;
const script_element = document.createElement('script');
script_element.setAttribute('src', VITE_APP_KAKAO_MAP_KEY_API);
document.querySelector('body').appendChild(script_element);
