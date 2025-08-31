import React, { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, saveData } from "../reducer/AfcPreventReducer";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import FormTable from "../component/FormTable";
import { formConfigs } from "../utils/formConfig";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const AfcPreventformList = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userdata") || "{}");
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "AfcAnnexureAList.pdf" });
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { id } = state || {};
  const addAfclist = useSelector((state) => state.afcpreventchkformstate || {});
  const slug = getLastParameter().trim();
  const data = addAfclist.data?.data?.filter((itm) => itm.id === id) || [];

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to={`/form/${slug}`} className="text-gray-500 hover:text-gray-700">
            {formConfigs["afc-preventive-maintenance-monthly-annexure-a"].title}
          </Link>
          <span className="text-gray-700">List</span>
        </Breadcrumbs>
      </div>
      <FormTable
        data={data}
        config={formConfigs["afc-preventive-maintenance-monthly-annexure-a"]}
        user={user}
        handleSave={handleSave}
      />
    </div>
  );
};

export default AfcPreventformList;