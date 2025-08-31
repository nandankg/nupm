import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/rajiv/ImprestRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
const ImprestEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  const imprestRegisterList = useSelector((state) => state.imprestRegister);
  console.log(imprestRegisterList.data.data);
  const [items, setItems] = useState([]);
  const itmm = imprestRegisterList.data.data;
  useEffect(() => {
    dispatch(fetchData());
    setItems(imprestRegisterList.data.data);
  }, []);
  useEffect(() => {
    setItems(imprestRegisterList.data.data);
    setSlug(imprestRegisterList.slug);
  }, [imprestRegisterList]);
  let filteredData;
  console.log(itmm);
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
    date: formatDate(new Date().toString()),
    billNo: fd.billNo,
    item_name: fd.item_name,
    name_Address: fd.name_Address,
    qty: fd.qty,
    rate: fd.rate,
    amount: fd.amount,
    gst: fd.gst,
    totalAmount: fd.totalAmount,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = formValues.qty * formValues.rate;
    const gst = (amount * 18) / 100;
    const totalAmount = amount + gst;

    const updatedFormValues = {
      ...formValues,
      amount,
      gst,
      totalAmount,
    };
    dispatch(editData(updatedFormValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Imprest Register form.pdf",
  });
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Imprest
            </Link>
            <Link underline="hover" color="inherit">
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
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="inputbillNo" className="form-label">
                      Bill No.
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputbillNo"
                      value={formValues.billNo}
                      onChange={(e) =>
                        setFormValues({ ...formValues, billNo: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-8">
                    <label
                      htmlFor="inputname_address_agency"
                      className="form-label"
                    >
                      Name and Address of Agency
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputname_address_agency"
                      value={formValues.name_Address}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name_Address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-5">
                    <label htmlFor="inputitem_name" className="form-label">
                      Item Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputitem_name"
                      value={formValues.item_name}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          item_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="inputqty" className="form-label">
                      Qty
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputqty"
                      value={formValues.qty}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          qty: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputrate" className="form-label">
                      Rate
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputrate"
                      value={formValues.rate}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          rate: Number(e.target.value),
                        })
                      }
                    />
                  </div>
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

export default ImprestEdit;
