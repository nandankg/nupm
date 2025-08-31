import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  revisedBudget,
  editData,
  budgetheadList,
  subheadList,
  fetchData,
} from "../../reducer/store/BudgetAllotmentReducer"

const BudgetAllotmentForm = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const budgetData = useSelector((state) => state.budgetallotment);
  console.log(budgetData)
  // const error = useSelector((state) => state.budgetallotment.error);
  const user = JSON.parse(localStorage.getItem('userdata'));

  const [selectedBudgetHead, setSelectedBudgetHead] = useState('');
  const [selectedBudgetSubhead, setSelectedBudgetSubhead] = useState('');
  const [selectedFinancialYear, setSelectedFinancialYear] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [originalAmount, setOriginalAmount] = useState('');
  const [revisedAmount, setRevisedAmount] = useState('');
  const [message, setMessage] = useState('');

  // Fetch budget data on mount
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Compute unique budget heads
  const uniqueBudgetHeads = useMemo(() => {
    const heads = new Set(budgetData?.data?.data?.map((item) => item.budgetHead));
    return [...heads].sort();
  }, [budgetData]);

  // Compute unique budget subheads based on selected budget head
  const uniqueBudgetSubheads = useMemo(() => {
    if (!selectedBudgetHead) return [];
    const subheads = new Set(
     budgetData?.data?.data
        .filter((item) => item.budgetHead === selectedBudgetHead)
        .map((item) => item.budgetSubhead)
    );
    return [...subheads].sort();
  }, [selectedBudgetHead, budgetData]);

  // Compute unique financial years and departments based on selected budget head and subhead
  const uniqueFinancialYears = useMemo(() => {
    if (!selectedBudgetHead || !selectedBudgetSubhead) return [];
    const years = new Set(
      budgetData?.data?.data
        .filter(
          (item) =>
            item.budgetHead === selectedBudgetHead &&
            item.budgetSubhead === selectedBudgetSubhead
        )
        .map((item) => item.financialYear)
    );
    return [...years].sort();
  }, [selectedBudgetHead, selectedBudgetSubhead, budgetData]);

  const uniqueDepartments = useMemo(() => {
    if (!selectedBudgetHead || !selectedBudgetSubhead) return [];
    const departments = new Set(
      budgetData?.data?.data
        .filter(
          (item) =>
            item.budgetHead === selectedBudgetHead &&
            item.budgetSubhead === selectedBudgetSubhead
        )
        .map((item) => item.department)
    );
    return [...departments].sort();
  }, [selectedBudgetHead, selectedBudgetSubhead, budgetData]);

  // Find selected record
  const selectedRecord = useMemo(() => {
    if (
      !selectedBudgetHead ||
      !selectedBudgetSubhead ||
      !selectedFinancialYear ||
      !selectedDepartment
    )
      return null;
    return budgetData?.data?.data?.find(
      (item) =>
        item.budgetHead === selectedBudgetHead &&
        item.budgetSubhead === selectedBudgetSubhead &&
        item.financialYear === selectedFinancialYear &&
        item.department === selectedDepartment
    );
  }, [
    selectedBudgetHead,
    selectedBudgetSubhead,
    selectedFinancialYear,
    selectedDepartment,
    budgetData,
  ]);

  // Reset dependent dropdowns when a higher-level selection changes
  const handleBudgetHeadChange = (e) => {
    setSelectedBudgetHead(e.target.value);
    setSelectedBudgetSubhead('');
    setSelectedFinancialYear('');
    setSelectedDepartment('');
    setOriginalAmount('');
    setRevisedAmount('');
    setMessage('');
  };

  const handleBudgetSubheadChange = (e) => {
    setSelectedBudgetSubhead(e.target.value);
    setSelectedFinancialYear('');
    setSelectedDepartment('');
    setOriginalAmount('');
    setRevisedAmount('');
    setMessage('');
  };

  // Handle Original Budget Allotment
  const handleOriginalAllotment = (e) => {
    e.preventDefault();
    if (!selectedRecord) {
      setMessage('Please select all dropdowns to proceed.');
      return;
    }
    if (selectedRecord.alloted_amount > 0) {
      setMessage('Original Budget Allotment already exists for this selection.');
      return;
    }
    const amount = parseFloat(originalAmount);
    if (!amount || amount <= 0) {
      setMessage('Please enter a valid positive amount.');
      return;
    }

    const allotmentData = {
      budgetHead_id: selectedRecord.budgetHead_id,
      budgetHead: selectedRecord.budgetHead,
      budgetSubhead: selectedRecord.budgetSubhead,
      financialYear: selectedRecord.financialYear,
      department: selectedRecord.department,
      amount,
      
    };

    dispatch(editData(allotmentData))
      .then(() => {

        setMessage('Original Budget Allotment saved successfully.');
        setOriginalAmount('');
      })
      .catch(() => {
        setMessage('Error saving Original Budget Allotment.');
      });
      //  navigate(`/list/expenditure-budget-register`);
  };

  // Handle Revised Budget Allotment
  const handleRevisedAllotment = (e) => {
    e.preventDefault();
    if (!selectedRecord) {
      setMessage('Please select all dropdowns to proceed.');
      return;
    }
    if (selectedRecord.alloted_amount === 0) {
      setMessage('Original Budget Allotment must be done first.');
      return;
    }
    const amount = parseFloat(revisedAmount);
    if (!amount || amount <= 0) {
      setMessage('Please enter a valid positive amount.');
      return;
    }

    const allotmentData = {
        id: selectedRecord.budgetHead_id,
      budgetHead: selectedRecord.budgetHead,
      budgetSubhead: selectedRecord.budgetSubhead,
      financialYear: selectedRecord.financialYear,
      department: selectedRecord.department,
      amount,
      
    };

    dispatch(revisedBudget(allotmentData))
      .then(() => {
        setMessage('Revised Budget Allotment saved successfully.');
        setRevisedAmount('');
      })
      .catch(() => {
        setMessage('Error saving Revised Budget Allotment.');
      });
      // navigate(`/list/expenditure-budget-register`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Budget Allotment System</h2>

      
      {message && <div className="text-blue-500 mb-4">{message}</div>}

      {/* Budget Head Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Budget Head
        </label>
        <select
          value={selectedBudgetHead}
          onChange={handleBudgetHeadChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Budget Head</option>
          {uniqueBudgetHeads.map((head) => (
            <option key={head} value={head}>
              {head}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Subhead Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Budget Subhead
        </label>
        <select
          value={selectedBudgetSubhead}
          onChange={handleBudgetSubheadChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedBudgetHead}
        >
          <option value="">Select Budget Subhead</option>
          {uniqueBudgetSubheads.map((subhead) => (
            <option key={subhead} value={subhead}>
              {subhead}
            </option>
          ))}
        </select>
      </div>

      {/* Financial Year Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Financial Year
        </label>
        <select
          value={selectedFinancialYear}
          onChange={(e) => setSelectedFinancialYear(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedBudgetSubhead}
        >
          <option value="">Select Financial Year</option>
          {uniqueFinancialYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Department Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Department
        </label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedBudgetSubhead}
        >
          <option value="">Select Department</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Record Details */}
      {selectedRecord && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Selected Budget Details</h3>
          <p><strong>ID:</strong> {selectedRecord.id}</p>
          <p><strong>Budget Head:</strong> {selectedRecord.budgetHead}</p>
          <p><strong>Budget Subhead:</strong> {selectedRecord.budgetSubhead}</p>
          <p><strong>Financial Year:</strong> {selectedRecord.financialYear}</p>
          <p><strong>Department:</strong> {selectedRecord.department}</p>
          <p><strong>Budget Type:</strong> {selectedRecord.budgetType}</p>
          <p><strong>Alloted Amount:</strong> ₹{selectedRecord.alloted_amount}</p>
          <p><strong>Revised Amount:</strong> ₹{selectedRecord.revised_amount}</p>
          <p><strong>Balance Amount:</strong> ₹{selectedRecord.balance_amount}</p>
          <p><strong>Total Alloted Amount:</strong> ₹{selectedRecord.total_alloted_amount}</p>
          <p><strong>Employee Name:</strong> {selectedRecord.employee_name}</p>
          <p><strong>Employee ID:</strong> {selectedRecord.employee_id}</p>
          <p><strong>Status:</strong> {selectedRecord.status === "1" ? "Active" : "Inactive"}</p>
          <p><strong>Created At:</strong> {selectedRecord.created_at}</p>
          <p><strong>Updated At:</strong> {selectedRecord.updated_at}</p>
        </div>
      )}

      {/* Original Budget Allotment Form */}
      {selectedRecord && selectedRecord.alloted_amount === 0 && (
        <form onSubmit={handleOriginalAllotment} className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Original Budget Allotment</h3>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Amount (₹)
            </label>
            <input
              type="number"
              value={originalAmount}
              onChange={(e) => setOriginalAmount(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Original Allotment
          </button>
        </form>
      )}

      {/* Revised Budget Allotment Form */}
      {selectedRecord && selectedRecord.alloted_amount > 0 && (
        <form onSubmit={handleRevisedAllotment} className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Revised Budget Allotment</h3>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Revised Amount (₹)
            </label>
            <input
              type="number"
              value={revisedAmount}
              onChange={(e) => setRevisedAmount(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter revised amount"
              min="0"
              step="0.01"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Revised Allotment
          </button>
        </form>
      )}
    </div>
  );
};

export default BudgetAllotmentForm;