import axios from 'axios';

function postUserData(userObject) {
  return axios
    .post('/api/users/upsertData', {
      userUpdate: userObject
    })
    .then(okResponse => console.log(okResponse));
}

function getUserData(userID) {
  return axios.get(`/api/users/getData?userid=${userID}`);
}

export default {
  postUserData,
  getUserData
};
