// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProfile } from "../../reducer/AuthReducer";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import { Link } from "react-router-dom";
// function ListForm() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, []);
//   const user = JSON.parse(localStorage.getItem("userdata"));
//   const userData = useSelector((state) => state.auth.emplist.data);
//   console.log(user.assigned_forms);
//   return (
//     <div className="container">
//       <div role="presentation" className="bredcrumbs">
//         <Breadcrumbs aria-label="bredcrumb">
//           <Link underline="hover" color="inherit" to="/">
//             Home
//           </Link>
//           <Link underline="hover" color="inherit">
//             All Forms
//           </Link>
//         </Breadcrumbs>
//       </div>
//       <h1>Form List</h1>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Form</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {user?.assigned_forms?.map((item, index) => (
//             <tr key={index}>
//               <td className="text-start">{index + 1}</td>
//               <td className="text-start">{item}</td>
//               <td>
//                 <Link to={`/form/${item}`}>
//                   <button className="btn btn-primary">
//                     Click Here To fill
//                   </button>
//                 </Link>
//                 <Link to={"/list/" + item}>
//                   <button className="btn btn-primary">
//                     Click Here To View
//                   </button>
//                 </Link>
//               </td>{" "}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ListForm;
