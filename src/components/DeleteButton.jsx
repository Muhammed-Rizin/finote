import React from "react";
import Swal from "sweetalert2";

import { toast } from "react-toastify";

import { deleteIcon } from "../config/icons";
import { del } from "../config/api";

const DeleteButton = ({ api, onSuccess }) => {
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      const response = await del(api);
      toast.success(response.message || "Deleted successfully!");

      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error?.message || "Failed to delete!");
    }
  };

  return (
    <button className="btn-status btn-delete" onClick={handleDelete}>
      <img src={deleteIcon} width={30} height={30} alt="delete" />
    </button>
  );
};

export default DeleteButton;
