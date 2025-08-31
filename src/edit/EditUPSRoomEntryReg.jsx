import { React, useState, useEffect } from "react";
import { Breadcrumbs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { formatDate } from "../data/formatDate";
import { formatTime } from "../data/formatDate";
import { FilterDrama } from "@mui/icons-material";
import { editData, fetchData } from "../reducer/UPSRoomEntryRegReducer";

const UPS_Room_entry_register_edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [date, setDate] = useState(new Date());

  console.log(id);
  const dispatch = useDispatch();
  const ups_room_entry = useSelector((state) => state.upsroomentry || []);
  console.log(ups_room_entry.data.data);
  const [items, setItems] = useState([]);
  const itmm = ups_room_entry.data.data;
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(ups_room_entry.data.data);
  }, []);

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (ups_room_entry) {
      setSlug(ups_room_entry.slug);
    }
  }, [ups_room_entry]);

  useEffect(() => {
    setItems(ups_room_entry.data.data);
  }, [ups_room_entry]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(FilterDrama[0]);
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    //from form

    id: fd.id,
    s_no: 1,
    date: formatDate(new Date().toString()),
    name: fd.Name,
    emp_id: fd.EmpID,
    desg: fd.DesignationDepartment,
    e_time: formatTime(new Date().toString()),
    purpose: fd.PurposeOfVisit,
    ex_time: fd.ExitTime,
    V_sign: fd.VisitorsSign,
    D_sign: fd.SignOnDuty,
    remark: fd.Remark,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
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
          <div className="row justify-content-center">
            <div className="col-md-8 form-container">
              <form onSubmit={handleSubmit}>
                <div className=" mb-3 form-heading-container">
                  <h3 className="form-heading">
                    {" "}
                    Edit UPS Room Entry Register
                  </h3>
                  <div className="heading-line"></div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="name" className="form-label pb-4">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formValues.name}
                      placeholder="Enter Name "
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="empid" className="form-label pb-4">
                      Emp.No./ID No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="empid"
                      value={formValues.emp_id}
                      placeholder="Enter ID"
                      onChange={(e) =>
                        setFormValues({ ...formValues, emp_id: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="desg" className="form-label text-start">
                      Dasignation/ Department
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="desg"
                      value={formValues.desg}
                      placeholder="Enter Designation"
                      onChange={(e) =>
                        setFormValues({ ...formValues, desg: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="e_time" className="form-label pb-4">
                      Entry Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="e_time"
                      value={formValues.e_time}
                      onChange={(e) =>
                        setFormValues({ ...formValues, e_time: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="purpose" className="form-label">
                      Purpose of Visit
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="purpose"
                      value={formValues.purpose}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          purpose: e.target.value,
                        })
                      }
                    />
                    <br />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="e_time" className="form-label">
                      Exit Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="e_time"
                      value={formValues.ex_time}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          ex_time: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="v_sign" className="form-label">
                      Visitor's Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="v_sign"
                      value={formValues.V_sign}
                      onChange={(e) =>
                        setFormValues({ ...formValues, V_sign: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="d_sign" className="form-label">
                      Name on Duty
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="d_sign"
                      value={formValues.D_sign}
                      onChange={(e) =>
                        setFormValues({ ...formValues, D_sign: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="remark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="remark"
                      placeholder="Remark"
                      value={formValues.remark}
                      onChange={(e) =>
                        setFormValues({ ...formValues, remark: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12 text-center pt-3">
                    <button type="submit" className="btn btn-primary px-3">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UPS_Room_entry_register_edit;
