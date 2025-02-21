class ValidationError {
  static isLoginValidate(email, password, setError) {
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  }

  static isSignupValidate(username, email, password, setError) {
    if (!username || !email || !password) {
      setError("* All fields are required");
      return false;
    } else if (username.length < 6) {
      setError("Username must be at least 6 characters");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    } else if (password.length <= 6) {
      setError("Password must be at least 6characters");
      return false;
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(
        password
      )
    ) {
      setError(
        "Password must be contain one lower case,one uper case , one special character and digits!"
      );
      return false;
    }
    setError("");
    return true;
  }

  static isTodoValidate(title, description, setError) {
    if (!title || !description) {
      setError("* All fields are required");
      return false;
    } else if (title <= 30) {
      setError("Title is less then or equal to 30 character");
      return false;
    } else if (description <= 25) {
      setError("Description is less then or equal to 25 character");
      return false;
    }
    setError("");
    return true;
  }

  static isProfileValidate(username, email, setError) {
    if (!username || !email) {
      setError("* All fields are required");
      return false;
    } else if (username.length < 6) {
      setError("Username must be at least 6 characters");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    } 
    setError("");
    return true;
  }
}




export default ValidationError;
