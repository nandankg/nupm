import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import station from "../../data/station.json";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { dtrissue } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditEquipmentFailureOcc = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formValues, setFormValues] = useState({});

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);
  const Department =["Rolling Stock",
    "Signalling",
    "Telecom",
    "AFC",
    "Civil",
    "Track",
    "Traction-PSI",
    "Traction-OHE",
    "E&M",
    "Operations",
    "Security",
    "Rolling Stock/Signalling",
    "Rolling Stock/Track",
    "Telecom/Signalling",
    "E&M/Civil",
    "Rolling Stock/Operations",
    "Rolling Stock/Traction-OHE",
    "Traction-Telecom",
    "Traction- SCADA",
    "Rolling Stock/Signalling/Operations",
    "Telecom-SCADA",
    "Signalling/Traction-SCADA",
    "Rolling Stock/Telecom",
    "E&M / Telecom",
    "Civil / Telecom",
    "Signalling/P-Way",
    "Others"
    ]
    const filure =[
        "A1",
"A2",
"A3",
"A4",
"A5",
"B1",
"B2",
"B3",
"B4",
"B5",
"B6",
"C1",
"C2",
"C3",
"C4",
"C5",
"D1",
"D2",
"D3",
"D4",
"D5",
"D6",
"D7",
"D8",
"E",
"F1",
"F2",
"F3",
"F4",
"G",
"H1",
"H1",
"H1",
"H2",
"H3",
"H4",
"H5",
"H6",
"H7",
"H8",
"H9",
"I1",
"I2",
"I3",
"I4",
"I5",
"I6",
"I7",
"J1",
"J2",
"J3",
"K1",
"K1",
"K2",
"K3",
"K4",
"K5",
"K6",
"K7",
"K8",
"K9",
"L1",
"L2",
"L3",
"L4",
    ]
