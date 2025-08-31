import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SideBar from "./component/SideBar";
import Header from "./component/Header";
import Login from "./pages/Login";
import "./App.css";
import "./pages/Style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./component/Loader";

// ========================================
// NEW FEATURE-BASED IMPORTS
// ========================================
// Instead of importing 5+ duplicate components, import centralized components
import { 
  IncidentForm,
  EquipmentFailureForm 
} from "./features/operation";

import { 
  BudgetForm,
  StationEarningForm 
} from "./features/finance";

import { 
  StationDiaryForm,
  SignalFailureForm 
} from "./features/signalling";

// Create wrapper components for backward compatibility
const IncidentRegisterWrapper = ({ module = "general" }) => (
  <IncidentForm module={module} onSuccess={() => window.history.back()} />
);

const BudgetFormWrapper = ({ type = "expenditure" }) => (
  <BudgetForm type={type} onSuccess={() => window.history.back()} />
);

// ========================================
// EXISTING IMPORTS (keeping for now during migration)
// ========================================
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddUser = lazy(() => import("./pages/Adduser"));
const CreateAdmin = lazy(() => import("./pages/Admin/CreateAdmin"));
const ListUser = lazy(() => import("./pages/ListUser"));
const FormList = lazy(() => import("./pages/FormList"));
const AdminList = lazy(() => import("./pages/AdminList"));
const AllForm = lazy(() => import("./pages/Admin/AllForm"));
const AllDeptFormList = lazy(() => import("./pages/AllDeptFormList"));

// ========================================
// OLD DEVELOPER-BASED IMPORTS (TO BE REMOVED)
// ========================================
// ❌ BEFORE: Multiple imports from different developers
// const IncidentRegisterSignals_Akshra = lazy(() => import("./forms/akshra/IncidentRegisterSignals"));
// const IncidentRegisterSignals_Manshi = lazy(() => import("./forms/manshi/IncidentRegisterSignals"));
// const IncidentRegisterSignals_Monika = lazy(() => import("./forms/monika/IncidentRegisterSignals"));
// const IncidentRegisterSignals_Pinki = lazy(() => import("./forms/pinki/IncidentRegisterSignals"));
// const IncidentRegisterSignals_Satya = lazy(() => import("./forms/satya/IncidentRegisterSignals"));

// ✅ AFTER: Single centralized component with module specification

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("userdata");
    setIsAuthenticated(!!token);
  }, []);

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        {isAuthenticated && (
          <>
            <div className="row pt-0">
              <SideBar />
              <Header />
              <div className="main-contain">
                <Suspense fallback={<Loader />}>
                  <Routes>
                    {/* ========================================
                        MIGRATED ROUTES - Using New Architecture
                        ======================================== */}
                    
                    {/* Operation Department Routes */}
                    <Route 
                      path="/form/incident-register" 
                      element={<IncidentRegisterWrapper module="general" />} 
                    />
                    <Route 
                      path="/form/incident-register/akshra" 
                      element={<IncidentRegisterWrapper module="akshra" />} 
                    />
                    <Route 
                      path="/form/incident-register/manshi" 
                      element={<IncidentRegisterWrapper module="manshi" />} 
                    />
                    <Route 
                      path="/form/incident-register/signalling" 
                      element={<IncidentRegisterWrapper module="signalling" />} 
                    />
                    
                    {/* Finance Department Routes */}
                    <Route 
                      path="/form/expenditure-budget-register" 
                      element={<BudgetFormWrapper type="expenditure" />} 
                    />
                    <Route 
                      path="/form/estimate-loa-budget-register" 
                      element={<BudgetFormWrapper type="estimate-loa" />} 
                    />
                    <Route 
                      path="/form/budget-payments-register" 
                      element={<BudgetFormWrapper type="payments" />} 
                    />
                    
                    {/* Signalling Department Routes */}
                    <Route 
                      path="/form/station-diary" 
                      element={<StationDiaryForm onSuccess={() => window.history.back()} />} 
                    />
                    
                    {/* ========================================
                        EXISTING ROUTES (unchanged for now)
                        ======================================== */}
                    <Route path="/user/add" element={<AddUser />} />
                    <Route path="/admin/add" element={<CreateAdmin />} />
                    <Route path="/formlist" element={<FormList />} />
                    <Route path="/formlist/all" element={<AllDeptFormList />} />
                    <Route path="/user/list" element={<ListUser />} />
                    <Route path="/Admin/list" element={<AdminList />} />
                    <Route path="/form/list" element={<AllForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                    
                    {/* Migration Note: Gradually replace remaining routes */}
                    
                  </Routes>
                </Suspense>
              </div>
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;