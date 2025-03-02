class ValidationError {
  static isLoginValidate(email, password, setError) {
    if (!email || !password) {
      setError("*Both fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    setError("");
    return true;
  }

  static isSignupValidate(username, email, password, confirmpass, setError) {
    if (!username || !email || !password || !confirmpass) {
      setError("*All fields are required");
      return false;
    }

    if (username.length < 6) {
      setError("Username must be at least 6 characters");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      return false;
    }

    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(
        password
      )
    ) {
      setError(
        "Password must contain one lowercase, one uppercase, one special character, and digits!"
      );
      return false;
    }

    if (password !== confirmpass) {
      setError("Password and confirm password do not match!");
      return false;
    }

    setError("");
    return true;
  }

  static isTodoValidate(title, description, setError) {
    if (!title || !description) {
      setError("*Please fill in all fields");
      return false;
    }

    if (title.length < 10) {
      setError("*Title must be at least 10 characters");
      return false;
    }

    if (title.length > 50) {
      setError("*Title can be up to 50 characters");
      return false;
    }

    if (description.length > 100) {
      setError("*Description can be up to 100 characters");
      return false;
    }

    setError("");
    return true;
  }

  static isProfileValidate(username, email, setError) {
    if (!username || !email) {
      setError("*All fields are required");
      return false;
    }

    if (username.length < 6) {
      setError("Username must be at least 6 characters");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }

    setError("");
    return true;
  }

  static isValidateChangePassword(currentPassword, newPassword, confirmPassword, setError) {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("*All fields are required");
      return false;
    }

    if (typeof newPassword !== "string" || typeof confirmPassword !== "string") {
      setError("Passwords must be valid strings");
      return false;
    }

    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(
        newPassword
      )
    ) {
      setError(
        "Password must contain one lowercase, one uppercase, one special character, and digits!"
      );
      return false;
    }

    if (newPassword.trim() !== confirmPassword.trim()) {
      setError("New password and confirm password must match!");
      return false;
    }

    setError("");
    return true;
  }

}

export default ValidationError;
