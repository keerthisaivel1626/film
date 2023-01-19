const BASE_URL = 'https://swapi.dev/api/films/';
import axios from 'axios';



export const GETAPI = async endPoint => {

  //let url =endPoint? BASE_URL + endPoint:BASE_URL;
  let url=endPoint;
  let response = await axios.get(url);

  const {data, status} = response;
  return {data, status};
};


