import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/isha/DARReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
const EditDar=()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch(); 
    const darlist = useSelector((state) => state.Dar);
    const [slug, setSlug] = useState("");
    console.log(slug);
    console.log(darlist.data.data);
    const [items, setItems] = useState([]);
    const itmm = darlist.data.data;
    console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(darlist.data.data);
  }, []);
  useEffect(() => {
    if (darlist) {
      setSlug(darlist.slug);
    }
    setItems(darlist.data.data);
  }, [darlist]);
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
    name: fd.name,
    emp: fd.emp,
    designation: fd.designation,
    posted: fd.posted,
    mno:  fd.mno,
    sf:  fd.sf,
    mm: fd.mm,
    dfooi:  fd.dfooi,
    pi:  fd.pi,
    remark:  fd.remark,
    reason:  fd.reason,
    doa:  fd.doa,
    daa:  fd.daa,
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
            D&AR
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container"style={{ maxWidth: "90%"}}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Edit : D&AR</h3>
                <div className="heading-line"></div>
              </div>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <label for="inputMemoNo" className="form-label">
                    Minor/Major
                  </label>
                  <select class="form-select" name="mm"
                   value={formValues.mm}
                    onChange={(e) =>
                      setFormValues({...formValues, mm: e.target.value, })
                    }>
                    <option value="">Select</option>
                    <option value="Minor"> Minor</option>
                    <option value="Major">Major</option>

                  </select>
                  </div>

                  <div className="col-md-6">
                    <label for="inputTimeout" className="form-label">
                      Date Of Appeal
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="doa"
                      value={formValues.doa}
                      onChange={(e) =>
                        setFormValues({ ...formValues, doa: e.target.value })
                      }
                    />
                  </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-4">
                <label for="inputAddress" className="form-label">
                  Posted At
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="posted"
                  value={formValues.posted}
                  onChange={(e) =>
                    setFormValues({ ...formValues, posted: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label for="inputAddress" className="form-label">
                  M.NO
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mno"
                  value={formValues.mno}
                  onChange={(e) =>
                    setFormValues({ ...formValues, mno: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label for="inputMemoNo" className="form-label">
                 SF
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sf"
                  value={formValues.sf}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      sf: e.target.value,
                    })
                  }
                />
              </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputMemoNo" className="form-label">
                Date For Other Of Penality Impose
                </label>
                <select class="form-select"  name="dfooi"
                 value={formValues.dfooi}
                  onChange={(e) =>
                    setFormValues({ ...formValues, dfooi: e.target.value })
                  }>
                  <option value="">Select</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="col-md-5">
                <label for="inputMemoNo" className="form-label">
                  Penality Imposed
                </label>
                <select class="form-select" name="pi"
                 value={formValues.pi}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      pi: e.target.value,
                    })
                  }>
                  <option value="">Select</option>
                  <option value="YES"> YES</option>
                  <option value="NO">NO</option>

                </select>
              </div>
              </div>
              <div className="row mb-3">
               
                <div className="col-md-12">
                <label for="inputCity" className="form-label">
                  Reason
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="reason"
                  value={formValues.reason}
                  onChange={(e) =>
                    setFormValues({ ...formValues, reason: e.target.value })
                  }
                />
              </div>
                <div className="col-md-12">
                  <label for="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="remark"
                    value={formValues.remark}
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3">
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

export default EditDar;
