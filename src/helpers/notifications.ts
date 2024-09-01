import { toast } from "react-toastify";

export const showSuccessNotification = (msg?: string) => {
  toast.success(msg || "Успешно!", {
    position: "top-left",
    autoClose: 3000,
  });
};

export const showErrorNotification = (msg: string) => {
  toast.error(msg, {
    position: "top-left",
    autoClose: 3000,
  });
};
