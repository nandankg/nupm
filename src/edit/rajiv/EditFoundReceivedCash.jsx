import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/rajiv/FoundReceivedCashReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
const user = JSON.parse(localStorage.getItem("userdata"));
const EditFoundReceivedCash = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const foundReceivedCashList = useSelector((state) => state.foundReceivedCash);

  const [items, setItems] = useState([]);
  const itmm = foundReceivedCashList.data.data;

  const [slug, setSlug] = useState("");

  useEffect(() => {
    dispatch(fetchData());
    setItems(foundReceivedCashList.data.data);
  }, []);
  useEffect(() => {
    setItems(foundReceivedCashList.data.data);
    setSlug(foundReceivedCashList.slug);
  }, [foundReceivedCashList]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    date: fd.date,
    time: fd.time,
    name: fd.name,
    package: fd.package,
    descriptionCash: fd.descriptionCash,
    unique_mark: fd.unique_mark,
    place_cash: fd.place_cash,
    remark: fd.remark,
    name_receiving_person: fd.name_receiving_person,
    sent_toTPNR: fd.sent_toTPNR,
    grandTotal: 0,
  };
  const [formData, setFormData] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formData));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "Found Received Cash.pdf",
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
        (acc, curr) => acc + curr.total,
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
  const handleSave = () => {
    dispatch(saveData(id));
  };
  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              Details Related to Found/Received Cash
            </Link>
            <Link underline="hover" color="inherit" to="/">
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
               
                    <button type="submit" className="btn btn-primary">
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

export default EditFoundReceivedCash;
