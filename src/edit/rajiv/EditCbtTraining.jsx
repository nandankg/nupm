import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/rajiv/CBTTrainingReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
const user = JSON.parse(localStorage.getItem("userdata"));
const EditCbtTraining = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const addCBTTrainingList = useSelector((state) => state.cbtTraining);
  const [slug, setSlug] = useState("");
  useEffect(() => {
    if (addCBTTrainingList) {
      setSlug(addCBTTrainingList.slug);
    }
  }, [addCBTTrainingList]);
  const [items, setItems] = useState([]);
  const itmm = addCBTTrainingList.data.data;

  useEffect(() => {
    dispatch(fetchData());
    setItems(addCBTTrainingList.data.data);
  }, []);
  useEffect(() => {
    setItems(addCBTTrainingList.data.data);
  }, [addCBTTrainingList]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    name: fd.name,
    emp_id: fd.emp_id,
    date: fd.date,
    time_in: fd.time_in,
    time_out: fd.time_out,
    topic: fd.topic,
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
    filename: "CBT Training form.pdf",
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
              CBT Training
            </Link>
            <Link underline="hover" color="inherit" to="/">
              Edit
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
                <div className=" mb-3 form-heading-container"></div>
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
                    <label for="inputempid" className="form-label">
                      Employee Id.
                    </label>
                    <input
                      type="Text"
                      className="form-control"
                      id="inputempid"
                      value={formValues.emp_id}
                      onChange={(e) =>
                        setFormValues({ ...formValues, emp_id: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label for="inputDate" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputDate"
                      value={formValues.date}
                      onChange={(e) =>
                        setFormValues({ ...formValues, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-4">
                    <label for="inputTimein" className="form-label">
                      Time In
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputTimein"
                      value={formValues.time_in}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          time_in: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label for="inputTimeout" className="form-label">
                      Time Out
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputTimeout"
                      value={formValues.time_out}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          time_out: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputTopic" className="form-label">
                      Topic
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTopic"
                      value={formValues.topic}
                      onChange={(e) =>
                        setFormValues({ ...formValues, topic: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
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

export default EditCbtTraining;
