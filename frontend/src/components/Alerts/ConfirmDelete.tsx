import Swal from "sweetalert2";

const confirmDelete = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  return result.isConfirmed;
};

export default confirmDelete;
