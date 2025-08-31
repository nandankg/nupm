import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/akshra/DtrsignalsreceiptsReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EditDtrsignalsreceipts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const DTrsignalsreceiptsList = useSelector((state) => state.dtrrec);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (DTrsignalsreceiptsList) {
      setSlug(DTrsignalsreceiptsList.slug);
    }
  }, [DTrsignalsreceiptsList]);
  console.log(DTrsignalsreceiptsList.data.data);
  const [items, setItems] = useState([]);
  const itmm = DTrsignalsreceiptsList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(DTrsignalsreceiptsList.data.data);
  }, []);
  useEffect(() => {
    setItems(DTrsignalsreceiptsList.data.data);
  }, [DTrsignalsreceiptsList]);
  let dt = [];
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
    date: fd.date,

    material: fd.material_desc,
    qty: fd.qty,
    ledger: fd.ledger_no,
    challanno: fd.challan_no,
    challandate: fd.challan_date,
    name: fd.received_name,
    desig: fd.received_designation,
    sign: fd.received_sign,
    work: fd.for_whatWork,
    signof: fd.receiver_sign,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
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
            <Link underline="hover" color="inherit">
              DTR SIGNALS
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "75%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">DTR SIGNALS</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputmaterial" className="form-label">
                    Description of Material
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputmaterial"
                    value={formValues.material}
                    onChange={(e) =>
                      setFormValues({ ...formValues, material: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputQty" className="form-label">
                    QTY.
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="inputQty"
                    value={formValues.qty}
                    onChange={(e) =>
                      setFormValues({ ...formValues, qty: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLedger" className="form-label">
                    Ledger NO./Page
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLedger"
                    value={formValues.ledger}
                    onChange={(e) =>
                      setFormValues({ ...formValues, ledger: e.target.value })
                    }
                  />
                </div>
              </div>
              <b>Invoice</b>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputChallanno" className="form-label">
                    Challan NO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputChallanno"
                    value={formValues.challanno}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challanno: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputChallandate" className="form-label">
                    Challan NO
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputChallandate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.challandate}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challandate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <b>FROM WHOM RECEIVED</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputDesig" className="form-label">
                    Desig
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDesig"
                    value={formValues.desig}
                    onChange={(e) =>
                      setFormValues({ ...formValues, desig: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputWork" className="form-label">
                    For What Work & Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputWork"
                    value={formValues.work}
                    onChange={(e) =>
                      setFormValues({ ...formValues, work: e.target.value })
                    }
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
export default EditDtrsignalsreceipts;
