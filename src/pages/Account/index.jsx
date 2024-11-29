import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import List from "./List";
import * as _service from "../../service/accounts.service";

const Accounts = () => {
  const formRef = useRef();

  const [tableData, setTableData] = useState([]);
  const [masterObject, setMasterObject] = useState({});

  useEffect(() => {
    handleTableData();
  }, []); // eslint-disable-line

  const handleTableData = async () => {
    try {
      const response = await _service.list();
      const { data } = response;
      setTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const method = masterObject.id ? _service.update : _service.create;
      const response = await method(masterObject);

      toast.success(response.message);
      reset();
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  const handleUpdate = (item) => {
    setMasterObject({ name: item.name, balance: item.balance, id: item._id });
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setMasterObject((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    formRef.current?.reset();
    setMasterObject({});
    handleTableData();
  };

  return (
    <>
      <h5 className="page-title">Accounts</h5>
      <div className="card">
        <div className="card-body">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3">
                <label>Name</label>
                <input
                  name="name"
                  placeholder="Name"
                  onChange={handleValueChange}
                  value={masterObject?.name || ""}
                />
              </div>
              <div className="col-md-3">
                <label>Balance</label>
                <input
                  name="balance"
                  placeholder="Balance"
                  value={masterObject?.balance || ""}
                  onChange={handleValueChange}
                />
              </div>
              <div className="col-md-3 form-button d-flex gap-2">
                <button class="btn btn-submit">Submit</button>
                <button class="btn btn-reset" type="reset" onClick={reset}>
                  Reset
                </button>
              </div>
            </div>
          </form>
          <List data={tableData} onDelete={reset} onEdit={handleUpdate} />
        </div>
      </div>
    </>
  );
};

export default Accounts;
