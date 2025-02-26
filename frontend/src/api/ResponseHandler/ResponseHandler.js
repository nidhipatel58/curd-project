import { handleError, handleSuccess } from "../../utils/utils";

class ResponseHandler {
  static success(message) {
    handleSuccess(message);
  }

  static error(err) {
    if (!err.response) {
      handleError("No response from server. Check your internet connection.");
      return;
    }

    const { status, data } = err.response || {};
    const errMessage = data?.message || "An error occurred. Please try again.";
    let errorMessage = errMessage;

    switch (status) {
      case 400:
        errorMessage = errMessage || "Bad request. Please check your input.";
        break;
      case 401:
        errorMessage = "Unauthorized Invalid Password!!";
        break;
      case 403:
        errorMessage = "Forbidden. You do not have access.";
        break;
      case 404:
        errorMessage = "Resource not found.";
        break;
      case 409:
        errorMessage = "User already exists. Try logging in.";
        break;
      case 500:
        errorMessage = "Internal Server Error. Please try later.";
        break;
      default:
        errorMessage = errMessage || "Something went wrong!";
    }

    handleError(errorMessage);
  }
}

export default ResponseHandler;
