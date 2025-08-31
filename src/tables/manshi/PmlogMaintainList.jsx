import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, saveData } from "../../reducer/manshi/PmlogMaintainReducer";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import FormTable from "../../component/FormTable";
import { formConfigs } from "../../utils/formConfig";

const PmlogMaintainList = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state || {};
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Pmlogmainline6.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata") || "{}");
  const dispatch = useDispatch();
  const Pmlog = useSelector((state) => state.PmlogMaintain || {});
  const data = Pmlog.data?.data?.filter((itm) => itm.id === id) || [];

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`/list/${Pmlog.slug}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to={`/form/${Pmlog.slug}`} className="text-gray-500 hover:text-gray-700">
            {formConfigs["afc-preventive-maintenance-monthly-tom-ec"].title}
          </Link>
          <span className="text-gray-700">List</span>
        </Breadcrumbs>
      </div>
      <FormTable
        data={data}
        config={formConfigs["afc-preventive-maintenance-monthly-tom-ec"]}
        user={user}
        handleSave={handleSave}
      />
    </div>
  );
};

export default PmlogMaintainList;