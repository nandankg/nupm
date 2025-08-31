import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addConsumable, addData } from "../../reducer/manshi/ConsumableReducer";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import stationData from "../../data/station.json";
import deviceData from "../../data/device.json";
const Consumables = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const con = useSelector((state) => state.consume);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (con) {
      setSlug(con.slug);
    }
  }, [con]);
  const [formValues, setFormValues] = useState({
    date: "",
    
item_name:"",

    receiptqty: "",
    issuedqty: "",
    balanceqty: "",
    issuedto: "",
    sectionincharge: "",
    remark: "",
   
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <div className="container ">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Consumable Register
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
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputreceipt"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    aria-label="Date"
                  />
                </div>
                </div>
              <div className="row mb-3">
              <div className="col-md-6">
                  <label htmlFor="inputreceipt" className="form-label">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreceipt"
                    name="item_name"
                    value={formValues.item_name}
                    onChange={handleChange}
                    aria-label="Item Name"
                  />
                </div>
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
                
              </div>
              <div className="row mb-3">
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
                
              </div>
              <div className="row mb-3">
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
              <div className="col-md-12">
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
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn-primary px-3">
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

export default Consumables;
