import { toast } from "react-toastify";

// Success toast function:-
export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
  });
};

// Error toast function:-
export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
  });
};
