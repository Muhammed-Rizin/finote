import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";

import { dateConverter } from "../../helpers/functions";
import { get, patch, post } from "../../config/api";

const Category = () => {
  const formRef = useRef();

  const [tableData, setTableData] = useState([]);
  const [masterObject, setMasterObject] = useState({});

  useEffect(() => {
    handleTableData();
  }, []); // eslint-disable-line

  const handleTableData = async () => {
    try {
      const response = await get(`category`);
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
      const response = await method(`category`, masterObject);

      toast.success(response.message);
      reset();
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  const handleUpdate = (item) => {
    setMasterObject({ name: item.name, id: item._id });
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
      <h5 className="page-title">Category</h5>
      <div className="card">
        <div className="card-body">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3">
                <label>Name</label>
                <input
                  name="name"
                  value={masterObject?.name || ""}
                  onChange={handleValueChange}
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="col-md-3 form-button d-flex gap-2">
                <button
                  className={`btn ${masterObject.id ? "btn-update" : "btn-submit"}`}
                  type="submit"
                >
                  {masterObject.id ? "Update" : "Submit"}
                </button>
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
                      <td className="date-field">{dateConverter(row.date)}</td>
                      <td className="actions">
                        <div>
                          <EditButton onClick={() => handleUpdate(row)} />
                          <DeleteButton api={`category?id=${row._id}`} onSuccess={reset} />
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

export default Category;
