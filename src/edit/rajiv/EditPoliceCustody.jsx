import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/rajiv/PoliceCustodyRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
const user = JSON.parse(localStorage.getItem("userdata"));
const EditPoliceCustody = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const policeCustodyRegList = useSelector((state) => state.policeCustodyReg);
  const [slug, setSlug] = useState("");

  const [items, setItems] = useState([]);
  const itmm = policeCustodyRegList.data.data;

  useEffect(() => {
    dispatch(fetchData());
    setItems(policeCustodyRegList.data.data);
  }, []);
  useEffect(() => {
    setItems(policeCustodyRegList.data.data);
    setSlug(policeCustodyRegList.slug);
  }, [policeCustodyRegList]);
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
    address: fd.address,
    contactNo: fd.contactNo,
    handedTo: fd.handedTo,
    reason: fd.reason,
    handing_over_Memo_no: fd.handing_over_Memo_no,
    sigofsc: fd.sigofsc,
    remark: fd.remark,
    Employ_id: fd.Employ_id,
    department: fd.department,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Police Custody form.pdf",
  });
  const handleSave = () => {
    dispatch(saveData(id));
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              Police Custody
            </Link>
            <Link underline="hover" color="inherit" to="/">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <button className="btn btn-primary" onClick={() => toPDF()}>
              <MdPictureAsPdf size={"25px"} color="#fff" />
              {/* Export To Pdf */}
            </button>
            <form onSubmit={handleSubmit}>
              <div ref={targetRef}>
                <div className=" mb-3 form-heading-container">
                  {/* <h3 className="form-heading">Police Custody </h3>
                  <div className="heading-line"></div> */}
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputName" className="form-label">
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
                  <div className="col-md-6">
                    <label for="inputaddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="Text"
                      className="form-control"
                      id="inputaddress"
                      value={formValues.address}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label for="inputContact" className="form-label">
                      Contact No.
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      className="form-control"
                      id="inputContact"
                      value={formValues.contactNo}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          contactNo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-6">
                    <label for="inputhandedTo" className="form-label">
                      Handed Over to
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputhandedTo"
                      value={formValues.handedTo}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          handedTo: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label for="inputReason" className="form-label">
                      Reason in Breif
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputReason"
                      value={formValues.reason}
                      onChange={(e) =>
                        setFormValues({ ...formValues, reason: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label for="inputMemoNo" className="form-label">
                      Handing Over Memo No.
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputMemoNo"
                      value={formValues.handing_over_Memo_no}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          handing_over_Memo_no: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-8">
                    <label for="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      value={formValues.remark}
                      onChange={(e) =>
                        setFormValues({ ...formValues, remark: e.target.value })
                      }
                    />
                  </div>
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

export default EditPoliceCustody;
