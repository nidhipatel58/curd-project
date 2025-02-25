import axios from "axios";

// class ApiConstants {
//   static BASE_URL = "http://localhost:3006/api";

//   // Auth Endpoints:-
//   static LOGIN = `${ApiConstants.BASE_URL}/user/login`;
//   static REGISTER = `${ApiConstants.BASE_URL}/user/register`;
//   static GET_USER = (id) => `${ApiConstants.BASE_URL}/user/getuser/${id}`;
//   static UPDATE_USER = (id) => `${ApiConstants.BASE_URL}/user/updateuser/${id}`;
//   // static LOGOUT = `${ApiConstants.BASE_URL}/user/logout`;

//   // Todo Endpoints:-
//   static TODOS = `${ApiConstants.BASE_URL}/todos`;
//   static CREATE_TODO = `${ApiConstants.BASE_URL}/todos/create`;
//   static UPDATE_TODO = (id) => `${ApiConstants.BASE_URL}/todos/update/${id}`;
//   static DELETE_TODO = (id) => `${ApiConstants.BASE_URL}/todos/delete/${id}`;
//   static GET_TODO = (id) => `${ApiConstants.BASE_URL}/todos/${id}`;
// }

// export default ApiConstants;

// API CONSTANT:-
const axiosInstance = axios.create({
  baseURL: "http://localhost:3006/api",
});
axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  console.log(token, "-----------Token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
