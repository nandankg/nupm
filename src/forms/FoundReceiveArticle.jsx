import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "@mui/material";
import Header from "../component/Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addData, addfundrcvartred } from "../reducer/FoundReceiveArtReducer";
import { formatDate } from "../data/formatDate";
import { formatTime } from "../data/formatDate";
const FoundReceiveArticleReg = () => {
  const navigate = useNavigate();
  const [s_no, setS_no] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  // useEffect(() => {
  //   setInterval(() => setTime(new Date()), 1000);
  // }, []);

  const dispatch = useDispatch();
  const [Name, setName] = useState("abc");
  const [address, setAddress] = useState("abc");
  const [contno, setContNo] = useState("abc");
  const [error, setError] = useState("");

  const foundreceivereg = useSelector((state) => state.foundrcvartstate || []);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (foundreceivereg) {
      setSlug(foundreceivereg.slug);
    }
  }, [foundreceivereg]);

  const basicInitialValues = {
    date: '',
    time: '',
    station: '',
    handedOverByName: '',
    handedOverByType: '',
    packageOrPurse: '',
    currencyNo: '',
    countryName: '',
    valueInNumber: '',
    currencyName: '', // e.g., Dollar, Euro, Pound
    identificationMark: '',
    otherCurrency: '', // If "Any other" is selected
    placeFound: '',
    remarks: '',
    receivedByEmp: '',
    receivedByName: '',
    sentToLostAndFoundDate: '',
    sentToLostAndFoundTime: '',
    sentToLostAndFoundFoilNo: '',
    sentToLostAndFoundByEmp: '',
    sentToLostAndFoundByName: '',
    claimSNo: '', // If claimed
    declarationForm: '', // If claimed};
  }
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    const newS_no = s_no + 1;
    setS_no(newS_no);
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
      

        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ minWidth: "100%" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  Found/Received Article Register
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="name" className="form-label text-start">
                    Name of The Person handling over the article
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="place" className="form-label text-start">
                    Place where article was found
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="place"
                    style={{ marginTop: "25px" }}
                    onChange={(e) =>
                      setFormValues({ ...formValues, place: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="description"
                    className="form-label text-start"
                  >
                    Description of the article
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="description"
                    style={{ marginTop: "25px" }}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        description: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="stime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="stime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        time: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="Rname" className="form-label text-start">
                    Name and Signature of Receiving Supervisor
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    placeholder="Enter Name of Supervisor"
                    id="Rname"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Rname: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="department" className="form-label">
                    Department (Sent Lost & Found Office)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        department: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {/* <h6 className="text-center"> Sent Lost & Found Office</h6> */}

              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="emp_id" className="form-label">
                    Employ Id (Sent Lost & Found Office)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emp_id"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Employ_id: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="sdate" className="form-label">
                    Date (Sent Lost & Found Office)
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="sdate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sdate: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>

                <div className="col-md-4">
                  <label htmlFor="stime" className="form-label">
                    Time (Sent Lost & Found Office)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="stime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        stime: e.target.value,
                      })
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
    </>
  );
};

export default FoundReceiveArticleReg;
