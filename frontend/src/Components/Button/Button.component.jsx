"use client";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ButtonComponent({
  text,
  onClick,
  className = "",
  type,
  navigate,
  style,
  disabled,
  variant,
}) {
  let nav = useNavigate(); // For navigate one page to other:-

  let handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (navigate) {
      nav(navigate);
    }
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        className={className}
        variant={variant}
        type={type}
        style={style}
        disabled={disabled}
      >
        {text}
      </Button>

    </div>
  );
}

export default ButtonComponent;
