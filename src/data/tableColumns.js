// tableStructures.js
export const listcolumns = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "station", headerName: "Station", isDate: false },
  { field: "user_id", headerName: "Employee ID", isDate: false },
  { field: "employee_name", headerName: "Emp Name", isDate: false },
];
export const listcolumn_one= [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "station", headerName: "Station", isDate: false },
  { field: "employee_id", headerName: "Employee ID", isDate: false },
  { field: "employee_name", headerName: "Emp Name", isDate: false },
];
export const listcolumn_two= [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "stn_name", headerName: "Station", isDate: false },
  { field: "employee_id", headerName: "Employee ID", isDate: false },
  { field: "employee_name", headerName: "Emp Name", isDate: false },
];
export const assetRegister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "station_name", headerName: "Station", isDate: false },
  { field: "system", headerName: "system", isDate: false },
  { field: "gearID", headerName: "gearID", isDate: false },
  {
    field: "Dateofinstallation",
    headerName: "Date of Installation",
    isDate: true,
  },
  { field: "DescriptionOfMaterial", headerName: "Description", isDate: false },
  { field: "make", headerName: "Make/Model/Part No.", isDate: false },
  { field: "serialno", headerName: "Serial No.", isDate: false },
  { field: "qty", headerName: "Quantity", isDate: false },
  { field: "location", headerName: "Location", isDate: false },
  { field: "remark", headerName: "Remarks", isDate: false },
  { field: "user_id", headerName: "Employee ID", isDate: false },
  { field: "employee_name", headerName: "Emp Name", isDate: false },
];
export const contractorWork = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "name", headerName: "Name", isDate: false },
  {
    field: "selected_department",
    headerName: "Department",
    isDate: true,
  },
  {
    field: "station",
    headerName: "Station",
    isDate: false,
  },
  { field: "organization", headerName: "Organization", isDate: false },
  { field: "designation", headerName: "Designation", isDate: false },
  { field: "entrytime", headerName: "Entry Time", isDate: false },
  { field: "detailsofwork", headerName: "Details of Work", isDate: false },
  { field: "possesPtw", headerName: "Posses PTW(Y/N)", isDate: false },
  { field: "finalstatus", headerName: "Final Status", isDate: false },
  { field: "exittime", headerName: "Exit Time", isDate: false },
  {
    field: "signaturecontractorstaff",
    headerName: "Name (Contractor Staff)",
    isDate: false,
  },

  {
    field: "signatureondutystaff",
    headerName: "EMP ID (On Duty Staff)",
    isDate: false,
  },
  { field: "remark", headerName: "Remarks", isDate: false },
];
export const assuranceRegister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  {
    field: "instructions_details",
    headerName: "Details Of Intruction/Assurance",
    isDate: false,
  },
  { field: "acknowledged_name", headerName: "Name", isDate: false },
  {
    field: "acknowledged_designation",
    headerName: "Designation",
    isDate: false,
  },
  { field: "acknowledged_emp_no", headerName: "Emp_no", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];
export const dtrIssue = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "material_desc", headerName: "Description of Material" },
  { field: "serial_no", headerName: "Serial no" },
  { field: "qty", headerName: "Qty" },
  
  { field: "challan_no", headerName: "Requisition Slip No/Handover Note No/FMTS No" },
  { field: "challan_date", headerName: "Requisition Slip No/Handover Note No Date/FMTS No Date" },
  { field: "issued_name", headerName: " To Whome Issed Name" },
  { field: "issued_designation", headerName: "To Whome Issed Desig" },
  { field: "user_id", headerName: "'Issuer ID" },
  { field: "for_whatWork", headerName: "What Work" },
  { field: "balance_qty", headerName: "Balance" },
  { field: "ledger_no", headerName: "Remark" },
];
export const dtrReceipt = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "material_desc", headerName: "Description of Material" },
  { field: "qty", headerName: "Qty" },
  { field: "ledger_no", headerName: "Ledger no./Page" },
  { field: "challan_no", headerName: "Challan NO" },
  { field: " challan_date", headerName: "Challan Date" },
  { field: " issued_name", headerName: "Name" },
  { field: " issued_designation", headerName: "Desig" },
  { field: " for_whatWork", headerName: "What Work" },
  { field: " location", headerName: "Location Allotted" },
];
export const loanRegister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "itemdes", headerName: "Item Description", isDate: false },
  { field: "make", headerName: "Make", isDate: false },
  { field: "model", headerName: "Model", isDate: false },
  { field: "serialNo", headerName: "Serial No.", isDate: false },
  {
    field: "returnable",
    headerName: "Returnable/Non Returnable",
    isDate: false,
  },
  { field: "sendto", headerName: "Send To", isDate: false },
  { field: "sendby", headerName: "Send By", isDate: false },
  { field: "receivedate", headerName: "Receiving Date", isDate: true },
  { field: "receiveby", headerName: "Received By", isDate: false },
  { field: "remarks", headerName: "Remark", isDate: false },
  { field: "user_id", headerName: "Employee ID", isDate: false },
];
export const terentryregister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "Name", headerName: "Name", isDate: false },
  { field: "EmpID", headerName: "	Emp.No./ID No.", isDate: false },
  {
    field: "DesignationDepartment",
    headerName: "	Designation/Department",
    isDate: false,
  },
   { field: "date", headerName: "	Entry Date", isDate: false },
  { field: "EntryTime", headerName: "	Entry Time", isDate: false },
  { field: "PurposeOfVisit", headerName: "Purpose of Visit", isDate: false },
  { field: "ExitTime", headerName: "Exit Time", isDate: false },
  { field: "VisitorsSign", headerName: "Visitor's Name", isDate: false },
  { field: "SignOnDuty", headerName: "Name on Duty", isDate: false },
  { field: "Remark", headerName: "	Remark", isDate: false },
];
export const axlecounterresetregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "time", headerName: "Time", isDate: false },
  { field: "ocounterno", headerName: "Opening Counter Number", isDate: false },
  { field: "ccounterno", headerName: "Closing Counter Number", isDate: false },
  { field: "axlecounterno", headerName: "Axle Counter Number", isDate: false },
  { field: "reason", headerName: "Reason", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
  { field: "user_id", headerName: "Emp ID", isDate: false },
];
export const grievanceregister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "Test_date", headerName: "Created At", isDate: true },
  { field: "noe", headerName: "	Emp Name", isDate: false },
  { field: "des", headerName: "	Emp Designation", isDate: false },
  

  { field: "gd", headerName: "Grievance Details", isDate: false },
  { field: "remark", headerName: "	Remark", isDate: false },
  { field: "io", headerName: "Inspecting Official Name", isDate: false },
  { field: "sign", headerName: "Inspecting offical  ID", isDate: false },
  
];
export const loanregister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "itemdes", headerName: "Item Description", isDate: false },
  { field: "quantity", headerName: "Quantity", isDate: false },
  { field: "signon", headerName: "Denomination", isDate: false },
  { field: "make", headerName: "Make", isDate: false },
  { field: "model", headerName: "Model", isDate: false },
  { field: "serialNo", headerName: "Serial No.", isDate: false },
  {
    field: "returnable",
    headerName: "Returnable/Non Returnable",
    isDate: false,
  },
  { field: "sendto", headerName: "Send To", isDate: false },
  { field: "sendby", headerName: "Send By", isDate: false },
  { field: "empname_send", headerName: "EMP Name", isDate: false },
  { field: "empid_send", headerName: "EMP ID", isDate: false },
  { field: "receivedate", headerName: "Receiving Date", isDate: true },
  { field: "receiveby", headerName: "Received By", isDate: false },
  { field: "receivefrom", headerName: "Received Form", isDate: false },
  { field: "empname_recieve", headerName: "EMP Name", isDate: false },
  { field: "empid_recieve", headerName: "EMP ID", isDate: false },
  { field: "remarks", headerName: "Remark", isDate: false },
];
export const contractualsparetestingregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "item_description", headerName: "Item Description", isDate: false },
  { field: "testing_detail", headerName: "Testing Details", isDate: false },
  { field: "item_serialName", headerName: "Item Serial No.", isDate: false },
  {
    field: "testingLocation",
    headerName: "Testing Location/Gear ID",
    isDate: false,
  },
  { field: "testedFrom", headerName: "TESTED TIME From", isDate: false },
  { field: "testedTo", headerName: "TESTED TIME To", isDate: false },
  { field: "dateFrom", headerName: "TESTED DATE From ", isDate: true },
  { field: "dateTo", headerName: "TESTED DATE To", isDate: true },
  { field: "FinalStatus", headerName: "Final Status", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];
export const detailsrelatedtofoundreceivedforeigncurrency = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  {
    field: "name_hoc",
    headerName: "Name Of Person Handing Currency",
    isDate: false,
  },
  { field: "package", headerName: "Package/p User", isDate: false },
  { field: "dstl", headerName: "Date Sent To TPNR LFO", isDate: true },
  { field: "currency_no", headerName: "Currency No", isDate: false },
  { field: "name_country", headerName: "Name Of Country", isDate: false },
  { field: "name_currency", headerName: "Name Of Currency", isDate: false },
  {
    field: "identification",
    headerName: "Any Other Identification/Uniqe Mark ",
    isDate: false,
  },
  { field: "remark", headerName: "Remark", isDate: true },
  {
    field: "receiving_name",
    headerName: "Name Of Receiving Person",
    isDate: false,
  },
];
export const dailytransactionregistermainline = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

 
  { field: "serial_no", headerName: "Serial No", isDate: false },
  {
    field: "material_desc",
    headerName: "Description Of Material",
    isDate: false,
  },
  { field: "qty", headerName: "Qty", isDate: false },
  
  { field: "challan_no", headerName: "Invoice/Challan No/Handover Note", isDate: false },
  { field: "challan_date", headerName: "Invoice/Challan No/Handover Note date", isDate: true },
  {
    field: "received_name",
    headerName: "From Whom Received Name",
    isDate: true,
  },
  {
    field: "received_designation",
    headerName: "From Whom Received Desig",
    isDate: false,
  },
  {
    field: "user_id",
    headerName: "Receiver ID",
    isDate: false,
  },
  {
    field: "balance_qty",
    headerName: "Balance",
    isDate: false,
  },
  { field: "for_whatWork", headerName: "For What Work", isDate: false },
  { field: "ledger_no", headerName: "Remark", isDate: false },
];
export const estimateandloabudgetregister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "budgetHead", headerName: "Budget Head", isDate: false },
  { field: "budgetSubhead", headerName: "Sub Head", isDate: false },
  { field: "department", headerName: "Department", isDate: false },

  { field: "WorkType", headerName: "Type Of Work", isDate: false },
  {
    field: "amountVetted",
    headerName: "Total Estimated Amount Vetted",
    isDate: false,
  },
  {
    field: "amountLoaIssued",
    headerName: " Amount For Which LOA Issued",
    isDate: false,
  },
  { field: "partyName", headerName: "  Party Name", isDate: false },
];
export const espdrillregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "station", headerName: "Station", isDate: false },
  { field: "pf_no", headerName: "PF No", isDate: false },
  { field: "operation_time", headerName: "TIME Operation", isDate: false },
  { field: "reset_time", headerName: "TIME Reset", isDate: false },
  { field: "observation", headerName: "Observation", isDate: false },
  { field: "employee_name", headerName: "Name of SC", isDate: false },
  { field: "Employ_id", headerName: "Emp.ID", isDate: false },
  { field: "remarks", headerName: "Remark", isDate: false },
  { field: "id", headerName: "Form ID", isDate: false },
];
export const dar = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "employee_name", headerName: "Name", isDate: false },
  { field: "Employ_id", headerName: "EMP.ID", isDate: false },
  { field: "designation", headerName: "Designation", isDate: false },
  { field: "posted", headerName: "Posted At", isDate: false },
  { field: "mno", headerName: "M.No.", isDate: false },
  { field: "sf", headerName: "SF", isDate: false },
  { field: "mm", headerName: "Minor/Major", isDate: false },
  {
    field: "dfooi",
    headerName: "Date For Order Of Penaliy Impose",
    isDate: true,
  },
  { field: "pi", headerName: "Penality Imposed", isDate: false },
  { field: "reason", headerName: "Reason", isDate: false },
  { field: "doa", headerName: "Date Of Appeal", isDate: true },
  { field: "remark", headerName: "Remark", isDate: false },
];
export const attendanceregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  {
    field: "attendance_Register",
    headerName: "Attendance Register",
    isDate: false,
  },
  { field: "month", headerName: "MONTH", isDate: false },
  { field: "employeeName", headerName: "	Name", isDate: false },
  { field: "employeeID", headerName: "EMP ID", isDate: false },
  { field: "attendance", headerName: "Attendence", isDate: false },
  { field: "remark", headerName: "Remarks", isDate: false },
];

