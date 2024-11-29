import React from "react";

const ListItem = ({ label, value }) => (
  <li className="list-item">
    <span className="list-item__label">{label}</span>
    <span className="list-item__value">{value}</span>
  </li>
);

export default ListItem;
