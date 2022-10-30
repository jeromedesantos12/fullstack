// IMPORT
import axios from "axios";

// SETUP
const url = "127.0.0.1";
const port = "8080";

// HEADER
export const apiHeader = (token) => {
  const authToken = token ? token : "";
  const value = axios.create({
    baseURL: `http://${url}:${port}/`,
    headers: {
      Authorization: `Barrier ${authToken}`,
    },
  });
  return value;
};

// GET ALL
export const apiGet = async (token, data) => {
  const value = {};
  let authAxios = apiHeader(token);
  try {
    const response = await authAxios.get(`${data}/read`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// GET BY ID
export const apiGetById = async (token, data, id) => {
  const value = {};
  let authAxios = apiHeader(token);
  try {
    const response = await authAxios.get(`${data}/read/${id}`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// GET QUERY
export const apiSearch = async (token, data, keyword, search) => {
  const value = {};
  let authAxios = apiHeader(token);
  try {
    const response = await authAxios.get(`${data}/search?${keyword}=${search}`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// ADD
export const apiAdd = async (token, data, attr) => {
  const value = {};
  let authAxios = apiHeader(token);
  try {
    const response = await authAxios.post(`${data}/add`, attr);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// UPDATE
export const apiUpdate = async (token, data, attr, id) => {
  const value = {};
  let authAxios = apiHeader(token);
  try {
    const response = await authAxios.patch(`${data}/update/${id}`, attr);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// DELETE
export const apiDelete = async (token, data, id) => {
  const value = {};
  let authAxios = apiHeader(token);
  try {
    const response = await authAxios.delete(`${data}/delete/${id}`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// ADD
export const apiLogin = async (attr) => {
  const value = {};
  try {
    const response = await axios.post(`http://${url}:${port}/user/login`, attr);
    value.success = response.data;
    console.log(response.data);
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// CEK ROLE
export const apiVerify = async (token) => {
  const value = {};
  let authAxios = apiHeader(token);
  try {
    const response = await authAxios.get(`user/verify`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  console.log(value);
  return value;
};

// PROFILE
export const apiProfile = async (token, data, attr, id) => {
  const value = {};
  let authAxios = apiHeader(token);
  try {
    const response = await authAxios.patch(`${data}/profile/${id}`, attr);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};
