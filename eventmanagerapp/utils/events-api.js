import axios from 'axios';
import { getAccessToken } from './auth';
const BASE_URL = 'http://localhost:3333';

export {getPublicEvents, getPrivateEvents};
// export {getPublicEvents, getPrivateEvents};


function getPublicEvents() {

// function getPublicEvents() {
   const url = `${BASE_URL}/api/events/public`;
  // const url = `${BASE_URL}/api/events/publicTester`;

  return axios.get(url).then(response => response.data);
}

 function getPrivateEvents() {
//function getPrivateBattles() {

  // const url = `${BASE_URL}/api/events/private`;
  const url = `${BASE_URL}/api/events/private`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
};
