import React, { useState } from "react";
import { useOperationForm } from "../../shared/api";
import { AccessibleFormField, AccessibleButton, LiveRegion, useAnnouncement } from "../../shared/accessibility";

const DtrReceipt = () => {
  const materialOptions = [
    { value: "", label: "Select Material ID" },
    { value: "MAT001", label: "MAT001 - Steel Rails" },
    { value: "MAT002", label: "MAT002 - Concrete Sleepers" },
    { value: "MAT003", label: "MAT003 - Signal Equipment" },
    { value: "MAT004", label: "MAT004 - Electrical Components" }
  ];
  
  const { message, announce } = useAnnouncement();
  
  const { loading, submitForm } = useOperationForm("dtr-receipt", {
    onSubmitSuccess: (result) => {
      setFormData([{
        materialId: "",
        descriptionOfMaterial: "",
        quantity: "",
        ledgerNo: "",
        invoiceNoAndDate: "",
        fromWhomReceived: "",
        workAndLocation: "",
        signOfReceiver: "",
      }]);
      announce("Form submitted successfully!", "assertive");
    },
    onSubmitError: (error) => {
      announce("Failed to submit form. Please check your inputs and try again.", "assertive");
    }
  });

  const [formData, setFormData] = useState([
    {
      materialId: "",
      descriptionOfMaterial: "",
      quantity: "",
      ledgerNo: "",
      invoiceNoAndDate: "",
      fromWhomReceived: "",
      workAndLocation: "",
      signOfReceiver: "",
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const handleAddRow = () => {
    const newRowIndex = formData.length + 1;
    setFormData([
      ...formData,
      {
        materialId: "",
        descriptionOfMaterial: "",
        quantity: "",
        ledgerNo: "",
        invoiceNoAndDate: "",
        fromWhomReceived: "",
        workAndLocation: "",
        signOfReceiver: "",
      },
    ]);
    announce(`Row ${newRowIndex} added to the form`, "polite");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm({ receiptsData: formData });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main id="main-content">
      <LiveRegion message={message} />
      <form onSubmit={handleSubmit} className="container mt-4" noValidate>
        <h1 className="mb-4">Daily Transaction Register Form</h1>
        
        <fieldset>
          <legend className="visually-hidden">Material Receipt Records</legend>
          
          {formData.map((row, index) => (
            <section 
              key={index} 
              className="row mb-3 border p-3 rounded shadow-sm"
              aria-label={`Receipt record ${index + 1} of ${formData.length}`}
            >
              <div className="col-md-3 mb-2">
                <AccessibleFormField
                  name={`materialId-${index}`}
                  label="Material ID"
                  type="select"
                  value={row.materialId}
                  onChange={(e) => handleInputChange(index, "materialId", e.target.value)}
                  options={materialOptions}
                  helpText="Select material ID from dropdown or enter custom ID below"
                  required
                />
                
                <AccessibleFormField
                  name={`materialIdCustom-${index}`}
                  label="Custom Material ID"
                  type="text"
                  value={row.materialId}
                  onChange={(e) => handleInputChange(index, "materialId", e.target.value)}
                  placeholder="Enter Material ID if not in list"
                  helpText="Enter custom material ID if not found in dropdown"
                />
              </div>
              
              <div className="col-md-3 mb-2">
                <AccessibleFormField
                  name={`descriptionOfMaterial-${index}`}
                  label="Description of Material"
                  type="text"
                  value={row.descriptionOfMaterial}
                  onChange={(e) => handleInputChange(index, "descriptionOfMaterial", e.target.value)}
                  required
                  helpText="Provide detailed description of the material"
                />
              </div>
              
              <div className="col-md-2 mb-2">
                <AccessibleFormField
                  name={`quantity-${index}`}
                  label="Quantity"
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                  required
                  min="0"
                  helpText="Enter quantity received"
                />
              </div>
              
              <div className="col-md-2 mb-2">
                <AccessibleFormField
                  name={`ledgerNo-${index}`}
                  label="Ledger No./Page"
                  type="text"
                  value={row.ledgerNo}
                  onChange={(e) => handleInputChange(index, "ledgerNo", e.target.value)}
                  helpText="Reference ledger number or page"
                />
              </div>
              
              <div className="col-md-3 mb-2">
                <AccessibleFormField
                  name={`invoiceNoAndDate-${index}`}
                  label="Invoice/Challan No. & Date"
                  type="text"
                  value={row.invoiceNoAndDate}
                  onChange={(e) => handleInputChange(index, "invoiceNoAndDate", e.target.value)}
                  helpText="Include invoice number and date"
                />
              </div>
              
              <div className="col-md-4 mb-2">
                <AccessibleFormField
                  name={`fromWhomReceived-${index}`}
                  label="From Whom Received (Name, Designation & Signature)"
                  type="text"
                  value={row.fromWhomReceived}
                  onChange={(e) => handleInputChange(index, "fromWhomReceived", e.target.value)}
                  helpText="Include name, designation and signature of person providing material"
                />
              </div>
              
              <div className="col-md-3 mb-2">
                <AccessibleFormField
                  name={`workAndLocation-${index}`}
                  label="For What Work & Location"
                  type="text"
                  value={row.workAndLocation}
                  onChange={(e) => handleInputChange(index, "workAndLocation", e.target.value)}
                  helpText="Specify the work purpose and location"
                />
              </div>
              
              <div className="col-md-2 mb-2">
                <AccessibleFormField
                  name={`signOfReceiver-${index}`}
                  label="Sign of Receiver"
                  type="text"
                  value={row.signOfReceiver}
                  onChange={(e) => handleInputChange(index, "signOfReceiver", e.target.value)}
                  helpText="Signature of person receiving the material"
                />
              </div>
            </section>
          ))}
        </fieldset>
        
        <div className="d-flex gap-3 mb-3">
          <AccessibleButton
            type="button"
            variant="primary"
            onClick={handleAddRow}
            ariaLabel="Add new material receipt row"
          >
            Add Row
          </AccessibleButton>
          
          <AccessibleButton
            type="submit"
            variant="success"
            loading={loading}
            loadingText="Saving receipt data..."
            ariaLabel="Save all material receipt data"
          >
            Save Receipt Data
          </AccessibleButton>
        </div>
      </form>
    </main>
  );
};

export default DtrReceipt;
