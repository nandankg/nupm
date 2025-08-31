import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Grid } from "@mui/material";
import stations from "../../data/station.json";
import {
  fetchData,
  editData,
  addData,
} from "../../reducer/store/StationEarningReducer";
import { dtrissue } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const StationEarningEdit = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const stationearning = useSelector((state) => state.stationearning);
  const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    const dispatch = useDispatch();
    
  
    const [items, setItems] = useState([]);
   
    const itmm = stationearning.data.data;
  
    useEffect(() => {
      dispatch(fetchData());
      setItems(stationearning.data.data);
    }, []);
    useEffect(() => {
      setItems(stationearning.data.data);
      setSlug(stationearning.slug);
    }, [stationearning]);
    let filteredData;
    if (itmm) {
      filteredData = itmm.filter((itm) => {
        return itm.id === id;
      });
    }
    const fd = filteredData[0];
//   console.log(formData);
  const [formData, setFormData] = useState({
    update_id: id,
      date: fd.date,
      stationName: fd.stationName,
      cashFareBox: fd.cashFareBox,
      souvenirSale: fd.souvenirSale,
      birthdayBooking: fd.birthdayBooking,
      penalty: fd.penalty,
      lostAndFound: fd.lostAndFound,
      other: fd.other,
      scratchCard: fd.scratchCard,
      upiQrTicket: fd.upiQrTicket,
      posBankCard: fd.posBankCard,
      email: fd.email,
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(editData(formData));
      navigate(`/list/${slug}`);
    };


  return (
    <Container className="mt-4">
    <h2 className="text-center">Station Earning</h2>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {Object.keys(formData).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            {key==="stationName"?(<select
                  id="station"
                  name="station_name"
                  value={formData.stationName}
                  className="form-control"
                  onChange={(e) =>
                    setFormData({ ...formData, stationName: e.target.value })
                  }
                >
                  <option value="">Select Station</option>
                  {stations.map(
                    (station, index) =>
                      station["Station Name"] && (
                        <option key={index} value={station["STATION Code"]}>
                          {station["Station Name"]}
                        </option>
                      )
                  )}
                </select>):(
            <TextField
              fullWidth
              label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              variant="outlined"
              name={key}
              type={key === "date" ? "date" : key === "email" ? "email" : "text"}
              value={formData[key]}
              onChange={handleChange}
              InputLabelProps={key === "date" ? { shrink: true } : {}}
            />
          )}
          </Grid>
        ))}
        <Grid item xs={12} className="text-center">
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>
    </form>
  </Container>

  );
};
export default StationEarningEdit;
