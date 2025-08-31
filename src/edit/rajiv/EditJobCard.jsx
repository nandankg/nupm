import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/rajiv/jobCardReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
const user = JSON.parse(localStorage.getItem("userdata"));
const EditJobCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const jobcard = useSelector((state) => state.jobCard);
  const [slug, setSlug] = useState("");

  const [items, setItems] = useState([]);
  const itmm = jobcard.data.data;

  useEffect(() => {
    dispatch(fetchData());
    setItems(jobcard.data.data);
  }, []);
  useEffect(() => {
    setItems(jobcard.data.data);
    setSlug(jobcard.slug);
  }, [jobcard]);
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
    jcNo: fd.jcNo,
    carNo: fd.carNo,
    ptwNo: fd.ptwNo,
    trainNumber: fd.trainNumber,
    expectedCompletionTime: fd.expectedCompletionTime,
    jobType: fd.jobType,
    jobDescription: fd.jobDescription,
    workDetails: fd.workDetails,
    work: fd.work,
    contractorName: fd.contractorName,
    roofAccessRequired: fd.roofAccessRequired,
    powerBlockRequired: fd.powerBlockRequired,
    powerBlockSupervisor: fd.powerBlockSupervisor,
    lmrcStaffName: fd.lmrcStaffName,
    lmrcStaffDesignation: fd.lmrcStaffDesignation,
    failureHistory: fd.failureHistory,
    sgcName: fd.sgcName,
    sgcDate: fd.sgcDate,
    completionDetails: fd.completionDetails,
    condition1: fd.condition1,
    condition2: fd.condition2,
    followUpDetails: fd.followUpDetails,
    atpStatus: fd.atpStatus,
    atoStatus: fd.atoStatus,
    powerBlockRequestCancelled: fd.powerBlockRequestCancelled,
    oldSrNoDetails: fd.oldSrNoDetails,
    newSrNoDetails: fd.newSrNoDetails,
    conclusion: fd.conclusion,
    workPending: fd.workPending,
    auxStatus: fd.auxStatus,
    trainEnergized: fd.trainEnergized,
    trainEnergizedReason: fd.trainEnergizedReason,
    contractorStaffName: fd.contractorStaffName,
    contractorStaffSign: fd.contractorStaffSign,
    contractorStaffDate: fd.contractorStaffDate,
    contractorStaffTime: fd.contractorStaffTime,
    signalingStaffName: fd.signalingStaffName,
    signalingStaffSign: fd.signalingStaffSign,
    signalingStaffDate: fd.signalingStaffDate,
    signalingStaffTime: fd.signalingStaffTime,
    sgcSignName: fd.sgcSignName,
    sgcSign: fd.sgcSign,
    sgcSignDate: fd.sgcSignDate,
    sgcSignTime: fd.sgcSignTime,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "job card form.pdf",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">Job Card</Link>
            <Link to="/">Edit</Link>
          </Breadcrumbs>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-2">
                  <label htmlFor="trainNumber" className="form-label">
                    Job Card No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jcno"
                    name="jcNo"
                    value={formValues.jcNo.split("/")[1]}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="trainNumber" className="form-label">
                    Ref. PTW No
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="ptwNo"
                    name="ptwNo"
                    value={formValues.ptwNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label htmlFor="work" className="form-label">
                Part A : Job Card Issued
              </label>
              <div className="row mb-3">
                <div className="col-md-2">
                  <label htmlFor="trainNumber" className="form-label">
                    Train No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="trainNumber"
                    name="trainNumber"
                    value={formValues.trainNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="trainNumber" className="form-label">
                    Car No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="carNo"
                    name="carNo"
                    value={formValues.carNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  {" "}
                  <label
                    htmlFor="expectedCompletionTime"
                    className="form-label"
                  >
                    Expected time of completion
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="expectedCompletionTime"
                    name="expectedCompletionTime"
                    value={formValues.expectedCompletionTime}
                    onChange={handleChange}
                  />
                </div>
                <div className=" col-md-4">
                  <label className="form-label">Type of job card</label>
                  <div>
                    <input
                      type="radio"
                      id="preventive"
                      name="jobType"
                      value="Preventive"
                      checked={
                        formValues.jobType == "Preventive" ? true : false
                      }
                      onChange={handleChange}
                    />{" "}
                    Preventive &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="radio"
                      id="corrective"
                      name="jobType"
                      value="Corrective"
                      checked={
                        formValues.jobType == "Corrective" ? true : false
                      }
                      onChange={handleChange}
                    />{" "}
                    Corrective &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="radio"
                      id="testing"
                      name="jobType"
                      value="Testing"
                      checked={formValues.jobType == "Testing" ? true : false}
                      onChange={handleChange}
                    />{" "}
                    Testing &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="radio"
                      id="deployment"
                      name="jobType"
                      value="Deployment"
                      checked={
                        formValues.jobType == "Deployment" ? true : false
                      }
                      onChange={handleChange}
                    />{" "}
                    Deployment
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="work" className="form-label">
                    Work
                  </label>
                  <textarea
                    className="form-control"
                    id="work"
                    name="work"
                    rows="3"
                    value={formValues.work}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-8">
                  <input
                    type="checkbox"
                    name="condition1"
                    checked={formValues.condition1 == "0" ? false : true}
                    onChange={handleChange}
                  />{" "}
                  <label className="d-inline">
                    I Thereby declare that I accept responsibility for carrying
                    out work on the equipment detailed on this permit and that
                    no attempt will be made by me, or by any person under my
                    control, to carry out work on any other equipment.
                  </label>
                </div>
                <div className="col-4">
                  <label htmlFor="contractorName" className="form-label">
                    Contractor Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contractorName"
                    name="contractorName"
                    value={formValues.contractorName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label htmlFor="work" className="form-label">
                Part :B Permission to Access
              </label>
              <div className=" row mb-3">
                <div className="col-4">
                  <div className="">
                    <label className="form-label">Roof Access Required</label>
                    <input
                      type="checkbox"
                      id="roofAccessRequired"
                      name="roofAccessRequired"
                      checked={
                        formValues.roofAccessRequired != "0" ? true : false
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                  <div className="">
                    <label className="form-label">Power Block Required</label>
                    <input
                      type="checkbox"
                      id="powerBlockRequired"
                      name="powerBlockRequired"
                      checked={
                        formValues.powerBlockRequired != "0" ? true : false
                      }
                      onChange={handleChange}
                    />{" "}
                  </div>
                </div>
                <div className="col-5">
                  <label htmlFor="powerBlockSupervisor" className="form-label">
                    Power Block ensured by (Name of Supervisor)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="powerBlockSupervisor"
                    name="powerBlockSupervisor"
                    value={formValues.powerBlockSupervisor}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="lmrcStaffName" className="form-label">
                    LMRC Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lmrcStaffName"
                    name="lmrcStaffName"
                    value={formValues.lmrcStaffName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="lmrcStaffDesignation" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lmrcStaffDesignation"
                    name="lmrcStaffDesignation"
                    value={formValues.lmrcStaffDesignation}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="sgcName" className="form-label">
                    SGC Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sgcName"
                    name="sgcName"
                    value={formValues.sgcName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-3">
                  <label htmlFor="sgcDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="sgcDate"
                    name="sgcDate"
                    value={formValues.sgcDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="mb-3">
                  <label htmlFor="failureHistory" className="form-label">
                    Failure History (if any) &nbsp;
                  </label>
                  <textarea
                    className="form-control"
                    id="failureHistory"
                    name="failureHistory"
                    rows="3"
                    value={formValues.failureHistory}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label htmlFor="work" className="form-label">
                Part D:Completion for work(Completion details of work done etc)
              </label>

              <div className="row mb-3">
                <div className="col-12">
                  <input
                    type="checkbox"
                    name="condition2"
                    checked={formValues.condition2 != "0" ? true : false}
                    onChange={handleChange}
                  />{" "}
                  <label className="d-inline">
                    I hereby declare that all persons under my control have been
                    withdrawn and all the equipment affected as detailed in part
                    A above have been restored to normal.
                  </label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="followUpDetails" className="form-label">
                    Follow Up details
                  </label>
                  <textarea
                    className="form-control"
                    id="followUpDetails"
                    name="followUpDetails"
                    rows="3"
                    value={formValues.followUpDetails}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label">
                    Train is fit for movement from Signalling side
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      id="atpStatus"
                      value={"ATP"}
                      name="atpStatus"
                      checked={formValues.atpStatus != "0" ? true : false}
                      onChange={handleChange}
                    />{" "}
                    ATP &nbsp; &nbsp;
                    <input
                      type="checkbox"
                      value={"ATO"}
                      id="atoStatus"
                      name="atoStatus"
                      checked={formValues.atoStatus != "0" ? true : false}
                      onChange={handleChange}
                    />{" "}
                    ATO
                  </div>
                </div>

                <div className="col-6">
                  <label className="form-label">
                    Power Block Request cancelled
                  </label>
                  <input
                    type="checkbox"
                    id="powerBlockRequestCancelled"
                    name="powerBlockRequestCancelled"
                    checked={
                      formValues.powerBlockRequestCancelled != "0"
                        ? true
                        : false
                    }
                    onChange={handleChange}
                  />{" "}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="oldSrNoDetails" className="form-label">
                    Old Sr No Details along with Equipment
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="oldSrNoDetails"
                    name="oldSrNoDetails"
                    value={formValues.oldSrNoDetails}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="newSrNoDetails" className="form-label">
                    New Sr No Details along with Equipment
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newSrNoDetails"
                    name="newSrNoDetails"
                    value={formValues.newSrNoDetails}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="conclusion" className="form-label">
                    Conclusion
                  </label>
                  <textarea
                    className="form-control"
                    id="conclusion"
                    name="conclusion"
                    rows="3"
                    value={formValues.conclusion}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="workPending" className="form-label">
                    If work pending
                  </label>
                  <textarea
                    className="form-control"
                    id="workPending"
                    name="workPending"
                    rows="3"
                    value={formValues.workPending}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <label className="form-label">
                    I have left the train with{" "}
                  </label>
                  <div>
                    <input
                      type="radio"
                      id="auxOff"
                      name="auxStatus"
                      value={"off"}
                      onChange={handleChange}
                      checked={formValues.auxStatus == "off" ? true : false}
                    />{" "}
                    Aux off &nbsp; &nbsp;
                    <input
                      type="radio"
                      id="auxOn"
                      name="auxStatus"
                      value={"on"}
                      checked={formValues.auxStatus == "on" ? true : false}
                      onChange={handleChange}
                    />{" "}
                    Aux on
                  </div>
                </div>

                <div className="col-4">
                  <label className="form-label">Train can be energized</label>
                  <input
                    type="checkbox"
                    id="trainEnergized"
                    name="trainEnergized"
                    checked={formValues.trainEnergized != "0" ? true : false}
                    onChange={handleChange}
                  />{" "}
                </div>
                <div className="col-4">
                  <label className="form-label">Reason</label>
                  <input
                    type="text"
                    id="trainEnergizedReason"
                    name="trainEnergizedReason"
                    checked={formValues.trainEnergizedReason}
                    onChange={handleChange}
                  />{" "}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="contractorStaffName" className="form-label">
                    Contractor Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contractorStaffName"
                    name="contractorStaffName"
                    value={formValues.contractorStaffName}
                    onChange={handleChange}
                  />
                </div>

                {/* <div className="col-3">
                  <label htmlFor="contractorStaffSign" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contractorStaffSign"
                    name="contractorStaffSign"
                    value={formValues.contractorStaffSign}
                    onChange={handleChange}
                  />
                </div> */}

                <div className="col-3">
                  <label htmlFor="contractorStaffDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="contractorStaffDate"
                    name="contractorStaffDate"
                    value={formValues.contractorStaffDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-3">
                  <label htmlFor="contractorStaffTime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="contractorStaffTime"
                    name="contractorStaffTime"
                    value={formValues.contractorStaffTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="signalingStaffName" className="form-label">
                    Signaling Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="signalingStaffName"
                    name="signalingStaffName"
                    value={formValues.signalingStaffName}
                    onChange={handleChange}
                  />
                </div>

                {/* <div className="col-3">
                  <label htmlFor="signalingStaffSign" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="signalingStaffSign"
                    name="signalingStaffSign"
                    value={formValues.signalingStaffSign}
                    onChange={handleChange}
                  />
                </div> */}

                <div className="col-3">
                  <label htmlFor="signalingStaffDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="signalingStaffDate"
                    name="signalingStaffDate"
                    value={formValues.signalingStaffDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-3">
                  <label htmlFor="signalingStaffTime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="signalingStaffTime"
                    name="signalingStaffTime"
                    value={formValues.signalingStaffTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="sgcSignName" className="form-label">
                    SGC Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sgcSignName"
                    name="sgcSignName"
                    value={formValues.sgcSignName}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="col-3">
                  <label htmlFor="sgcSign" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sgcSign"
                    name="sgcSign"
                    value={formValues.sgcSign}
                    onChange={handleChange}
                  />
                </div> */}

                <div className="col-3">
                  <label htmlFor="sgcSignDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="sgcSignDate"
                    name="sgcSignDate"
                    value={formValues.sgcSignDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-3">
                  <label htmlFor="sgcSignTime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="sgcSignTime"
                    name="sgcSignTime"
                    value={formValues.sgcSignTime}
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

export default EditJobCard;
