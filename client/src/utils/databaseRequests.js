import axios from 'axios';

function postUserData(userObject) {
  return axios
    .post('https://cashoverflow.app/api/users/upsertData', {
      userUpdate: userObject
    })
    .then(okResponse => console.log(okResponse));
}

function getUserData(userID) {
  return axios.get(
    `https://cashoverflow.app/api/users/getData?userid=${userID}`
  );
}

export default {
  postUserData,
  getUserData
};