export const occafcgatedrill = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "S.No.", isDate: true },

  { field: "station", headerName: "Station", isDate: false },
  { field: "nameofsc", headerName: "Name of SC", isDate: false },
  { field: "empid", headerName: "Employee ID", isDate: false },
  { field: "afcgateno", headerName: "AFC Gate No.", isDate: false },
  { field: "TypeofGate", headerName: "Type of Gate ", isDate: false },
  { field: "Incident", headerName: "Incident", isDate: false },
  { field: "Emergency", headerName: "Emergency", isDate: false },
  { field: "nameoftc", headerName: "Name of TC", isDate: false },
  { field: "empidoftc", headerName: "	Emp. Id of TC", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];

export const claimregistrationregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  
  { field: "station", headerName: "station", isDate: false },
  { field: "claimantName", headerName: "Name of Claimant", isDate: false },
  {
    field: "articleDescription",
    headerName: "Description of Article",
    isDate: false,
  },
  { field: "articleLostPlace", headerName: "Place Article Lost", isDate: false },
  
  { field: "contactNo", headerName: "Contact no.", isDate: false },
  { field: "residentialAddress", headerName: "Residential Address", isDate: false },
  { field: "scEmp", headerName: "SC Emp", isDate: false },
  { field: "scName", headerName: "SC Name", isDate: false },
  { field: "declarationForm", headerName: "S. No of Declaration Form", isDate: false },
  { field: "foundRecordSNo", headerName: "S. No of found record", isDate: false },
  { field: "remark", headerName: "Remarks", isDate: false },
];

export const competencyrecordregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "name", headerName: "NAME", isDate: false },
  { field: "empid", headerName: "EMP ID", isDate: false },
  { field: "designation", headerName: "DESIGNATION", isDate: false },
  { field: "competencytype", headerName: "COMPETENCY TYPE", isDate: false },
  {
    field: "competencyvalidfrom",
    headerName: "COMPENTENCY VALID FROM",
    isDate: false,
  },
  {
    field: "competencyduedate",
    headerName: "NEXT COMPETENCY DUE DATE",
    isDate: false,
  },
];

export const cardinitializationtendersdc = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "S.No.", isDate: true },
  { field: "sns", headerName: "Serial Number Card start ", isDate: false },
  { field: "sne", headerName: "Serial Number Card End", isDate: false },
  { field: "bn", headerName: "Box No.", isDate: false },
  { field: "dn", headerName: "Device No.", isDate: false },

  { field: "tq", headerName: "Total Qty.", isDate: false },
  { field: "nrc", headerName: "No. of Rejected Card ", isDate: false },
  { field: "nic", headerName: "No. of Initilised Card", isDate: false },
];

export const dailyworkdoneregister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "System", headerName: "System", isDate: false },
  { field: "range", headerName: "Frequency", isDate: false },
  {
    field: "MaintenanceActivity",
    headerName: "Maintenance Activity",
    isDate: false,
  },
  { field: "Supervisior", headerName: "Supervisor", isDate: false },
  { field: "GangMember", headerName: "Gang Members", isDate: false },
  { field: "OndutySign", headerName: "On Duty Name", isDate: false },
  { field: "Remarks", headerName: "Remarks", isDate: false },
];

export const equipmentfailureregisterrrr = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "S.No.", isDate: true },

  { field: "time", headerName: "Time", isDate: false },
  { field: "location", headerName: "Location", isDate: false },
  { field: "equipment_type", headerName: "Type", isDate: false },
  { field: "equipment_no", headerName: "No.", isDate: false },
  {
    field: "nature_details",
    headerName: "Nature & Details of failure",
    isDate: false,
  },
  { field: "reported_to", headerName: "Reported To", isDate: false },
  { field: "reported_time", headerName: "Reported Time", isDate: false },
  { field: "signSM", headerName: "Name of SM/SC", isDate: false },
  { field: "action_time", headerName: " Rectified Time", isDate: false },
  { field: "action_date", headerName: " Date", isDate: false },
  {
    field: "concern_remarks",
    headerName: "Remark of Concern Staff ",
    isDate: false,
  },
  {
    field: "signConStaff",
    headerName: "Name of Concern Staff ",
    isDate: false,
  },
  { field: "remarks", headerName: "Remark", isDate: false },
];

export const nightliftrescuedrill2register = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "S.No.", isDate: true },

  { field: "station", headerName: "Station", isDate: false },
  { field: "name_of_sc", headerName: "Name of SC", isDate: false },
  { field: "Employ_id", headerName: "Employee ID", isDate: false },
  { field: "mess_display_recorded", headerName: " Recorded", isDate: false },
  { field: "mess_display_created", headerName: " Created", isDate: false },
  { field: "mess_anounce_recorded", headerName: " Recorded", isDate: false },
  { field: "mess_anounce_manual", headerName: " Manual", isDate: false },
  { field: "pids_location", headerName: " Location", isDate: false },
  { field: "pids_status", headerName: " Status", isDate: false },
  { field: "pas_location", headerName: " Location", isDate: false },
  { field: "pas_status", headerName: " Status", isDate: false },
  { field: "remarks", headerName: "Remark", isDate: false },
];

export const linedefectt = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "S.No.", isDate: true },

  { field: "reportedTime", headerName: "Reported Time", isDate: false },
  {
    field: "nameOfTrainOperator",
    headerName: "Name of Train Operator",
    isDate: false,
  },
  { field: "empNo", headerName: "Emp No.", isDate: false },
  { field: "location", headerName: "Location", isDate: false },
  { field: "trainNo", headerName: "Train No.", isDate: false },
  { field: "trainSet", headerName: "Train Set", isDate: false },
  {
    field: "failureDescription",
    headerName: "Failure Description",
    isDate: false,
  },
  { field: "remarks", headerName: "Remarks", isDate: false },
  { field: "signOfCC", headerName: "Name of CC/CDI", isDate: false },
];

export const manualpointoperationdrill = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "S.No.", isDate: true },

  { field: "station", headerName: "Station", isDate: false },
  { field: "nameofsc", headerName: "Name of SC", isDate: false },
  { field: "empid", headerName: "Employee ID", isDate: false },
  { field: "pointno", headerName: "Point No.", isDate: false },
  { field: "from", headerName: "From", isDate: false },
  { field: "to", headerName: "To", isDate: false },
  { field: "totaltimtaken", headerName: "Total Time Taken", isDate: false },
  { field: "nameoftc", headerName: "Name of TC", isDate: false },
  { field: "empidoftc", headerName: "Emp. Id of TC", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];

export const pidspasdrill = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "S.No.", isDate: true },

  { field: "station", headerName: "Station", isDate: false },
  { field: "name_of_sc", headerName: "Name of SC", isDate: false },
  { field: "empid", headerName: "Employee ID", isDate: false },
  { field: "msg_disp_recoreded", headerName: "Recorded", isDate: false },
  { field: "msg_disp_created", headerName: "Created", isDate: false },
  { field: "msg_annc_recoreded", headerName: "Recorded", isDate: false },
  { field: "msg_annc_manual", headerName: "Manual", isDate: false },
  { field: "pids_location", headerName: "Location", isDate: false },
  { field: "pids_status", headerName: "Status", isDate: false },
  { field: "pas_location", headerName: "Location", isDate: false },
  { field: "pas_status", headerName: "Status", isDate: false },
  { field: "nameoftc", headerName: "Name of TC", isDate: false },
  { field: "empidoftc", headerName: "Emp. Id of TC", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];

export const pmfollowupmainline = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "station_name", headerName: "STATION", isDate: false },
  { field: "date", headerName: "PM DATE", isDate: true },

  
  {
    field: "failure_observed",
    headerName: "FAILURE OBSERVED DURING PM ",
    isDate: false,
  },
  {
    field: "rectification_date",
    headerName: "RECTIFICATION DATE ",
    isDate: false,
  },
  {
    field: "rectification_remarks",
    headerName: "RECTIFICATION/ REMARKS",
    isDate: false,
  },
  { field: "AttendedBy", headerName: "ATTENDED BY", isDate: false },
];
export const crewcontrolccap = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "deptt", headerName: "Department", isDate: false },
  { field: "purposeofreq", headerName: "Purpose of Request", isDate: false },
  { field: "time", headerName: "Time of Request", isDate: false },
  {
    field: "toprovided",
    headerName: "Weather TO was Provided or not",
    isDate: false,
  },
  {
    field: "reason",
    headerName: "Reason, if TO is not Provided",
    isDate: false,
  },
  { field: "nameofcc", headerName: "Name of CC", isDate: false },
  { field: "signofcc", headerName: "Sign of cC", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
  { field: "user_id", headerName: "Employee Id", isDate: false },
];

export const equipmentfailureregisterrr = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "time", headerName: "Time", isDate: false },
  { field: "location", headerName: "Location", isDate: false },
  { field: "equipment_type", headerName: "Equipment Type", isDate: false },
  { field: "equipment_no", headerName: "Equipment No.", isDate: false },
  {
    field: "nature_details",
    headerName: "Nature & Details of Failure",
    isDate: false,
  },
  { field: "reported_to", headerName: "Reported To", isDate: false },
  { field: "reported_time", headerName: "Reported Time", isDate: false },
  { field: "action_date", headerName: "Date", isDate: false },
  {
    field: "concern_remarks",
    headerName: "Remarks of Concern Staff",
    isDate: false,
  },
  {
    field: "concernEmploy_id",
    headerName: "Concern Employee Id",
    isDate: false,
  },
  { field: "remarks", headerName: "Remarks", isDate: false },
  { field: "user_id", headerName: "Employee Id", isDate: false },
  { field: "department", headerName: "Department", isDate: false },
  { field: "id", headerName: "Form ID", isDate: false },
];

export const facpdrillregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "station", headerName: "Station", isDate: false },
  { field: "mcp_no", headerName: "MCP No.", isDate: false },
  {
    field: "operated_location",
    headerName: "(OPERATED)  Location/Zone",
    isDate: false,
  },
  {
    field: "operated_alarm",
    headerName: "(OPERATED)  Alarm Yes/No",
    isDate: false,
  },
  { field: "from_time", headerName: "(TIME) From", isDate: false },
  { field: "to_time", headerName: "(TIME) To", isDate: false },
  { field: "name_of_sc", headerName: "Name of SC", isDate: false },
  { field: "user_id", headerName: "Emp. ID", isDate: false },
  { field: "department", headerName: "Department", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
  { field: "id", headerName: "Form ID", isDate: false },
];

export const latsvdu = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "station", headerName: "Station", isDate: false },
  { field: "name_of_sc", headerName: "Name of SC", isDate: false },
  { field: "Employ_id", headerName: "Emp. Id.", isDate: false },
  {
    field: "time_from",
    headerName: "TIME CONTROL TRANSFER: From",
    isDate: false,
  },
  { field: "time_to", headerName: "TIME CONTROL TRANSFER: To", isDate: false },
  { field: "result", headerName: "LATS/VDU Function/Result", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
  { field: "department", headerName: "Department", isDate: false },
  { field: "id", headerName: "Form ID", isDate: false },
];

export const serentryregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "Name", headerName: "Name", isDate: false },
  {
    field: "DesignationDepartment",
    headerName: "Desig./Department",
    isDate: false,
  },
  { field: "EntryTime", headerName: "Entry Time", isDate: false },
  { field: "PurposeOfVisit", headerName: "Purpose Of Visit", isDate: false },
  { field: "ExitTime", headerName: "Exit Time", isDate: false },
  { field: "VisitorsSign", headerName: "Visitor's Sign", isDate: false },
  { field: "Remark", headerName: "Remarks", isDate: false },
  { field: "employee_id", headerName: "Employee ID", isDate: false },
  { field: "department", headerName: "Department", isDate: false },
  { field: "id", headerName: "Form ID", isDate: false },
];

export const swupdateregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "version", headerName: "Software Version", isDate: false },
  { field: "date", headerName: "SW. Release Date", isDate: false },
  { field: "startdate", headerName: "Deployment Start Date", isDate: false },
  { field: "enddate", headerName: "Deployment End Date", isDate: false },
  { field: "refno", headerName: "Release Note File Ref. No.", isDate: false },
  { field: "safno", headerName: "PTW/SAF No.", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
  { field: "employee_id", headerName: "Employee ID", isDate: false },
];

export const teacoffee = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "item", headerName: "Item", isDate: false },
  { field: "quantity", headerName: "Quantity", isDate: false },
  { field: "datein", headerName: "Date In", isDate: false },
  { field: "quantity1", headerName: "Quantity", isDate: false },
  { field: "dateout", headerName: "Date Out", isDate: false },
  { field: "Employ_id", headerName: "Employee ID", isDate: false },
  { field: "department", headerName: "Department", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
  { field: "id", headerName: "Form ID", isDate: false },
];

