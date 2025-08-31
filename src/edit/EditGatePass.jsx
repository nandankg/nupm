import { FilterDrama, Store } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { editData, fetchData } from "../reducer/GatePassReducer";
import { formatDate } from "../data/formatDate";

const GatePassEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [s_no, setSno] = useState();
  const [date, setDate] = useState(new Date());
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const gatepass = useSelector((state) => state.gatepassstore || []);
  console.log(gatepass.data.data);
  const [items, setItems] = useState([]);
  const itmm = gatepass.data.data;
  console.log(items);
  const itms = {
    itmdespt: "",
    partno: "",
    serialno: "",
    location: "",
    qty: "",
    dftsrv: "",
    remark: "",
  };
  const [itemone, setItemone] = useState(itms);
  const [itemtwo, setItemtwo] = useState(itms);
  const [itemthree, setItemthree] = useState(itms);

  useEffect(() => {
    dispatch(fetchData());
    setItems(gatepass.data.data);
  }, []);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (gatepass) {
      setSlug(gatepass.slug);
    }
  }, [gatepass]);
  useEffect(() => {
    setItems(gatepass.data.data);
  }, [gatepass]);



  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    date: formatDate(new Date().toString()),
    org: fd.org,
    dept: fd.dept,
    pageno: fd.page_no,
    bookno: fd.bookno,
    return_type: fd.return_type,
    items: fd.items,
    issuerdetail: fd.issuerdetail,
    receiverdetail: fd.receiverdetail,
    formType: fd.formType,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  };
 const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  console.log(itemone);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = formValues.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormValues((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

    const[item,setItem]=useState([
      {
        itmdespt: "",
        partno: "",
        serialno: "",
        location: "",
        qty: "",
        dftsrv: "",
        remark: "",
      },
    ])
  const handleAddRow = () => {
    setItem([...item,    {
      itmdespt: "",
      partno: "",
      serialno: "",
      location: "",
      qty: "",
      dftsrv: "",
      remark: "",
    }]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(editData(formValues));
    const newSrno = s_no + 1;
    setSno(newSrno);
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12  w-100">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Gate Pass Book</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="org" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="org"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-4">
                  <label htmlFor="dept" className="form-label">
                    Department
                  </label>
                  <select
                    className="form-control"
                    id="dept"
                    name="dept"
                    value={formValues.dept}
                    onChange={handleChange}
                  >
                    <option>Operation</option>
                    <option>Signalling</option>
                    <option>AFC Mainline</option>
                    <option>Telecom</option>
                    <option>AFC Store</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="bookno" className="form-label">
                    Returnable/Non-Returnable
                  </label>
                  <select
                    className="form-control"
                    id="bookno"
                    name="return_type"
                    value={formValues.return_type}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-Returnable">Non Returnable</option>
                  </select>
                </div>

                
                <div className="col-md-4">
                  <label htmlFor="org" className="form-label">
                    Organisation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="org"
                    name="org"
                    value={formValues.org}
                    onChange={handleChange}
                  />
                </div>
                <hr
                  style={{
                    marginTop: "15px",
                    borderBlockStyle: "double",
                    borderBlockColor: "#f7b3a1",
                    borderWidth: "5px",
                  }}
                />
                {item.map((itm, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-md-1">
                      {index == 0 ? (
                        <label htmlFor="desc" className="form-label">
                          No
                        </label>
                      ) : (
                        ""
                      )}
                      <input
                        type="readonly"
                        className="form-control"
                        id="desc"
                        value={index + 1}
                      />
                    </div>
                    <div className="col-md-3">
                      {index == 0 ? (
                        <label htmlFor="desc1" className="form-label">
                          Item Description
                        </label>
                      ) : (
                        ""
                      )}
                      <input
                        type="Text"
                        className="form-control"
                        id="desc1"
                        name="itmdespt"
                        value={formValues.items[index].itmdespt}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div className="col-md-1">
                      {index == 0 ? (
                        <label htmlFor="desc2" className="form-label">
                          Prt No
                        </label>
                      ) : (
                        ""
                      )}
                      <input
                        type="Text"
                        className="form-control"
                        id="desc2"
                        name="partno"
                        value={formValues.items[index].partno}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div className="col-md-1">
                      {index == 0 ? (
                        <label htmlFor="desc3" className="form-label">
                          Srl No
                        </label>
                      ) : (
                        ""
                      )}
                      <input
                        type="Text"
                        className="form-control"
                        id="desc3"
                        name="serialno"
                        value={formValues.items[index].serialno}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                    </div>
                    <div className="col-md-2">
                      {index == 0 ? (
                        <label htmlFor=" location " className="form-label">
                          Location
                        </label>
                      ) : (
                        ""
                      )}
                      <input
                        type="text"
                        className="form-control"
                        id=" location "
                        name="location"
                        value={formValues.items[index].location}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                      <br />
                    </div>
                    <div className="col-md-1">
                      {index == 0 ? (
                        <label htmlFor="qty" className="form-label">
                          Qty
                        </label>
                      ) : (
                        ""
                      )}
                      <input
                        type="text"
                        className="form-control"
                        id="qty"
                        name="qty"
                        value={formValues.items[index].qty}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                      <br />
                    </div>
                    <div className="col-md-1">
                      {index == 0 ? (
                        <label htmlFor="pageno1" className="form-label">
                          D/ S
                        </label>
                      ) : (
                        ""
                      )}
                      <select
                        className="form-control"
                        id="pageno1"
                        name="dftsrv"
                        value={formValues.items[index].dftsrv}
                        onChange={(e) => handleItemChange(index, e)}
                      >
                        <option value="">Select</option>
                        <option value="Defective">Defective</option>
                        <option value="Serviceable">Serviceable</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      {index == 0 ? (
                        <label htmlFor=" location1 " className="form-label">
                          Remark
                        </label>
                      ) : (
                        ""
                      )}
                      <input
                        type="text"
                        className="form-control"
                        id=" location1 "
                        name="remark"
                        value={formValues.items[index].remark}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                      <br />
                    </div>
                  </div>
                ))}
<button
                style={{ fontSize: 9,width:250 }}
                type="button"
                className="btn btn-secondary me-3"
                onClick={handleAddRow}
              >
                ADD Row
              </button>
                <hr
                  style={{
                    borderBlockStyle: "double",
                    borderBlockColor: "#f7b3a1",
                    borderWidth: "5px",
                  }}
                />
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Detail of Issuer</h5>

                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="nameissuer" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nameissuer"
                          value={formValues.issuerdetail.nameissuer}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              issuerdetail: {
                                ...formValues.issuerdetail,
                                nameissuer: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="desgissuer" className="form-label">
                          Designation
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="desgissuer"
                          value={formValues.issuerdetail.designationissuer}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              issuerdetail: {
                                ...formValues.issuerdetail,
                                designationissuer: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="dateissuer" className="form-label">
                          Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="dateissuer"
                          value={formValues.issuerdetail.dateissuer}
                         
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              issuerdetail: {
                                ...formValues.issuerdetail,
                                dateissuer: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="empid" className="form-label">
                          Emp ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="empid"
                          value={formValues.issuerdetail.empidissuer}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              issuerdetail: {
                                ...formValues.issuerdetail,
                                empidissuer: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                </div>

                <hr
                  style={{
                    borderBlockStyle: "double",
                    borderBlockColor: "#f7b3a1",
                    borderWidth: "5px",
                  }}
                />
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"> Details of Receiver</h5>

                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="namereceiver" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="namereceiver"
                          value={formValues.receiverdetail.namereceiver}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              receiverdetail: {
                                ...formValues.receiverdetail,
                                namereceiver: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <br />
                      <div className="col-md-3">
                        <label htmlFor="empidrec" className="form-label">
                          Emp ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="empidrec"
                          value={formValues.receiverdetail.empidreceiver}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              receiverdetail: {
                                ...formValues.receiverdetail,
                                empidreceiver: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="desgreceiver" className="form-label">
                          Designation
                        </label>
                        <input
                          type="Text"
                          className="form-control"
                          id="desgreceiver"
                          value={formValues.receiverdetail.designationreceiver}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              receiverdetail: {
                                ...formValues.receiverdetail,
                                designationreceiver: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="datereceiver" className="form-label">
                          Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="datereceiver"
                          value={formValues.receiverdetail.datereceiver}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              receiverdetail: {
                                ...formValues.receiverdetail,
                                datereceiver: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                </div>

                {/* <div className="col-md-12">
                  <label htmlFor="remark" className="form-label">
                    <br /> Remarks
                  </label>
                  <textarea
                    className="form-control"
                    id="remark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                  />
                </div> */}
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

export default GatePassEdit;
