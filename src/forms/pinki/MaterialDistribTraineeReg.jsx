import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import {
  addData,
  fetchData,
} from "../../reducer/pinki/MaterialDistributionTraineeReducer";

const MaterialDistribReg = () => {
  const navigate = useNavigate();
  const [sno, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("abc");
  const [repotime, setReporttime] = useState(new Date().toLocaleTimeString());
  const dispatch = useDispatch();
  const [train, setTrain] = useState("12");
  const [trainset, setTrainSet] = useState("12");
  const [opname, setOpName] = useState("op");
  const [emp_id, setEmpId] = useState("123");
  const [items, setItems] = useState([]);
  const [rectime, setRectTime] = useState("1");
  const [detension, setDetention] = useState("123");

  const materialdistribution = useSelector(
    (state) => state.materialdistribution || {}
  );

  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (materialdistribution) {
      setSlug(materialdistribution.slug);
    }
  }, [materialdistribution]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (materialdistribution.data && materialdistribution.data.data) {
      setItems(materialdistribution.data.data);
    }
  }, [materialdistribution]);

  const basicInitialValues = {
    sno: sno,
    issue_to: "",
    emp_id: "",
    designation: "",
    date: formatDate(date.toDateString()),
    item_name: "",
    remark: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
    setSno((prevSno) => prevSno + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Material Distribution to Trainees
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">
                  {" "}
                  Material Distribution to Trainees Register
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-6">
                <label for="inputissue" className="form-label">
                  Issue to
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputissue"
                  onChange={(e) =>
                    setFormValues({ ...formValues, issue_to: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label for="inputempid" className="form-label">
                  Emp ID
                </label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputempid"
                  required
                  onChange={(e) =>
                    setFormValues({ ...formValues, emp_id: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label for="inputdesignation" className="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdesignation"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      designation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label for="inputdate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdate"
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label for="inputname" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputname"
                  onChange={(e) =>
                    setFormValues({ ...formValues, item_name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label for="inputremark" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputremark"
                  onChange={(e) =>
                    setFormValues({ ...formValues, remark: e.target.value })
                  }
                />
              </div>

              <div className="col-12 text-center">
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

export default MaterialDistribReg;