export const trainidchange = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "train_set", headerName: "TRAIN Set", isDate: false },
  { field: "date", headerName: "date", isDate: false },
  { field: "time", headerName: "time", isDate: false },
  { field: "previousid", headerName: "PREVIOUS ASSOCIATED ID", isDate: false },
  { field: "newid", headerName: "NEW ASSOCIATED ID", isDate: false },
  { field: "purpose", headerName: "PURPOSE AND ACTION", isDate: false },
  { field: "name_of_tc", headerName: "NAME OF TC", isDate: false },
  { field: "id_of_tc", headerName: "ID OF TC", isDate: false },
  { field: "name_of_acc", headerName: "NAME OF APPROVING ACC", isDate: false },
  { field: "id_of_acc", headerName: "EMP. ID OF APPROVING ACC", isDate: false },
];
export const deadstock = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "date", headerName: "Date" },
  { field: "nameofitem", headerName: "Name of Item" },
  { field: "quantity", headerName: "Quantity" },
  { field: "units", headerName: "Unit" },
  { field: "unitrate", headerName: "Unit Rate in Rs." },
  { field: "amount", headerName: "Amount" },
  { field: "Purchaseorderno", headerName: "Purchase Order No." },
  { field: "remark", headerName: "Remark" },
];

export const hardwarefailure = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Date of Replacement", isDate: true },
  { field: "idescrip", headerName: "Item Description", isDate: false },
  { field: "system", headerName: "System", isDate: false },
  { field: "denomination", headerName: "Denomination", isDate: false },
  { field: "quantity", headerName: "Quantity", isDate: false },
  { field: "station", headerName: "Station", isDate: false },
  { field: "gearid", headerName: "Gear ID", isDate: false },
  { field: "old_sr_no", headerName: "Old Sr.No", isDate: false },
  { field: "new_sr_no", headerName: "New Sr.No", isDate: false },
  {
    field: "reason_of_replace",
    headerName: "Reason of Replacement",
    isDate: false,
  },
  { field: "date_of_sending", headerName: "Date of Sending", isDate: false },
  { field: "date_of_receiving", headerName: "Receiving Date", isDate: false },
  {
    field: "date_of_restoration",
    headerName: "Date of Restoration",
    isDate: false,
  },
  { field: "emp_name", headerName: "EMP Name", isDate: false },
  { field: "user_id", headerName: "EMP Id", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];

export const signalfailure = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "ftime", headerName: "Failure Time", isDate: false },
  { field: "system", headerName: "System", isDate: false },
  { field: "station", headerName: "Station", isDate: false },
  { field: "gearid", headerName: "Gear ID", isDate: false },
  { field: "fdescrip", headerName: "Failure Description", isDate: false },
  { field: "attended", headerName: "Attended (Date &time )", isDate: false },
  { field: "rectified", headerName: "Rectified (Created At)", isDate: false },
  { field: "duration", headerName: "Duration", isDate: false },
  {
    field: "observ",
    headerName: "Observation/Cause of failure",
    isDate: false,
  },
  { field: "detention", headerName: "Detention", isDate: false },
  { field: "action", headerName: "Action Taken", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];

export const permanentloanregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "Sr. No.", isDate: false },

  { field: "itemDescription", headerName: "Item Description", isDate: false },
  { field: "partNo", headerName: "Part No.", isDate: false },
  { field: "serialNo", headerName: "Serial No.", isDate: false },
  { field: "locationFrom", headerName: "Location From", isDate: false },
  { field: "locationTo", headerName: "Location To", isDate: false },
  { field: "qty", headerName: "Qty.", isDate: false },
  {
    field: "condition",
    headerName: "Defective/Serviceable/Repaired",
    isDate: false,
  },
  { field: "authRefNo", headerName: "Auth. Ref. No.", isDate: false },
  {
    field: "sign_handed",
    headerName: "Handed Over By - Signature",
    isDate: false,
  },
  { field: "name_handed", headerName: "Handed Over By - Name", isDate: false },
  {
    field: "designation_handed",
    headerName: "Handed Over By - Designation",
    isDate: false,
  },
  {
    field: "emp_id_handed",
    headerName: "Handed Over By - Emp ID",
    isDate: false,
  },
  { field: "date_handed", headerName: "Handed Over By - Date", isDate: true },
  {
    field: "sign_taken",
    headerName: "Taken Over By - Signature",
    isDate: false,
  },
  { field: "name_taken", headerName: "Taken Over By - Name", isDate: false },
  {
    field: "designation_taken",
    headerName: "Taken Over By - Designation",
    isDate: false,
  },
  { field: "empid_taken", headerName: "Taken Over By - Emp ID", isDate: false },
  { field: "date_taken", headerName: "Taken Over By - Date", isDate: true },
  { field: "forwarded_by", headerName: "Forwarded By (if any)", isDate: false },
  { field: "counter_sign", headerName: "Counter Name", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
];

export const stockmovementregistercards = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "S.No", isDate: false },
  { field: "Station_name", headerName: "Station", isDate: false },
  { field: "date", headerName: "Date", isDate: false },
  { field: "idofcscissued", headerName: "ID of CSC Issued", isDate: false },
  { field: "type", headerName: "Type (SV-2/SV-6)", isDate: false },
  { field: "soldtick", headerName: "Tick if Sold", isDate: false },
  { field: "freshtick", headerName: "Fresh (Tick Only)", isDate: false },
  {
    field: "defectivetick",
    headerName: "Defective (Tick Only)",
    isDate: false,
  },
  { field: "cscid", headerName: "CSC ID", isDate: false },
  { field: "afcamt", headerName: "AFC Amt", isDate: false },
  { field: "actual", headerName: "Actual", isDate: false },
  { field: "diff", headerName: "Diff (if any)", isDate: false },
  { field: "remark", headerName: "Remarks", isDate: false },
];

export const incidentaccident = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "Sr. No.", isDate: false },
  { field: "date_incident", headerName: "Date of Incident", isDate: false },
  { field: "incident", headerName: "Incident", isDate: false },
  { field: "time_incident", headerName: "Time of Incident", isDate: false },
  {
    field: "place_of_incident",
    headerName: "Place of Incident",
    isDate: false,
  },
  { field: "tdetails", headerName: "Train Details", isDate: false },
  { field: "name_of_scto", headerName: "Name of SCTO", isDate: false },
  { field: "empid_of_scto", headerName: "Emp Id of SCTO", isDate: false },
  { field: "reason", headerName: "Reason", isDate: false },
  { field: "brief", headerName: "Brief", isDate: false },
  { field: "repercussion", headerName: "Repercussion", isDate: false },
  {
    field: "responsible_depart",
    headerName: "Responsible Department",
    isDate: false,
  },
  { field: "sign_of_tc_acc", headerName: "Name of TC/ACC", isDate: false },
];

export const materialdistributiontotrainees = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "Item_name", headerName: "Item Name", isDate: false },
  { field: "Item_Type", headerName: "Item Type", isDate: false },
  { field: "Issued_To_Name", headerName: "Issued To Name", isDate: false },
  { field: "Issued_To_Emp_No", headerName: "Issued To Emp No", isDate: false },
  { field: "Designation", headerName: "Designation", isDate: false },
  { field: "Issued_By_Name", headerName: "Issued By Name", isDate: false },
  { field: "Issued_By_Emp_No", headerName: "Issued By Emp No", isDate: false },
  { field: "Batch", headerName: "Batch", isDate: false },

  { field: "Remarks", headerName: "Remark", isDate: false },
];

export const agentcardregisterssdc = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "name", headerName: "Name", isDate: false },
  { field: "designation", headerName: "Designation", isDate: false },
  { field: "empid", headerName: "Emp ID", isDate: false },
  { field: "date1", headerName: "Date", isDate: false },
  { field: "cardno", headerName: "Card No.", isDate: false },
  { field: "date2", headerName: "Date", isDate: false },
  { field: "remarks", headerName: "Remark", isDate: false },
];

export const fmtssdc = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "Sr.No.", isDate: false },
  { field: "book_foil_no", headerName: "Book Folio S.No.", isDate: false },
  { field: "station", headerName: "Station", isDate: false },
  { field: "eqpt_no", headerName: "Equipment No.", isDate: false },
  { field: "failure_date", headerName: "Failure Date/Time", isDate: false },
  { field: "item_name", headerName: "Item Name", isDate: false },
  { field: "item_sl_no", headerName: "Item S.No", isDate: false },
  {
    field: "detail_of_failure",
    headerName: "Details of Failure",
    isDate: false,
  },
  {
    field: "remarks_deficiency",
    headerName: "Remarks/Deficiency",
    isDate: false,
  },
  { field: "attended_by", headerName: "Attended by", isDate: false },
  { field: "received_name", headerName: "Received By", isDate: false },
  { field: "receivedBy_sign", headerName: "Sign (Received By)", isDate: false },
  {
    field: "received_company",
    headerName: "Company (Received By)",
    isDate: false,
  },
  { field: "receiving_date", headerName: "Receiving Date", isDate: false },
  { field: "ho_by", headerName: "H/O By", isDate: false },
  { field: "physical_status", headerName: "Physical Status", isDate: false },
  {
    field: "operational_status",
    headerName: "Operational Status",
    isDate: false,
  },
  { field: "details_of_fault", headerName: "Details of Fault", isDate: false },
  {
    field: "details_of_rectification",
    headerName: "Details of Rectification",
    isDate: false,
  },
  {
    field: "replacement_details",
    headerName: "Replacement Details",
    isDate: false,
  },
  { field: "is_newitem", headerName: "Is New Item", isDate: false },
  { field: "is_repaireditem", headerName: "Is Repaired", isDate: false },
  {
    field: "new_item_details",
    headerName: "New Item S.No./Repaired Item Detail",
    isDate: false,
  },
  { field: "additional_remarks", headerName: "Remarks", isDate: false },
  { field: "date_rectified", headerName: "Date Rectified", isDate: false },
  {
    field: "repairedBy_signature",
    headerName: "Signature (Repaired By)",
    isDate: false,
  },
  { field: "toBy_sign", headerName: "T/O By Sign", isDate: false },
  { field: "hoBy_sign", headerName: "H/O By Sign", isDate: false },
];

export const parameterregistersdc = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "date", headerName: "Parameter Date", isDate: true },
  { field: "parameterversion", headerName: "Parameter Version", isDate: false },
  { field: "validityform", headerName: "Validity From", isDate: false },
  {
    field: "parameterdescription",
    headerName: "Parameter Description",
    isDate: false,
  },
  { field: "deviceupdated", headerName: "Devices Updated", isDate: false },
  { field: "remarks", headerName: "Remark", isDate: false },
];

export const expenditurebudgetregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "Sr.No.", isDate: false },
  { field: "budgetHead", headerName: "Budget Head" },
  { field: "budgetSubhead", headerName: "Sub Head" },
  { field: "financialYear", headerName: "Financial Year" },
  { field: "budgetType", headerName: "Budget Type" },
  { field: "amount", headerName: "Amount" },
];

export const table2Columns = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "project_id", headerName: "Project ID" },
  { field: "project_name", headerName: "Project Name" },
  { field: "start_date", headerName: "Start Date" },
  { field: "end_date", headerName: "End Date" },
];

export const table3Columns = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "order_id", headerName: "Order ID" },
  { field: "customer_name", headerName: "Customer Name" },
  { field: "order_date", headerName: "Order Date" },
  { field: "status", headerName: "Status" },
];

export const CardInitializationCol = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "sns", headerName: "Serial Number Card Start", isDate: false },
  { field: "sne", headerName: "Serial Number Card End", isDate: false },
  { field: "bn", headerName: "Box No.", isDate: false },
  { field: "dn", headerName: "Device No.", isDate: false },

  { field: "tq", headerName: "Total Qty", isDate: false },
  { field: "nrc", headerName: "No. of Rejected Cards", isDate: false },
  { field: "nic", headerName: "No. of Initialized Cards", isDate: false },
  { field: "signature", headerName: "Emp ID", isDate: false },
];
export const CBTTrainingCol = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "name", headerName: "Name", isDate: false },
  { field: "emp_id", headerName: "Emp.Id", isDate: false },

  { field: "time_in", headerName: "Time In", isDate: false },
  { field: "time_out", headerName: "Time Out", isDate: false },
  { field: "topic", headerName: "Topic", isDate: false },
  { field: "Batch", headerName: "Batch", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];
