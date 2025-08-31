import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../reducer/rajiv/FoundReceivedCashReducer";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const FoundReceivedCashReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const foundReceivedCashList = useSelector((state) => state.foundReceivedCash);
  const [slug, setSlug] = useState("");
  useEffect(() => {
    if (foundReceivedCashList) {
      setSlug(foundReceivedCashList.slug);
    }
  }, [foundReceivedCashList]);
  const initialDenominations = [
    { value: 2000, quantity: "", total: "" },
    { value: 1000, quantity: "", total: "" },
    { value: 500, quantity: "", total: "" },
    { value: 100, quantity: "", total: "" },
    { value: 50, quantity: "", total: "" },
    { value: 20, quantity: "", total: "" },
    { value: 10, quantity: "", total: "" },
    { value: 5, quantity: "", total: "" },
    { value: 2, quantity: "", total: "" },
    { value: 1, quantity: "", total: "" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    package: "",
    unique_mark: "",
    place_cash: "",
    remark: "",
    name_receiving_person: "",
    sent_toTPNR: "",
    signOfSC: "",
    descriptionCash: initialDenominations,
    grandTotal: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("quantity-")) {
      const index = parseInt(name.split("-")[1], 10);
      const updatedDenominations = formData.descriptionCash.map((denom, i) => {
        if (i === index) {
          const quantity = parseInt(value, 10) || 0;
          const total = denom.value * quantity;
          return { ...denom, quantity, total };
        }
        return denom;
      });
      const grandTotal = updatedDenominations.reduce(
        (acc, curr) => acc + Number(curr.total),
        0
      );
      setFormData({
        ...formData,
        descriptionCash: updatedDenominations,
        grandTotal,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData(formData));
    navigate(`/list/${slug}`);
  };
  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Details Related to Found/Received Cash
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container"></div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Name of Person handing over cash
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Package / Purse
                </label>
                <input
                  type="text"
                  name="package"
                  required
                  className="form-control"
                  value={formData.package}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="denominations" className="form-label">
                Description of Cash (Denominations)
              </label>
              <div className="row">
                <div className="col-md-4">Denomination</div>
                <div className="col-md-4">No.</div>
                <div className="col-md-4">Total</div>
              </div>
              {formData.descriptionCash.map((denomination, index) => (
                <div className="row mb-2" key={index}>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      value={denomination.value}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      name={`quantity-${index}`}
                      value={denomination.quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      value={denomination.total}
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="row mb-3">
              <div className="col-md-4 offset-md-8">
                <label htmlFor="grandTotal" className="form-label">
                  Grand Total
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="grandTotal"
                  value={formData.grandTotal}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Any other Identifiable/unique mark
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="unique_mark"
                  value={formData.unique_mark}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Place Cash Found
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="place_cash"
                  value={formData.place_cash}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Remark if any
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Name and Sign of receiving Person
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name_receiving_person"
                  value={formData.name_receiving_person}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-8">
                <label htmlFor="inputName" className="form-label">
                  Sent To TPNR "Lost and Found Office On"
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sent_toTPNR"
                  value={formData.sent_toTPNR}
                  onChange={handleChange}
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
  );
};

export default FoundReceivedCashReg;
