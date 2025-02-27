class ValidationError {
  static isLoginValidate(email, password, setError) {
    if (!email || !password) {
      setError("*All fields are required");
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
      if (!username && !email && !password && !confirmpass) {
        setError("*All fields are required");
      } else if (!username && !email) {
        setError("Username and Email are required!");
      } else if (!username && !password) {
        setError("Username and Password are required!");
      } else if (!email && !password) {
        setError("Email and Password are required!");
      } else if (!username) {
        setError("Username is required!");
      } else if (!email) {
        setError("Email is required!");
      } else if (!password) {
        setError("Password is required!");
      } else if (!confirmpass) {
        setError("Confirm password is required");
      } else {
        setError("Password is required!");
      }
      return false;
    } else if (username.length < 6) {
      setError("Username must be at least 6 character");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
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
    } else if (password !== confirmpass) {
      setError("Password and confirm password do not match!!");
      return false;
    }
    setError("");
    return true;
  }

  static isTodoValidate(title, description, setError) {
    if (!title || !description) {
      setError("*All fields are required");
      return false;
    } else if (title.length < 8) {
      setError("Title is at least 8 character");
      return false;
    }
    // else if (description.length <= 15) {
    //   setError("Description is less then or equal to 15 character");
    //   return false;
    // }
    setError("");
    return true;
  }

  static isProfileValidate(username, email, setError) {
    if (!username || !email) {
      setError("* All fields are required");
      return false;
    }
    if (!username) {
      setError("Username is required");
    }
    if (!email) {
      setError("Email is required");
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
