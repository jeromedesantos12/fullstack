// IMPORT
import axios from "axios";

// SETUP
const url = "localhost";
const port = "4000";

// HEADER
export const apiHeader = () => {
  const value = axios.create({
    baseURL: `http://${url}:${port}/`,
    withCredentials: true,
  });
  return value;
};

// GET ALL
export const apiGet = async (data) => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.get(`${data}/read`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// GET BY ID
export const apiGetById = async (data, id) => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.get(`${data}/read/${id}`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// GET QUERY
export const apiSearch = async (data, keyword, search) => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.get(`${data}/search?${keyword}=${search}`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// ADD
export const apiAdd = async (data, attr) => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.post(`${data}/add`, attr);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// UPDATE
export const apiUpdate = async (data, attr, id) => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.patch(`${data}/update/${id}`, attr);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// DELETE
export const apiDelete = async (data, id) => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.delete(`${data}/delete/${id}`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// REGISTER
export const apiRegister = async (data, attr) => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.post(`${data}/register`, attr);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// LOGIN
export const apiLogin = async (attr) => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.post(`user/login`, attr);
    value.success = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
    value.error = error.response.data.message;
  }
  return value;
};

// ADD
export const apiLogout = async () => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.delete(`user/logout`);
    value.success = response.data;
    console.log(response.data);
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// CEK ROLE
export const apiVerify = async () => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.get(`user/verify`);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};

// PROFILE
export const apiProfile = async (attr, id) => {
  const value = {};
  let authAxios = apiHeader();
  try {
    const response = await authAxios.patch(`user/profile/${id}`, attr);
    value.success = response.data;
  } catch (error) {
    value.error = error.response.data.message;
  }
  return value;
};
