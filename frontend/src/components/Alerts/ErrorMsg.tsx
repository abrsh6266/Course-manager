import Swal from "sweetalert2";

const errorMsg = (message: any) => {
  Swal.fire({
    icon: "error",
    title: "Oops",
    text: message,
  });
};

export default errorMsg;
