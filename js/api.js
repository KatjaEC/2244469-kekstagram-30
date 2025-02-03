import { BASE_URL, Route, ErrorText } from './constants.js';

// In case we're getting data from server

const getData = () => fetch(
  `${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(ErrorText.GET_DATA);
  });

const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(ErrorText.SEND_DATA);
    }
  });

export { getData, sendData };
