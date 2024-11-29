import React from "react";
import { dateConverter, timeConverter } from "../../helpers/functions";

import ListItem from "../../components/LiteItem";
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";

const List = ({ data, onEdit, onDelete }) => {
  return (
    <div className="list-container">
      {data.map((item, index) => {
        return (
          <div className="list-card" key={item.id || index}>
            <ul className="list-card__details">
              <div className="list-actions">
                <EditButton onClick={() => onEdit(item)} />
                <DeleteButton api={`category?id=${item._id}`} onSuccess={onDelete} />
              </div>
              <ListItem label="#" value={index + 1} />
              <ListItem label="Name" value={item.name} />
              <ListItem label="Date" value={dateConverter(item.date)} />
              <ListItem label="Time" value={timeConverter(item.time)} />
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default List;
