import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { useSelector } from "react-redux";

function Loader() {
  const loading = useSelector((state) => state.auth.loading);
  if (!loading) return null;

  return (
    <div id="loader-box">
      <div id="loader">
        <PuffLoader loading={loading} />;
      </div>
    </div>
  );
}

export default Loader;