export const imprestregistercol = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "imprest_no", headerName: "Imprest No.", isDate: false },
  { field: "billNo", headerName: "Bill No.", isDate: false },
  { field: "item_name", headerName: "Item Name", isDate: false },
  {
    field: "name_Address",
    headerName: "Name & Address of Agency",
    isDate: false,
  },
  { field: "qty", headerName: "Qty (a)", isDate: false },
  { field: "rate", headerName: "Rate (b)", isDate: false },
  { field: "amount", headerName: "Amount c=(a*b)", isDate: false },
  { field: "gst", headerName: "GST (d)", isDate: false },
  { field: "totalAmount", headerName: "Total Amount (c+d)", isDate: false },
];
export const loanregistercol = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "issue_date", headerName: "Issuing Date", isDate: true },
  { field: "issue_time", headerName: "Issue Time", isDate: false },
  { field: "item_name", headerName: "Item Name", isDate: false },
  {
    field: "item_qty",
    headerName: "Qty	",
    isDate: false,
  },
  { field: "name", headerName: "Name", isDate: false },
  { field: "issuer_sign", headerName: "Issue to Name", isDate: false },
  { field: "return_date", headerName: "Return Date", isDate: true },
  { field: "return_time", headerName: "Return Time", isDate: false },
  { field: "balance_qty", headerName: "Balance Qty	", isDate: false },
  { field: "return_by_sign", headerName: "Return by Name	", isDate: false },
  { field: "receiver_sign", headerName: "Receiver Name	", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];
export const policecustodycol = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "time", headerName: "Time", isDate: false },
  { field: "name", headerName: "Name of Person	", isDate: false },
  { field: "address", headerName: "Address", isDate: false },

  { field: "contactNo", headerName: "Contact No.	", isDate: false },
  { field: "handedTo", headerName: "Handed Over to	", isDate: false },
  { field: "reason", headerName: "Reason in Brief	", isDate: true },
  {
    field: "handing_over_Memo_no",
    headerName: "Handing Over Memo No.	",
    isDate: false,
  },
  { field: "sigofsc", headerName: "Sign of SC/ASC		", isDate: false },
  { field: "remark", headerName: "Rmark	", isDate: false },
];
export const sdcentryexitcol = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "name", headerName: "Name", isDate: false },
  { field: "company_name", headerName: "Company Name", isDate: false },

  { field: "job_profile", headerName: "Works As Job Profile", isDate: false },
  { field: "in_time", headerName: "In Time", isDate: false },
  { field: "out_time", headerName: "Out Time", isDate: true },
  {
    field: "work",
    headerName: "Work",
    isDate: false,
  },
  { field: "mobile_no", headerName: "Mobile No.	", isDate: false },
];

// Monika yadav  K.B.W
export const nightescalatordrilll = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "station", headerName: "Station", isDate: false },
  { field: "esc_no", headerName: "ESC.NO", isDate: false },
  {
    field: "operation_offon",
    headerName: "operation_offon",
    isDate: false,
  },
  { field: "from_time", headerName: "from_time", isDate: false },
  { field: "to_time", headerName: "to_time", isDate: false },
  { field: "timeTaken", headerName: "timeTaken", isDate: false },
  { field: "remarks", headerName: "remarks", isDate: false },
  { field: "Employ_id", headerName: "Employ_id", isDate: false },
  { field: "name_of_sc", headerName: "name_of_sc", isDate: false },
  { field: "Station_name", headerName: "Station_name", isDate: false },
  { field: "department", headerName: "department", isDate: false },
  { field: "TCEmploy_id", headerName: "TCEmploy_id", isDate: false },
  { field: "name_of_tc", headerName: "name_of_tc", isDate: false },
];

//  Document Management Register
export const inoutdocumentt = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "filename", headerName: "File Name", isDate: false },

  { field: "type", headerName: "Type", isDate: false },

  { field: "sentby", headerName: "Sent By", isDate: false },

  {
    field: "indate",
    headerName: "In Date",
    isDate: true,
  },
  { field: "intime", headerName: "In Time", isDate: true },
  { field: "outdate", headerName: "Out Date", isDate: true },
  { field: "outtime", headerName: "Out Time", isDate: false },
  { field: "markedto", headerName: "Marked To", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
];

//  Incident register signal

export const incidentregisterr = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "date1", headerName: "Incedent Date", isDate: true },

  { field: "time", headerName: "Time", isDate: false },

  { field: "details", headerName: "Details Of Incident", isDate: false },
  {
    field: "empname",
    headerName: "Reported By",
    isDate: false,
  },
  {
    field: "empname",
    headerName: "Reported desig",
    isDate: false,
  },
  {
    field: "empid",
    headerName: "Reported ID",
    isDate: false,
  },
  {
    field: "reportedto",
    headerName: "Reported To",
    isDate: false,
  },
  { field: "remarks", headerName: "Remarks", isDate: true },
];

//  Inspection Register

export const inspectionregisterr = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "station", headerName: "Station", isDate: false },
  { field: "date", headerName: "Inspaction Date", isDate: false },
  {
    field: "observation",
    headerName: "Observation/Inspection",
    isDate: false,
  },
  {
    field: "remarks",
    headerName: "Remark ",
    isDate: false,
  },

 
];

//  Library Book Register

export const librarybookissueregisterr = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  {
    field: "titleOfTheBookIssued",
    headerName: "Title of The Book Issued",
    isDate: true,
  },

  { field: "uniqueNo", headerName: "Unique No", isDate: false },

  {
    field: "issuedToName",
    headerName: "Issued to name(Mr./Ms.) ",
    isDate: false,
  },
  {
    field: "empId",
    headerName: "Emp Id",
    isDate: false,
  },
  { field: "Designation", headerName: "Designation", isDate: true },
  {
    field: "dateofissue",
    headerName: "Date of Issue(For 15 days)",
    isDate: true,
  },
  { field: "dateofreturn", headerName: "Date of Return", isDate: true },
];

// line defect

export const linedefectn = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  {
    field: "date",
    headerName: "Date",
    isDate: true,
  },

  { field: "reportedTime", headerName: "Reported Time", isDate: false },

  {
    field: "nameOfTrainOperator",
    headerName: "Name Of Train Operator ",
    isDate: false,
  },
  {
    field: "empNo",
    headerName: "Emp No",
    isDate: false,
  },
  { field: "location", headerName: "Location", isDate: false },
  {
    field: "trainNo",
    headerName: "Train No",
    isDate: false,
  },
  { field: "trainSet", headerName: "Train Set", isDate: false },
  {
    field: "failureDescription",
    headerName: "Failure Description",
    isDate: false,
  },
  { field: "signOfTo", headerName: "Name Of To", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
  { field: "signOfCC", headerName: "Name Of CC", isDate: false },
];
//Monika Vbu
export const upsroomentry = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "Name", headerName: "Name", isDate: false },
  { field: "EmpID", headerName: "Emp.No./ID No.", isDate: false },
  {
    field: "DesignationDepartment",
    headerName: "Designation/Department",
    isDate: false,
  },
  { field: "EntryTime", headerName: "Entry Time", isDate: false },
  { field: "PurposeOfVisit", headerName: "Purpose of Visit", isDate: false },
  { field: "ExitTime", headerName: "Exit Time", isDate: false },
  { field: "VisitorsSign", headerName: "Visitor's Name", isDate: false },
  { field: "SignOnDuty", headerName: "Name on Duty", isDate: false },
  { field: "Remark", headerName: "Remark ", isDate: false },
];

export const nightlatsvdudrillregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "station", headerName: "Station", isDate: false },
  { field: "name_of_sc", headerName: "Name of SC", isDate: false },
  { field: "employee_id", headerName: "Emp.Id. of TC", isDate: false },
  { field: "time_from", headerName: "Time From", isDate: false },
  { field: "time_to", headerName: "Time To", isDate: false },
  { field: "result", headerName: "LATS/VDU Function/Result", isDate: false },
  { field: "TCEmploy_id", headerName: "Name of TC", isDate: false },
  { field: "TCEmploy_id", headerName: "Name of TC", isDate: false },
  { field: "remarks", headerName: "Remark", isDate: false },

  { field: "id", headerName: "Form ID", isDate: false },
];

export const detailsrelatedtofoundreceivedarticles = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "LUCKNOW METRO RAIL CORPORATION LIMITED" },

  {
    field: "nophoa",
    headerName: "Name of the person handling over the article",
    isDate: false,
  },
  {
    field: "desciption_article",
    headerName: "Description of the article",
    isDate: false,
  },
  {
    field: "article_place",
    headerName: "Place where article was found",
    isDate: false,
  },
  { field: "remarks", headerName: "Remarks if any", isDate: false },
  { field: "time", headerName: "Time", isDate: false },
  {
    field: "receiver_supervisor_name",
    headerName: "Name and signature of receiving Supervisor",
    isDate: false,
  },
  {
    field: "sent_date",
    headerName: "Sent to Lost & Found office Date",
    isDate: false,
  },
  {
    field: "sent_time",
    headerName: "Sent to Lost & Found office Time",
    isDate: false,
  },
  { field: "supervisor_sign", headerName: "Sign of Supervisor", isDate: false },
  { field: "department", headerName: "Department", isDate: false },
];

// police custody Same as Rajiv Rajiv's form imported in app.js

export const outstandingrecordregister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "station_name", headerName: "Station", isDate: true },
  { field: "letter_no", headerName: "Foil no", isDate: false },
  { field: "osamount", headerName: "O/S Amount", isDate: false },
  { field: "reason", headerName: "Reason", isDate: false },
  { field: "operator_name", headerName: "Operator Name", isDate: false },
  { field: "emp_no", headerName: "Emp. No./File No.", isDate: false },
  { field: "working_id", headerName: "Working ID (As Per EOS)", isDate: false },
  { field: "tom_no", headerName: "TOM No.", isDate: false },
  { field: "shift_no", headerName: "Shift No.", isDate: false },
  {
    field: "Date_send",
    headerName: "Date of Letter Send to OCC/RCC",
    isDate: false,
  },
  {
    field: "detailback",
    headerName: "Detail Back from OCC/RCC",
    isDate: false,
  },
  {
    field: "gremark",
    headerName: "Remarks Genuine/Not Genuine",
    isDate: false,
  },
  {
    field: "notgenamount",
    headerName: "If Not Genuine Amount Paid on Date Vide Letter No.",
    isDate: false,
  },
  {
    field: "genamount",
    headerName: "If Genuine Amount Paid on Date Vide Letter No.",
    isDate: false,
  },
  { field: "unit", headerName: "SC name/Emp. id", isDate: false },
  { field: "remark", headerName: "Remark.", isDate: false },
];

export const crewincidentaccident = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "location", headerName: "Location", isDate: false },
  { field: "repotime", headerName: "Reporting Time", isDate: false },
  { field: "train", headerName: "Train No.", isDate: false },
  { field: "trainset", headerName: "Train Set", isDate: false },
  { field: "opname", headerName: "Name of Train Operatort", isDate: false },
  { field: "emp_id", headerName: "Emp ID of TO", isDate: false },
  { field: "detailincident", headerName: "Detail of Incident", isDate: false },
  { field: "rectime", headerName: "Recitified Time", isDate: false },
  { field: "detension", headerName: "Detention", isDate: false },
  { field: "remark", headerName: "Remark by CC/CDI", isDate: false },
];

export const firstaidregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "time", headerName: "Time", isDate: false },
  {
    field: "providedToName",
    headerName: "First Aid Provided To Name",
    isDate: false,
  },
  {
    field: "providedToDesignation",
    headerName: "First Aid Provided To Designation",
    isDate: false,
  },
  {
    field: "providedByName",
    headerName: "First Aid Provided By Name",
    isDate: false,
  },
  {
    field: "providedByDesignation",
    headerName: "First Aid Provided By Designation",
    isDate: false,
  },
  {
    field: "itemsConsumed",
    headerName: "Items & Quantity Consumed",
    isDate: false,
  },
  { field: "department", headerName: "Department", isDate: false },
  { field: "user_id", headerName: "Employee ID", isDate: false },
];

export const listofhonorariumregisters = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "executive", headerName: "Executive", isDate: false },
  { field: "nonexecutive", headerName: "Non-Executive", isDate: false },
  { field: "gc", headerName: "GC", isDate: false },
];

