import React from "react";
import ButtonComponent from "../Button/Button.component";
import "./Navbar.css";
import { RiContactsBook2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

export const Navbar = () => {
  let isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  let dispatch = useDispatch();
  let logout = () => {
    localStorage.clear("id");
    localStorage.clear("Token");
    dispatch(authActions.logout());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            <b>
              <RiContactsBook2Fill />
              &nbsp; TODO
            </b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-4">
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link" aria-current="page" href="#">
                  About us
                </a>
              </li>
              <li className="nav-item">
                <ButtonComponent
                  text="Todo"
                  variant="light"
                  className="me-4"
                  navigate="/todo"
                />
              </li>
              {!isLoggedIn && (
                <>
                  {" "}
                  <li className="nav-item">
                    <ButtonComponent
                      text="Signup"
                      variant="light"
                      className="me-4"
                      navigate="/signup"
                    />
                  </li>
                  <li className="nav-item">
                    <ButtonComponent
                      className="me-4 "
                      text="SignIn"
                      variant="light"
                      navigate="/login"
                    />
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="nav-item me-4">
                  <ButtonComponent
                    className="me-4 "
                    text="Log Out"
                    variant="light"
                    onClick={logout}
                  />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="text-nav  align-items-center d-flex justify-content-center home">
        <div className="container">
          <h1>
            Organize your <br /> work and life, finally
          </h1>
          <p className="mt-2">
            Become focused, organize and calm with <br /> todo app.The World's
            #1 task manager app.
          </p>
          <ButtonComponent
            text="Make Todo List"
            variant="light"
            className="me-4"
            navigate="/todo"
          />
        </div>
      </div>
    </div>
  );
};
