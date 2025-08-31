import React, { useState, useEffect } from "react";

import { addDtrsig, addData } from "../../reducer/store/DtrIssueStoreReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import { orange } from "@mui/material/colors";
const user = JSON.parse(localStorage.getItem("userdata"));
const deprt = user?.department.toLowerCase();

const LedgerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const DtrIssueStoreList = useSelector((state) => state.dtrissue);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (DtrIssueStoreList) {
      setSlug(DtrIssueStoreList.slug);
    }
  }, [DtrIssueStoreList]);
  const [formData, setFormData] = useState([
    {
      date: "",
      fromWhomReceivedOrIssued: "",
      refOfReceiptOrIssueNote: "",
      receiptQty: "",
      issuedQty: "",
      balanceQty: "",
      signOfIssuer: "",
      signOfControllingOfficer: "",
      remarks: "",
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const handleAddRow = () => {
    setFormData([
      ...formData,
      {
        date: "",
        fromWhomReceivedOrIssued: "",
        refOfReceiptOrIssueNote: "",
        receiptQty: "",
        issuedQty: "",
        balanceQty: "",
        signOfIssuer: "",
        signOfControllingOfficer: "",
        remarks: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addData(formData));
    navigate(`/list/${slug}`);
  };

  return (
    <>
    
   
      <h2 className="mb-4">Ledger Form</h2>
      <h5 style={{color:"orange"}}><i>Ledger Data Is Enter Through DTR Receipt and DTR Issue form</i></h5>
     
    </>
  );
};

export default LedgerForm;
