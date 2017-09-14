import axios from 'axios';
import { getAccessToken } from './auth';
const BASE_URL = 'http://localhost:3333';

// export {registerUser, loginUser};
export {registerUser};

// export {getPublicEvents, getPrivateEvents};


function registerUser() {

  const url = `${BASE_URL}/api/users`;
//router.post('/users', function(req,res){

  return axios.get(url).then(response => response.data);
}

/*
 function loginUser() {
  // const url = `${BASE_URL}/api/events/private`;
  const url = `${BASE_URL}/api/events/private`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
};
*/
