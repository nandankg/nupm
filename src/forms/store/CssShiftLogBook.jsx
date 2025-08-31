import React, { useState } from "react";
import { useOperationForm } from "../../shared/api";

const CssShiftLogBook = () => {
  const { loading, submitForm } = useOperationForm("css-shift-logbook", {
    onSubmitSuccess: (result) => {
      setFormData({
        date: "",
        shift: "",
        section: "",
        specialInstructions: "",
        cssStaff: [{ no: 1, name: "", designation: "" }],
        sectionStaff: [{ no: 1, name: "", designation: "", section: "" }],
        failureRecords: [{
          no: 1,
          failureDetails: "",
          failureTime: "",
          rectificationTime: "",
          remarks: "",
          attendedBy: "",
        }],
        shiftActivities: "",
        handedOverBy: "",
        handedOverSign: "",
        takenOverBy: "",
        takenOverSign: "",
      });
    }
  });
  const [formData, setFormData] = useState({
    date: "",
    shift: "",
    section: "",
    specialInstructions: "",
    cssStaff: [{ no: 1, name: "", designation: "" }],
    sectionStaff: [{ no: 1, name: "", designation: "", section: "" }],
    failureRecords: [
      {
        no: 1,
        failureDetails: "",
        failureTime: "",
        rectificationTime: "",
        remarks: "",
        attendedBy: "",
      },
    ],
    shiftActivities: "",
    handedOverBy: "",
    handedOverSign: "",
    takenOverBy: "",
    takenOverSign: "",
  });

  const handleInputChange = (
    field,
    value,
    index = null,
    sectionName = null
  ) => {
    if (sectionName) {
      const newSection = [...formData[sectionName]];
      newSection[index][field] = value;
      setFormData({ ...formData, [sectionName]: newSection });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAddRow = (sectionName) => {
    const newSection = [
      ...formData[sectionName],
      { no: formData[sectionName].length + 1 },
    ];
    setFormData({ ...formData, [sectionName]: newSection });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:{" "}
        <input
          type="date"
          value={formData.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
          required
        />
      </label>
      <label>
        Shift:{" "}
        <input
          type="text"
          value={formData.shift}
          onChange={(e) => handleInputChange("shift", e.target.value)}
          required
        />
      </label>
      <label>
        Section:{" "}
        <input
          type="text"
          value={formData.section}
          onChange={(e) => handleInputChange("section", e.target.value)}
          required
        />
      </label>
      <label>
        Special Instructions:{" "}
        <textarea
          value={formData.specialInstructions}
          onChange={(e) =>
            handleInputChange("specialInstructions", e.target.value)
          }
        />
      </label>

      <h3>CSS Staff on Duty</h3>
      {formData.cssStaff.map((staff, index) => (
        <div key={index}>
          <label>No: {staff.no}</label>
          <input
            type="text"
            placeholder="Name"
            value={staff.name}
            onChange={(e) =>
              handleInputChange("name", e.target.value, index, "cssStaff")
            }
          />
          <input
            type="text"
            placeholder="Designation"
            value={staff.designation}
            onChange={(e) =>
              handleInputChange(
                "designation",
                e.target.value,
                index,
                "cssStaff"
              )
            }
          />
        </div>
      ))}
      <button type="button" onClick={() => handleAddRow("cssStaff")}>
        Add CSS Staff
      </button>

      <h3>Section Staff on Duty</h3>
      {formData.sectionStaff.map((staff, index) => (
        <div key={index}>
          <label>No: {staff.no}</label>
          <input
            type="text"
            placeholder="Name"
            value={staff.name}
            onChange={(e) =>
              handleInputChange("name", e.target.value, index, "sectionStaff")
            }
          />
          <input
            type="text"
            placeholder="Designation"
            value={staff.designation}
            onChange={(e) =>
              handleInputChange(
                "designation",
                e.target.value,
                index,
                "sectionStaff"
              )
            }
          />
          <input
            type="text"
            placeholder="Section"
            value={staff.section}
            onChange={(e) =>
              handleInputChange(
                "section",
                e.target.value,
                index,
                "sectionStaff"
              )
            }
          />
        </div>
      ))}
      <button type="button" onClick={() => handleAddRow("sectionStaff")}>
        Add Section Staff
      </button>

      <h3>Failure Records</h3>
      {formData.failureRecords.map((record, index) => (
        <div key={index}>
          <label>No: {record.no}</label>
          <input
            type="text"
            placeholder="Failure Details"
            value={record.failureDetails}
            onChange={(e) =>
              handleInputChange(
                "failureDetails",
                e.target.value,
                index,
                "failureRecords"
              )
            }
          />
          <input
            type="text"
            placeholder="Failure Time"
            value={record.failureTime}
            onChange={(e) =>
              handleInputChange(
                "failureTime",
                e.target.value,
                index,
                "failureRecords"
              )
            }
          />
          <input
            type="text"
            placeholder="Rectification Time"
            value={record.rectificationTime}
            onChange={(e) =>
              handleInputChange(
                "rectificationTime",
                e.target.value,
                index,
                "failureRecords"
              )
            }
          />
          <input
            type="text"
            placeholder="Remarks"
            value={record.remarks}
            onChange={(e) =>
              handleInputChange(
                "remarks",
                e.target.value,
                index,
                "failureRecords"
              )
            }
          />
          <input
            type="text"
            placeholder="Attended By"
            value={record.attendedBy}
            onChange={(e) =>
              handleInputChange(
                "attendedBy",
                e.target.value,
                index,
                "failureRecords"
              )
            }
          />
        </div>
      ))}
      <button type="button" onClick={() => handleAddRow("failureRecords")}>
        Add Failure Record
      </button>

      <label>
        Shift Activities:{" "}
        <textarea
          value={formData.shiftActivities}
          onChange={(e) => handleInputChange("shiftActivities", e.target.value)}
        />
      </label>
      <label>
        Charge handed over by:{" "}
        <input
          type="text"
          value={formData.handedOverBy}
          onChange={(e) => handleInputChange("handedOverBy", e.target.value)}
        />
      </label>
      <label>
        Sign:{" "}
        <input
          type="text"
          value={formData.handedOverSign}
          onChange={(e) => handleInputChange("handedOverSign", e.target.value)}
        />
      </label>
      <label>
        Charge taken over by:{" "}
        <input
          type="text"
          value={formData.takenOverBy}
          onChange={(e) => handleInputChange("takenOverBy", e.target.value)}
        />
      </label>
      <label>
        Sign:{" "}
        <input
          type="text"
          value={formData.takenOverSign}
          onChange={(e) => handleInputChange("takenOverSign", e.target.value)}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default CssShiftLogBook;
