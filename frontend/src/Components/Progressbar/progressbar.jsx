import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

const ProgressButtonComponent = ({ text, type, className, variant, loading }) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${className} d-flex align-items-center justify-content-center`}
            disabled={loading}
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 20px",
                backgroundColor: "#000000",
                border: "none",
                opacity: 1,
                pointerEvents: loading ? "none" : "auto",
            }}
        >
            {loading ? (
                <CircularProgress size={20} sx={{ color: "#fff", position: "absolute" }} />
            ) : (
                <span style={{ visibility: loading ? "hidden" : "visible" }}>{text}</span>
            )}
        </button>
    );
};

ProgressButtonComponent.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    loading: PropTypes.bool,
};

ProgressButtonComponent.defaultProps = {
    type: "button",
    className: "",
    variant: "primary",
    loading: false,
};

export default ProgressButtonComponent;