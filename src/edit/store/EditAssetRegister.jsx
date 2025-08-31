import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";

import {
  SelectInput,
  TextInput,
  TextArea,
} from "../../component/formComponents";
import { initializeFormValues } from "../../utils/formUtils";
import {
  
  editData,
  saveData,
} from "../../reducer/store/AssetregistersignalReducer";
import { fetchData } from "../../reducer/redux/tableDataSlice";
import station from "../../data/station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const user = JSON.parse(localStorage.getItem("userdata"));
const EditAssetRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  //const assetreg = useSelector((state) => state.assetregister);
   const assetreg = useSelector((state) => state.data);
   console.log(assetreg.data.data)
  const [formValues, setFormValues] = useState({});
  const { toPDF, targetRef } = usePDF({ filename: "Asset Register.pdf" });
 const [slug, setSlug] = useState(getLastParameter().trim());
  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);

  // Initialize form values when data is loaded
  useEffect(() => {
    if (assetreg?.data?.data) {
      const filteredData = assetreg.data.data.find((item) => item.id === id);
      if (filteredData) {
        setFormValues(initializeFormValues(filteredData));
      }
    }
  }, [assetreg, id]);
console.log(formValues)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${assetreg.slug}`);
  };

  const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <div className="container">
      <div role="presentation" className="breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Asset Register</Link>
          <Link to="/">Register</Link>
        </Breadcrumbs>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 form-container" ref={targetRef}>
          <button className="btn btn-primary mb-3" onClick={() => toPDF()}>
            <MdPictureAsPdf size="25px" color="#fff" /> Export to PDF
          </button>
          <form onSubmit={handleSubmit}>
            <div className="row">
            <TextInput
                label="Station"
                id="stationName"
                name="stationName"
                type="text"
                value={formValues.stationName}
                onChange={handleChange}
              />
                <TextInput
                label="system "
                id="system"
                name="system"
                type="text"
                value={formValues.system }
                onChange={handleChange}
              />
               <TextInput
                label="gearID"
                id="gearID"
                name="gearID"
                type="text"
                value={formValues.gearID  }
                onChange={handleChange}
              />
            </div>
            <div className="row">
             
              <TextInput
                label="Date of Installation"
                id="dateOfInstallation"
                name="dateOfInstallation"
                type="date"
                value={formValues.dateOfInstallation}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <TextInput
                label="Description of Material"
                id="descriptionOfMaterial"
                name="descriptionOfMaterial"
                value={formValues.descriptionOfMaterial}
                onChange={handleChange}
              />
              <TextInput
                label="Make/Model/Part No."
                id="makeModelPartNo"
                name="makeModelPartNo"
                value={formValues.makeModelPartNo}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <TextInput
                label="Serial No."
                id="serialNo"
                name="serialNo"
                value={formValues.serialNo}
                onChange={handleChange}
              />
              <TextInput
                label="Quantity"
                id="quantity"
                name="quantity"
                type="number"
                value={formValues.quantity}
                onChange={handleChange}
              />
            </div>

            <TextInput
              label="Location"
              id="location"
              name="location"
              value={formValues.location}
              onChange={handleChange}
            />
            <TextArea
              label="Remarks"
              id="remarks"
              name="remarks"
              value={formValues.remarks}
              onChange={handleChange}
            />
            
                <button type="submit" className="btn btn-primary me-4">
                  Save
                </button>
                
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAssetRegister;
