import axiosInstance from "../../utils/apiHelper";

const CREATE_TODO = "/todos/create";
const GET_TODO = `/todos/gettodo`;
const UPDATE_TODO = "/todos/updatetodo";
const DELETE_TODO = "/todos/deletetodo";

export const createTodo = (data) => {
  return axiosInstance.post(CREATE_TODO, data);
};

export const getTodo = (data) => {
  return axiosInstance.get(GET_TODO, data);
};

export const updateTodo = (id, data) => {
  return axiosInstance.put(`${UPDATE_TODO}/${id}`, data);
};

export const deleteTodo = (id) => {
  return axiosInstance.delete(`${DELETE_TODO}/${id}`);
};
