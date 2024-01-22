import Swal from "sweetalert2";

// Logout Function
export const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout",
  }).then((result) => {
    if (result.isConfirmed) {
      setTimeout(() => {
        window.location.href = "/";
        localStorage.removeItem("token");
      }, 1500);
    }
  });
};
