import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
const SideBar = lazy(() => import("./component/SideBar"));
const Header = lazy(() => import("./component/Header"));
const Loader = lazy(() => import("./component/Loader"));

// Auth Routes
const Login = lazy(() => import("./pages/Login"));
const AddUser = lazy(() => import("./pages/AddUser"));

// Core Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ListUser = lazy(() => import("./pages/ListUser"));
const EditUser = lazy(() => import("./pages/EditUser"));
const CreateAdmin = lazy(() => import("./pages/Admin/CreateAdmin"));
const AdminList = lazy(() => import("./pages/AdminList"));
const EditAdmin = lazy(() => import("./pages/EditAdmin"));
const StationAdd = lazy(() => import("./pages/Stationadd"));
const StationList = lazy(() => import("./pages/StationList"));
const StationEdit = lazy(() => import("./pages/StationEdit"));
const AllForm = lazy(() => import("./pages/Admin/AllForm"));
const FormList = lazy(() => import("./pages/FormList"));
const ListAssignedForm = lazy(() => import("./pages/Employee/ListAssignedForm"));
const ViewAccount = lazy(() => import("./component/ViewAccount"));

// Forms
const FoundArticlesForm = lazy(() => import("./forms/store/FoundArticlesForm"));
const FirstAidRegister = lazy(() => import("./forms/FirstAidRegister"));
const IncidentAccidentReg = lazy(() => import("./forms/IncidentAccidentReg"));
const LatsVduDrillReg = lazy(() => import("./forms/LatsVduDrill"));
const HonorariumReg = lazy(() => import("./forms/HonorariumReg"));
const ListHonorariumReg = lazy(() => import("./forms/ListHonorariumReg"));
const OutstandingRecReg = lazy(() => import("./forms/OutstandingRecReg"));
const PoliceCustodyReg = lazy(() => import("./forms/rajiv/PoliceCustodyReg"));
const TEREntryRegister = lazy(() => import("./forms/TER_Entry_Register"));
const UpdatePMOccBcc = lazy(() => import("./forms/Update_PM_Occ_Bcc"));
const CentCompPreventiveForm = lazy(() => import("./forms/CentCompPreForm"));
const AfcPreventChkform = lazy(() => import("./forms/AfcPreventChkform"));
const AfcAnnexureBform = lazy(() => import("./forms/AfcAnnexureBForm"));
const GatePass = lazy(() => import("./forms/GatePass"));
const CBTTrainingReg = lazy(() => import("./forms/rajiv/CBTTrainingReg"));
const AFCMonthlyReg = lazy(() => import("./forms/rajiv/AFCMonthlyReg"));
const CardInitializationReg = lazy(() => import("./forms/rajiv/CardInitializationReg"));
const DailTelecomMainCheckListReg = lazy(() => import("./forms/rajiv/DailTelecomMainCheckListReg"));
const FACP = lazy(() => import("./forms/rajiv/FACP"));
const FoundReceivedCashReg = lazy(() => import("./forms/rajiv/FoundReceivedCashReg"));
const JobCard = lazy(() => import("./forms/rajiv/JobCard"));
const ImprestReg = lazy(() => import("./forms/rajiv/ImprestReg"));
const LoanRegister = lazy(() => import("./forms/rajiv/LoanRegister"));
const MJL11 = lazy(() => import("./forms/rajiv/MJL11"));
const LiftRescueRegister = lazy(() => import("./forms/rajiv/OperationLiftRescueRegister"));
const OperationStationDiaryReg = lazy(() => import("./forms/rajiv/OperationStationDiaryReg"));
const PMLogBook3Reg = lazy(() => import("./forms/rajiv/PMLogBook3Reg"));
const PMLogBookMainLine3Reg = lazy(() => import("./forms/rajiv/PMLogBookMainLine3Reg"));
const PmsheetMontlyDepotReg = lazy(() => import("./forms/rajiv/PmsheetMontlyDepotReg"));
const QuarterlyTrainInspection = lazy(() => import("./forms/rajiv/QuarterlyTrainInspection"));
const SDCEntryExitReg = lazy(() => import("./forms/rajiv/SDCEntryExitReg"));
const SMPS = lazy(() => import("./forms/rajiv/SMPS"));
const ManualPointDrill = lazy(() => import("./forms/manshi/ManualPointDrill"));
const PossessionRegister = lazy(() => import("./forms/manshi/PossessionRegister"));
const ETSDrill = lazy(() => import("./forms/manshi/ETSDrill"));
const MaterialDistribution = lazy(() => import("./forms/manshi/MaterialDistribution"));
const Consumables = lazy(() => import("./forms/manshi/Consumables"));
const OsUrcInOut = lazy(() => import("./forms/manshi/Os_Urc_In_Out"));
const ContractorWorkDone = lazy(() => import("./forms/manshi/Contractor_Work_Done"));
const AfcPrevention = lazy(() => import("./forms/manshi/Afc_prevention"));
const SerEntry = lazy(() => import("./forms/manshi/SerEntry"));
const ReplacementReg = lazy(() => import("./forms/manshi/ReplacementReg"));
const LiftRescue1 = lazy(() => import("./forms/manshi/LiftRescue1"));
const LiftRescue2 = lazy(() => import("./forms/manshi/LiftRescue2"));
const Honorarium = lazy(() => import("./forms/manshi/Honorarium"));
const Pmlog6 = lazy(() => import("./forms/manshi/Pmlog6"));
const PmlogMaintain = lazy(() => import("./forms/manshi/PmlogMaintain"));
const DailyTelecom = lazy(() => import("./forms/manshi/DailyTelecom"));
const ShuntSignal = lazy(() => import("./forms/manshi/ShuntSignal"));
const EarthConnectivity = lazy(() => import("./forms/manshi/EarthConnectivity"));
const Pmsheetoccbcchalfyearlyform = lazy(() => import("./forms/manshi/Pmsheetoccbcchalfyearlyform"));
const BoxCleaningRecord = lazy(() => import("./forms/satya/BoxCleaningRecord"));
const FacpDrill = lazy(() => import("./forms/satya/FacpDrill"));
const LatsRegister = lazy(() => import("./forms/satya/LatsRegister"));
const EquipmentFailureRegister = lazy(() => import("./forms/satya/EquipmentFailureRegister"));
const MonthlyCabinetRecord = lazy(() => import("./forms/satya/MonthlyCabinetRecord"));
const SEREntryPage = lazy(() => import("./forms/satya/SEREntryPage"));
const ShiftLogBook = lazy(() => import("./forms/satya/ShiftLogBook"));
const SwUpdateRegister = lazy(() => import("./forms/satya/SwUpdateRegister"));
const TeaCoffeeRegister = lazy(() => import("./forms/satya/TeaCoffeeRegister"));
const TrainIdRegister = lazy(() => import("./forms/satya/TrainIdRegister"));
const CrewControlCcap = lazy(() => import("./forms/satya/CrewControlCcap"));
const AfcPreventiveMaintenance = lazy(() => import("./forms/satya/AfcPreventiveMaintenance"));
const PMMainline = lazy(() => import("./forms/satya/PMMainline"));
const MonthlyMaintenanceSchedule = lazy(() => import("./forms/satya/MonthlyMaintenanceSchedule"));
const AssuRegReg = lazy(() => import("./forms/chanchal/AssuRegReg"));
const AfcGateDrillReg = lazy(() => import("./forms/chanchal/AfcGateDrillReg"));
const ComRecRegReg = lazy(() => import("./forms/chanchal/ComRecReg"));
const EquFaiRegReg = lazy(() => import("./forms/chanchal/EquFaiReg"));
const ManPoiOpeDrillReg = lazy(() => import("./forms/chanchal/ManPoiOpeDrill"));
const GateReg = lazy(() => import("./forms/chanchal/Gate"));
const PmFolUpReg = lazy(() => import("./forms/chanchal/PmFolUp"));
const ChecklistReg = lazy(() => import("./forms/chanchal/Pm_logbook_half_yearly_other_mainline"));
const DailyWorkReg = lazy(() => import("./forms/chanchal/DailyWork"));
const FailureReportReg = lazy(() => import("./forms/chanchal/FailureReport"));
const StationDiaryReg = lazy(() => import("./forms/chanchal/StationDiary"));
const ClaimReg = lazy(() => import("./forms/chanchal/ClaimReg"));
const LineDefectReg = lazy(() => import("./forms/chanchal/LineDefect"));
const PASDrillReg = lazy(() => import("./forms/chanchal/PASDrill"));
const CSCInitRegReg = lazy(() => import("./forms/chanchal/CSCInitReg"));
const PreMainWorkReg = lazy(() => import("./forms/chanchal/PreMainWork"));
const MeasurementVoltageMCBinPDC = lazy(() => import("./forms/chanchal/MeasurementVoltageMCBinPDC"));
const ParameterReg = lazy(() => import("./forms/pinki/ParameterReg"));
const MaterialDistribReg = lazy(() => import("./forms/pinki/MaterialDistribReg"));
const FMTSReg = lazy(() => import("./forms/pinki/FMTSReg"));
const IncidentAccidentReportReg = lazy(() => import("./forms/pinki/IncidentAccidentReportReg"));
const ManualPointReg = lazy(() => import("./forms/pinki/ManualPointReg"));
const AtcExaminationReg = lazy(() => import("./forms/pinki/AtcExaminationReg"));
const HardwareFailureReg = lazy(() => import("./forms/pinki/HardwareFailureReg"));
const SignalFailureReg = lazy(() => import("./forms/pinki/SignalFailureReg"));
const Axlecounterresetregister = lazy(() => import("./forms/pinki/Axlecounterresetregister"));
const StockMovementCards = lazy(() => import("./forms/store/StockMovementCards"));
const DeadStock = lazy(() => import("./forms/pinki/DeadStock"));
const AgentCardReg = lazy(() => import("./forms/pinki/AgentCardReg"));
const BoxCleaningOutdoorReg = lazy(() => import("./forms/pinki/BoxCleaningOutdoorReg"));
const ATSReg = lazy(() => import("./forms/pinki/ATSReg"));
const HandingTakingNoteReg = lazy(() => import("./forms/pinki/HandingTakingNoteReg"));
const PMLogBookReg = lazy(() => import("./forms/pinki/PMLogBookReg"));
const AfcPreventiveReg = lazy(() => import("./forms/pinki/AfcPreventiveReg"));
const PmsheetMonthlyDepotReg = lazy(() => import("./forms/pinki/PmsheetMonthlyDepotReg"));
const Grievance = lazy(() => import("./forms/isha/Grievance"));
const ContractualSpareTesting = lazy(() => import("./forms/isha/ContractualSpareTesting"));
const Loanreg = lazy(() => import("./forms/isha/Loanreg"));
const FanRack = lazy(() => import("./forms/isha/FanRack"));
const FilterReplacement = lazy(() => import("./forms/isha/FilterReplacement"));
const AlxeCounter = lazy(() => import("./forms/isha/AlxeCounter"));
const PREVENTIVEMAINTENACE_CC_CCHS = lazy(() => import("./forms/isha/PREVENTIVEMAINTENACE_CC_CCHS"));
const CSCInitializationDetailRegister = lazy(() => import("./forms/isha/CSCInitializationDetailRegister"));
const DeviceApplicationSoftware = lazy(() => import("./forms/isha/DeviceApplicationSoftware"));
const AttendanceRegister = lazy(() => import("./forms/isha/AttendanceRegister"));
const ControTankenOver = lazy(() => import("./forms/isha/ControlTakenOver"));
const ESP = lazy(() => import("./forms/isha/ESP"));
const ForeignCurrencyForm = lazy(() => import("./forms/store/ForeignCurrencyForm"));
const DAR = lazy(() => import("./forms/isha/DAR"));
const IncidentAccidentOprationReg = lazy(() => import("./forms/isha/IncidentAccidentReg"));
const DailyTransactionRegister_RECEIPTS = lazy(() => import("./forms/isha/DailyTransactionRegister_RECEIPTS"));
const AFCPREVENTIVEMAINTENANCCHECKLISTHalfYearly = lazy(() => import("./forms/isha/AfcPreventiveMaintenanceCheckListHalfYearly"));
const PMLOGBOOKMAINLINE9 = lazy(() => import("./forms/isha/PMLOGBOOKMAINLINE9"));
const IncidentRegisterSignals = lazy(() => import("./forms/monika/IncidentRegisterSignals"));
const Escalator = lazy(() => import("./forms/monika/Escaltor"));
const Handoverrecord = lazy(() => import("./forms/monika/Handoverrecord"));
const PettyRepairForm = lazy(() => import("./forms/store/PettyRepairForm"));
const Linedefect = lazy(() => import("./forms/monika/Linedefect"));
const Library = lazy(() => import("./forms/monika/Library"));
const InspactionRegister = lazy(() => import("./forms/monika/InspactionRegister"));
const DailycheckRegister = lazy(() => import("./forms/monika/DailycheckRegister"));
const HandlingRegister = lazy(() => import("./forms/monika/HandlingRegister"));
const MaintenanceSchedule = lazy(() => import("./forms/monika/MaintenanceSchedule"));
const Officers = lazy(() => import("./forms/monika/Officers"));
const EarlyMaintainSchedule = lazy(() => import("./forms/monika/EarlyMaintainSchedule"));
const DocumentManagement = lazy(() => import("./forms/monika/DocumentManagement"));
const PmLogBook5 = lazy(() => import("./forms/monika/PmLogBook5"));
const DailTelecomMainCheckReg = lazy(() => import("./forms/monika/DailyTelecomMainCheckReg"));
const PmLogBookMainline = lazy(() => import("./forms/monika/PmLogBookMainline"));
const PMIRS = lazy(() => import("./forms/monika/PMIRS"));
const DCS = lazy(() => import("./forms/monika/DCS"));
const EKTRegister = lazy(() => import("./forms/monika/EKTRegister"));
const Afcgatedrill = lazy(() => import("./forms/akshra/Afcgatedrill"));
const Inout = lazy(() => import("./forms/akshra/Inout"));
const Tsrreg = lazy(() => import("./forms/akshra/Tsrreg"));
const Emefiremandrill = lazy(() => import("./forms/akshra/Emefiremandrill"));
const Dtrreg = lazy(() => import("./forms/akshra/Dtrreg"));
const Agentissue = lazy(() => import("./forms/akshra/Agentissue"));
const Checklist = lazy(() => import("./forms/akshra/Checklist"));
const LoanregTelecom = lazy(() => import("./forms/akshra/Loanreg"));
const Dtrleftside = lazy(() => import("./forms/akshra/Dtrleftside"));
const Dtrsignalsissue = lazy(() => import("./forms/akshra/Dtrsignalsissue"));
const Dtrsignalsreceipts = lazy(() => import("./forms/akshra/Dtrsignalsreceipts"));
const Pmsheet = lazy(() => import("./forms/akshra/Pmsheet"));
const Pmloogbook = lazy(() => import("./forms/akshra/Pmloogbook"));
const UnderFalseFloorCleaning = lazy(() => import("./forms/akshra/Falsefloor"));
const DtrIssueStore = lazy(() => import("./forms/store/DtrIssueStore"));
const DtrReceiptStore = lazy(() => import("./forms/store/DtrReceiptStore"));
const AssetregisterSignal = lazy(() => import("./forms/store/AssetregisterSignal"));
const RequisitionSignal = lazy(() => import("./forms/store/RequisitionSignal"));
const TeaCofee = lazy(() => import("./forms/store/TeaCofee"));
const Parameter = lazy(() => import("./forms/store/Parameter"));
const CardRefund = lazy(() => import("./forms/store/CardRefund"));
const EscaaltorDrill = lazy(() => import("./forms/store/EscaaltorDrill"));
const RequisitionSlip = lazy(() => import("./forms/store/RequisitionSlip"));
const TrainIdRecordReg = lazy(() => import("./forms/store/TrainIdRecordReg"));
const AssetRegister = lazy(() => import("./forms/store/AssetRegister"));
const BudgetAllotmentForm = lazy(() => import("./forms/store/BudgetAllotmentForm"));
const CSSShiftLog = lazy(() => import("./forms/satya/CSSShiftLog"));
const SMPSSYSTEMMAINTENANCERECORD = lazy(() => import("./forms/isha/SMPSSYSTEMMAINTENANCERECORD"));
const PMSheetoccYearly = lazy(() => import("./forms/isha/PMSheetOCCYearly"));
const PMSheetDepotQuartForm2Reg = lazy(() => import("./forms/rajiv/PMSheetDepotQuartForm22Reg"));
const NightAfcGateDrill = lazy(() => import("./forms/store/NightAfcGateDrill"));
const EstimateLOARegister = lazy(() => import("./forms/isha/EstimateLOA"));
const DailycheckListMainline = lazy(() => import("./forms/store/DailycheckListMainline"));
const UPS_Room_Entry_Register = lazy(() => import("./forms/UPSRoomEntryRegister"));
const LedgerForm = lazy(() => import("./forms/store/LedgerForm"));
const NewbudgetPayment = lazy(() => import("./forms/store/NewbudgetPayment"));
const QuarterlyMaintenanceForm = lazy(() => import("./forms/store/QuarterlyMaintenanceForm"));
const UpsMaintenanceForm = lazy(() => import("./forms/store/UpsMaintenanceForm"));
const HalfYearlyMaintenanceForm = lazy(() => import("./forms/store/HalfYearlyMaintenanceForm"));
const QuarterlyMaintenanceOccBccForm = lazy(() => import("./forms/store/QuarterlyMaintenanceOccBccForm"));
const DailyTransactionRegister_ISSUE = lazy(() => import("./forms/store/DailyTransactionRegister_ISSUE"));
const StationEarning = lazy(() => import("./reducer/store/StationEarning"));
const PmStationQuarterlyForm = lazy(() => import("./forms/store/PmStationQuarterlyForm"));
const PmStationMonthlyForm = lazy(() => import("./forms/store/PmStationMonthlyForm"));
const BioDataRegister = lazy(() => import("./forms/store/BioDataRegister"));
const EquipmentFailureOcc = lazy(() => import("./forms/store/EquipmentFailureOcc"));
const UnreadableCardRefundForm = lazy(() => import("./forms/store/UnreadableCardRefundForm"));
const TSRRegisterForm = lazy(() => import("./forms/store/TSRRegisterForm"));
const StockMovementTokens = lazy(() => import("./forms/store/StockMovementTokens"));
const PMLogBookTVM = lazy(() => import("./forms/satya/PMLogBookTVM"));

