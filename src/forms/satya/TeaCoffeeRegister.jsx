import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { addData, addTeaCoffee } from "../../reducer/satya/TeaCoffeeReducer";
import { formatDate } from "../../data/formatDate";

const TeaCoffeeRegister = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();

  const tea = useSelector((state) => state.coffee);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (tea) {
      setSlug(tea.slug);
    }
  }, [tea]);

  const basicInitialValues = {
    S_No: sNo,
    date: formatDate(new Date().toDateString()),
    item: "",
    quantity: "",
    datein: "",
    quantity1: "",
    dateout: "",
    remarks: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Tea/Coffee
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Tea/Coffee</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputitem" className="form-label">
                    Item
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputitem"
                    onChange={(e) =>
                      setFormValues({ ...formValues, item: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputquantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputquantity"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, quantity: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputdatein" className="form-label">
                    Date In
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdatein"
                    onChange={(e) =>
                      setFormValues({ ...formValues, datein: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputquantity1" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputquantity1"
                    min="1"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        quantity1: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputdateout" className="form-label">
                    Date Out
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdateout"
                    onChange={(e) =>
                      setFormValues({ ...formValues, dateout: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputremarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary mt-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
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

export default TeaCoffeeRegister;
