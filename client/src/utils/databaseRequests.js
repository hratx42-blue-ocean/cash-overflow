import axios from 'axios';

function postUserData(userObject) {
  return axios
    .post('https://cashoverflow.app/api/users/upsertData', {
      userUpdate: userObject
    })
    .then(okResponse => console.log(okResponse));
}

function getUserData(userId) {
  return axios.get(`http://localhost:3000/api/users/getData?userid=${userId}`);
}

export default {
  postUserData,
  getUserData
};
