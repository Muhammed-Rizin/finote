import React from "react";

import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";

const List = ({ data, onEdit, onDelete }) => {
  return (
    <div className="list-container">
      {data.map((item, index) => {
        return (
          <div className="list-card" key={item.id || index}>
            <div className="list-content">
              <span>{item.name}</span>
              <div className="actions">
                <EditButton onClick={() => onEdit(item)} />
                <DeleteButton api={`category?id=${item._id}`} onSuccess={onDelete} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
