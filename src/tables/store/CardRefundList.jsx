import { FaFilter } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../../reducer/store/CardRefundReducer";

const CardRefundList = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.cardrefund);
  console.log(card);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const itms = JSON.parse(localStorage.getItem("card"));
    if (itms) {
      setItems(itms);
    }
  }, []);
  useEffect(() => {
    let l = card.length;
    if (l > 0) localStorage.setItem("card", JSON.stringify(card));
    else dispatch(addCard(items));
  }, [card]);
  console.log(items);
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/cardrefund/register">
              Card Refund details
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> UNREADABLE CARD REFUND DETAILS</h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between">
          <input type="search" name="search" placeholder="Search Here." />
          <div className="d-flex gap-3">
            <Link to="">
              <button className="btn btn-primary">
                <FaFilter />
              </button>
            </Link>
            <Link to="">
              <button className="btn btn-primary">Export</button>
            </Link>
          </div>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th rowSpan={2}>Sr.NO</th>
                <th rowSpan={2}>Date of Receipt</th>
                <th rowSpan={2}>Receipt Memo No.</th>
                <th rowSpan={2}>CSC Engraved ID</th>
                <th rowSpan={2}>Physical Condition</th>
                <th rowSpan={2}>Passanger Name</th>
                <th rowSpan={2}>Contact No if any</th>

                <th colSpan={2}>Date of Detail</th>

                <th rowSpan={2}>Type of Card</th>

                <th rowSpan={2}>Refundable Security</th>
                <th rowSpan={2}>Balance</th>
                <th rowSpan={2}>Total Refundable amount</th>
                <th rowSpan={2}>Refund Memo No.</th>
                <th rowSpan={2}>Refunded on date</th>
                <th rowSpan={2}>Amount Refunded</th>
                <th rowSpan={2}>
                  All entries found correct signature of SC/SM
                </th>
                <th style={{ width: "150px" }}></th>
              </tr>
              <tr>
                <th rowSpan={1}>Sent to RCC</th>
                <th rowSpan={1}>Recieved from RCC</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.receiptno}</td>
                  <td>{item.cscid}</td>

                  <td>{item.phycondition}</td>
                  <td>{item.passangername}</td>
                  <td>{item.contactno}</td>
                  <td>{item.senttorcc}</td>
                  <td>{item.recfromrcc}</td>
                  <td>{item.tyoeofcard}</td>
                  <td>{item.refund}</td>
                  <td>{item.bal}</td>
                  <td>{item.totalrefund}</td>
                  <td>{item.refundno}</td>
                  <td>{item.refundondate}</td>
                  <td>{item.amrefund}</td>
                  <td>{item.sigofscsm}</td>
                  <td className=" ">
                    <button className="btn btn-danger">Edit</button>
                    <button className="btn btn-primary">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default CardRefundList;
