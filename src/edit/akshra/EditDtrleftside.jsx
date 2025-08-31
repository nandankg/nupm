import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/akshra/DtrleftsideReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EditDtrleftside = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const DTrleftsideList = useSelector((state) => state.dtrle);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (DTrleftsideList) {
      setSlug(DTrleftsideList.slug);
    }
  }, [DTrleftsideList]);
  console.log(DTrleftsideList.data.data);
  const [items, setItems] = useState([]);
  const itmm = DTrleftsideList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(DTrleftsideList.data.data);
  }, []);
  useEffect(() => {
    setItems(DTrleftsideList.data.data);
  }, [DTrleftsideList]);
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
    challanNo: fd.challan_no,
    challanDate: fd.challan_date,
    issueddname: fd.issued_name,
    desig: fd.issued_designation,
    sign: fd.issued_sign,
    work: fd.for_whatWork,
    location: fd.location,
    signof: fd.issuer_sign,
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
              DTR LEFT SIDE
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
                <h3 className="form-heading"> EDIT:DTR LEFT SIDE</h3>
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
                    Challan NO.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputChallanno"
                    value={formValues.challanNo}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challanNo: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputChallandate" className="form-label">
                    Challan Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputChallandate"
                    name="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.challanDate}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challanDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <b>To Whom Issued</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputIssueddname" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputIssueddname"
                    value={formValues.issueddname}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issueddname: e.target.value,
                      })
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
                <div className="col-6">
                  <label htmlFor="inputSign" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSign"
                    value={formValues.sign}
                    onChange={(e) =>
                      setFormValues({ ...formValues, sign: e.target.value })
                    }
                  />
                </div>
              </div>
              <b>WORK & LOCATION ALLOTTED</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputWork" className="form-label">
                    Work
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
                <div className="col-6">
                  <label htmlFor="inputLocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLocation"
                    value={formValues.location}
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="inputSignof" className="form-label">
                    Sign Of Issuer
                  </label>
                  <input
                    type="sign"
                    className="form-control"
                    id="inputSignof"
                    value={formValues.signof}
                    onChange={(e) =>
                      setFormValues({ ...formValues, signof: e.target.value })
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

export default EditDtrleftside;
