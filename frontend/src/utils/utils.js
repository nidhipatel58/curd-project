import { toast } from "react-toastify";

export const showToast = (msg, type = "success") => {
  toast[type](msg, {
    position: "bottom-right",
    autoClose: true,
  });
};