export const honorariumregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "Name", headerName: "Name", isDate: false },
  { field: "Emp_Id", headerName: "Emp.ID", isDate: false },
  { field: "Designation", headerName: "Designation", isDate: false },
  { field: "Type", headerName: "Type", isDate: false },
  { field: "Time_From", headerName: "Time From", isDate: false },
  { field: "Time_to", headerName: "Time To", isDate: false },
  { field: "Duration", headerName: "Duration", isDate: false },
  { field: "Topic_Covered", headerName: "topic Covered", isDate: false },
  { field: "Classroom", headerName: "Classroom", isDate: false },
  { field: "Review_by", headerName: "Review by", isDate: false },
  { field: "Approved_By", headerName: "Approved By", isDate: false },
  { field: "Batch", headerName: "Batch", isDate: false },
  { field: "Remark", headerName: "Remark", isDate: false },
];
export const nightfacpdrillregsiter = [
  [
    { headerName: "Date", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    {
      headerName: "Name Of SC",

      rowSpan: 2,
    },
    { headerName: "Emp.Id.", rowSpan: 2 },
    { headerName: "MCP.No", rowSpan: 2 },
    { headerName: "Operated", colSpan: 2 },
    { headerName: "Time", colSpan: 2 },
    {
      headerName: "Name Of TC",

      rowSpan: 2,
    },
    {
      headerName: "Emp.Id Of Tc",

      rowSpan: 2,
    },
    { headerName: "Remarks", rowSpan: 2 },
  ],
  [
    { headerName: "Location/Zone", isDate: false },
    { headerName: "Alaram Yes/No", isDate: false },
    { headerName: "From", isDate: false },
    { headerName: "To", isDate: false },
  ],
  [
    { field: "date", isDate: true },
    { field: "station", isDate: false },
    {
      field: "name_of_sc",

      isDate: false,
    },
    { field: "Employ_id", isDate: false },
    { field: "mcp_no", isDate: false },
    { field: "operated_location", isDate: false },
    { field: "operated_alarm", isDate: false },
    { field: "from_time", isDate: false },
    { field: "to_time", isDate: false },
    {
      field: "name_of_tc",

      isDate: false,
    },
    {
      field: "empoyee_id_tc",

      isDate: false,
    },
    { field: "remarks", isDate: false },
  ],
];

export const equipmentfailureregister = [
  [
    { headerName: "Failure Date Time", rowSpan: 2 },
    
    { headerName: "Location", rowSpan: 2 },
    { headerName: "Department", rowSpan: 2 },
    { headerName: "Equipment", colSpan: 2 },
    { headerName: "Nature & Details of Failure", rowSpan: 2 },
    { headerName: "Reported To", rowSpan: 2 },
    { headerName: "Reported Time", rowSpan: 2 },
    { headerName: "SC Emp. No", rowSpan: 2 },
    { headerName: "SC Emp. Name", rowSpan: 2 },
    { headerName: "ACTION TAKEN", colSpan: 3 },
    { headerName: "Status", rowSpan: 2 },
    { headerName: "Close", colSpan: 3 },
   
    { headerName: "Remarks", rowSpan: 2 },
    
   
    { headerName: "Form ID", rowSpan: 2 },
    { headerName: "action", rowSpan: 2 },
  ],
  [
    { headerName: "Type", isDate: false },
    { headerName: "No.", isDate: false },
    { headerName: "date Time", isDate: false },
    { headerName: "Emp. No.", isDate: false },
    { headerName: "Name", isDate: false },
    { headerName: "date Time", isDate: false },
    { headerName: "Emp. No.", isDate: false },
    { headerName: "Name", isDate: false },
  ],
  [
    { field: "failureDateTime", isDate: true },
    
    { field: "location", isDate: false },
    { field: "department", isDate: false },
    { field: "equipmentType", isDate: false },
    { field: "equipmentNo", isDate: false },
    { field: "failureDetails", isDate: false },
    { field: "reportedTo", isDate: false },
    { field: "reportedDateTime", isDate: false },
    { field: "scEmpNo", isDate: false },
    { field: "scName", isDate: false },
    { field: "actionDateTime", isDate: false },
    { field: "actionEmpNo", isDate: false },
    { field: "actionName", isDate: false },

    { field: "status1", isDate: false },
    { field: "closeDateTime", isDate: false },
    { field: "closeEmpNo", isDate: false },
    { field: "closeName", isDate: false },
    { field: "remarks", isDate: false },
   
    { field: "id", isDate: false },
  ],
];

export const serentryy = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  
  { field: "station", headerName: "Station", isDate: false },
  { field: "employee_name", headerName: "Name", isDate: false },
  
  {
    field: "DesignationDepartment",
    headerName: "Desig./Department",
    isDate: false,
  },
  { field: "user_id", headerName: "EmpID", isDate: false },
  { field: "DateOfEntry", headerName: "Entry Date", isDate: false },
  { field: "EntryTime", headerName: "Entry Time", isDate: false },
  { field: "PurposeOfVisit", headerName: "Purpose Of Visit", isDate: false },
  { field: "ExitDate", headerName: "Exit Date", isDate: false },
  { field: "ExitTime", headerName: "Exit Time", isDate: false },
  { field: "Name", headerName: "Visitor's Name", isDate: false },
  { field: "Remark", headerName: "Remark", isDate: false },
];

export const replacementist = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  {
    field: "DateOfReplacement",
    headerName: "Date Of Replacement",
    isDate: true,
  },
  { field: "HardwareSoftware", headerName: "Hardware Software", isDate: false },
  { field: "Description", headerName: "Description", isDate: false },
  { field: "Signature", headerName: "Quantity", isDate: false },
  { field: "unit", headerName: "Denomination", isDate: false },
  { field: "station", headerName: "Station", isDate: false },
  { field: "system", headerName: "System", isDate: false },
  { field: "GearID", headerName: "Gear ID", isDate: false },
  { field: "OldSrNo", headerName: "Old Sr. No", isDate: false },
  { field: "NewSrNo", headerName: "New Sr. No", isDate: false },
  {
    field: "ReasonOfReplacement",
    headerName: "Reason of Replacement",
    isDate: false,
  },

  { field: "employee_name", headerName: "Emp. Name", isDate: false },
  { field: "user_id", headerName: "Emp. ID", isDate: false },
  { field: "Remark", headerName: "Remark", isDate: false },
];

//MONIKA KBW

export const nightescalatordrill = [
  [
    { headerName: "Date", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    { headerName: "ESC.NO", rowSpan: 2 },
    { headerName: "Time.", colSpan: 2 },
    { headerName: "Operation Mode", colSpan: 2 },
    { headerName: "Total Time Taken", rowSpan: 2 },
    { headerName: "Name Of SC", rowSpan: 2 },
    { headerName: "Emp.Id", rowSpan: 2 },
    { headerName: "Remarks", rowSpan: 2 },
  ],
  [
    { headerName: "From", isDate: false },
    { headerName: "To", isDate: false },
    { headerName: "Off/On", isDate: false },
    { headerName: "Emergency", isDate: false },
  ],
  [
    { field: "date", isDate: true },

    { field: "station", isDate: false },
    { field: "esc_no", isDate: false },
    { field: "from_time", isDate: false },
    { field: "to_time", isDate: false },
    {
      field: "operation_offon",
      isDate: false,
    },
    {
      field: "operation_emergency",
      isDate: false,
    },

    { field: "timeTaken", isDate: false },
    { field: "name_of_sc", isDate: false },
    { field: "Employ_id", isDate: false },

    { field: "remarks", isDate: false },
  ],
];
export const controlregister = [
  
  [
    { headerName: "Date", rowSpan: 2 },
    { headerName: "Time", rowSpan: 2 },
    { headerName: "Changed", colSpan: 2 },
    { headerName: "Reason", rowSpan: 2 },
    { headerName: "Name of Sc", rowSpan: 2 },

    { headerName: "Remarks", rowSpan: 2 },
  ],
  [
    { headerName: "From", isDate: false },
    { headerName: "To", isDate: false },
  ],
  [
    { field: "date", isDate: true },

    { field: "time", isDate: false },
    { field: "changeTo", isDate: false },
    { field: "changeFrom", isDate: false },
    { field: "reason", isDate: false },
    {
      field: "signOfSC",
      isDate: false,
    },
    {
      field: "remark",
      isDate: false,
    },
  ],
];

export const pettyrepairregister = [
  [
    { headerName: "Date", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    { headerName: "Location", rowSpan: 2 },
    { headerName: "Name Of SC", rowSpan: 2 },
    { headerName: "SC Emp", rowSpan: 2 },
    { headerName: "Nature & Details Of Complaint", rowSpan: 2 },
    { headerName: "Pertains To", rowSpan: 2 },
    { headerName: "Reported To", rowSpan: 2 },
   
    { headerName: "Action Taken", colSpan: 3 },
    { headerName: "Remark Of SSE/SE", rowSpan: 2 },
    { headerName: "Rectified Date & Time", rowSpan: 2 },
    { headerName: "SC Name & Emp No.", rowSpan: 2 },
    { headerName: "action", rowSpan: 2 },
  ],
  [
  
    { headerName: "Action Date", isDate: true },
    { headerName: "Attended By", isDate: false },
    { headerName: "Details of Workdone", isDate: false },
  ],
  [
    { field: "dateAndTime", isDate: true },
    { field: "station", isDate: false },
    { field: "location", isDate: false },
    { field: "scName", isDate: false },
    { field: "scEmp", isDate: false },
    { field: "natureOfComplaint", isDate: false },
  
    { field: "pertainsTo", isDate: false },
    { field: "reportedTo", isDate: false },
  
    { field: "actionTakenDate", isDate: false },
    { field: "attendedBy", isDate: false },
    { field: "actionDetails", isDate: false },
    { field: "remarks", isDate: false },
    { field: "rectifiedDateAndTime", isDate: false },
    { field: "scNameEmpNo", isDate: false },
  ],
];

//  Document Management Register
export const inoutdocument = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "filename", headerName: "File Name", isDate: false },

  { field: "type", headerName: "Type", isDate: false },

  { field: "sentby", headerName: "Sent By", isDate: false },

  {
    field: "indate",
    headerName: "In Date",
    isDate: true,
  },
  { field: "intime", headerName: "In Time", isDate: true },
  { field: "outdate", headerName: "Out Date", isDate: true },
  { field: "outtime", headerName: "Out Time", isDate: false },
  { field: "markedto", headerName: "Marked To", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
];

//  Incident register signal

export const incidentregister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "date1", headerName: "Date", isDate: true },

  { field: "time", headerName: "Time", isDate: false },

  { field: "details", headerName: "Details Of Incident", isDate: false },
  {
    field: "empname",
    headerName: "Reported By",
    isDate: false,
  },
  {
    field: "desig",
    headerName: "Reported desig",
    isDate: false,
  },
  {
    field: "empid",
    headerName: "Reported ID",
    isDate: false,
  },
  {
    field: "reportedto",
    headerName: "Reported To",
    isDate: false,
  },
  { field: "remarks", headerName: "Remarks", isDate: true },
];

//  Inspection Register

export const inspectionregister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "station", headerName: "Station", isDate: false },

  { field: "date", headerName: "Inspaction Date", isDate: false },

  {
    field: "observation",
    headerName: "Observation/Inspection",
    isDate: false,
  },
  {
    field: "remarks",
    headerName: "Remark ",
    isDate: false,
  },
  {
    field: "name",
    headerName: "Inspected By",
    isDate: false,
  },
  {
    field: "sign",
    headerName: "Reported desig",
    isDate: false,
  },
  {
    field: "unit",
    headerName: "Reported ID",
    isDate: false,
  },
];

//  Library Book Register

export const librarybookissueregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  {
    field: "titleOfTheBookIssued",
    headerName: "Title of The Book Issued",
    isDate: true,
  },

  { field: "uniqueNo", headerName: "Unique No", isDate: false },

  {
    field: "issuedToName",
    headerName: "Issued to name(Mr./Ms.) ",
    isDate: false,
  },
  {
    field: "empId",
    headerName: "Emp Id",
    isDate: false,
  },
  { field: "Designation", headerName: "Designation", isDate: false },
  {
    field: "dateofissue",
    headerName: "Date of Issue(For 15 days)",
    isDate: true,
  },
  { field: "dateofreturn", headerName: "Date of Return", isDate: true },
  { field: "Action", headerName: "Action", isDate: false },
  { field: "Contact_Number_of_Issued_Person", headerName: "Contact Number of Issued Person", isDate: false },
  { field: "Date_of_Issue_For_Same_days", headerName: "Date of Issue(For Same days)", isDate: false },
  { field: "Date_of_Return_For_Same_days", headerName: "Date of Return", isDate: false },
  { field: "Action_For_Same_days", headerName: "Action", isDate: false },
 
];

// line defect

export const linedefect = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  {
    field: "date",
    headerName: "Date",
    isDate: true,
  },

  { field: "reportedTime", headerName: "Reported Time", isDate: false },

  {
    field: "nameOfTrainOperator",
    headerName: "Name Of Train Operator ",
    isDate: false,
  },
  {
    field: "empNo",
    headerName: "Emp No",
    isDate: false,
  },
  { field: "location", headerName: "Location", isDate: false },
  {
    field: "trainNo",
    headerName: "Train No",
    isDate: false,
  },
  { field: "trainSet", headerName: "Train Set", isDate: false },
  {
    field: "failureDescription",
    headerName: "Failure Description",
    isDate: false,
  },
  { field: "signOfTo", headerName: "Name Of To", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
  { field: "signOfCC", headerName: "Name Of CC", isDate: false },
];

