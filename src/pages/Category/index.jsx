import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import * as _service from "../../service/category.service";

import List from "./List";

const Category = () => {
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

          <List data={tableData} onDelete={reset} onEdit={handleUpdate} />
        </div>
      </div>
    </>
  );
};

export default Category;
