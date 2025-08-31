import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { editData,fetchData } from "../../reducer/redux/tableDataSlice";
import stationData from "../../station.json";
function getLastParameter() {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments[pathSegments.length - 1];
  }
const EditUpsMaintenanceForm = () => {
    const location = useLocation();
      const { id } = location.state;
      console.log("id : "+id)
  const { recordId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const mjl11List = useSelector((state) => state.data);
     const [slug, setSlug] = useState(getLastParameter().trim());
const [items, setItems] = useState([]);
    const [item, setItem] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    console.log(mjl11List)
    useEffect(() => {
      dispatch(fetchData({ formType: slug }));
    }, [dispatch]);
    const itmm = mjl11List.data.data;
    let filteredData;
    
    if (itmm) {
      filteredData = itmm.filter((itm) => {
        return itm.id === id;
      });
     console.log(filteredData)
     
    }

    
  
    useEffect(() => {
      if (mjl11List.data && mjl11List.data.data) {
        setItems(mjl11List.data.data);
        setFilteredItems(mjl11List.data.data);
      }
    }, [mjl11List]);

  const [formData, setFormData] = useState(filteredData[0] || {
    station: "",
    month: "",
    date: "",
    additionalData: {
      averageTemp: "",
      chargingCurrentAfterLoadTest: "",
      batteryTerminalsCleaned: "",
      looseConnectionChecked: "",
      cellLeakageChecked: "",
      loadDuringTestUPS1: { U: "", V: "", W: "" },
      loadDuringTestUPS2: { U: "", V: "", W: "" },
      batteryVoltageBeforeLoadTest: "",
      batteryVoltageAfterLoadTest: "",
      batteryChargePercentage: "",
    },
    rows: [
      {
        cellNo: Array.from({ length: 18 }, () => ""),
        onFloatVoltage: Array.from({ length: 18 }, () => ""),
        initialReadingOnLoad: Array.from({ length: 18 }, () => ""),
        after1Point5Hours: Array.from({ length: 18 }, () => ""),
      },
    ],
  });
  const handleNestedDataChange = (parent, key, value) => {
    setFormData({
      ...formData,
      additionalData: {
        ...formData.additionalData,
        [parent]: {
          ...formData.additionalData[parent],
          [key]: value,
        },
      },
    });
  };
  useEffect(() => {
    if (filteredData) {
      setFormData(filteredData[0]);
    }
  }, [filteredData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdditionalDataChange = (name, value) => {
    setFormData({
      ...formData,
      additionalData: { ...formData.additionalData, [name]: value },
    });
  };

  const handleRowChange = (rowIndex, field, colIndex, value) => {
    const updatedRows = [...formData.rows];
    updatedRows[rowIndex][field][colIndex] = value;
    setFormData({ ...formData, rows: updatedRows });
  };
console.log(formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editData({ id: recordId, values: formData }));
    navigate(`/list`);
  };

  return (
    <Container>
      <Typography variant="h4" className="mb-4 text-center">
        Edit UPS System Maintenance Record
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <select
              className="form-control"
              value={formData.station}
              onChange={(e) =>
                setFormData({ ...formData, station: e.target.value })
              }
              required
            >
              <option value="">Select Station</option>
              {stationData.map((station) => (
                <option
                  key={station["STATION Code"]}
                  value={station["Station Name"]}
                >
                  {station["Station Name"]}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Typography variant="h6" className="mt-4">
          Additional Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Average Temp"
              name="averageTemp"
              value={formData.additionalData.averageTemp}
              onChange={(e) =>
                handleAdditionalDataChange("averageTemp", e.target.value)
              }
              fullWidth
            />
          </Grid>

       <Grid item xs={6}>
                   <TextField
                     label="Charging Current After Load Test"
                     name="chargingCurrentAfterLoadTest"
                     value={formData.additionalData.chargingCurrentAfterLoadTest}
                     onChange={(e) =>
                       handleAdditionalDataChange(
                         "chargingCurrentAfterLoadTest",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
                 <Grid item xs={6}>
                   <TextField
                     label="Battery Terminals Cleaned"
                     name="batteryTerminalsCleaned"
                     value={formData.additionalData.batteryTerminalsCleaned}
                     onChange={(e) =>
                       handleAdditionalDataChange(
                         "batteryTerminalsCleaned",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
                 <Grid item xs={6}>
                   <TextField
                     label="Loose Connection Checked"
                     name="looseConnectionChecked"
                     value={formData.additionalData.looseConnectionChecked}
                     onChange={(e) =>
                       handleAdditionalDataChange(
                         "looseConnectionChecked",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
                 <Grid item xs={6}>
                   <TextField
                     label="Cell Leakage Checked"
                     name="cellLeakageChecked"
                     value={formData.additionalData.cellLeakageChecked}
                     onChange={(e) =>
                       handleAdditionalDataChange("cellLeakageChecked", e.target.value)
                     }
                     fullWidth
                   />
                 </Grid>
               </Grid>
       
               <Typography variant="h6" className="mt-4">
                 Load During Test UPS1
               </Typography>
               <Grid container spacing={3}>
                 <Grid item xs={4}>
                   <TextField
                     label="U"
                     name="U"
                     value={formData.additionalData.loadDuringTestUPS1.U}
                     onChange={(e) =>
                       handleNestedDataChange(
                         "loadDuringTestUPS1",
                         "U",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
                 <Grid item xs={4}>
                   <TextField
                     label="V"
                     name="V"
                     value={formData.additionalData.loadDuringTestUPS1.V}
                     onChange={(e) =>
                       handleNestedDataChange(
                         "loadDuringTestUPS1",
                         "V",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
                 <Grid item xs={4}>
                   <TextField
                     label="W"
                     name="W"
                     value={formData.additionalData.loadDuringTestUPS1.W}
                     onChange={(e) =>
                       handleNestedDataChange(
                         "loadDuringTestUPS1",
                         "W",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
               </Grid>
       
               <Typography variant="h6" className="mt-4">
                 Load During Test UPS2
               </Typography>
               <Grid container spacing={3}>
                 <Grid item xs={4}>
                   <TextField
                     label="U"
                     name="U"
                     value={formData.additionalData.loadDuringTestUPS2.U}
                     onChange={(e) =>
                       handleNestedDataChange(
                         "loadDuringTestUPS2",
                         "U",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
                 <Grid item xs={4}>
                   <TextField
                     label="V"
                     name="V"
                     value={formData.additionalData.loadDuringTestUPS2.V}
                     onChange={(e) =>
                       handleNestedDataChange(
                         "loadDuringTestUPS2",
                         "V",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
                 <Grid item xs={4}>
                   <TextField
                     label="W"
                     name="W"
                     value={formData.additionalData.loadDuringTestUPS2.W}
                     onChange={(e) =>
                       handleNestedDataChange(
                         "loadDuringTestUPS2",
                         "W",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
               </Grid>
       
               <Typography variant="h6" className="mt-4">
                 Battery Information
               </Typography>
               <Grid container spacing={3}>
                 <Grid item xs={6}>
                   <TextField
                     label="Battery Voltage Before Load Test"
                     name="batteryVoltageBeforeLoadTest"
                     value={formData.additionalData.batteryVoltageBeforeLoadTest}
                     onChange={(e) =>
                       handleAdditionalDataChange(
                         "batteryVoltageBeforeLoadTest",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
                 <Grid item xs={6}>
                   <TextField
                     label="Battery Voltage After Load Test"
                     name="batteryVoltageAfterLoadTest"
                     value={formData.additionalData.batteryVoltageAfterLoadTest}
                     onChange={(e) =>
                       handleAdditionalDataChange(
                         "batteryVoltageAfterLoadTest",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
                 <Grid item xs={6}>
                   <TextField
                     label="Battery Charge %"
                     name="batteryChargePercentage"
                     value={formData.additionalData.batteryChargePercentage}
                     onChange={(e) =>
                       handleAdditionalDataChange(
                         "batteryChargePercentage",
                         e.target.value
                       )
                     }
                     fullWidth
                   />
                 </Grid>
               </Grid>

        <Table className="table mt-4">
          <TableHead>
            <TableRow>
              <TableCell>Row Type</TableCell>
              {Array.from({ length: 18 }, (_, i) => (
                <TableCell key={i + 1}>Cell {i + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.rows.map((row, rowIndex) => (
                <>
              <TableRow key={`onFloatVoltage-${rowIndex}`}>
                <TableCell>ON FLOAT (VOLTAGE)</TableCell>
                {row.onFloatVoltage.map((value, colIndex) => (
                  <TableCell key={colIndex}>
                    <TextField
                      value={value}
                      onChange={(e) =>
                        handleRowChange(
                          rowIndex,
                          "onFloatVoltage",
                          colIndex,
                          e.target.value
                        )
                      }
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                ))}
              </TableRow>
            
            <TableRow key={`onFloatVoltage-${rowIndex}`}>
                <TableCell>INITIAL READING (ON LOAD)</TableCell>
                {row.initialReadingOnLoad.map((value, colIndex) => (
                  <TableCell key={colIndex}>
                    <TextField
                      value={value}
                      onChange={(e) =>
                        handleRowChange(
                          rowIndex,
                          "onFloatVoltage",
                          colIndex,
                          e.target.value
                        )
                      }
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow key={`onFloatVoltage-${rowIndex}`}>
                <TableCell>AFTER 1.5 HRS (ON LOAD)</TableCell>
                {row.after1Point5Hours.map((value, colIndex) => (
                  <TableCell key={colIndex}>
                    <TextField
                      value={value}
                      onChange={(e) =>
                        handleRowChange(
                          rowIndex,
                          "onFloatVoltage",
                          colIndex,
                          e.target.value
                        )
                      }
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                ))}
              </TableRow>
              </>
            )
            
            )}
          </TableBody>
        </Table>

        <Button type="submit" variant="contained" color="primary" className="mt-3">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default EditUpsMaintenanceForm;
