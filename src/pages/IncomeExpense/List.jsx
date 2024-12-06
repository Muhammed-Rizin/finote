import React from "react";
import { numberToCurrency } from "../../helpers/functions";

import { TYPE_VALUES } from "./helper";

const List = ({ data }) => {
  return (
    <div className="list-container">
      {data.map((item, index) => {
        return (
          <div
            className={`list-card ${item.type === TYPE_VALUES.EXPENSE && "expense"}`}
            key={item.id || index}
          >
            <div className="list-content">
              <span>{`${numberToCurrency(item.amount)} from ${item.account?.name || ""}`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
