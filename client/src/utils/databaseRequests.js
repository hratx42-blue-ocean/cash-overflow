import axios from 'axios';

function postUserData(userObject) {
  return axios
    .post('https://0.0.0.0:8000/api/users/upsertData', {
      userUpdate: userObject
    })
    .then(okResponse => console.log(okResponse));
}

function getUserData(userID) {
  return axios.get(`https://0.0.0.0:8000/api/users/getData?userid=${userID}`);
}

export default {
  postUserData,
  getUserData
};
