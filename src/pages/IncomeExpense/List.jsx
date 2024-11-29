import React from "react";
import { dateConverter, numberToCurrency, timeConverter } from "../../helpers/functions";
import { TYPE_VALUES } from "./helper";
import ListItem from "../../components/LiteItem";

const List = ({ data }) => {
  return (
    <div className="list-container">
      {data.map((item, index) => {
        const category = Array.isArray(item.category)
          ? item.category.map((cat) => cat.name).join(", ")
          : "";
        return (
          <div className="list-card" key={item.id || index}>
            <ul className="list-card__details">
              <ListItem label="#" value={index + 1} />
              <ListItem label="Type" value={TYPE_VALUES[item.type]} />
              <ListItem label="Amount" value={numberToCurrency(item.amount)} />
              <ListItem label="Category" value={category} />
              <ListItem label="Account" value={item?.account?.name} />
              <ListItem label="Date" value={dateConverter(item.date)} />
              <ListItem label="Time" value={timeConverter(item.time)} />
              <ListItem label="Remarks" value={item.remarks} />
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default List;
