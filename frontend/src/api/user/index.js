import axiosInstance from "../../utils/apiHelper";

const LOGIN = "/user/login";
const REGISTER = "/user/register";
const GET_USER = `/user/getuser`;
const UPDATE_USER = "/user/updateuser";
const DELETE_USER = "/user/deleteuser";

export const login = (data) => {
  return axiosInstance.post(LOGIN, data);
};

export const signup = (data) => {
  return axiosInstance.post(REGISTER, data);
};

export const getUser = (data) => {
  return axiosInstance.get(GET_USER, data);
};

export const updateUser = (data) => {
  return axiosInstance.put(UPDATE_USER, data);
};

export const deleteUser = () => {
  return axiosInstance.delete(DELETE_USER);
};
