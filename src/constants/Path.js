export const PATH_HOME = '/';
export const PATH_LOGIN = '/users/login';
export const PATH_SIGNUP = '/users/signup';
export const PATH_USER_EDIT = '/users/edit';
export const PATH_SIGNUP_COMPLETE = '/users/signup/complete';
export const PATH_MYPAGE = '/users/mypage';
export const PATH_POINT_HISTORY = '/users/point-history';
export const PATH_STUDY_CREATE = '/studies/create';
export const PATH_STUDYCAFE_CREATE = '/cafes/create';
export const PATH_STUDY_DETAIL = '/studies'; // :id
export const PATH_JOINED_STUDY_LIST = '/users/studies';
export const PATH_JOINED_STUDY_DETAIL = '/users/studies'; // :id
export const PATH_STUDY_PARTICIPATION = `/studies/:id/participation`;
export const PATH_PAYMENT = '/payment';
export const PATH_PAYMENT_SUCCESS = '/payment/success';
export const PATH_PAYMENT_FAIL = '/payment/fail';
export const PATH_REFUND = '/refund';
export const PATH_STUDY_RESERVATION_LIST = '/users/studies/:id/reservation';
export const PATH_STUDYROOM_REQUIREMENT =
  '/users/studies/:id/reservation/requirement';
export const PATH_STUDY_RESERVATION_CREATION =
  '/users/studies/:id/reservation/requirement/creation';
export const PATH_STUDYROOM_RESERVATION_SELECTION =
  '/users/studies/:id/reservation/requirement/selection';
export const PATH_RESERVATION_STATUS_DETAIL =
  '/users/studies/:id/reservation/:id/detail'; // :studyId  :reservationId
export const PATH_STUDYROOM_RECOMMEND_CREATE =
  '/users/studies/:id/reservation/requirement/selection/recommend'; // :studyId
export const PATH_STUDYROOM_RECOMMEND_SUCCESS =
  '/users/studies/:id/reservation/requirement/selection/recommend/success'; // :studyId
export const PATH_NOT_FOUND = '/*';
