import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";

import { dateConverter, numberToCurrency } from "../../helpers/functions";
import { get, patch, post } from "../../config/api";

const Accounts = () => {
  const formRef = useRef();

  const [tableData, setTableData] = useState([]);
  const [masterObject, setMasterObject] = useState({});

  useEffect(() => {
    handleTableData();
  }, []); // eslint-disable-line

  const handleTableData = async () => {
    try {
      const response = await get(`accounts`);
      const { data } = response;
      setTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const method = masterObject.id ? patch : post;
      const response = await method(`accounts`, masterObject);

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
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleValueChange}
                  value={masterObject?.name || ""}
                />
              </div>
              <div className="col-md-3">
                <label>Balance</label>
                <input
                  type="number"
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

          <div className="table-responsive" id="headTable">
            <table className="table-list">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Balance</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => {
                  return (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td>{row.name}</td>
                      <td className="text-end">{numberToCurrency(row.balance)}</td>
                      <td className="date-field">{dateConverter(row.date)}</td>
                      <td className="actions">
                        <div>
                          <EditButton onClick={() => handleUpdate(row)} />
                          <DeleteButton api={`accounts?id=${row._id}`} onSuccess={reset} />
                        </div>
                      </td>
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

export default Accounts;
