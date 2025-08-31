import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, saveData } from "../reducer/AfcPreAnnexureBReducer";
import { deptformlist } from "../reducer/AuthReducer";
import FormTable from "../component/FormTable";
import { formConfigs } from "../utils/formConfig";

const AfcPreAnnexureBList = () => {
  const user = JSON.parse(localStorage.getItem("userdata") || "{}");
  const dept = user.department;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state || {};
  const addAfclist = useSelector((state) => state.afcannexurestate || {});
  const formlist = useSelector((state) => state.auth.dform || []);

  useEffect(() => {
    dispatch(deptformlist(dept));
  }, [dispatch, dept]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const getNameFromSlug = (slug) => {
    const item = formlist.find((item) => item.slug === slug);
    return item ? item.name : null;
  };

  const slug = addAfclist.slug || "";
  const formname = getNameFromSlug(slug);
  const data = addAfclist.data?.data?.filter((item) => item.id === id) || [];

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="" className="text-gray-500 hover:text-gray-700">
            {formname}
          </Link>
          <span className="text-gray-700">Table</span>
        </Breadcrumbs>
      </div>
      <FormTable
        data={data}
        config={formConfigs["afc-preventive-maintenance-half-yearly-annexure-b"]}
        user={user}
        handleSave={handleSave}
      />
    </div>
  );
};

export default AfcPreAnnexureBList;