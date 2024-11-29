import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import Select from "react-select";

import * as _service from "../../service/incomeExpense.service";
import * as _categoryService from "../../service/category.service";
import * as _accountsService from "../../service/accounts.service";

import List from "./List";

import { getDate, getTime } from "../../helpers/functions";
import { TYPE_VALUES } from "./helper";

const IncomeExpense = () => {
  const formRef = useRef();
  const date = getDate();
  const time = getTime();

  const initialState = { type: TYPE_VALUES.INCOME, date, time };

  const [data, setData] = useState([]);

  const [masterObject, setMasterObject] = useState({ ...initialState });
  const [selectedFields, setSelectedFields] = useState({});

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [accountsOptions, setAccountsOptions] = useState([]);

  useEffect(() => {
    handleOptions(_categoryService.options, setCategoryOptions);
    handleOptions(_accountsService.options, setAccountsOptions);
  }, []); // eslint-disable-line

  useEffect(() => {
    handleTableData();
  }, []); // eslint-disable-line

  const handleOptions = async (method, setState) => {
    try {
      const response = await method();
      setState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTableData = async () => {
    try {
      const response = await _service.list();
      const { data } = response;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!masterObject.amount || !masterObject.category || !masterObject.account) return;

      const response = await _service.create(masterObject);

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
                    value={TYPE_VALUES.INCOME}
                    checked={masterObject.type === TYPE_VALUES.INCOME}
                    onChange={(e) => handleValueChange(e.target)}
                  />
                  Income
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value={TYPE_VALUES.EXPENSE}
                    checked={masterObject.type !== TYPE_VALUES.INCOME}
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
                <label>Account</label>
                <Select
                  value={selectedFields?.account || ""}
                  onChange={(selected) => handleSelectChange({ selected, name: "account" })}
                  options={accountsOptions}
                  className="react-select"
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
              <div className="col-md-3 d-flex gap-2 form-button">
                <button class="btn btn-submit">Submit</button>
                <button class="btn btn-reset" type="reset" onClick={reset}>
                  Reset
                </button>
              </div>
            </div>
          </form>

          <List data={data} />
        </div>
      </div>
    </>
  );
};

export default IncomeExpense;
