import axios from 'axios';
import Constant, {base_URL, client_base_URL} from '../helpers/Constant';

export async function getApi(url, header) {
  console.log('GetApi: ', `${base_URL}/${url}`);
  const response = await axios.get(`${base_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
      Authorization: `Bearer ${header.Authorization}`,
    },
  });
  return response;
}

export async function getApiWithParam(url, param, header) {
  console.log('getApiWithParam:', `${base_URL}/${url}`);
  const response = await axios({
    method: 'GET',
    baaseURL: base_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
      Authorization: `Bearer ${header.Authorization}`,
    },
  });
  return response;
}

export async function postApi(url, payload, header) {
  console.log('postApi:', `${base_URL}/${url}`);
  const response = await axios.post(`${base_URL}/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      Authorization: `Bearer ${header.Authorization}`,
    },
  });
  return response;
}

export async function getApiCustomer(url, header) {
  console.log('GetApi: ', `${client_base_URL}/${url}`);
  const response = await axios.get(`${client_base_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
      Authorization: `Bearer ${header.Authorization}`,
    },
  });
  return response;
}

export async function getApiWithParamCustomer(url, param, header) {
  console.log('getApiWithParam:', `${client_base_URL}/${url}`);
  const response = await axios({
    method: 'GET',
    baaseURL: client_base_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
      Authorization: `Bearer ${header.Authorization}`,
    },
  });
  return response;
}

export async function postApiCustomer(url, payload, header) {
  console.log('postApi:', `${client_base_URL}/${url}`);
  const response = await axios.post(`${client_base_URL}/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      Authorization: `Bearer ${header.Authorization}`,
    },
  });
  return response;
}
