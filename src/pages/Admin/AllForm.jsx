import React, { useEffect, useState , useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deptformlist } from "../../reducer/AuthReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

function AllForm() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  const dept = user.department;
  console.log(dept);

  useEffect(() => {
    dispatch(deptformlist(dept));
  }, [dispatch, dept]);

  const formlist = useSelector((state) => state.auth.dform);
  console.log(formlist);

  // Filtered form list based on search value
  const filteredFormList = formlist.filter((item) =>
    item?.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="bredcrumb">
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Link underline="hover" color="inherit">
            All Forms
          </Link>
        </Breadcrumbs>
      </div>

      <div className="d-flex justify-content-between align-items-center ">
        <input
          type="search"
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Here."
        />
      </div>
      <div className="table-box">
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Form</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFormList.map((item, index) => (
              <tr key={index}>
                <td className="text-start">{index + 1}</td>
                <td className="text-start">{item?.name}</td>
                <td>
                  <Link to={`/form/${item?.slug}`}>
                    <button className="btn btn-primary">
                      Click Here To fill
                    </button>
                  </Link>
                  <Link to={`/list/${item?.slug}`}>
                    <button className="btn btn-primary">
                      Click Here To View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllForm;