export const handintakingovernote = [
  { field: "itemDescription", headerName: "item description", isDate: false },
  { field: "partNo", headerName: "Part No.", isDate: false },
  { field: "serialNo", headerName: "Serial No.", isDate: false },
  { field: "locationFrom", headerName: "Location From", isDate: false },
  { field: "locationTo", headerName: "Location To", isDate: false },
  { field: "qty", headerName: "Qty.", isDate: false },
  {
    field: "condition",
    headerName: "Defective/Serviceable/Repaired",
    isDate: false,
  },
  { field: "authRefNo", headerName: "Auth.Ref. No. & Date", isDate: false },
  { field: "remarks", headerName: "Remarks", isDate: false },
];
export const consumablesregistermainline = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "item_name", headerName: "Item Name", isDate: false },
  { field: "receiptqty", headerName: "Receipt Qty", isDate: false },
  { field: "issuedqty", headerName: "Issued Qty", isDate: false },
  { field: "balanceqty", headerName: "Balance Qty", isDate: false },

  { field: "issuedto", headerName: "Issued To", isDate: false },
  { field: "sectionincharge", headerName: "Section Incharge", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
  { field: "Employ_id", headerName: "User Id", isDate: false },
  { field: "employee_name", headerName: "Employee Name", isDate: false },
];
export const nightetsdrillregsiter = [
  [
    { headerName: "Date", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    { headerName: "PF No.", rowSpan: 2 },
    { headerName: "Time", colSpan: 2 },
    { headerName: "Observation", rowSpan: 2 },
    { headerName: "Name of SC", rowSpan: 2 },
    { headerName: "Emp id", rowSpan: 2 },
    { headerName: "Remark", rowSpan: 2 },
    { rowSpan: 4, isDate: false },
  ],
  [
    { headerName: "Operation Time", isDate: false },
    { headerName: "Reset Time", isDate: false },
  ],
  [
    { field: "date", isDate: true },
    { field: "station", isDate: false },
    { field: "pf_no", isDate: false },
    { field: "operation_time", isDate: false },
    { field: "reset_time", isDate: false },
    { field: "observation", isDate: false },
    { field: "name_of_sc", isDate: false },
    { field: "Employ_id", isDate: false },
    { field: "remarks", isDate: false },
  ],
];

export const urcandosentryregistersdc = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "IncomingDate", headerName: "Incoming Date", isDate: false },
  { field: "OsurcNumber", headerName: "URC /OS Number", isDate: false },
  { field: "Recievedby", headerName: "Received By", isDate: false },

  { field: "RecievedFrom", headerName: "Received From", isDate: false },
  { field: "OutgoingDate", headerName: "Outgoing Date", isDate: false },
  { field: "HandedOverTo", headerName: "Handed Over To", isDate: false },
  { field: "HandedOverBy", headerName: "Handed Over By", isDate: false },
  
  { field: "mailedby", headerName: "Mailed By", isDate: false },
  { field: "maileddate", headerName: "Mailed Date", isDate: false },
  { field: "no_ofcases", headerName: "No Of Case", isDate: false },
  { field: "no_ofclearedcases", headerName: "Cleared Case", isDate: false },

];
export const nightmanualpointsoperationdrillregister = [
  [
    { headerName: "Date", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    { headerName: "Point No.", rowSpan: 2 },
    { headerName: "Time", colSpan: 2 },
    { headerName: "Total time taken", rowSpan: 2 },
    { headerName: "Name of SC", rowSpan: 2 },
    { headerName: "Emp id", rowSpan: 2 },
    { headerName: "Signature of SC", rowSpan: 2 },
    { headerName: "Remark", rowSpan: 2 },
  ],
  [
    { headerName: "Operation Time", isDate: false },
    { headerName: "Reset Time", isDate: false },
  ],
  [
    { field: "date", isDate: true },
    { field: "station", isDate: false },
    { field: "point_no", isDate: false },
    { field: "time_operation", isDate: false },
    { field: "totalTime", isDate: false },
    { field: "name_of_sc", isDate: false },
    { field: "Employ_id", isDate: false },
    { field: "TCEmploy_id", isDate: false },
    { field: "remarks", isDate: false },
  ],
];
export const materialdistribution = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "Item", headerName: "Item", isDate: false },
  { field: "quantity", headerName: "Quantity", isDate: false },
  { field: "datein", headerName: "Date In", isDate: false },
  { field: "quantity1", headerName: "Quantity", isDate: false },
  { field: "dateOut", headerName: "Date Out", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];
export const possessionregister = [
  [
    { headerName: "FormID", rowSpan: 3 },
    { headerName: "Date", rowSpan: 3 },
    { headerName: "Line", rowSpan: 3 },
    { headerName: "Possession Granted to Department", rowSpan: 3 },
    { headerName: "Name of EPIC", rowSpan: 3 },
    { headerName: "Designation", rowSpan: 3 },
    { headerName: "Emp. No.", rowSpan: 3 },
    { headerName: "No. of Persons along with EPIC", rowSpan: 3 },
    { headerName: "Nature of Work", rowSpan: 3 },
    { headerName: "Location", colSpan: 2 },
    { headerName: "Entry Point", rowSpan: 3 },
    { headerName: "Exit Point", rowSpan: 3 },
    { headerName: "Time", colSpan: 5 },
    { headerName: "PTW S. No.", colSpan: 2 },
    { headerName: "Private Number Exchange", colSpan: 4 },
    { headerName: "Remark", rowSpan: 3 },
    { rowSpan: 4, isDate: false },
  ],
  [
    { headerName: "From", rowSpan: 2, isDate: false },
    { headerName: "To", rowSpan: 2, isDate: false },
    { headerName: "OHE Dead", rowSpan: 2, isDate: false },
    { headerName: "Granted", rowSpan: 2, isDate: false },
    { headerName: "Permitted Upto", rowSpan: 2, isDate: false },
    { headerName: "Cancellation", rowSpan: 2, isDate: false },
    { headerName: "OHE Charged", rowSpan: 2, isDate: false },
    { headerName: "Issued", rowSpan: 2, isDate: false },
    { headerName: "Cancelled", rowSpan: 2, isDate: false },
    { headerName: "Imposed", colSpan: 2, isDate: false },
    { headerName: "Cancellation", colSpan: 2, isDate: false },
  ],
  [
    { headerName: "OCC", isDate: false },
    { headerName: "Station", isDate: false },
    { headerName: "OCC", isDate: false },
    { headerName: "Station", isDate: false },
  ],
  [
    { field: "form_id", isDate: false },
    { field: "date", isDate: true },
    { field: "line", isDate: false },
    { field: "possessionGranted", isDate: false },
    { field: "nameofepic", isDate: false },
    { field: "designation", isDate: false },
    { field: "empno", isDate: false },
    { field: "noofpersons", isDate: false },
    { field: "natureOfWork", isDate: false },
    { field: "locationFrom", isDate: false },
    { field: "locationTo", isDate: true },
    { field: "entryPoint", isDate: false },
    { field: "exitPoint", isDate: false },
    { field: "oheDead", isDate: false },
    { field: "granted", isDate: false },
    { field: "permittedUpto", isDate: false },
    { field: "cancellation", isDate: false },
    { field: "oheCharged", isDate: false },
    { field: "ptwIssued", isDate: false },
    { field: "ptwCancellation", isDate: false },
    { field: "privateImposedOcc", isDate: false },
    { field: "privateImposedStation", isDate: false },
    { field: "privateCancellationOcc", isDate: false },
    { field: "privateCancellationStation", isDate: false },
    { field: "remark", isDate: false },
  ],
];
export const serentry = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },

  { field: "Name", headerName: "Name", isDate: false },
  { field: "station", headerName: "Station", isDate: false },
  { field: "employee_id", headerName: "Emp Id", isDate: false },
  {
    field: "DesignationDepartment",
    headerName: "Desig./Department",
    isDate: false,
  },
  { field: "DateOfEntry", headerName: "Entry Date", isDate: false },
  { field: "EntryTime", headerName: "Entry Time", isDate: false },
  { field: "PurposeOfVisit", headerName: "Purpose of Visit", isDate: false },
  { field: "ExitDate", headerName: "Exit Date", isDate: false },
  { field: "ExitTime", headerName: "Exit Time", isDate: false },
  { field: "VisitorsSign", headerName: "Visitor's Name", isDate: false },
  { field: "SignOnDuty", headerName: "On Duty Staff", isDate: false },
  { field: "Remark", headerName: "Remark", isDate: false },
];

export const biodatareg = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "name", headerName: "Name", isDate: false },
  { field: "designation", headerName: "Designation", isDate: false },
  { field: "permanent", headerName: "Permanent Add", isDate: false },
  { field: "present", headerName: "Present Add", isDate: false },
  { field: "contactno", headerName: "Contact No", isDate: false },
  { field: "dob", headerName: "Date Of Birth", isDate: false },
  { field: "doa", headerName: "Date Of App", isDate: false },
  { field: "joining", headerName: "Joining OCC", isDate: false },
  { field: "doc", headerName: "doc", isDate: false },
  { field: "trainingfirstaid", headerName: "First aid", isDate: false },
  { field: "trainingfirefighting", headerName: "Fire Fighting", isDate: false },
  { field: "doc", headerName: "Competancy Valid", isDate: false },
  { field: "dom", headerName: "Date Of Madical", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];
export const traininduction = [
  [
    { headerName: "Form ID", rowSpan: 2 },
    { headerName: "Created At", rowSpan: 2 },
    { headerName: "Train id/service id", rowSpan: 2 },
    { headerName: "Train set", rowSpan: 2 },
    { headerName: "Date of Induction", rowSpan: 2 },
    { headerName: "Train Inducted From", rowSpan: 2 },
    { headerName: "Mode ATO/ATP/ROS/RM/SCS", rowSpan: 2 },
    { headerName: "finalstablinglocation", rowSpan: 2 },
    { headerName: "Time", colSpan: 4 },
    { headerName: "RUNNING KMS", rowSpan: 2 },
    { headerName: "REMARKS", rowSpan: 2 },
  ],
  [
    { headerName: "MAINLINE INDUCTION(From M/l Entry Signal)", isDate: false },
    { headerName: "SCHEDULE DEPARTURE", isDate: false },
    { headerName: "ACTUAL DEPARTUERE", isDate: false },
    { headerName: "DEPOT ARRIVAL", isDate: false },
  ],
  [
    { field: "form_id", isDate: false },
    { field: "created_at", isDate: true },
    { field: "serviceid", isDate: false },
    { field: "trainset", isDate: false },
    { field: "date", isDate: false },
    { field: "traininductedfrom", isDate: false },
    { field: "entrymode", isDate: false },
    { field: "finalstablinglocation", isDate: false },
    { field: "maininlineinduction", isDate: false },
    { field: "scheduledeparture", isDate: false },
    { field: "actualdeparture", isDate: false },
    { field: "depotarrival", isDate: false },
    { field: "runningkms", isDate: false },
    { field: "remark", isDate: false },
  ],
];

export const emergencyfireman = [
  [
    { headerName: "Form ID", rowSpan: 2 },
    { headerName: "Created At", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    { headerName: "Fireman Exit Door Status", colSpan: 3 },
    { headerName: "Emergency Exit Door Status", colSpan: 3 },
    { headerName: "Details of the drill performed", rowSpan: 2 },
    { headerName: "Name of SC", rowSpan: 2 },
    { headerName: "REMARKS", rowSpan: 2 },
  ],
  [
    { headerName: "Pf leve", isDate: false },
    { headerName: "Concourse", isDate: false },
    { headerName: "Ground", isDate: false },
    { headerName: "Pf level", isDate: false },
    { headerName: "Concourse", isDate: false },
    { headerName: "Ground", isDate: false },
  ],
  [
    { field: "id", isDate: false },
    { field: "created_at", isDate: true },
    { field: "station", isDate: false },
    { field: "fireman_pflevel", isDate: false },
    { field: "fireman_concourse", isDate: false },
    { field: "fireman_ground", isDate: false },
    { field: "emergency_pflevel", isDate: false },
    { field: "emergency_concourse", isDate: false },
    { field: "emergency_ground", isDate: false },
    { field: "detailsofthedrillperformed", isDate: false },
    { field: "nameofsc", isDate: false },
    { field: "remark1", isDate: false },
  ],
];
export const budgetallotment = [
 
  { field: "updated_at", headerName: "Created At", isDate: true },
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "budgetHead", headerName: "Budget Head", isDate: false },
  { field: "budgetSubhead", headerName: " Sub Head", isDate: false },
  { field: "department", headerName: "Department", isDate: false },
  { field: "total_alloted_amount", headerName: "Alloted  Amount", isDate: false },
  { field: "balance_amount", headerName: " Balance Amount", isDate: false },
 
];