const equipment=[
"AFC Entry Gate",
"AFC Exit Gate",
"AFC Wide Gate",
"ATP On Board",
"ATS",
"AVM",
"Borewell Automation",
"Brakes",
"Cab Door",
"CCTV",
"CCTV Monitor",
"CVS",
"DDU",
"DFMD",
"Door",
"Escalator",
"FACP",
"Fire Alarm",
"Fire Extinguisher",
"Flush",
"Gate-Shutter",
"Glass",
"Hand Faucet",
"Help Phone",
"Key Board",
"Lift",
"Lighting",
"PACIS",
"Partition Door",
"PAS",
"PIDS",
"Platform Monitor",
"POS",
"Power Socket",
"Railing",
"RCTM",
"RMS",
"Saloon Door",
"Server",
"Sieve",
"Signage",
"Soap Dispensor",
"Station Computer",
"TDM",
"TETRA",
"Tiles",
"TOCP",
"TOM",
"Traction Motor",
"TVM",
"Urinal",
"Washbasin",
"Water Pump",
"Wire",
"X-ray Machine",
"TCMS",
"Track",
"Train-Interior",
"PSB",
"AFC Bi-directional Gate",
"Swing Gate",
"Air-conditioner",
"Train-External Camera",
"Axle Counter",
"Train Door",
"Free Space Recorder",
"Digital Phone",
"VOIP",
"False Ceiling",
"Electrical Switch",
"Train Underframe",
"Fire Hydrant",
"Door Lock",
"Station Auxiliary Supply(E&M)",
"Structure Damage",
"Train Exterior",
"Train Smoke Detector",
"Fire Pump",
"Door Access Control",
"WiFi",
"Electrical Socket",
"RCW",
"HVAC",
"Water Dispenser",
"Borewell Pump",
"Train Door/ATP",
"CCTV HMI",
"RCP",
"PEI",
"Telephone",
"Train Radio",
"Stone",
"Smoke Detector",
"Washroom",
"Fan",
"Video wall",
"Floor",
"MCP",
"Pump Automation",
"IOS",
"Pantograph",
"Circuit Breaker",
"Bogie",
"Repeater Panel",
"Train Headlight",
"Water Tap",
"Urinal Sensor",
"Train Internal Camera",
"Station Clock",
"AGTU",
"Horn",
"WFL",
"TBC",
"TO Seat",
"Train Wiper",
"DMI",
"Mode Selector",
"Fixed Signal",
"LATS",
"Train DSD",
"Detrainment Door",
"Train Pneumatic",
"Water Tank",
"Bulb",
"Chair",
"EFO",
"Autowash Plant",
"DRM",
"DSD Buzzer",
"Transformer",
"VCB",
"HHMD",
"Hand Dryer",
"Power Supply",
"Counter Communication System",
"UPS(PC)",
"Train WSP",
"Station Auxillary Supply (PSI)",
"Tripping",
"Others-Rolling Stock",
"Others-Civil",
"Others-E&M",
"Others-Telecom",
"Others-AFC",
"Others-Track",
"Others-Singalling",
"Others-OHE",
"Others-PSI",
"Station HVAC",
"Others-IT",
"Water Leakage",
"Train External Camera",
"OHE",
"Digital Clock",
"Deadman Buzzer",
"Point",
"Station PC",
"DG Set",
"Conduit Pipe",
"PIDS  Monitor",
"Anemometer",
"Domestic Pump",
"Domestic Pump Automation",
"IXL",
"ACP",
"Train Number Indicator",
"Others-PR",
"Granite Stone",
"Analog Clock",
"PEB Structure",
"Others",
"Signal",
"Door Magnet",
"All AFC gates",
"S/S Supply",
"Water Logging",
"Station Radio",
"PTZ",
"Earthing Strip",
"Cab Partition Door",
"Extension Board",
"Bridging Mechanism",
"Jockey pump",
"Water supply",
"Jet Spray",
"SCADA",
"ATO",
"Platform Mirror",
"TVF SYSTEM",
"TVS",
"ECS",
"Water Closet",
"Water seepage",
"AHU",
"Potential Transformer",
"Train coupler",
"DCS",
"Door Handle",
"Booster Transformer",
"SMIO",
"Gas Flooding System",
"Baffle Ceiling",
"Lock",
"Tensile roof",
"Sticker",
"Poster",
"Lock key",
"Sump Pump",
"Water dripping",
"Lift Intercom",
"UPS",
"PRINTER",
"PC",
"PCE",
"BM",
"PT Fuse",
"Station Cab",
"TO Cab",
"Emergency Vehicle-OCC",

]
const trainsetno=[
"1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"
]
  // Initialize form values when data is loaded
  useEffect(() => {
    if (loanregister?.data?.data) {
      const filteredData = loanregister.data.data.find(
        (item) => item.id === id
      );
      if (filteredData) {
        setFormValues(filteredData);
      }
    }
  }, [loanregister, id]);
  console.log(formValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(formValues)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues)
    dispatch(editData({ formType: slug, values: formValues }));
    navigate(`/list/${slug}`);
  };

    const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded">
    <Row className="mb-3">
        <Col md={4}>
            <Form.Group>
                <Form.Label>Punctuality Classification</Form.Label>
                <Form.Select name="punctualityClassification" value={formValues.punctualityClassification}  onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="More than 5 minutes">More than 5 minutes </option>
                    <option value="1-4 Minutes">1-4 Minutes</option>
                    <option value="Other">Other</option>
                </Form.Select>
            </Form.Group>
        </Col>
        <Col md={4}>
            <Form.Group>
                <Form.Label>Station/Section</Form.Label>
                <Form.Select name="stationSection" value={formValues.stationSection} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="">Select a Station</option>
          {station.map((stn, index) => (
            <option key={index} value={stn["Station Name"]}>
              {stn["Station Name"]}
            </option>
          ))}
                </Form.Select>
            </Form.Group>
        </Col>
        <Col md={4}>
            <Form.Group>
                <Form.Label>Line</Form.Label>
                <Form.Select name="line" value={formValues.line} onChange={handleChange} >
                    <option value="">Select</option>
                    <option value="UP">UP</option>
                    <option value="DOWN">DOWN</option>
                    <option value="Both">Both</option>
                    <option value="UP Siding">UP Siding</option>
                    <option value="UP Siding">DOWN Siding</option>
                </Form.Select>
            </Form.Group>
        </Col>
    </Row>
    <Row className="mb-3">
        <Col md={4}>
            <Form.Group>
                <Form.Label>Floor Level</Form.Label>
                <Form.Select name="floorLevel" value={formValues.floorLevel} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Ground">Ground</option>
                    <option value="Concourse">Concourse</option>
                    <option value="Platform">Platform</option>
                    <option value="Track">Track</option>
                </Form.Select>
            </Form.Group>
        </Col>
        <Col md={4}>
            <Form.Group>
                <Form.Label>Department</Form.Label>
                <Form.Select name="department" value={formValues.department} onChange={handleChange} required>
                    <option value="">Select</option>
                    
          {Department.map((stn, index) => (
            <option key={index} value={stn}>
              {stn}
            </option>
          ))}
                </Form.Select>
            </Form.Group>
        </Col>
        <Col md={4}>
            <Form.Group>
                <Form.Label>AFC/TELE FAILURE ID</Form.Label>
                <Form.Control type="text" name="failureId" value={formValues.failureId} onChange={handleChange} required />
            </Form.Group>
        </Col>
    </Row>
    
    <Row className="mb-3">
        <Col md={4}>
            <Form.Group>
                <Form.Label>Equipment Failed</Form.Label>
                <Form.Select name="equipmentFailed" value={formValues.equipmentFailed} onChange={handleChange} required>
                    <option value="">Select</option>
                            
          {equipment.map((stn, index) => (
            <option key={index} value={stn}>
              {stn}
            </option>
            ))}
                </Form.Select>
            </Form.Group>
        </Col>
        <Col md={4}>
            <Form.Group>
                <Form.Label>Failure Category</Form.Label>
                <Form.Select name="failureCategory"  value={formValues.failureCategory} onChange={handleChange} required>
                    <option value="">Select</option>
                            
          {filure.map((stn, index) => (
            <option key={index} value={stn}>
              {stn}
            </option>
            ))}
                </Form.Select>
            </Form.Group>

        </Col>
        <Col md={4}>
            <Form.Group>
                <Form.Label>Equipment Number</Form.Label>
                <Form.Control type="text" name="equipmentNumber" value={formValues.equipmentNumber} onChange={handleChange} required />
            </Form.Group>
        </Col>
    </Row>
    <Row className="mb-3">
    <Col md={3} className="d-flex align-items-center">
            <Form.Group>
                <Form.Check 
                    type="checkbox"
                    label="Stopped Working"
                    name="stoppedWorking"
                    onChange={handleChange}
                />
            </Form.Group>
        </Col>
        <Col md={4}>
            <Form.Group>
                <Form.Label>Train Set Number</Form.Label>
                <Form.Select name="trainSetNumber" value={formValues.trainSetNumber} onChange={handleChange} required>
                    <option value="">Select</option>
                            
          {trainsetno.map((stn, index) => (
            <option key={index} value={stn}>
              {stn}
            </option>
            ))}
                </Form.Select>
            </Form.Group>
        </Col>
        <Col md={5} >
            
            <Form.Group>
                <Form.Label>Relogged on Department</Form.Label>
                <Form.Select name="reloggedDepartment" value={formValues.reloggedDepartment} onChange={handleChange} required>
                    <option value="">Select</option>
                            
          {Department.map((stn, index) => (
            <option key={index} value={stn}>
              {stn}
            </option>
            ))}
                </Form.Select>
            </Form.Group>
        </Col>
    </Row>
    <Row className="mb-3">
        <Col md={4}>
            <Form.Group>
                <Form.Label>Date/Time of Failure</Form.Label>
                <Form.Control type="datetime-local" value={formValues.dateTimeFailure} name="dateTimeFailure" onChange={handleChange} required />
            </Form.Group>
        </Col>
        <Col md={4}>
            <Form.Group>
                <Form.Label>Date/Time of Rectification</Form.Label>
                <Form.Control type="datetime-local" value={formValues.dateTimeRectification} name="dateTimeRectification" onChange={handleChange}  />
            </Form.Group>
        </Col>
        <Col md={4}>
            <Form.Group>
                <Form.Label>Delogging Date</Form.Label>
                <Form.Control type="datetime-local" value={formValues.deloggingDate} name="deloggingDate" onChange={handleChange} required />
            </Form.Group>
        </Col>
    </Row>
    <Row className="mb-3">
        <Col>
            <Form.Group>
                <Form.Label>Description of Failure</Form.Label>
                <Form.Control as="textarea" rows={3} value={formValues.description} name="description" onChange={handleChange} required />
            </Form.Group>
        </Col>
    </Row>
    <Row className="mb-3">
        <Col>
            <Form.Group>
                <Form.Label>Remarks</Form.Label>
                <Form.Control as="textarea" rows={3} name="remarks" value={formValues.remarks} onChange={handleChange} />
            </Form.Group>
        </Col>
    </Row>
    <Button variant="primary" type="submit">Submit</Button>
</Form>
);
};

export default EditEquipmentFailureOcc;
