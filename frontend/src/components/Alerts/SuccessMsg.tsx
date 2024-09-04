import Swal from "sweetalert2";

const successMsg = (message: any) => {
  Swal.fire({
    icon: "success",
    title: "Good job",
    text: message,
  });
};

export default successMsg;
