import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { editData, fetchData } from "../../reducer/manshi/ConsumableReducer";

const EditConsume = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const con = useSelector((state) => state.consume);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (con) {
      setSlug(con.slug);
    }
  }, [con]);
  console.log(con.data.data);
  const [items, setItems] = useState([]);
  const itmm = con.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(con.data.data);
  }, [dispatch]);

  useEffect(() => {
    setItems(con.data.data);
  }, [con]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData[0];

  const basicInitialValues = {
    id: fd.id,
    date: formatDate(new Date().toDateString()),

    receiptqty: fd.receiptqty,
    issuedqty: fd.issuedqty,
    balanceqty: fd.balanceqty,
    issuedto: fd.issuedto,
    sectionincharge: fd.sectionincharge,
    remark: fd.remark,
    department: "S&T",
    item_name: fd.item_name,
    unit: "AFC",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              Possession
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Consumable(S&T department)</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputreceipt" className="form-label">
                    Receipt Qty
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreceipt"
                    name="receiptqty"
                    value={formValues.receiptqty}
                    onChange={handleChange}
                    aria-label="Receipt Qty"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputissued" className="form-label">
                    Issued Qty
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputissued"
                    name="issuedqty"
                    value={formValues.issuedqty}
                    onChange={handleChange}
                    aria-label="Issued Qty"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputbalance" className="form-label">
                    Balance Qty
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputbalance"
                    name="balanceqty"
                    value={formValues.balanceqty}
                    onChange={handleChange}
                    aria-label="Balance Qty"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputissuedto" className="form-label">
                    Issued To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputissuedto"
                    name="issuedto"
                    value={formValues.issuedto}
                    onChange={handleChange}
                    aria-label="Issued To"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    name="remark"
                    value={formValues.remark}
                    onChange={handleChange}
                    aria-label="Remark"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputsection" className="form-label">
                    Section Incharge
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputsection"
                    name="sectionincharge"
                    value={formValues.sectionincharge}
                    onChange={handleChange}
                    aria-label="Section Incharge"
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditConsume;
