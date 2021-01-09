import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class ToastNotificationService {
  success(msg) {
    toast.success(msg, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  error(msg) {
    toast.error(msg, {
      position: toast.POSITION.TOP_LEFT
    });
  }

  warning(msg) {
    toast.warn(msg, {
      position: toast.POSITION.BOTTOM_LEFT
    });
  }

  info(msg) {
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_LEFT
    });
  }
}
