import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { fetchData, saveData } from "../../reducer/rajiv/MJL11Reducer";
import {
  biweeklyActivities,
  monthlyActivities,
  quarterly1Activities,
  quarterly2Activities,
  halfYearlyActivities,
  periodicityOptions,
  monthOptions,
  quarterlyRanges,
  halfYearlyRanges,
} from "../../data/activities";
import stationData from "../../data/station.json";

// Status options for dropdown
const statusOptions = [
  { value: "", label: "Select Status" },
  { value: "DONE", label: "DONE" },
  { value: "NOT DONE", label: "NOT DONE" },
  { value: "OK", label: "OK" },
  { value: "NOT OK", label: "NOT OK" },
];

const MJL11 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const user = JSON.parse(localStorage.getItem("userdata")) || {};
  const mjl11Data = useSelector((state) => state.MJL11 || {});
  const [formValues, setFormValues] = useState({
    id: id || null,
    form_id: `OMR${id || Math.floor(Math.random() * 1000)}`,
    date: null,
    station: "",
    pointNo: "",
    biweekly: Array(8).fill().map(() => ({
      month: "",
      status: "",
      remark: "",
    })),
    monthly: Array(42).fill().map(() => ({
      month: "",
      status: "",
      remark: "",
    })),
    quarterly1: Array(20).fill().map(() => ({
      range: "",
      status: "",
      remark: "",
    })),
    quarterly2: Array(12).fill().map(() => ({
      range: "",
      status: "",
      remark: "",
    })),
    halfYearly: Array(7).fill().map(() => ({
      range: "",
      status: "",
      remark: "",
    })),
    remarks: "",
    signature: user?.name || "",
    name: user?.name || "",
    designation: "",
    empno: "",
    csign: "",
    status: "0",
    employee_id: user?.employee_id || "",
    employee_name: user?.name || "",
    department: "Signalling",
    unit: "Signalling",
    created_at: null,
    updated_at: null,
  });
  const [periodicity, setPeriodicity] = useState("biweekly");
  const [error, setError] = useState(null);

  // Map periodicity to activities and ranges
  const periodicityConfig = {
    biweekly: { activities: biweeklyActivities, ranges: monthOptions },
    monthly: { activities: monthlyActivities, ranges: monthOptions },
    quarterly1: { activities: quarterly1Activities, ranges: quarterlyRanges },
    quarterly2: { activities: quarterly2Activities, ranges: quarterlyRanges },
    halfYearly: { activities: halfYearlyActivities, ranges: halfYearlyRanges },
  };

  // Fetch data if editing
  useEffect(() => {
    if (id) {
      dispatch(fetchData(id))
        .unwrap()
        .then((data) => {
          if (data && data.data) {
            // Map backend status ("0" or "1") to form status
            const mapStatus = (status) => {
              if (status === "1") return "DONE";
              if (status === "0") return "NOT DONE";
              return status || "";
            };
            setFormValues((prev) => ({
              ...prev,
              ...data.data,
              date: data.data.date ? dayjs(data.data.date) : null,
              biweekly: (data.data.biweekly || prev.biweekly).map((item) => ({
                month: item.month || "",
                status: mapStatus(item.status),
                remark: item.remark || "",
              })),
              monthly: (data.data.monthly || prev.monthly).map((item) => ({
                month: item.month || "",
                status: mapStatus(item.status),
                remark: item.remark || "",
              })),
              quarterly1: (data.data.quarterly1 || prev.quarterly1).map((item) => ({
                range: item.range || "",
                status: mapStatus(item.status),
                remark: item.remark || "",
              })),
              quarterly2: (data.data.quarterly2 || prev.quarterly2).map((item) => ({
                range: item.range || "",
                status: mapStatus(item.status),
                remark: item.remark || "",
              })),
              halfYearly: (data.data.halfYearly || prev.halfYearly).map((item) => ({
                range: item.range || "",
                status: mapStatus(item.status),
                remark: item.remark || "",
              })),
            }));
          }
        })
        .catch((err) => setError("Failed to fetch data"));
    }
  }, [id, dispatch]);

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleActivityChange = (index, field, value) => {
    setFormValues((prev) => {
      const updatedActivities = [...prev[periodicity]];
      updatedActivities[index] = {
        ...updatedActivities[index],
        [field]: value,
      };
      return { ...prev, [periodicity]: updatedActivities };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    // Map form status to backend status ("0" or "1")
    const mapStatusToBackend = (status) => {
      if (status === "DONE" || status === "OK") return "1";
      if (status === "NOT DONE" || status === "NOT OK") return "0";
      return "";
    };
    const payload = {
      ...formValues,
      date: formValues.date ? dayjs(formValues.date).format("YYYY-MM-DD") : null,
      created_at: formValues.created_at || currentDate,
      updated_at: currentDate,
      status: "0",
      employee_id: user?.employee_id || formValues.employee_id || "",
      employee_name: user?.name || formValues.employee_name || "",
      department: formValues.department || "Signalling",
      unit: formValues.unit || "Signalling",
      biweekly: formValues.biweekly.length === 8
        ? formValues.biweekly.map((item) => ({
            month: item.month || "",
            status: mapStatusToBackend(item.status),
            remark: item.remark || "",
          }))
        : Array(8).fill().map(() => ({ month: "", status: "", remark: "" })),
      monthly: formValues.monthly.length === 42
        ? formValues.monthly.map((item) => ({
            month: item.month || "",
            status: mapStatusToBackend(item.status),
            remark: item.remark || "",
          }))
        : Array(42).fill().map(() => ({ month: "", status: "", remark: "" })),
      quarterly1: formValues.quarterly1.length === 20
        ? formValues.quarterly1.map((item) => ({
            range: item.range || "",
            status: mapStatusToBackend(item.status),
            remark: item.remark || "",
          }))
        : Array(20).fill().map(() => ({ range: "", status: "", remark: "" })),
      quarterly2: formValues.quarterly2.length === 12
        ? formValues.quarterly2.map((item) => ({
            range: item.range || "",
            status: mapStatusToBackend(item.status),
            remark: item.remark || "",
          }))
        : Array(12).fill().map(() => ({ range: "", status: "", remark: "" })),
      halfYearly: formValues.halfYearly.length === 7
        ? formValues.halfYearly.map((item) => ({
            range: item.range || "",
            status: mapStatusToBackend(item.status),
            remark: item.remark || "",
          }))
        : Array(7).fill().map(() => ({ range: "", status: "", remark: "" })),
    };

    dispatch(saveData(payload))
      .unwrap()
      .then(() => navigate(`/list/${formValues.id || payload.form_id}`))
      .catch((err) => setError("Failed to save data"));
  };

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  const { activities, ranges } = periodicityConfig[periodicity] || periodicityConfig.biweekly;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">MJL11 Maintenance Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formValues.date}
                onChange={(date) => handleInputChange("date", date)}
                className="w-full"
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <label htmlFor="station" className="block text-sm font-medium text-gray-700">
              Station
            </label>
            <select
              id="station"
              className="border rounded px-3 py-2 w-full"
              value={formValues.station}
              onChange={(e) => handleInputChange("station", e.target.value)}
            >
              <option value="">Select Station</option>
              {stationData.map((station) => (
                <option key={station["STATION Code"]} value={station["STATION Code"]}>
                  {station["Station Name"]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pointNo" className="block text-sm font-medium text-gray-700">
              Point No
            </label>
            <input
              type="text"
              id="pointNo"
              className="border rounded px-3 py-2 w-full"
              value={formValues.pointNo}
              onChange={(e) => handleInputChange("pointNo", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="periodicity" className="block text-sm font-medium text-gray-700">
              Periodicity
            </label>
            <select
              id="periodicity"
              className="border rounded px-3 py-2 w-full"
              value={periodicity}
              onChange={(e) => setPeriodicity(e.target.value)}
            >
              {periodicityOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="w-full border-collapse bg-white shadow rounded mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="border px-4 py-2">S.No.</th>
              <th scope="col" className="border px-4 py-2">Category</th>
              <th scope="col" className="border px-4 py-2">Subcategory</th>
              <th scope="col" className="border px-4 py-2">Activity</th>
              <th scope="col" className="border px-4 py-2">Period</th>
              <th scope="col" className="border px-4 py-2">Status</th>
              <th scope="col" className="border px-4 py-2">Remark</th>
            </tr>
          </thead>
          <tbody>
            {activities.flatMap((group, groupIndex) =>
              group.activities.map((activity, index) => {
                const flatIndex = groupIndex * group.activities.length + index;
                const showCategory = index === 0;
                const showSubcategory = index === 0 && group.subcategory;
                return (
                  <tr key={`${periodicity}-${flatIndex}`}>
                    <td className="border px-4 py-2">{flatIndex + 1}</td>
                    {showCategory && (
                      <td
                        className="border px-4 py-2"
                        rowSpan={group.activities.length}
                      >
                        {group.category}
                      </td>
                    )}
                    {showSubcategory && (
                      <td
                        className="border px-4 py-2"
                        rowSpan={group.activities.length}
                      >
                        {group.subcategory}
                      </td>
                    )}
                    <td className="border px-4 py-2">
                      {activity.label || activity}
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={formValues[periodicity][flatIndex]?.month || formValues[periodicity][flatIndex]?.range || ""}
                        onChange={(e) =>
                          handleActivityChange(flatIndex, periodicity === "biweekly" || periodicity === "monthly" ? "month" : "range", e.target.value)
                        }
                      >
                        <option value="">Select Period</option>
                        {ranges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={formValues[periodicity][flatIndex]?.status || ""}
                        onChange={(e) =>
                          handleActivityChange(flatIndex, "status", e.target.value)
                        }
                      >
                        {statusOptions.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={formValues[periodicity][flatIndex]?.remark || ""}
                        onChange={(e) =>
                          handleActivityChange(flatIndex, "remark", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
              Remarks
            </label>
            <textarea
              id="remarks"
              className="border rounded px-3 py-2 w-full"
              value={formValues.remarks || ""}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="signature" className="block text-sm font-medium text-gray-700">
              Signature
            </label>
            <input
              type="text"
              id="signature"
              className="border rounded px-3 py-2 w-full"
              value={formValues.signature || ""}
              onChange={(e) => handleInputChange("signature", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border rounded px-3 py-2 w-full"
              value={formValues.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              id="designation"
              className="border rounded px-3 py-2 w-full"
              value={formValues.designation || ""}
              onChange={(e) => handleInputChange("designation", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="empno" className="block text-sm font-medium text-gray-700">
              Employee No
            </label>
            <input
              type="text"
              id="empno"
              className="border rounded px-3 py-2 w-full"
              value={formValues.empno || ""}
              onChange={(e) => handleInputChange("empno", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="csign" className="block text-sm font-medium text-gray-700">
              Counter Signature
            </label>
            <input
              type="text"
              id="csign"
              className="border rounded px-3 py-2 w-full"
              value={formValues.csign || ""}
              onChange={(e) => handleInputChange("csign", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            to={`/list/${formValues.id || formValues.form_id}`}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MJL11;