import React from "react";

import { editIcon } from "../config/icons";

const EditButton = ({ onClick }) => {
  return (
    <button className="btn-status btn-edit" onClick={onClick}>
      <img src={editIcon} width={30} height={30} alt="edit" />
    </button>
  );
};

export default EditButton;
