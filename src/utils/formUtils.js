// utils/formUtils.js

export const initializeFormValues = (data) => ({
  id: data.id || "",
  stationName: data.station_name || "",
  dateOfInstallation: data.Dateofinstallation || "",
  descriptionOfMaterial: data.DescriptionOfMaterial || "",
  makeModelPartNo: data.make || "",
  serialNo: data.serialno || "",
  quantity: data.qty || "",
  location: data.location || "",
  remarks: data.remark || "",
});
export const loanregistertelecom = (data) => ({
  id: data.id,
  date: data.date,
  itemdes: data.itemdes,
  make: data.make,
  returnable: data.returnable,
  sendto: data.sendto,
  sendby: data.sendby,
  signon: data.signon,
  receivedate: data.receivedate,
  receiveby: data.receiveby,
  signonduty: data.signonduty,
  remarks: data.remarks,
});
export const dtrissue=(data)=>({
  update_id: data.id,
  date: data.date,
  material_desc: data.material,
  qty: data.qty,
  ledger_no: data.ledger,
  challan_no: data.challanno,
  challan_date: data.challandate,
  issued_name: data.name,
  issued_designation: data.desig,
  for_whatWork: data.work,
  location: data.location,
  
  
});