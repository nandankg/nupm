export const formConfig = {
  jobCard: {
    title: "Job Card Form",
    redirectPath: "/list/jobCard",
    fields: [
      { name: "jcNo", label: "Job Card No.", type: "number" },
      {
        name: "date",
        label: "Date",
        type: "date",
        defaultValue: new Date().toISOString().split("T")[0],
      },
      { name: "trainNumber", label: "Train Number", type: "text" },
      { name: "work", label: "Work", type: "textarea" },
      {
        name: "roofAccessRequired",
        label: "Roof Access Required",
        type: "checkbox",
      },
      // Add more names as needed
    ],
  },

  loanregistertelecom: {
    title: "Loan Register Telecom",
    redirectPath: "/list/loan-register-telecom",
    fields: [
      { name: "date", label: "Date", type: "date" },
      { name: "itemdes", label: "Item Description", type: "text" },
      { name: "make", label: "Make/Model/Serial No.", type: "text" },
      {
        name: "returnable",
        label: "Returnable/Non Returnable",
        type: "select",
        options: [
          { label: "Returnable", value: "Returnable" },
          { label: "Non Returnable", value: "Non Returnable" },
        ],
      },
      { name: "sendto", label: "Send To", type: "text" },
      { name: "sendby", label: "Send By", type: "text" },
      { name: "receivedate", label: "Receiving Date", type: "date" },
      { name: "receiveby", label: "Received By", type: "text" },
      { name: "remarks", label: "Remark", type: "text" },
    ],
  },
};
