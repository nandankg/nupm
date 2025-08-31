import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import { addData, fetchData, saveData } from "../reducer/GatePassReducer";
const GatePassList = () => {
  const [formValues, setFormValues] = useState({});
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({ filename: "gatepassbook.pdf" });
  const [fromDate, setFromdate] = useState(null);
  const [toDate, setTodate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [fItems, setFItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("userdata"));
  const dispatch = useDispatch();
  const gatepass = useSelector((state) => state.gatepassstore || []);
  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(gatepass);
  console.log(gatepass.data.data);
  console.log(filteredItems);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const location = useLocation();
  const { id } = location.state;

  const itmm = gatepass.data.data;
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }


  useEffect(() => {
    if (gatepass.data && gatepass.data.data) {
      setItems(gatepass.data.data);
      setSlug(gatepass.slug);
      setFilteredItems(gatepass.data.data);
    }
  }, [gatepass]);

  useEffect(() => {
      // Filter out rows where all fields are null
  const filtItem = filteredData[0].items.filter(
    (item) =>
      Object.values(item).some((value) => value !== null)
  );
  setFItems(filtItem);
  },[])
  console.log(fItems);

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        {/* <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Gate Pass / List
            </Link>
          </Breadcrumbs>
        </div> */}
        <h3>Gate Pass Register</h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between align-items-center">
          {/* <input
            type="search"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Here."
          /> */}
          <div className="d-flex align-items-center gap-3 mt-3">
          <div className="d-flex gap-3">
            <Link to="">
              {/* <button className="btn btn-primary">
                                <FaFilter />
                            </button> */}
            </Link>
            <DownloadTableExcel
              filename="GatePassSignalling_Table"
              sheet="GatePassSignalling_Table"
              currentTableRef={tableRef.current}
            >
              <button className="btn " style={{ border: "1px solid #0baa9a " }}>
                <RiFileExcel2Fill color="#0baa9a " size={25} />
              </button>
            </DownloadTableExcel>
            <button
              className="btn"
              onClick={() => toPDF()}
              style={{
                border: "1px solid #0baa9a",
              }}
            >
              <MdPictureAsPdf size={"25px"} color="#850d04" />
            </button>
          </div>
          </div>
          {/* {console.log("filteredItems:", filteredItems)} */}
        </div>
        <div ref={targetRef} >
          {filteredData?.map((item, index) => {
            return (
              <>
                <div key={index} ref={tableRef}>
                  <table className="table " >
                    <thead>
                      <tr>
                        <th colSpan={5}>
                          <h3>Uttar Pradesh Metro Rail Corporation Limited</h3>
                          <h4>उत्तर प्रदेश मेट्रो रेल कॉर्पोरेशन लिमिटेड</h4>
                        </th>
                        <th rowSpan={2} colSpan={2}>
                          <img src={"/upmrc-logo.png"} alt="Logo" />
                        </th>
                        <th colSpan={1}>Original Copy Page No.</th>
                      </tr>
                      <tr>
                        <th colSpan={5}>Gate Pass (गेट पास)</th>
                        <td colSpan={1}>{item.page_no} </td>
                      </tr>
                      <tr>
                        <th style={{ maxWidth: "25px" }}>Organisation</th>
                        <td colSpan={2}>{item.org} </td>
                        <th> Date</th>
                        <td> {item.date}</td>
                        <th colSpan={2} ></th>
                        <td> {item.bookno} </td>
                      </tr>
                      <tr>
                        <th>Department</th>
                        <td colSpan={2}> {item.dept}</td>
                        <th colSpan={6}>Returnable/ Non-Returnable:  {item.return_type}</th>
                      </tr>
                      <tr className="text-center">
                        <th>S.No.</th>
                        <th>Item Description</th>
                        <th>Part No.</th>
                        <th>Serial No.</th>
                        <th>Location</th>
                        <th>QTY.</th>
                        <th style={{ widows: "150px" }}>
                          Defective/Serviceable
                        </th>
                        <th>Remark</th>
                      </tr>
                    </thead>

                    <tbody>
                      {fItems.map((itm, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{itm?.itmdespt}</td>
                          <td>{itm.partno}</td>
                          <td>{itm.serialno}</td>
                          <td>{itm.location}</td>
                          <td>{itm.qty}</td>
                          <td>{itm.dftsrv}</td>
                          <td>{itm.remark}</td>

                         
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "5px",
                        width: "100%",
                      }}
                    >
                      <div
                        className="heading-sec"
                        style={{ display: "flex", width: "100%" }}
                        key={index}
                      >
                        <div className="left" style={{ flex: 1 }}>
                          <h4>Detail of issuer</h4>
                          {/* <p>
                            Sign:- &nbsp; &nbsp;{item?.issuerdetail?.signissuer}
                          </p> */}
                          <p>
                            Name:- &nbsp; &nbsp;{item?.issuerdetail?.nameissuer}
                          </p>
                          <p>
                            Designation :- &nbsp; &nbsp;
                            {item?.issuerdetail?.designationissuer}
                          </p>
                          <p>
                            Emp id.:- &nbsp; &nbsp;
                            {item?.issuerdetail?.empidissuer}
                          </p>
                          <p>
                            Date:- &nbsp; &nbsp;{item?.issuerdetail?.dateissuer}
                          </p>
                        </div>

                        <div className="right">
                          <h4>Details of Receiver </h4>
                          {/* <p>
                            Sign:- &nbsp; &nbsp;
                            {item?.receiverdetail?.signreceiver}
                          </p> */}
                          <p>
                            Name:- &nbsp; &nbsp;
                            {item?.receiverdetail?.namereceiver}
                          </p>
                          <p>
                            Designation:- &nbsp; &nbsp;
                            {item?.receiverdetail?.designationreceiver}
                          </p>
                          <p>
                            Emp id.:- &nbsp; &nbsp;
                            {item?.receiverdetail?.empidreceiver}
                          </p>
                          <p>
                            Date:- &nbsp; &nbsp;
                            {item?.receiverdetail?.datereceiver}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                      <td className="mt-3">
                            {item.status === "0" || user.role === 'Admin' ? (
                              <div>
                                <Link
                                  style={{width: "120px", padding: "10px"}}
                                  to={`/edit/${slug}`}
                                  state={{ id: item.id }}
                                  className="btn btn-primary align-content-center mx-3"
                                >
                                  Edit
                                </Link>
                                <button
                                style={{width: "120px", padding: "10px"}}
                                  type="submit"
                                  onClick={() => {
                                    handleSave(item.id);
                                  }}
                                >
                                  Submit
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                      

                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GatePassList;
