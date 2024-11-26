import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import Select from "react-select";

import {
  dateConverter,
  getDate,
  getTime,
  numberToCurrency,
  timeConverter,
} from "../../helpers/functions";
import { get, patch, post } from "../../config/api";

const IncomeExpense = () => {
  const formRef = useRef();
  const date = getDate();
  const time = getTime();

  const typeValues = { INCOME: 1, EXPENSE: 2 };
  const initialState = { type: typeValues.INCOME, date, time };

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [masterObject, setMasterObject] = useState({ ...initialState });
  const [selectedFields, setSelectedFields] = useState({});

  useEffect(() => {
    handleTableData();
    handleCategoryOptions();
  }, []); // eslint-disable-line

  const handleCategoryOptions = async () => {
    try {
      const response = await get(`category/options`);
      setCategoryOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTableData = async () => {
    try {
      const response = await get(`income-expense`);
      const { data } = response;
      setTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!masterObject.amount || !masterObject.category) return;

      const method = masterObject.id ? patch : post;
      const response = await method(`income-expense`, masterObject);

      toast.success(response.message);
      reset();
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  const handleSelectChange = ({ name, selected }) => {
    setSelectedFields((prev) => ({ ...prev, [name]: selected }));
    const value = Array.isArray(selected)
      ? selected?.map((select) => select?.value)
      : selected?.value;

    handleValueChange({ name, value });
  };

  const handleValueChange = ({ name, value, checked }) => {
    setMasterObject((prev) => ({ ...prev, [name]: value || checked }));
  };

  const reset = () => {
    formRef.current?.reset();
    setMasterObject({ ...initialState });
    setSelectedFields({ ...initialState });
    handleTableData();
  };

  return (
    <>
      <h5 className="page-title">IncomeExpense</h5>
      <div className="card">
        <div className="card-body">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value={typeValues.INCOME}
                    checked={masterObject.type === typeValues.INCOME}
                    onChange={(e) => handleValueChange(e.target)}
                  />
                  Income
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value={typeValues.EXPENSE}
                    checked={masterObject.type !== typeValues.INCOME}
                    onChange={(e) => handleValueChange(e.target)}
                  />
                  Expense
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={masterObject?.date || ""}
                  onChange={(e) => handleValueChange(e.target)}
                />
              </div>
              <div className="col-md-2">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={masterObject?.time || ""}
                  onChange={(e) => handleValueChange(e.target)}
                />
              </div>
              <div className="col-md-2">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={masterObject?.amount || ""}
                  onChange={(e) => handleValueChange(e.target)}
                />
              </div>
              <div className="col-md-3">
                <label>Category</label>
                <Select
                  value={selectedFields?.category || ""}
                  onChange={(selected) => handleSelectChange({ selected, name: "category" })}
                  options={categoryOptions}
                  className="react-select"
                  isMulti
                />
              </div>
              <div className="col-md-3">
                <label>Remarks</label>
                <textarea
                  rows={1}
                  name="remarks"
                  placeholder="Remarks"
                  value={masterObject?.remarks || ""}
                  onChange={(e) => handleValueChange(e.target)}
                />
              </div>
              <div className="col-md-3 d-flex gap-2">
                <button class="btn btn-submit">Submit</button>
                <button class="btn btn-reset" type="reset" onClick={reset}>
                  Reset
                </button>
              </div>
            </div>
          </form>
          <div className="table-responsive" id="headTable">
            <table className="table-list">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => {
                  const category = Array.isArray(row.category)
                    ? row.category?.map((category) => category.name).join(", ")
                    : "";
                  return (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td className="date-field">{dateConverter(row.date)}</td>

                      <td className="date-field">{timeConverter(row.time)}</td>
                      <td className="text-end">{numberToCurrency(row.amount)}</td>
                      <td>{category}</td>
                      <td>{row.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeExpense;