export const budgetpayments = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  
  { field: "budgetHead_id", headerName: "Budget Head", isDate: false },
  { field: "budgetSubhead", headerName: " Sub Head", isDate: false },
  { field: "department", headerName: "Department", isDate: false },
  { field: "partyName", headerName: "Party Name", isDate: false },
  { field: "amountLoaIssued", headerName: "Amount LOA Issued", isDate: false },

  { field: "payment_loa_no", headerName: "LOA No.", isDate: false },
  { field: "vouncher_no", headerName: "Voucher No", isDate: false },
  { field: "payment_amt", headerName: "Payment Amount", isDate: false },
  { field: "payment_date", headerName: "Payment Date", isDate: false },
];
export const activitylog = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "activity", headerName: "Activity", isDate: false },
  { field: "ip_address", headerName: "IP Address", isDate: false },
  { field: "", headerName: "New Data", isDate: false },
  { field: "", headerName: "Old Data", isDate: false },
  { field: "user_name", headerName: "User", isDate: false },
];
export const nightafcgatedrill = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "station", headerName: "Station", isDate: false },
  { field: "name_of_sc", headerName: "Name of SC", isDate: false },
  { field: "emp_id", headerName: "Employee ID", isDate: false },
  { field: "afc_gate_no", headerName: "AFC Gate No.", isDate: false },
  { field: "message_gate_type", headerName: "Type of Gate ", isDate: false },
  { field: "message_operation_mode", headerName: "Incident", isDate: false },

  { field: "nameoftc", headerName: "Name of TC", isDate: false },
  { field: "empidoftc", headerName: "	Emp. Id of TC", isDate: false },
  { field: "remarks", headerName: "Remark", isDate: false },
];

export const ledgerregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  {
    field: "whom_receivedIssued",
    headerName: "From Whom Received/To Whom Issued",
    isDate: false,
  },
  { field: "material_desc", headerName: "Material", isDate: false },
  { field: "issue_note", headerName: "Issue Note", isDate: false },
  { field: "receiptqty", headerName: "Receipt qty", isDate: false },
  { field: "issuedqty", headerName: "Issued qty", isDate: false },
  { field: "balance_qty", headerName: "Balance qty", isDate: false },
  { field: "remark", headerName: "Remark", isDate: false },
];
export const stationearning = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  {
    field: "stationName",
    headerName: "Station Name",
    isDate: false,
  },
  { field: "cashFareBox", headerName: "Cash (QR ticket by cash) Fare box", isDate: false },
  { field: "souvenirSale", headerName: "Cash (Non Fare)Sale of Souvenir Item", isDate: false },
  { field: "birthdayBooking", headerName: "Cash (Non Fare) Birthday booking Amount", isDate: false },
  { field: "penalty", headerName: "Cash (Non Fare) Penalty", isDate: false },
  { field: "lostAndFound", headerName: "Cash (Non Fare) Amount of lost and found", isDate: false },
  { field: "Shift", headerName: "Shift", isDate: false },
  
  { field: "Project", headerName: "Project", isDate: false },
  { field: "upiQrTicket", headerName: "UPI (QR ticket by UPI)", isDate: false },

  { field: "posBankCard", headerName: "POS (QR ticket by Swapping Bank Card)", isDate: false },
  { field: "equipment", headerName: "Equipment", isDate: false },

];

export const biodataregister = [
  { field: "id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  {
    field: "empId",
    headerName: "Employee Id",
    isDate: false,
  },
  { field: "name", headerName: "Name", isDate: false },
  { field: "gender", headerName: "Gender", isDate: false },
  { field: "dob", headerName: "Date of Birth", isDate: true },
  { field: "dojUpmrc", headerName: "Date of Joining UPMRC", isDate: false },
  { field: "dojCoet", headerName: "Date of Joining COET", isDate: false },
  { field: "project", headerName: "Project", isDate: false },
  
  { field: "department", headerName: "Department", isDate: false },
  { field: "designation", headerName: "Designation", isDate: false },

  { field: "from", headerName: "From", isDate: false },
  { field: "workingProject", headerName: "Working Project", isDate: false },


  { field: "workingLocation", headerName: "Working Location", isDate: false },
  { field: "workingDepartment", headerName: "Working Department", isDate: false },
  { field: "gender", workingDepartment: "Working Department", isDate: false },
  { field: "workingWing", headerName: "Working Wing", isDate: false },
  { field: "workingPost", headerName: "Working Post", isDate: false },
  { field: "workingPostingDate", headerName: "workingPostingDate", isDate: false },
  { field: "vacancyNo", headerName: "Vacancy No", isDate: false },

  { field: "fatherName", headerName: "Father Name", isDate: false },
  { field: "motherName", headerName: "Mother Name", isDate: false },
  { field: "bloodGroup", headerName: "bloodGroup", isDate: false },
  { field: "contactNumber", headerName: "Contact Number", isDate: false },
  { field: "emergencyContact", headerName: "Emergency Contact", isDate: false },
  { field: "aadharNo", headerName: "aadharNo", isDate: false },

  { field: "panCardNo", headerName: "panCardNo", isDate: false },
  { field: "email", headerName: "Email", isDate: false },
  { field: "permanentAddress", headerName: "Permanent Address", isDate: false },
  { field: "currentAddress", headerName: "Current Address", isDate: false },

  { field: "medicalType", headerName: "Medical Type", isDate: false },
  { field: "medicalDate", headerName: "Medical Date", isDate: false },

];

export const equipmentfailureocc = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "punctualityClassification", headerName: "Punctuality Clasification", isDate: false },
        { field: "stationSection", headerName: "Station/Section", isDate: false },
        { field: "line", headerName: "Line", isDate: false },
        { field: "floorLevel", headerName: "Floor Level", isDate: false },
        { field: "department", headerName: "Department", isDate: false },
        { field: "failureId", headerName: "AFC/TELE FAILURE ID", isDate: false },
        { field: "failureCategory", headerName: "Failure Category", isDate: false },
        { field: "equipmentFailed", headerName: "Equipment Failed", isDate: false },
        { field: "equipmentNumber", headerName: "Equipment Number", isDate: false },
        { field: "stoppedWorking", headerName: "whether stopped working", isDate: false },
        { field: "trainSetNumber", headerName: "Train Set Number", isDate: false },
        { field: "dateTimeFailure", headerName: "Date/Time of Failure", isDate: false },
        { field: "dateTimeRectification", headerName: "Date/Time of rectification", isDate: false },
        { field: "description", headerName: "Description of Failure", isDate: false },
        { field: "remarks", headerName: "Remarks of Concerned department", isDate: false },
        { field: "deloggingDate", headerName: "Delogging Date", isDate: false },
        { field: "reloggedDepartment", headerName: "Relogged on Department", isDate: false },


];

export const tsrregister = [
  { field: "form_id", headerName: "Form ID", isDate: false },
  { field: "created_at", headerName: "Created At", isDate: true },
  { field: "punctualityClassification", headerName: "Punctuality Clasification", isDate: false },
        { field: "stationSection", headerName: "Station/Section", isDate: false },
        { field: "line", headerName: "Line", isDate: false },
        { field: "floorLevel", headerName: "Floor Level", isDate: false },
        { field: "department", headerName: "Department", isDate: false },
        { field: "failureId", headerName: "AFC/TELE FAILURE ID", isDate: false },
        { field: "failureCategory", headerName: "Failure Category", isDate: false },
        { field: "equipmentFailed", headerName: "Equipment Failed", isDate: false },
        { field: "equipmentNumber", headerName: "Equipment Number", isDate: false },
        { field: "stoppedWorking", headerName: "whether stopped working", isDate: false },
        { field: "trainSetNumber", headerName: "Train Set Number", isDate: false },
        { field: "dateTimeFailure", headerName: "Date/Time of Failure", isDate: false },
        { field: "dateTimeRectification", headerName: "Date/Time of rectification", isDate: false },
        { field: "description", headerName: "Description of Failure", isDate: false },
        { field: "remarks", headerName: "Remarks of Concerned department", isDate: false },
        { field: "deloggingDate", headerName: "Delogging Date", isDate: false },
        { field: "reloggedDepartment", headerName: "Relogged on Department", isDate: false },


];



