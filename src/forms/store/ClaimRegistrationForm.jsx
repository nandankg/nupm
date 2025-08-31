import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchData,
  addData
} from "../../reducer/redux/tableDataSlice";
import { Form, Button, Row, Col } from "react-bootstrap";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const ClaimRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const [formData, setFormData] = useState({
    claims: Array(10).fill({ // Initialize with 10 empty claim objects
      station: '',
      dateAndTime: '',
      claimantName: '',
      articleDescription: '',
      articleLostPlace: '',
      contactNo: '',
      residentialAddress: '',
      scEmp: '',
      scName: '',
      foundRecordSNo: '',
      declarationForm: '',
      remarks: '',
    }),
  });

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedClaims = [...formData.claims];
    updatedClaims[index][name] = value;
    setFormData({ ...formData, claims: updatedClaims });
  };

 const handleSubmit = (e) => {
        e.preventDefault();
       dispatch(addData({formType:slug,values:formData}));
           console.log("Form Data Submitted:", formData);
         navigate(`/list/${slug}`);
      };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Station</th>
            <th>Date & Time</th>
            <th>Name of Claimant</th>
            <th>Description of article</th>
            <th>Place Article Lost</th>
            <th>Contact No.</th>
            <th>Residential Address</th>
            <th>SC Emp</th>
            <th>SC Name</th>
            <th>If found the S. No of</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {formData.claims.map((claim, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <select
                  name="station"
                  value={claim.station}
                  onChange={(event) => handleChange(index, event)}
                >
                  <option value="">Select Station</option>
                  {/* Add your station options here */}
                  <option value="station1">Station 1</option>
                  <option value="station2">Station 2</option>
                  {/* ... more stations */}
                </select>
              </td>
              <td>
                <input
                  type="datetime-local"
                  name="dateAndTime"
                  value={claim.dateAndTime}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="claimantName"
                  value={claim.claimantName}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="articleDescription"
                  value={claim.articleDescription}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="articleLostPlace"
                  value={claim.articleLostPlace}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="contactNo"
                  value={claim.contactNo}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="residentialAddress"
                  value={claim.residentialAddress}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="scEmp"
                  value={claim.scEmp}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="scName"
                  value={claim.scName}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="foundRecordSNo"
                  value={claim.foundRecordSNo}
                  onChange={(event) => handleChange(index, event)}
                />
                <input
                  type="text"
                  name="declarationForm"
                  value={claim.declarationForm}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="remarks"
                  value={claim.remarks}
                  onChange={(event) => handleChange(index, event)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ClaimRegistrationForm;