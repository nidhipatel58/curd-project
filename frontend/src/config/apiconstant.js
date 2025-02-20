class ApiConstants {
  static BASE_URL = "http://localhost:3003/api";

  // Auth Endpoints
  static LOGIN = `${ApiConstants.BASE_URL}/user/login`;
  static REGISTER = `${ApiConstants.BASE_URL}/user/register`;
  // static LOGOUT = `${ApiConstants.BASE_URL}/user/logout`;

  // Todo Endpoints
  static TODOS = `${ApiConstants.BASE_URL}/todos`;
  static CREATE_TODO = `${ApiConstants.BASE_URL}/todos/create`;
  static UPDATE_TODO = (id) => `${ApiConstants.BASE_URL}/todos/update/${id}`;
  static DELETE_TODO = (id) => `${ApiConstants.BASE_URL}/todos/delete/${id}`;
  static GET_TODO = (id) => `${ApiConstants.BASE_URL}/todos/${id}`;
}

export default ApiConstants;
