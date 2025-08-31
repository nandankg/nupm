// MaintenanceChecklist.js
import React, { useState, useEffect } from 'react';

// Reusable Table Component for each equipment type
const EquipmentTable = ({ title, data, frequencyType, date, month }) => {
  return (
    <div className="equipment-section mb-4">
      <h3 className="h5 mb-3">{title}</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <thead className="table-light">
            <tr>
              <th rowSpan="2" scope="col">Sr. No.</th>
              <th rowSpan="2" scope="col">Activity</th>
              <th rowSpan="2" scope="col">DESCRIPTION OF WORK</th>
              {frequencyType.map((freq, index) => (
                <th key={index} colSpan={freq.colSpan} scope="col" className="text-center">
                  {freq.label}
                </th>
              ))}
              <th rowSpan="2" scope="col">REMARKS/DEFICIENCIES</th>
              <th rowSpan="2" scope="col">ACTION TAKEN</th>
              <th rowSpan="2" scope="col">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
            </tr>
           
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.srNo}</td>
                <td>{item.activity}</td>
                <td>{item.description}</td>
                {item.frequency.map((freq, freqIndex) => (
                  <td key={freqIndex} className="text-center">
                    {typeof freq === 'boolean' ? (freq ? 'Yes' : 'No') : freq}
                  </td>
                ))}
                <td>{item.remarks}</td>
                <td>{item.actionTaken}</td>
                <td>{item.whyNotRectified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Component
const PMLogBookMonthly = () => {
  const [checklistData, setChecklistData] = useState({
    sc: [],
    avm: [],
    switch: [],
  });

  // Simulate API call
  useEffect(() => {
    // Replace this with actual API call
    const fetchData = async () => {
      const mockData = {
        sc: [
          {
            srNo: 1,
            activity: '',
            description: 'Check Fixing & Alignment of all modules of SC',
            frequency: [true, true, true, true, true, true], // Boolean values for SC
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 2,
            activity: 'Visual Inspection',
            description: 'Checking of all Cable connection and dressing',
            frequency: [true, false, true, false, true, false],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 3,
            activity: '',
            description: 'Check Date and Time',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 4,
            activity: '',
            description: 'External cleaning of all modules of SC',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 5,
            activity: 'Cleaning',
            description: 'Check working of redundant power supply of SC server',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 6,
            activity: '',
            description: 'Test different modes in device manager by applying and releasing on equipments',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
        ],
        avm: [
          {
            srNo: 1,
            activity: '',
            description: 'Check the serviceability of AVM',
            frequency: [true, true, true, true, true, true], // Boolean values for AVM
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 2,
            activity: '',
            description: 'Checking of all Cable connection and dressing',
            frequency: [true, false, true, false, true, false],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 3,
            activity: 'Visual Inspection',
            description: 'Check Date and Time',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 4,
            activity: '',
            description: 'Check Station ID',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 5,
            activity: '',
            description: 'Check Device ID',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 6,
            activity: '',
            description: 'Check Lubrication of all locks with silicone oil',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 7,
            activity: 'Module Test (Maintenance Menu)',
            description: 'Card Reader Test',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 8,
            activity: '',
            description: 'Passenger Information Display (PID) Test',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 9,
            activity: '',
            description: 'Check LAN Status (Ping Server)',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
        ],
        switch: [
          {
            srNo: 1,
            activity: '',
            description: 'Check Fixing & Alignment of all modules of Switch Rack',
            frequency: [true, true, true, true, true, true], // Boolean values for Switch
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 2,
            activity: 'Visual Inspection',
            description: 'Checking of all Cable connection and dressing',
            frequency: [true, false, true, false, true, false],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 3,
            activity: '',
            description: 'Check internal fan status of Switches',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 4,
            activity: 'Cleaning',
            description: 'Cleaning of Switch Rack and its fan',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 5,
            activity: '',
            description: 'External cleaning of Switch',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 6,
            activity: 'Module Test',
            description: 'Test of redundant link',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
          {
            srNo: 7,
            activity: '',
            description: 'Check IF Switches are working normal and all equipments are on LAN',
            frequency: [true, true, true, true, true, true],
            remarks: '',
            actionTaken: '',
            whyNotRectified: '',
          },
        ],
      };
      setChecklistData(mockData);
    };

    fetchData();
  }, []);

  const frequencyTypes = {
    sc: Array(6).fill().map((_, i) => ({ label: 'SC', colSpan: 1 })),
    avm: Array(6).fill().map((_, i) => ({ label: 'AVM', colSpan: 1 })),
    switch: Array(6).fill().map((_, i) => ({ label: 'Switch', colSpan: 1 })),
  };

  // Current date and month for demo purposes
  const currentDate = 'Date: 2025-02-27';
  const currentMonth = 'Month: February';

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-3">
        AFC PREVENTIVE MAINTENANCE CHECKLIST (MONTHLY) (ANNEXURE-A)
      </h1>
      <div className="d-flex justify-content-between mb-4 flex-wrap">
        <span>STN. NAME: _______</span>
        <span>FREQUENCY: MONTHLY</span>
        <span>{currentDate}</span>
        <span>{currentMonth}</span>
        <span>DOCUMENT NO.: O&M/AFCLINES/CH01</span>
      </div>

      {/* SC Section */}
      <EquipmentTable
        title="Equipment Sr. No.: SC"
        data={checklistData.sc}
        frequencyType={frequencyTypes.sc}
        date="2025-02-27"
        month="February"
      />

      {/* AVM Section */}
      <EquipmentTable
        title="Equipment Sr. No.: AVM (RE-FOR/WIDE-AUTOSEL)"
        data={checklistData.avm}
        frequencyType={frequencyTypes.avm}
        date="2025-02-27"
        month="February"
      />

      {/* Switch Section */}
      <EquipmentTable
        title="Equipment Sr. No.: Switch (NETWORK & ARCS)"
        data={checklistData.switch}
        frequencyType={frequencyTypes.switch}
        date="2025-02-27"
        month="February"
      />

      {/* Staff on Duty Section */}
      <div className="staff-section mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th colSpan="3" scope="col" className="text-center">
                  STAFF ON DUTY
                </th>
              </tr>
              <tr>
                <th scope="col">NAME</th>
                <th scope="col">DESG.</th>
                <th scope="col">SIGN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PMLogBookMonthly;