// Lists, Views, and Edits (similarly lazy-loaded, grouped by module)
// Add other components as needed, following the same pattern

const ProtectedLayout = ({ children }) => (
  <div className="container-fluid m-0 p-0">
    <ToastContainer />
    <Suspense fallback={<Loader />}>
      <div className="row pt-0">
        <SideBar />
        <Header />
        <div className="main-contain">{children}</div>
      </div>
    </Suspense>
  </div>
);

function App() {
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = token && token !== "undefined" && token !== "null";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (isAuthenticated && (currentPath === "/dashboard" || currentPath === "/login")) {
      navigate("/dashboard");
    } else if (!isAuthenticated && currentPath !== "/login") {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <Routes>
      {isAuthenticated ? (
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user">
            <Route path="add" element={<AddUser />} />
            <Route path="list" element={<ListUser />} />
            <Route path="edit" element={<EditUser />} />
          </Route>
          <Route path="/admin">
            <Route path="add" element={<CreateAdmin />} />
            <Route path="list" element={<AdminList />} />
            <Route path="edit" element={<EditAdmin />} />
          </Route>
          <Route path="/station">
            <Route path="add" element={<StationAdd />} />
            <Route path="list" element={<StationList />} />
            <Route path="edit" element={<StationEdit />} />
          </Route>
          <Route path="/form">
            <Route path="list" element={<AllForm />} />
            <Route path="formlist" element={<FormList />} />
            <Route path="employee/list" element={<ListAssignedForm />} />
            <Route path="viewaccount" element={<ViewAccount />} />
            <Route path="dtr-receipt-store" element={<DtrReceiptStore />} />
            <Route path="dtr-issue-store" element={<DtrIssueStore />} />
            <Route path="dtr-receipt" element={<DtrReceipt />} />
            <Route path="incident-register" element={<IncidentRegisterSignals />} />
            <Route path="expenditure-budget-register" element={<BudgetAllotmentForm />} />
            <Route path="pm-station-quarterly" element={<PmStationQuarterlyForm />} />
            <Route path="tsr-register" element={<TSRRegisterForm />} />
            <Route path="details-related-to-foundreceived-articles" element={<FoundArticlesForm />} />
            <Route path="color-light-maintenance" element={<SignalMainLineRegister />} />
            <Route path="station-earning-register" element={<StationEarning />} />
            <Route path="esp-quarterly-maintenance" element={<ESPQuaterlyMaintanance />} />
            <Route path="unreadable-card-refund-details" element={<UnreadableCardRefundForm />} />
            <Route path="ter-entry-register" element={<TEREntryRegister />} />
            <Route path="night_lats_vdu_drill_register" element={<LatsVduDrillReg />} />
            <Route path="loan-register-sdc" element={<LoanRegister />} />
            <Route path="first-aid-register" element={<FirstAidRegister />} />
            <Route path="outstanding-record-register" element={<OutstandingRecReg />} />
            <Route path="police-custody-register" element={<PoliceCustodyReg />} />
            <Route path="crew-incident-accident" element={<IncidentAccidentReg />} />
            <Route path="honorarium-register" element={<HonorariumReg />} />
            <Route path="list-of-honorarium-registers" element={<ListHonorariumReg />} />
            <Route path="checklist-and-pm-occbcc" element={<UpdatePMOccBcc />} />
            <Route path="pm-logbook-yearly2-sdc" element={<CentCompPreventiveForm />} />
            <Route path="pm-logbook-half-yearly-other-mainline" element={<AfcAnnexureBform />} />
            <Route path="pm-depot-quarterly" element={<UpsMaintenanceForm />} />
            <Route path="pm-depot-yearly" element={<DeportFormReg />} />
            <Route path="pm-logbook-monthly-other-mainline" element={<AfcPreventChkform />} />
            <Route path="gate-pass" element={<GatePass />} />
            <Route path="cbt-training" element={<CBTTrainingReg />} />
            <Route path="pm-logbook-monthly-gate-mainline" element={<AFCMonthlyReg />} />
            <Route path="card-initialization-tender-sdc" element={<CardInitializationReg />} />
            <Route path="checklist-and-pm-depot" element={<DailTelecomMainCheckListReg />} />
            <Route path="night_facp_drill_register" element={<FACP />} />
            <Route path="details-related-to-foundreceived-cash" element={<FoundReceivedCashReg />} />
            <Route path="job-card" element={<JobCard />} />
            <Route path="imprets-register-mainline" element={<ImprestReg />} />
            <Route path="pm-point-maintenance-record" element={<MJL11 />} />
            <Route path="night_lift_rescue_drill_register" element={<LiftRescueRegister />} />
            <Route path="station-diary" element={<OperationStationDiaryReg />} />
            <Route path="pm-log-book-monthly-sdc" element={<PMLogBook3Reg />} />
            <Route path="pm-logbook-monthly-gate-mainline" element={<PMLogBookMainLine3Reg />} />
            <Route path="pm-depot-monthly" element={<PmsheetMontlyDepotReg />} />
            <Route path="onboard-atc-underframe" element={<QuarterlyTrainInspection />} />
            <Route path="entry-exit-register-sdc" element={<SDCEntryExitReg />} />
            <Route path="smps-six-monthly-record" element={<SMPS />} />
            <Route path="night_manual_points_operation_drill_register" element={<ManualPointDrill />} />
            <Route path="possession-register" element={<PossessionRegister />} />
            <Route path="night_ets_drill_register" element={<ETSDrill />} />
            <Route path="material-distribution" element={<MaterialDistribution />} />
            <Route path="urc-and-os-entry-register-sdc" element={<OsUrcInOut />} />
            <Route path="consumables-register-mainline" element={<Consumables />} />
            <Route path="contract-work-done-register" element={<ContractorWorkDone />} />
            <Route path="pm-logbook-monthly-tvm-mainline" element={<AfcPrevention />} />
            <Route path="ser-entry" element={<SerEntry />} />
            <Route path="replacement-register" element={<ReplacementReg />} />
            <Route path="night_lift_rescue_drill2_register" element={<LiftRescue2 />} />
            <Route path="honorarium-register" element={<Honorarium />} />
            <Route path="pm-logbook-tom-half-yearly-sdc" element={<Pmlog6 />} />
            <Route path="pm-logbook-monthly-tom-mainline" element={<PmlogMaintain />} />
            <Route path="checklist-and-pm-station" element={<DailyTelecom />} />
            <Route path="shunt-signal-maintenance" element={<ShuntSignal />} />
            <Route path="earth-connection" element={<EarthConnectivity />} />
            <Route path="pm-occ-bcc-half-yearly" element={<Pmsheetoccbcchalfyearlyform />} />
            <Route path="indoor-box-cleaning" element={<BoxCleaningRecord />} />
            <Route path="night_facp_drill_register" element={<FacpDrill />} />
            <Route path="night_lats_vdu_drill_register" element={<LatsRegister />} />
            <Route path="lab-faulty-item-register" element={<LabMaterialTransactionRegister />} />
            <Route path="equipment_failure_register" element={<EquipmentFailureRegister />} />
            <Route path="ats-cabinet-maintenance-monthly" element={<MonthlyCabinetRecord />} />
            <Route path="equipment-failure-occ-register" element={<EquipmentFailureOcc />} />
            <Route path="shift-log-book-sdc" element={<ShiftLogBook />} />
            <Route path="instruction-shift-log-book" element={<ShiftLogBook />} />
            <Route path="shift-log-book-mainline" element={<ShiftLogBook />} />
            <Route path="sw-update-register-sdc" element={<SwUpdateRegister />} />
            <Route path="teacoffee" element={<TeaCoffeeRegister />} />
            <Route path="train-id-change-record-register" element={<TrainIdRegister />} />
            <Route path="unplanned-to-record" element={<CrewControlCcap />} />
            <Route path="pm-logbook-monthly-tom-mainline" element={<AfcPreventiveMaintenance />} />
            <Route path="pm-logbook-tvm-half-yearly-sdc" element={<PMLogBookTVM />} />
            <Route path="pm-logbook-monthly-other-mainline" element={<PMMainline />} />
            <Route path="pm-occ-bcc-monthly" element={<MonthlyMaintenanceSchedule />} />
            <Route path="assurance-register" element={<AssuRegReg />} />
            <Route path="assurance-register-telecom" element={<AssuRegReg />} />
            <Route path="occ-afc-gate-drill" element={<AfcGateDrillReg />} />
            <Route path="competency-record-register" element={<ComRecRegReg />} />
            <Route path="manual-point-operation-drill" element={<ManPoiOpeDrillReg />} />
            <Route path="night_lift_rescue_drill2_register" element={<GateReg />} />
            <Route path="pm-follow-up-mainline" element={<PmFolUpReg />} />
            <Route path="pm-logbook-half-yearly-other-mainline" element={<ChecklistReg />} />
            <Route path="daily-work-done-register" element={<DailyWorkReg />} />
            <Route path="efr-register" element={<FailureReportReg />} />
            <Route path="station-diary-signalling" element={<StationDiaryReg />} />
            <Route path="claim-registration-register" element={<ClaimReg />} />
            <Route path="line-defect" element={<LineDefectReg />} />
            <Route path="pidspas-drill" element={<PASDrillReg />} />
            <Route path="pm-logbook-yearly1-sdc" element={<PreMainWorkReg />} />
            <Route path="measurement-voltage-mcb" element={<MeasurementVoltageMCBinPDC />} />
            <Route path="parameter-register-sdc" element={<ParameterReg />} />
            <Route path="material-distribution-to-trainees" element={<MaterialDistribReg />} />
            <Route path="fmts" element={<FMTSReg />} />
            <Route path="fmts-book-mainline" element={<FMTSReg />} />
            <Route path="incident-accident" element={<IncidentAccidentReportReg />} />
            <Route path="night_manual_points_operation_drill_register" element={<ManualPointReg />} />
            <Route path="atc-examination" element={<AtcExaminationReg />} />
            <Route path="hardware-failure" element={<HardwareFailureReg />} />
            <Route path="signal-failure" element={<SignalFailureReg />} />
            <Route path="axle_counter_reset_register" element={<Axlecounterresetregister />} />
            <Route path="stock-movement-register-cards" element={<StockMovementCards />} />
            <Route path="stock-movement-register-tokens" element={<StockMovementTokens />} />
            <Route path="dead-stock" element={<DeadStock />} />
            <Route path="agent-card-registers-sdc" element={<AgentCardReg />} />
            <Route path="ats-maintenance-halfyearly" element={<ATSReg />} />
            <Route path="outdoor-box-cleaning" element={<BoxCleaningOutdoorReg />} />
            <Route path="pm-depot-monthy" element={<PmsheetMonthlyDepotReg />} />
            <Route path="permanent-loan-register" element={<HandingTakingNoteReg />} />
            <Route path="pm-logbook-sdc-half-yearly-sdc" element={<PMLogBookReg />} />
            <Route path="pm-logbook-half-yearly-gate-mainline" element={<AfcPreventiveReg />} />
            <Route path="contractual-spare-testing-register" element={<ContractualSpareTesting />} />
            <Route path="loan-register" element={<Loanreg />} />
            <Route path="fan-rack-cleaning" element={<FanRack />} />
            <Route path="axel-counter-maintenance" element={<AlxeCounter />} />
            <Route path="filter-replacement" element={<FilterReplacement />} />
            <Route path="grievance-register" element={<Grievance />} />
            <Route path="pm-logbook-workstations-half-yearly-sdc" element={<PREVENTIVEMAINTENACE_CC_CCHS />} />
            <Route path="sw-update-register-sdc" element={<DeviceApplicationSoftware />} />
            <Route path="details-related-to-foundreceived-foreign-currency" element={<ForeignCurrencyForm />} />
            <Route path="esp_drill_register" element={<ESP />} />
            <Route path="control-take-over-handover-register" element={<ControTankenOver />} />
            <Route path="dar" element={<DAR />} />
            <Route path="crew-incident-accident" element={<IncidentAccidentOprationReg />} />
            <Route path="attendance-register" element={<AttendanceRegister />} />
            <Route path="daily-transaction-register-mainline" element={<DailyTransactionRegister_RECEIPTS />} />
            <Route path="daily-transaction-register-store-receipt" element={<DailyTransactionRegister_RECEIPTS />} />
            <Route path="daily-transaction-register-telecom-receipt" element={<DailyTransactionRegister_RECEIPTS />} />
            <Route path="pm-logbook-half-yearly-tvm-mainline" element={<PMLOGBOOKMAINLINE9 />} />
            <Route path="pm-logbook-half-yearly-tom-mainline" element={<AFCPREVENTIVEMAINTENANCCHECKLISTHalfYearly />} />
            <Route path="night_escalator_drill_register" element={<Escalator />} />
            <Route path="control-take-over-handover-register" element={<Handoverrecord />} />
            <Route path="petty-repair-register" element={<PettyRepairForm />} />
            <Route path="line-defect" element={<Linedefect />} />
            <Route path="library-book-issue-register" element={<Library />} />
            <Route path="inspection-register" element={<InspactionRegister />} />
            <Route path="inspection-register-telecom" element={<InspactionRegister />} />
            <Route path="daily-checklist-register-sdc" element={<DailycheckRegister />} />
            <Route path="handintaking-over-note" element={<HandlingRegister />} />
            <Route path="pm-station-half-yearly" element={<HalfYearlyMaintenanceForm />} />
            <Route path="officer-colony" element={<Officers />} />
            <Route path="pm-station-yearly" element={<EarlyMaintainSchedule />} />
            <Route path="inout-document" element={<DocumentManagement />} />
            <Route path="pm-logbook-gate-half-yearly-sdc" element={<PmLogBook5 />} />
            <Route path="pm-point-maintenance-record-tpd" element={<PMIRS />} />
            <Route path="dcs-tre-maintenance" element={<DCS />} />
            <Route path="ekt-maintenance" element={<EKTRegister />} />
            <Route path="train-induction-detail-register" element={<Afcgatedrill />} />
            <Route path="inout-document" element={<Inout />} />
            <Route path="emergency-fireman-exit-drill" element={<Emefiremandrill />} />
            <Route path="daily-transaction-register-mainline-issue" element={<DailyTransactionRegister_ISSUE />} />
            <Route path="agent-card-registers-sdc" element={<Agentissue />} />
            <Route path="pm-logbook-half-yearly-tvm-mainline" element={<Checklist />} />
            <Route path="loan-register-telecom" element={<LoanregTelecom />} />
            <Route path="daily-transaction-register-Issue" element={<DailyTransactionRegister_ISSUE />} />
            <Route path="daily-transaction-register-telecom-issues" element={<DailyTransactionRegister_ISSUE />} />
            <Route path="daily-transaction-register-receipt" element={<DailyTransactionRegister_RECEIPTS />} />
            <Route path="daily-transaction-register-store-issue" element={<DailyTransactionRegister_ISSUE />} />
            <Route path="pm-depot-monthy" element={<Pmsheet />} />
            <Route path="bio-data-register" element={<BioDataRegister />} />
            <Route path="false_floor_cleasing" element={<UnderFalseFloorCleaning />} />
            <Route path="asset-register" element={<AssetregisterSignal />} />
            <Route path="requisition" element={<RequisitionSignal />} />
            <Route path="requisition-sdc" element={<RequisitionSignal />} />
            <Route path="requisition-mainline" element={<RequisitionSignal />} />
            <Route path="requisition-register" element={<RequisitionSignal />} />
            <Route path="TeaCofee/register" element={<TeaCofee />} />
            <Route path="parameter/register" element={<Parameter />} />
            <Route path="cardrefund/register" element={<CardRefund />} />
            <Route path="escalatordrill/register" element={<EscaaltorDrill />} />
            <Route path="requisitionslip/register" element={<RequisitionSlip />} />
            <Route path="trainid/register" element={<TrainIdRecordReg />} />
            <Route path="assetregister/register" element={<AssetRegister />} />
            <Route path="css-shift-logbook" element={<CSSShiftLog />} />
            <Route path="smps_sys_mntc_register" element={<SMPSSYSTEMMAINTENANCERECORD />} />
            <Route path="pm-occ-bcc-yearly" element={<PMSheetoccYearly />} />
            <Route path="night_afc_gate_drill" element={<NightAfcGateDrill />} />
            <Route path="estimate-and-loa-budget-register" element={<EstimateLOARegister />} />
            <Route path="daily-checklist-mainline" element={<DailycheckListMainline />} />
            <Route path="ups-room-entry" element={<UPS_Room_Entry_Register />} />
            <Route path="ledger-mainline" element={<LedgerForm />} />
            <Route path="ledger-store" element={<LedgerForm />} />
            <Route path="ledger" element={<LedgerForm />} />
            <Route path="budget-payments-register" element={<NewbudgetPayment />} />
            <Route path="pm-depot-half-yearly" element={<HalfYearlyMaintenanceForm />} />
            <Route path="pm-occ-bcc-quarterly" element={<QuarterlyMaintenanceOccBccForm />} />
          </Route>
        </Route>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<AddUser />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  );
}

export default AppWrapper;