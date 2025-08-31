import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/satya/TeaCoffeeReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";

const EditTeaCoffee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const tea = useSelector((state) => state.coffee);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(tea.data.data);
  const [items, setItems] = useState([]);
  const itmm = tea.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(tea.data.data);
  }, []);
  useEffect(() => {
    if (tea) {
      setSlug(tea.slug);
    }
  }, [tea]);
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
    date: formatDate(new Date().toDateString()),
    item: fd.item,
    quantity: fd.quantity,
    datein: fd.datein,
    quantity1: fd.quantity1,
    dateout: fd.dateout,
    remarks: fd.remarks,
    empid: fd.Employ_id,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "Tea/Coffee form.pdf",
  });

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
            <button className="btn btn-primary" onClick={() => toPDF()}>
              <MdPictureAsPdf size={"25px"} color="#fff" />
              {/* Export To Pdf */}
            </button>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Edit: Tea/Coffee</h3>
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
                    value={formValues.item}
                    onChange={(e) =>
                      setFormValues({ ...formValues, item: e.target.value })
                    }
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
                    value={formValues.quantity}
                    onChange={(e) =>
                      setFormValues({ ...formValues, quantity: e.target.value })
                    }
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
                    value={formValues.datein}
                    onChange={(e) =>
                      setFormValues({ ...formValues, datein: e.target.value })
                    }
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
                    value={formValues.quantity1}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        quantity1: e.target.value,
                      })
                    }
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
                    value={formValues.dateout}
                    onChange={(e) =>
                      setFormValues({ ...formValues, dateout: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Empolyee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    value={formValues.empid}
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-8">
                  <label for="inputremarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    value={formValues.remarks}
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
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

export default EditTeaCoffee;
