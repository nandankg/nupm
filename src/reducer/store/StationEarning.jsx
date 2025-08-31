
import { fetchData,addData } from "./StationEarningReducer";
import React, { useState } from "react";
import stations from "../../data/station.json";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const StationEarning = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [formData, setFormData] = useState({
    date: "",
    stationName: "",
    cashFareBox: "",
    souvenirSale: "",
    birthdayBooking: "",
    penalty: "",
    lostAndFound: "",
    Shift: "",
    Project: "",
    upiQrTicket: "",
    posBankCard: "",
    equipment: "",
  });

  // Sample options for dropdowns (you can modify these as per your needs)
  const stationOptions = ["AGR Taj East Gate",
    "AGR Fatehabad",
    "AGR Shaheed Captain Shubham Gupta",
    "AGR Taj Mahal",
    "AGR Mankameshwar",
    "AGR Ambedkar Chowk",
    "KNP IIT Kanpur",
    "KNP Kalyanpur",
    "KNP SPM Hospital",
    "KNP Vishwavidyalya",
    "KNP Gurudev Chauraha",
    "KNP Geeta Nagar",
    "KNP Rawat Pur",
    "KNP LLR Hospital",
    "KNP Motijheel",
    "KNP Chunni Ganj",
    "KNP Naveen Market",
    "KNP Bada Chauraha",
    "KNP Naya Ganj",
    "KNP Kanpur Central",
    "LKO CCS Airport",
    "LKO Amausi",
    "LKO Transport Nagar",
    "LKO Krishna Nagar",
    "LKO Singar Nagar",
    "LKO Alambagh",
    "LKO Alambagh Bus Stand",
    "LKO Mawiya",
    "LKO Durgapuri",
    "LKO Charbagh",
    "LKO Husain Ganj",
    "LKO Sachivalya",
    "LKO Hazrat Ganj",
    "LKO KD Singh Stadium",
    "LKO Vishwavidyalya",
    "LKO IT College",
    "LKO Badshah Nagar",
    "LKO Lekhraj Market",
    "LKO Bhootnath",
    "LKO Indra Nagar",
    "LKO Munshipulya",
    ];
  const shiftOptions = ["1st",
    "2nd",
    "3rd",
    "NA"];
  const projectOptions = ["Lucknow",
    "Kanpur",
    "Agra"
    ];
  const equipmentOptions = ["TOM 1",
    "TOM 2",
    "TOM 3",
    "TOM 4",
    "TOM 5",
    "TVM 1",
    "TVM 2",
    "TVM 3",
    "TVM 4",
    "TVM 5",
    "TVM 6",
    "TVM 7",
    "TVM 8",
    "EFO"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    dispatch(addData(formData));
    navigate(`/list/${slug}`);
  };
  // console.log(formData)
  // Helper function to determine if a field should be a dropdown
  const isDropdownField = (key) => {
    return ['stationName', 'Shift', 'Project', 'equipment'].includes(key);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Station Earning</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              {isDropdownField(key) ? (
                <FormControl fullWidth variant="outlined">
                  <InputLabel>
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </InputLabel>
                  <Select
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  >
                    <MenuItem value="">
                      <em>Select an option</em>
                    </MenuItem>
                    {(key === 'stationName' ? stationOptions :
                      key === 'Shift' ? shiftOptions :
                      key === 'Project' ? projectOptions :
                      equipmentOptions).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
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

export default StationEarning;