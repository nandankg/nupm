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
import {  fetchData,budgetheadList,subheadList  } from "../../reducer/isha/EstimateLOAReducer";
import { addData,getData } from "../../reducer/store/BudgetRegisterPaymentReducer";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NewbudgetPayment = () => {
  const [budgetHeads, setBudgetHeads] = useState([]);
  const [budgetSubheads, setBudgetSubheads] = useState([]);
  const [departments, setDepartments] = useState([]);
   
 const[bdata,setBdata]= useState([]);
  const navigate = useNavigate();
  const [partyNames, setPartyNames] = useState([]);
 
  const [selectedBudgetHead, setSelectedBudgetHead] = useState("");
const [budgetHead, setBudgetHead] = useState([]);
  const [subHead, setSubHead] = useState([]);
  const dispatch = useDispatch();
  const [selectedBudgetSubhead, setSelectedBudgetSubhead] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPartyName, setSelectedPartyName] = useState("");
   const [selectedLoaAmt, setSelectedLoaAmt] = useState("");
   console.log(selectedLoaAmt);
  const [selectedLoaNo, setSelectedLoaNo] = useState("");
  const [amountLoaIssued, setAmountLoaIssued] = useState(0);
  const [selectedData, setSelectedData] = useState([])
  console.log(selectedData);
  const [slug, setSlug] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loaDate, setLoaDate] = useState("");
  // Additional fields
  const [loaNo, setLoaNo] = useState("");
 console.log(loaNo)
  const [voucherNo, setVoucherNo] = useState("");
  const [paymentAmt, setPaymentAmt] = useState("");
  const [usedamountAmt, setUsedamountAmt] = useState("");
  const [balance, setBalance] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [loaLst,setLoaLst]=useState([]);
  const [loaData,setLoaData]=useState([]);
  console.log(loaLst)
  useEffect(() => {
    if (loaLst.length > 0) {
      setLoaNo(loaLst[0]?.payment_loa_no || "");
    }
  }, [loaLst]);

  const Esti = useSelector((state) => state.estimateloa);
  const bpayment = useSelector((state) => state.budgetpayment);
 
  // Populate budget heads
  useEffect(()=>{
    let lamt=0
    lamt=parseInt(amountLoaIssued)
if(paymentAmt>lamt){
  alert("The Payment Amount cannot be greater than LOA Amount : "+amountLoaIssued)
  setPaymentAmt(0);
}
  },[paymentAmt])
  useEffect(() => {
    const uniqueBudgetHeads = [
      ...new Set(items.map((item) => item.budgetHead)),
    ];
    setBudgetHeads(uniqueBudgetHeads);
  }, [items]);


  const bheadSubmit = (e)=>{
    const bgid=e.target.value;
    console.log(bgid)
    const floa = items.filter((itm) => {
      console.log(itm)
      return itm.budgetHead == bgid;
    });
    console.log(bgid)
console.log(floa)
setSelectedBudgetHead(floa[0].budgetHead)
    setBdata(floa);

  }

  console.log(selectedBudgetHead);

  console.log(Esti.data.data);
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
      dispatch(getData());
  
  }, [dispatch]);

  useEffect(() => {
    if (Esti.data.data) {
      setItems(Esti.data.data);
      setSlug(Esti.lslug);
      setFilteredItems(Esti.data.data);
      
      setBudgetHead(Esti?.budgethead);
      setSubHead(Esti?.subHead)
    }
  }, [Esti]);

  // Populate budget subheads and departments based on selected budget head
  useEffect(() => {
    if (selectedBudgetHead) {
      const filteredData = items.filter(
        (item) => item.budgetHead=== selectedBudgetHead
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
    setSelectedBudgetSubhead("");
    setSelectedDepartment("");
    setPartyNames([]);
    setSelectedPartyName("");
    setSelectedLoaAmt("");
    setAmountLoaIssued("");
  }, [selectedBudgetHead]);

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
    setSelectedPartyName("");
    setSelectedLoaAmt("");
    setAmountLoaIssued("");
  }, [selectedBudgetSubhead, selectedDepartment]);
// Populate party names based on selected budget subhead and department
  useEffect(() => {
  if (selectedBudgetSubhead && selectedDepartment && selectedPartyName) {
    const filteredData = items.filter(
      (item) =>
        item.budgetSubhead === selectedBudgetSubhead &&
        item.department === selectedDepartment &&
        item.partyName === selectedPartyName
    );

    const listLoaAmount = filteredData.map((item) => ({
      amountLoaIssued: item.amountLoaIssued,
      loa_no: item.loa_no,
    }));

    setLoaData(listLoaAmount);
  } else {
    setLoaData([]);
  }
}, [selectedDepartment, selectedPartyName, selectedBudgetSubhead, items]);
// Display amountLoaIssued based on selected party name
  useEffect(() => {
    if (selectedLoaAmt) {
      const selectedData = items.find(
        (item) => item.amountLoaIssued === selectedLoaAmt
      );
      setSelectedData(selectedData)
      console.log(selectedData);
      setAmountLoaIssued(selectedData?.amountLoaIssued || "");
      setLoaDate(selectedData?.date || "");
      setSelectedLoaNo(selectedData?.loa_no || "");
      setLoaLst(selectedData?.payment_loa_list || []);
	  setUsedamountAmt(selectedData?.usedamount || "");
    
	
	  const bal = parseInt(selectedData?.amountLoaIssued)-parseInt(selectedData?.usedamount);
	  setBalance(bal);
	  
    } else {
      setAmountLoaIssued("");
    }
  }, [selectedLoaAmt]);
  

  // Submit form data
  const handleSubmit = async () => {
	  if(paymentAmt>balance){
		   alert("Payment Amount cannot be greater than Balance Amount");
	  }
	  else{
    const payload = {
      budgetHead_id: selectedBudgetHead,
      budgetHead: selectedBudgetHead,
      budgetSubhead: selectedBudgetSubhead,
      department: selectedDepartment,
      partyName: selectedPartyName,
      amountLoaIssued,
      loa_no:selectedLoaNo ,
      payment_loa_no:loaNo,
      voucher_no: voucherNo,
      payment_amt: paymentAmt,
      payment_date: paymentDate,
    };

    try {
      dispatch(addData(payload));
      console.log(payload)
      navigate(`/list/${slug}`);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
	  }
  };

  return (
    <Box padding={3}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Budget Payment 
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Budget Head"
              value={selectedBudgetHead}
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
              value={selectedBudgetSubhead}
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
              value={selectedDepartment}
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
              value={selectedPartyName}
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
              select
              fullWidth
              label="Amount LOA Issued"
              value={selectedLoaAmt}
              onChange={(e) => setSelectedLoaAmt(e.target.value)}
              variant="outlined"
              size="small"
              disabled={!loaData.length}
            >
              <MenuItem value="">Select LOA Amount</MenuItem>
              {loaData.map((item, index) => (
                <MenuItem key={index} value={item.amountLoaIssued || ""}>
                  {item.amountLoaIssued}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Additional Input Fields */}
     <Grid item xs={12} sm={6}> 
     
 <TextField
        fullWidth
        label="LOA No"
        value={loaNo}
        onChange={(e) => setLoaNo(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          readOnly: loaLst.length > 0,
        }}
      />

</Grid>
      <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pyment Done"
              value={usedamountAmt}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Additional Input Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Balance"
              value={balance}
              onChange={(e) => setLoaNo(e.target.value)}
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
              value={voucherNo}
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
              value={paymentAmt}
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
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Box textAlign="right" marginTop={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewbudgetPayment;