export const unreadablecard = [
  [
    { headerName: "Form ID", rowSpan: 2 },
    { headerName: "Created At", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    { headerName: "Date of Receipt", rowSpan: 2  },
    { headerName: "Receipt Memo No.", rowSpan: 2 },
    { headerName: "CSC Engraved ID", rowSpan: 2 },
    { headerName: "Physical Condition", rowSpan: 2 },
    { headerName: "Passenger Name", rowSpan: 2 },
    { headerName: "Contact No.(If any)", rowSpan: 2 },
    { headerName: "SC Emp", rowSpan: 2 },
    { headerName: "SC Name", rowSpan: 2 },
    { headerName: "Sent details",colSpan: 3 },
    { headerName: "Received details", colSpan: 3 },
    { headerName: "Type of Card", rowSpan: 2 },
    { headerName: "Refundable Security", rowSpan: 2 },
    { headerName: "Balance", rowSpan: 2 },
    { headerName: "Total Refundable Amount", rowSpan: 2 },
    { headerName: "Refund Memo No.", rowSpan: 2 },
    { headerName: "Refunded on Date.", rowSpan: 2 },
    { headerName: "Amount Refunded", rowSpan: 2 },
    { headerName: "Action", rowSpan: 2 },
  ],
  [
    { headerName: "Date", isDate: false },
    { headerName: "SC Emp", isDate: false },
    { headerName: "Sent to RCC", isDate: false },
    { headerName: "Date", isDate: false },
    { headerName: "SC Emp", isDate: false },
    { headerName: "Received from RCC", isDate: false },
  ],
  [
    { field: "id", isDate: false },
    { field: "created_at", isDate: true },
    { field: "station", isDate: false },
    { field: "dateOfReceipt", isDate: false },
    { field: "receiptMemoNo", isDate: false },
    { field: "cscEngraveID", isDate: false },
    { field: "physicalCondition", isDate: false },
    { field: "passengerName", isDate: false },
    { field: "contactNo", isDate: false },
    { field: "scEmp", isDate: false },

    { field: "scEmpName", isDate: false },
   
    { field: "sentDetailsDate", isDate: false },
    { field: "sentToRCC", isDate: false },
    { field: "scEmpSentToRCC", isDate: false },
    { field: "receivedDetailsDate", isDate: false },

    { field: "receivedFromRCC", isDate: false },
    { field: "scEmpReceivedFromRCC", isDate: false },
    { field: "typeOfSecurity", isDate: false },
    { field: "refundable", isDate: false },
    { field: "balance", isDate: false },
    { field: "totalAmount", isDate: false },
    { field: "refundMemoNo", isDate: false },
    { field: "refundedOnDate", isDate: false },
    { field: "amountRefunded", isDate: false },
   
  ],
];


export const tsrregisterdata = [
  [
    { headerName: "ID", rowSpan: 2 },
    { headerName: "Created At", rowSpan: 2 },
    { headerName: "TSR Imposition", colSpan: 9 },
    { headerName: "TSR Alteration ", colSpan: 8 },
    { headerName: "TSR Cancellation ", colSpan: 7 },
   
    { headerName: "Name of TC", rowSpan: 2 },
    { headerName: "Emp.Id of TC", rowSpan: 2  },
    { headerName: "Name of ACC.", rowSpan: 2 },
    { headerName: "Emp.id of ACC", rowSpan: 2 },
   
  ],
  [ 
    { headerName: "Date and Time ", isDate: false },
    { headerName: "Details of TSR imposed in section (Block id/KP/Chainage/Mast no.)", isDate: false },
    { headerName: "Authority/Dept instruction for imposing TSR ", isDate: false },
    { headerName: "Reason of imposing of TSR in brief", isDate: false },
    { headerName: "Name of TC", rowSpan: 2 },
    { headerName: "Emp.Id of TC", rowSpan: 2  },
    { headerName: "Name of ACC.", rowSpan: 2 },
    { headerName: "Emp.id of ACC", rowSpan: 2 },
    { headerName: "Remarks", isDate: false },
    { headerName: "Date and Time ", isDate: false },
    { headerName: "Details of TSR after alteration in section (Block id/KP/Chainage/Mast no.)", isDate: false },
    { headerName: "Authority/Dept. instruction ", isDate: false },
    { headerName: "Name of TC", rowSpan: 2 },
    { headerName: "Emp.Id of TC", rowSpan: 2  },
    { headerName: "Name of ACC.", rowSpan: 2 },
    { headerName: "Emp.id of ACC", rowSpan: 2 },
    { headerName: "Remarks", isDate: false },
    { headerName: "Date and Time ", isDate: false },
   
    { headerName: "Authority/Dept. instruction for Cancellation of TSR ", isDate: false },
    { headerName: "Name of TC", rowSpan: 2 },
    { headerName: "Emp.Id of TC", rowSpan: 2  },
    { headerName: "Name of ACC.", rowSpan: 2 },
    { headerName: "Emp.id of ACC", rowSpan: 2 },
    { headerName: "Remarks", isDate: false },
  ],
  [
    { field: "form_id", isDate: false },
    { field: "created_at", isDate: true },
    { field: "tsrImposition.dateTime", isDate: false },
    { field: "tsrImposition.details", isDate: false },
    { field: "tsrImposition.authority", isDate: false },
    { field: "tsrImposition.reason", isDate: false },
    { field: "tsrImposition.remarks", isDate: false },
    { field: "tsrAlteration.dateTime", isDate: false },
    { field: "tsrAlteration.details", isDate: false },
    { field: "tsrAlteration.authority", isDate: false },
  
    { field: "tsrAlteration.remarks", isDate: false },
    { field: "tsrCancellation.dateTime", isDate: false },
    { field: "tsrCancellation.authority", isDate: false },
  
    { field: "tsrCancellation.remarks", isDate: false },
    { field: "tcName", isDate: false },

    { field: "tcEmpId", isDate: false },
    { field: "accName", isDate: false },

    { field: "accEmpId", isDate: false },
       
  ],
];

export const foundreceivedarticles = [
  [
    { headerName: "ID", rowSpan: 2 },
    { headerName: "Created At", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    { headerName: "handing over the article By", colSpan: 2 },
   { headerName: "Description of the article ", rowSpan: 2 },
   
    { headerName: "Place where article was found", rowSpan: 2 },
    { headerName: "Identifiable /Unique  Details", rowSpan: 2  },
    { headerName: "Received By", colSpan: 2},
    { headerName: "Remarks if any", rowSpan: 2 },
    { headerName: "If Claimed Then S.No. of The", colSpan: 2},
  
    { headerName: "If Sent to Lost & Found office", colSpan: 4},
    { headerName: "action", rowSpan: 2},
  ],
  [ 
    { headerName: "Name ", isDate: false },
    { headerName: "Type", isDate: false },
    { headerName: "Emp ", isDate: false },
    { headerName: "Name", isDate: false },
    
    { headerName: "CDR", isDate: false },
    { headerName: "Declaration Form", isDate: false },
    { headerName: "Date", isDate: false },
    { headerName: "Time", isDate: false },
    { headerName: "Foil No", isDate: false },
   
    { headerName: "Sent By Emp ", isDate: false },
   
  ],
  [
    { field: "id", isDate: false },
    { field: "created_at", isDate: true },
    { field: "station", isDate: false },
    { field: "handedOverByName", isDate: false },
    { field: "handedOverByType", isDate: false },
    { field: "description", isDate: false },
    { field: "foundPlace", isDate: false },
    { field: "identifiableDetails", isDate: false },
    { field: "receivedByName", isDate: false },
    { field: "receivedByEmp", isDate: false },
  
    { field: "remarks", isDate: false },
    { field: "cdrForm", isDate: false },
    { field: "claimedSNo", isDate: false },
    
  
    { field: "sentToLostAndFoundDate", isDate: false },
    { field: "sentToLostAndFoundTime", isDate: false },

    { field: "sentToLostAndFoundByEmp", isDate: false },
    { field: "sentToLostAndFoundByName", isDate: false },

  
       
  ],
];
export const foundreceivedforeigncurrency = [
  [
    { headerName: "ID", rowSpan: 2 },
    { headerName: "Created At", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    { headerName: "handing over the article By", colSpan: 2 },
   { headerName: "Package/Purse ", rowSpan: 2 },
   
    { headerName: "Currency no.", rowSpan: 2 },
    { headerName: "Name of Country", rowSpan: 2  },
    { headerName: "Value Mention in Number", rowSpan: 2 },
    { headerName: "Name of Currency (Dollar, Euro, Pound Etc.)", rowSpan: 2  },
    { headerName: "Any other Identification/Unique Mark", rowSpan: 2 },
    { headerName: "Place Currency Found", rowSpan: 2  },
    { headerName: "Remarks if any", rowSpan: 2 },
    { headerName: "Received By", colSpan: 2},
    { headerName: "If Sent to Lost & Found office", colSpan: 5},
    { headerName: "If Claimed Then S.No. of The", colSpan: 2},
    { headerName: "Action", rowSpan: 2 },
   
  
  ],
  [ 
    { headerName: "Name ", isDate: false },
    { headerName: "Type", isDate: false },
    { headerName: "Emp ", isDate: false },
    { headerName: "Name", isDate: false },
    
  
    { headerName: "Date", isDate: false },
    { headerName: "Time", isDate: false },
    { headerName: "Foil No", isDate: false },
   
    { headerName: "Sent By Emp ", isDate: false },
    { headerName: "Sent By Name ", isDate: false },
    { headerName: "CDR", isDate: false },
    { headerName: "Declaration Form", isDate: false },
  ],
  [
    { field: "id", isDate: false },
    { field: "created_at", isDate: true },
    { field: "station", isDate: false },
    { field: "handedOverByName", isDate: false },
    { field: "handedOverByType", isDate: false },
    { field: "packageOrPurse", isDate: false },
    { field: "currencyNo", isDate: false },
    { field: "countryName", isDate: false },
    { field: "valueInNumber", isDate: false },

    { field: "currencyName", isDate: false },

    

    { field: "identificationMark", isDate: false },
    { field: "placeFound", isDate: false },
    { field: "remarks", isDate: false },
    { field: "receivedByEmp", isDate: false },
    { field: "receivedByName", isDate: false },
    
  
   
   
    
  
    { field: "sentToLostAndFoundDate", isDate: false },
    { field: "sentToLostAndFoundTime", isDate: false },
    { field: "sentToLostAndFoundFoilNo", isDate: false },
    { field: "sentToLostAndFoundByEmp", isDate: false },
    { field: "sentToLostAndFoundByName", isDate: false },
    { field: "claimSNo", isDate: false },
    { field: "declarationForm", isDate: false },
  
       
  ],
];

export const stockmovementcards = [
  [
    { headerName: "ID", rowSpan: 2 },
    { headerName: "Created At", rowSpan: 2 },
    { headerName: "Station", rowSpan: 2 },
    { headerName: "SC Emp", rowSpan: 2 },
   { headerName: "SC Name ", rowSpan: 2 },
   
    { headerName: "CRA Emp", rowSpan: 2 },
    { headerName: "CRA Name", rowSpan: 2  },
    { headerName: "Opening Stock", colSpan: 5 },
    { headerName: "Stock Movement", colSpan: 9 },
    { headerName: "Closing Stock", colSpan: 5 },
    { headerName: "Action", rowSpan: 2  },
  
  ],
  [ 
    { headerName: "SV", isDate: false },
    { headerName: "SSC", isDate: false },
    { headerName: "BL", isDate: false },
    { headerName: "T1", isDate: false },
    { headerName: "T3", isDate: false },
  
    { headerName: "ISSUE CARD ID", isDate: false },
    { headerName: "Card Type", isDate: false },
    { headerName: "Tick if sold", isDate: false },
   
    { headerName: "Fresh ", isDate: false },
    { headerName: "Defective ", isDate: false },
    { headerName: "CSC ID", isDate: false },
    { headerName: "AFC Amt", isDate: false },
    { headerName: "Actual", isDate: false },
    { headerName: "Diff (If any)", isDate: false },

    { headerName: "SV", isDate: false },
    { headerName: "SSC", isDate: false },
    { headerName: "BL", isDate: false },
    { headerName: "T1", isDate: false },
    { headerName: "T3", isDate: false },
  ],
  [
    { field: "id", isDate: false },
    { field: "created_at", isDate: true },
    { field: "station", isDate: false },
    { field: "scEmp", isDate: false },
    { field: "scName", isDate: false },
    { field: "craEmp", isDate: false },
    { field: "craName", isDate: false },
    { field: "openingStock.SV", isDate: false },
    { field: "valueInNumber", isDate: false },

    { field: "currencyName", isDate: false },

    { field: "identificationMark", isDate: false },
    { field: "placeFound", isDate: false },
    { field: "remarks", isDate: false },
    { field: "receivedByEmp", isDate: false },
    { field: "receivedByName", isDate: false },
  
    { field: "sentToLostAndFoundDate", isDate: false },
    { field: "sentToLostAndFoundTime", isDate: false },
    { field: "sentToLostAndFoundFoilNo", isDate: false },
    { field: "sentToLostAndFoundByEmp", isDate: false },
    { field: "sentToLostAndFoundByName", isDate: false },
    { field: "claimSNo", isDate: false },
    { field: "declarationForm", isDate: false },
  
    { field: "sentToLostAndFoundByEmp", isDate: false },
    { field: "sentToLostAndFoundByName", isDate: false },
    { field: "claimSNo", isDate: false },
    { field: "declarationForm", isDate: false },
  ],
];



export const stockmovementrcards = [
  [
    { headerName: "ID", rowSpan: 2, field: "id" },
    { headerName: "Created At", rowSpan: 2, field: "created_at" },
    { headerName: "Station", rowSpan: 2, field: "station" },
    { headerName: "SC Emp", rowSpan: 2, field: "scEmp" },
    { headerName: "SC Name", rowSpan: 2, field: "scName" },
    { headerName: "CRA Emp", rowSpan: 2, field: "craEmp" },
    { headerName: "CRA Name", rowSpan: 2, field: "craName" },
    { headerName: "Opening Stock", colSpan: 5 },
    { headerName: "Stock Movement", colSpan: 9 },
    { headerName: "Closing Stock", colSpan: 5 },
    { headerName: "Action", rowSpan: 2 },
  ],
  [
    { headerName: "SV", field: "openingStock.SV" },
    { headerName: "SSC", field: "openingStock.SSC" },
    { headerName: "BL", field: "openingStock.BL" },
    { headerName: "T1", field: "openingStock.T1" },
    { headerName: "T3", field: "openingStock.T3" },
    { headerName: "ISSUE CARD ID", field: "transactions.issueCardId" },
    { headerName: "Card Type", field: "transactions.cardType" },
    { headerName: "Tick if sold", field: "transactions.sold" },
    { headerName: "Fresh", field: "transactions.fresh" },
    { headerName: "Defective", field: "transactions.defective" },
    { headerName: "CSC ID", field: "transactions.cscId" },
    { headerName: "AFC Amt", field: "transactions.afcAmt" },
    { headerName: "Actual", field: "transactions.actual" },
    { headerName: "Diff (If any)", field: "transactions.diff" },
    { headerName: "SV", field: "closingStock.SV" },
    { headerName: "SSC", field: "closingStock.SSC" },
    { headerName: "BL", field: "closingStock.BL" },
    { headerName: "T1", field: "closingStock.T1" },
    { headerName: "T3", field: "closingStock.T3" },
  ],
];




export const handintakingovernotes = [
  [
  { headerName: "item description", rowSpan: 2, },
  {  headerName: "Part No.", rowSpan: 2, },
  { headerName: "Serial No.",rowSpan: 2, },
  {  headerName: "Location From",rowSpan: 2, },
  {  headerName: "Location To", rowSpan: 2, },
  { headerName: "Qty.", rowSpan: 2, },
  {
    
    headerName: "Defective/Serviceable/Repaired",
    rowSpan: 2,
  },
  {  headerName: "Material ID", rowSpan: 2, },
  {  headerName: "Remarks", rowSpan: 2, },

  {  headerName: "Handed Over By", colSpan: 4, },
  {  headerName: "Taken Over By", colSpan: 4, },
  {  headerName: "action", rowSpan: 2, },
],
[ 
  { headerName: "Name", isDate: false },
  { headerName: "Designation", isDate: false },
  { headerName: "Emp ID", isDate: false },
  { headerName: "Date", isDate: false },
  { headerName: "Name", isDate: false },
  { headerName: "Designation", isDate: false },
  { headerName: "Emp ID", isDate: false },
  { headerName: "Date", isDate: false },
],
[

{ field: "itemDescription",  isDate: false },
{ field: "partNo", isDate: false },
{ field: "serialNo",  isDate: false },
{ field: "locationFrom", isDate: false },
{ field: "locationTo",  isDate: false },
{ field: "qty", isDate: false },
{
  field: "condition",
 
  isDate: false,
},
{ field: "authRefNo", isDate: false },
{ field: "remarks",  isDate: false },
{ field: "",  isDate: false },
{ field: "",  isDate: false },
{ field: "",  isDate: false },
{ field: "",  isDate: false },
{ field: "",  isDate: false },
{ field: "",  isDate: false },
{ field: "",  isDate: false },
{ field: "",  isDate: false },
]
]