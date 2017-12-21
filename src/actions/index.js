//actions for redux

//get fetching status action
export const FETCH_STATUS = 'FETCH_STATUS'
export function fetchStatus(status) {
  return { type: FETCH_STATUS, isFetching: status }
}

//receive user info
export const RECEIVE_INFO = 'RECEIVE_INFO'
export function getUserInfo(json) {
  return {
    type: RECEIVE_INFO,
    users: json
  }
}

//get login status
export const VERIFY_LOGIN = 'VERIFY_LOGIN'
export function verifyLogin(data) {
  return {
    type: RECEIVE_INFO,
    isLogin: data.isLogin,
    userInfo: data.userInfo
  }
}

// //start fetching data using Axios
// export const FETCHING_DATA = 'FETCHING_DATA'
// export function fetchUserAPI() {
//   return dispatch => {
//     return axios
//       .get('/users')
//       .then(dispatch(fetchStatus(true)))
//       .then(function(res) {
//         dispatch(getUserInfo(res.data.users))
//         console.log(res.data.users)
//       })
//       .then(dispatch(fetchStatus(false)))
//       .catch(function(error) {
//         console.log(error)
//       })
//   }
// }

//start fetching data using Axios
// export function startLogin() {
//   return dispatch => {
//     return axios
//       .get('/auth/google/callback')
//       .then(dispatch(fetchStatus(true)))
//       .then(function(res) {
//         //dispatch(getUserInfo(res));
//         console.log(res)
//       })
//       .catch(function(error) {
//         console.log(error)
//       })
//   }
// }
