import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { fetchData, budgetheadList, subheadList } from "../../reducer/isha/EstimateLOAReducer";
import { editData, getData } from "../../reducer/store/BudgetRegisterPaymentReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams,useLocation } from "react-router-dom";

const EditBudgetPayment = () => {
  const [budgetHeads, setBudgetHeads] = useState([]);
  const [budgetSubheads, setBudgetSubheads] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [partyNames, setPartyNames] = useState([]);
  const [bdata, setBdata] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [selectedBudgetHead, setSelectedBudgetHead] = useState("");
  const [selectedBudgetSubhead, setSelectedBudgetSubhead] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPartyName, setSelectedPartyName] = useState("");
  const [selectedLoaNo, setSelectedLoaNo] = useState("");
  const [amountLoaIssued, setAmountLoaIssued] = useState(0);
  const [loaNo, setLoaNo] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [paymentAmt, setPaymentAmt] = useState("");
  const [usedamountAmt, setUsedamountAmt] = useState("");
  const [balance, setBalance] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [loaDate, setLoaDate] = useState("");
  const [slug, setSlug] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state; // Get the ID from the URL
  const Esti = useSelector((state) => state.estimateloa);
  const bpayment = useSelector((state) => state.budgetpayment);

  // Fetch all data and the specific record to edit
  useEffect(() => {
    dispatch(fetchData());
    // Fetch the specific budget payment record by ID
  }, [dispatch]);

  // Populate initial form data with the fetched record
  const itmm = bpayment.data.data;
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData[0];
  const basicInitialValues = {
      id: fd.id,
       budgetHead_id:fd.budgetHead_id,
      
      budgetSubhead: fd.budgetSubhead,
      department: fd.department,
      partyName: fd.partyName,
      amountLoaIssued:fd.amountLoaIssued,
      loa_no:fd.loa_no ,
      payment_loa_no:fd.payment_loa_no,
      voucher_no: fd.voucher_no,
      payment_amt: fd.payment_amt,
payment_date: fd.payment_date,
    };
    const [formValues, setFormValues] = useState(basicInitialValues);
  useEffect(() => {
    if (fd) {
      const data = fd;
      setSelectedBudgetHead(data.budgetHead || "");
      setSelectedBudgetSubhead(data.budgetSubhead || "");
      setSelectedDepartment(data.department || "");
      setSelectedPartyName(data.partyName || "");
      setSelectedLoaNo(data.loa_no || "");
      setAmountLoaIssued(data.amountLoaIssued || 0);
      setLoaNo(data.payment_loa_no || "");
      setVoucherNo(data.voucher_no || "");
      setPaymentAmt(data.payment_amt || "");
      setUsedamountAmt(data.usedamount || "");
      setBalance(
        parseInt(data.amountLoaIssued || 0) - parseInt(data.usedamount || 0)
      );
      setPaymentDate(data.payment_date || "");
      setLoaDate(data.date || "");
    }
  }, [fd]);

  // Populate budget heads
  useEffect(() => {
    if (Esti.data.data) {
      setItems(Esti.data.data);
      setSlug(Esti.lslug);
      setFilteredItems(Esti.data.data);
      const uniqueBudgetHeads = [
        ...new Set(Esti.data.data.map((item) => item.budgetHead)),
      ];
      setBudgetHeads(uniqueBudgetHeads);
    }
  }, [Esti]);

  // Validate payment amount
  useEffect(() => {
    const lamt = parseInt(amountLoaIssued);
    if (paymentAmt > lamt) {
      alert(`The Payment Amount cannot be greater than LOA Amount: ${lamt}`);
      setPaymentAmt(0);
    }
    if (paymentAmt > balance) {
      alert("Payment Amount cannot be greater than Balance Amount");
      setPaymentAmt(0);
    }
  }, [paymentAmt, amountLoaIssued, balance]);

  // Handle budget head change
  const bheadSubmit = (e) => {
    const bgid = e.target.value;
    const floa = items.filter((itm) => itm.budgetHead === bgid);
    setSelectedBudgetHead(floa[0]?.budgetHead || "");
    setBdata(floa);
  };

  // Populate budget subheads and departments based on selected budget head
  useEffect(() => {
    if (selectedBudgetHead) {
      const filteredData = items.filter(
        (item) => item.budgetHead === selectedBudgetHead
      );
      const uniqueBudgetSubheads = [
        ...new Set(filteredData.map((item) => item.budgetSubhead)),
      ].filter((subhead) => subhead);
      const uniqueDepartments = [
        ...new Set(filteredData.map((item) => item.department)),
      ].filter((dept) => dept);
      setBudgetSubheads(uniqueBudgetSubheads);
      setDepartments(uniqueDepartments);
    } else {
      setBudgetSubheads([]);
      setDepartments([]);
    }
    // Only reset if the subhead/department is no longer valid
    if (
      !budgetSubheads.includes(selectedBudgetSubhead) &&
      selectedBudgetSubhead
    ) {
      setSelectedBudgetSubhead("");
    }
    if (!departments.includes(selectedDepartment) && selectedDepartment) {
      setSelectedDepartment("");
    }
    setPartyNames([]);
    setSelectedPartyName("");
    setAmountLoaIssued("");
  }, [selectedBudgetHead, items]);

  // Populate party names based on selected budget subhead and department
  useEffect(() => {
    if (selectedBudgetSubhead && selectedDepartment) {
      const filteredData = items.filter(
        (item) =>
          item.budgetSubhead === selectedBudgetSubhead &&
          item.department === selectedDepartment
      );
      const uniquePartyNames = [
        ...new Set(filteredData.map((item) => item.partyName)),
      ];
      setPartyNames(uniquePartyNames);
    } else {
      setPartyNames([]);
    }
    if (!partyNames.includes(selectedPartyName) && selectedPartyName) {
      setSelectedPartyName("");
    }
    setAmountLoaIssued("");
  }, [selectedBudgetSubhead, selectedDepartment, items]);

  // Update amountLoaIssued and other fields based on selected party name
  useEffect(() => {
    if (selectedPartyName) {
      const selectedData = items.find(
        (item) => item.partyName === selectedPartyName
      );
      setAmountLoaIssued(selectedData?.amountLoaIssued || "");
      setLoaDate(selectedData?.date || "");
      setSelectedLoaNo(selectedData?.loa_no || "");
      setUsedamountAmt(selectedData?.usedamount || "");
      const bal =
        parseInt(selectedData?.amountLoaIssued || 0) -
        parseInt(selectedData?.usedamount || 0);
      setBalance(bal);
    } else {
      setAmountLoaIssued("");
      setLoaDate("");
      setSelectedLoaNo("");
      setUsedamountAmt("");
      setBalance("");
    }
  }, [selectedPartyName]);

  // Submit updated form data
  const handleSubmit = async () => {
    if (paymentAmt > balance) {
      alert("Payment Amount cannot be greater than Balance Amount");
      return;
    }
    const payload = {
      id, // Include ID to identify the record to update
      budgetHead_id: selectedBudgetHead,
      budgetHead: selectedBudgetHead,
      budgetSubhead: selectedBudgetSubhead,
      department: selectedDepartment,
      partyName: selectedPartyName,
      amountLoaIssued,
      loa_no: selectedLoaNo,
      payment_loa_no: loaNo,
      voucher_no: voucherNo,
      payment_amt: paymentAmt,
      payment_date: paymentDate,
    };

    try {
      await dispatch(editData(payload));
      navigate(`/list/${slug}`);
      alert("Form updated successfully!");
    } catch (error) {
      console.error("Error updating form:", error);
      alert("Error updating form. Please try again.");
    }
  };

  return (
    <Box padding={3}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Edit Budget Payment
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Budget Head"
              value={formValues.budgetHead_id}
              onChange={bheadSubmit}
              variant="outlined"
              size="small"
            >
              <MenuItem value="">Select Budget Head</MenuItem>
              {budgetHeads.map((head) => (
                <MenuItem key={head} value={head}>
                  {head}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Budget Subhead"
              value={formValues.budgetSubhead}
              onChange={(e) => setSelectedBudgetSubhead(e.target.value)}
              variant="outlined"
              size="small"
              disabled={!budgetSubheads.length}
            >
              <MenuItem value="">Select Budget Subhead</MenuItem>
              {budgetSubheads.map((subhead) => (
                <MenuItem key={subhead} value={subhead}>
                  {subhead}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Department"
              value={formValues.department}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              variant="outlined"
              size="small"
              disabled={!departments.length}
            >
              <MenuItem value="">Select Department</MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Party Name"
              value={formValues.partyName}
              onChange={(e) => setSelectedPartyName(e.target.value)}
              variant="outlined"
              size="small"
              disabled={!partyNames.length}
            >
              <MenuItem value="">Select Party Name</MenuItem>
              {partyNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount LOA Issued"
              value={formValues.amountLoaIssued}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="LOA No"
              value={formValues.loa_no}
              onChange={(e) => setLoaNo(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Payment Done"
              value={usedamountAmt}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Balance"
              value={balance}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Voucher No"
              value={formValues.voucher_no}
              onChange={(e) => setVoucherNo(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Payment Amount"
              value={formValues.payment_amt}
              onChange={(e) => setPaymentAmt(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Payment Date"
              type="date"
              value={formValues.payment_date}
              onChange={(e) => setPaymentDate(e.target.value)}
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Box textAlign="right" marginTop={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditBudgetPayment;