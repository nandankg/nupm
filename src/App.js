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
import Login from "./pages/Login"; // Keep Login non-lazy for fast initial load
import "./App.css";
import "./pages/Style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./component/Loader";

// Lazy load major page components to reduce initial bundle size
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddUser = lazy(() => import("./pages/Adduser"));
const CreateAdmin = lazy(() => import("./pages/Admin/CreateAdmin"));
const ListUser = lazy(() => import("./pages/ListUser"));
const FormList = lazy(() => import("./pages/FormList"));
const AdminList = lazy(() => import("./pages/AdminList"));
const AllForm = lazy(() => import("./pages/Admin/AllForm"));
const Stationadd = lazy(() => import("./pages/Stationadd"));
const StationList = lazy(() => import("./pages/StationList"));

// Lazy load edit and user management components
const EditUser = lazy(() => import("./pages/EditUser"));
const ListAssignedForm = lazy(() => import("./pages/Employee/ListAssignedForm"));
const ViewAccount = lazy(() => import("./component/ViewAccount"));
const StationEdit = lazy(() => import("./pages/StationEdit"));
const EditAdmin = lazy(() => import("./pages/EditAdmin"));

// import IncidentRegisterSignals from "./forms/IncidentRegisterSignals";
// import IncidentRegisterSignalsList from "./tables/IncidentRegisterSignalsList";
// import EditIncident from "./edit/EditIncident";
const FoundReceiveArtList = lazy(() => import("./tables/FoundReceiveArtList"));
const FoundArticlesForm = lazy(() => import("./forms/store/FoundArticlesForm"));
const FoundReceivedArticleEdit = lazy(() => import("./edit/EditFoundReceive"));
const FirstAidRegister = lazy(() => import("./forms/FirstAidRegister"));
const FirstAidRegisterList = lazy(() => import("./tables/FirstAidRegisterList"));
const FirstAidRegisterEdit = lazy(() => import("./edit/EditFirstAidReg"));

const IncidentAccidentReg = lazy(() => import("./forms/IncidentAccidentReg"));
const IncidentAccidentRegisterEdit = lazy(() => import("./edit/EditIncidentAccidentReg"));
const LatsVduDrillReg = lazy(() => import("./forms/LatsVduDrill"));
const LatsVduDrillList = lazy(() => import("./tables/LatsVduDrillList"));
const LatsVduDrillEdit = lazy(() => import("./edit/EditLatsVduDrill"));
const HonoriumRegList = lazy(() => import("./tables/HonoriumRegList"));
const HonorariumReg = lazy(() => import("./forms/HonorariumReg"));
const HonoriumRegEdit = lazy(() => import("./edit/EditHonorariumReg"));
const ListHonorariumReg = lazy(() => import("./forms/ListHonorariumReg"));
const ListHonoriumRegList = lazy(() => import("./tables/ListHonorariumList"));
const ListHonorariumEdit = lazy(() => import("./edit/EditListHonorarium"));

const OutstandingRecReg = lazy(() => import("./forms/OutstandingRecReg"));
const OutStandingRecRegList = lazy(() => import("./tables/OutStandingRecRegList"));
const OutStandingRecRegEdit = lazy(() => import("./edit/EditOutstandRecReg"));
const PoliceCtdRegList = lazy(() => import("./tables/PoliceCtdRegList"));
const PoliceCtdRegEdit = lazy(() => import("./edit/EditPolicectdreg"));
const PoliceCtdRegister = lazy(() => import("./forms/PoliceCtdRegister"));
const TER_Entry_Register = lazy(() => import("./forms/TER_Entry_Register"));
const TER_Entry_List = lazy(() => import("./tables/TER_Entry_List"));
const Ter_entry_register_edit = lazy(() => import("./edit/EditTerEntryReg"));
const Update_PM_Occ_Bcc = lazy(() => import("./forms/Update_PM_Occ_Bcc"));
const Update_PM_Occ_Bcc_List = lazy(() => import("./tables/Update_PM_Occ_Bcc_List"));
const Update_Check_List_PM_occ_bcc_Edit = lazy(() => import("./edit/EditUpdate_PM_Occ_BCC"));
const PmSheetMonthlyMaintananceReg = lazy(() => import("./forms/PMSheetQuartlyReg"));
const PmSheetList = lazy(() => import("./tables/PMSheetQuartlyList"));
const PMSheetQuaterly_Edit = lazy(() => import("./edit/EditPMSheetQuaterly"));
const DeportFormReg = lazy(() => import("./forms/DeportForm"));
const DeployFormList = lazy(() => import("./tables/DeportFormList"));
const DeportForm_Edit = lazy(() => import("./edit/EditDeportyearly"));
const CentCompPreventiveForm = lazy(() => import("./forms/CentCompPreForm"));
const CentCompPreventiveList = lazy(() => import("./tables/CentCompPreList"));
const CentCompPreventive_Edit = lazy(() => import("./edit/EditCentComputer"));
const AfcPreventChkform = lazy(() => import("./forms/AfcPreventChkform"));
const AfcAnnexure_A_Edit = lazy(() => import("./edit/EditAfcAnnexureA"));
const AfcPreventformList = lazy(() => import("./tables/AfcPreventformList"));
const AfcPreAnnexureBList = lazy(() => import("./tables/AfcAnnexureBList"));
const AfcAnnexureBform = lazy(() => import("./forms/AfcAnnexureBForm"));
const AfcAnnexureBEdit = lazy(() => import("./edit/EditAfcAnnexureB"));
const GatePassList = lazy(() => import("./tables/GatePassList"));
const GatePass = lazy(() => import("./forms/GatePass"));
const GatePassEdit = lazy(() => import("./edit/EditGatePass"));
const ESPQuarterlyList = lazy(() => import("./tables/EspQuarterlySignalList"));
const ESP_Quarterly_Edit = lazy(() => import("./edit/ESPQuarterlySignalEdit"));
const ESPQuaterlyMaintanance = lazy(() => import("./forms/ESPQuarterlySignalRegister"));
const SignalMainLineRegister = lazy(() => import("./forms/ColorLightSignalMainline"));
const SignalMainlineList = lazy(() => import("./tables/ColorLightSignalMainlineList"));
const SignalMainline_Edit = lazy(() => import("./edit/ColorLightSignalMainlineEdit"));
const AFCAnnexureMainlineList = lazy(() => import("./list/AFCAnnexureBMainlineList"));
const AFCPreventAnnexureAMainlineList = lazy(() => import("./list/AFCPreventformMainlineAList"));
const CentCompPreventiveListPMLogBook12 = lazy(() => import("./list/CentCompPMlogBook12"));
const CentCompPMlogBook12 = lazy(() => import("./list/CentCompPMlogBook12"));
const ColorLightSignalling = lazy(() => import("./list/ColorLightSingallingList"));
const PMSheetDeportYearlyList = lazy(() => import("./list/DeportPMSheetYearly"));
const ESPQuarterlySignalling = lazy(() => import("./list/ESPQuarterlySignalling"));
const GatePassStoreList = lazy(() => import("./list/GatePassStoreList"));
const PMSheetDeportQuarterlyList = lazy(() => import("./list/PMSheetDeportQuarterly"));
const Update_PM_Occ_Bcc_2Book_list = lazy(() => import("./list/UpdateCheckListPMOCCBCC2BookDone"));
const CBTTrainingReg = lazy(() => import("./forms/rajiv/CBTTrainingReg"));
const EditCbtTraining = lazy(() => import("./edit/rajiv/EditCbtTraining"));
const CBTTrainingList = lazy(() => import("./tables/rajiv/CBTTrainingList"));
const AFCMonthlyReg = lazy(() => import("./forms/rajiv/AFCMonthlyReg"));
const AFCMontylyList = lazy(() => import("./tables/rajiv/AFCMonthlyList"));
const EditAFCMonthly = lazy(() => import("./edit/rajiv/EditAFCMonthly"));
const CardInitializationReg = lazy(() => import("./forms/rajiv/CardInitializationReg"));
const CardInitializationList = lazy(() => import("./tables/rajiv/CardInitializationList"));
const CardInitilizationEdit = lazy(() => import("./edit/rajiv/CardInitializationEdit"));
const DailTelecomMainCheckListReg = lazy(() => import("./forms/rajiv/DailTelecomMainCheckListReg"));
const DailyTelecomCheckList = lazy(() => import("./tables/rajiv/DailyTelecomCheckList"));
const EditDailyTelecomCheckList = lazy(() => import("./edit/rajiv/EditDailyTelecomCheckList"));
const FACP = lazy(() => import("./forms/rajiv/FACP"));
const FACPList = lazy(() => import("./tables/rajiv/FACPList"));
const EditFacp = lazy(() => import("./edit/rajiv/EditFacp"));
const FoundReceivedCashList = lazy(() => import("./tables/rajiv/FoundReceivedCashList"));
const FoundReceivedCashReg = lazy(() => import("./forms/rajiv/FoundReceivedCashReg"));
const EditFoundReceivedCash = lazy(() => import("./edit/rajiv/EditFoundReceivedCash"));
const JobCard = lazy(() => import("./forms/rajiv/JobCard"));
const jobCardList = lazy(() => import("./tables/rajiv/jobCardList"));
const EditJobCard = lazy(() => import("./edit/rajiv/EditJobCard"));
const ImprestReg = lazy(() => import("./forms/rajiv/ImprestReg"));
const ImprestRegList = lazy(() => import("./tables/rajiv/ImprestRegList"));
const ImprestReglst = lazy(() => import("./list/rajiv/ImprestReglst"));
const ImprestEdit = lazy(() => import("./edit/rajiv/ImprestEdit"));
const LoanRegister = lazy(() => import("./forms/rajiv/LoanRegister"));
const LoanRegisterList = lazy(() => import("./tables/rajiv/LoanRegisterList"));
const LoanRegisterEdit = lazy(() => import("./edit/rajiv/EditLoanRegister"));
const MJL11 = lazy(() => import("./forms/rajiv/MJL11"));
const MJL11List = lazy(() => import("./tables/rajiv/MJL11List"));
const EditMJL11 = lazy(() => import("./edit/rajiv/EditMJL11"));
const LiftRescueRegister = lazy(() => import("./departments/operation/forms/OperationLiftRescueForm"));
const LiftRescueList = lazy(() => import("./tables/rajiv/OperationLiftRescueList"));
const OperationLiftRescueEdit = lazy(() => import("./edit/rajiv/OperationLiftRescueEdit"));
const OperationStationDiaryReg = lazy(() => import("./departments/operation/forms/OperationStationDiaryForm"));
const EditStationDiary = lazy(() => import("./edit/rajiv/EditStaionDiary"));
const OperationStationDiaryList = lazy(() => import("./tables/rajiv/OperationStationDiaryList"));
const PMLogBook3Reg = lazy(() => import("./forms/rajiv/PMLogBook3Reg"));
const PMLogBook3List = lazy(() => import("./tables/rajiv/PMLogBook3List"));
const EditPMLogBook3 = lazy(() => import("./edit/rajiv/EditPMLogBook3"));
const PMLogBookMainLine3Reg = lazy(() => import("./forms/rajiv/PMLogBookMainLine3Reg"));
const PMLogBookMainLine3List = lazy(() => import("./tables/rajiv/PMLogBookMainLine3List"));
const EditPMLogBookMainline3 = lazy(() => import("./edit/rajiv/EditPMlogBookmainline3"));
const PmsheetDepotMontly = lazy(() => import("./tables/rajiv/PMsheetMonthlyList"));
const PmsheetMontlyDepotReg = lazy(() => import("./forms/rajiv/PmsheetMontlyDepotReg"));
const EditPMSheetMonthlyDepot = lazy(() => import("./edit/rajiv/EditPMSheetMonthlyDepot"));
const PoliceCustodyReg = lazy(() => import("./forms/rajiv/PoliceCustodyReg"));
const PoliceCustodyRegList = lazy(() => import("./tables/rajiv/PoliceCustodyRegList"));
const EditPoliceCustody = lazy(() => import("./edit/rajiv/EditPoliceCustody"));
const QuarterlyTrainInspection = lazy(() => import("./forms/rajiv/QuarterlyTrainInspection"));
const QuarterlyTrainInspectionList = lazy(() => import("./tables/rajiv/QuarterlyTrainInspectionList"));
const EditQTrainInspection = lazy(() => import("./edit/rajiv/EditQTrainInspection"));
const SDCEntryExitReg = lazy(() => import("./forms/rajiv/SDCEntryExitReg"));
const SDCEntryExitList = lazy(() => import("./tables/rajiv/SDCEntryExitList"));
const EditSDCEntryExit = lazy(() => import("./edit/rajiv/EditSDCEntryExit"));
const SMPS = lazy(() => import("./forms/rajiv/SMPS"));
const SMPSList = lazy(() => import("./tables/rajiv/SMPS"));
const EditSMPS = lazy(() => import("./edit/rajiv/EditSMPS"));
const AFCMonthlyLists = lazy(() => import("./list/rajiv/AFCMontlyLists"));
const DailyTelecomCheckLIstDepotLists = lazy(() => import("./list/rajiv/DailyTelecomChecklistPmDepotLists"));
const JobCardLists = lazy(() => import("./list/rajiv/JobCardLists"));
const MJL11Lists = lazy(() => import("./list/rajiv/MJL11Lists"));
const OperationStationDiaryLists = lazy(() => import("./list/rajiv/OperationStationDiaryLists"));
const PMLogBook3Lists = lazy(() => import("./list/rajiv/PMLogBook3Lists"));
const PMLogBookMainline3Lists = lazy(() => import("./list/rajiv/PMLogBookMainline3Lists"));
const PMsheetMonthlyLists = lazy(() => import("./list/rajiv/PMsheetMonthlyLists"));
const QuarterlyTrainInspectionLists = lazy(() => import("./list/rajiv/QuarterlyTrainInspectionLists"));
const SMPSLists = lazy(() => import("./list/rajiv/SMPSLists"));
const ManualPointDrill = lazy(() => import("./forms/manshi/ManualPointDrill"));
const ManualPointList = lazy(() => import("./tables/manshi/ManualPointList"));

const PossessionRegister = lazy(() => import("./departments/operation/forms/PossessionRegisterForm"));
const PossessionRegisterList = lazy(() => import("./tables/manshi/PossessionRegisterList"));

const ETSDrill = lazy(() => import("./forms/manshi/ETSDrill"));
const ETSDrillList = lazy(() => import("./tables/manshi/ETSDrillList"));

const MaterialDistribution = lazy(() => import("./forms/manshi/MaterialDistribution"));
const MaterialDistributionList = lazy(() => import("./tables/manshi/MaterialDistributionList"));

const Consumables = lazy(() => import("./forms/manshi/Consumables"));
const ConsumablesList = lazy(() => import("./tables/manshi/ConsumablesList"));

const Os_Urc_In_Out = lazy(() => import("./forms/manshi/Os_Urc_In_Out"));
const Os_Urc_List = lazy(() => import("./tables/manshi/Os_Urc_List"));

const Contractor_Work_Done = lazy(() => import("./forms/manshi/Contractor_Work_Done"));
const Contractor_Work_Done_List = lazy(() => import("./tables/manshi/Contractor_Work_Done_List"));

const Afc_prevention = lazy(() => import("./forms/manshi/Afc_prevention"));
const Afc_preventionList = lazy(() => import("./tables/manshi/Afc_preventionList"));

const SerEntry = lazy(() => import("./forms/manshi/SerEntry"));
const SerEntryList = lazy(() => import("./tables/manshi/SerEntryList"));
const ReplacementReg = lazy(() => import("./forms/manshi/ReplacementReg"));
const ReplacementList = lazy(() => import("./tables/manshi/ReplacementList"));

const LiftRescue1 = lazy(() => import("./forms/manshi/LiftRescue1"));
const LiftRescue1list = lazy(() => import("./tables/manshi/LiftRescue1list"));

const LiftRescue2 = lazy(() => import("./forms/manshi/LiftRescue2"));
const LiftRescue2list = lazy(() => import("./tables/manshi/LiftRescue2list"));

const Honorarium = lazy(() => import("./forms/manshi/Honorarium"));
const HonorariumList = lazy(() => import("./tables/manshi/HonorariumList"));
//
const Pmlog6 = lazy(() => import("./forms/manshi/Pmlog6"));
const Pmlog6List = lazy(() => import("./tables/manshi/Pmlog6List"));
const PmlogMaintain = lazy(() => import("./forms/manshi/PmlogMaintain"));
const PmlogMaintainList = lazy(() => import("./tables/manshi/PmlogMaintainList"));
const DailyTelecom = lazy(() => import("./forms/manshi/DailyTelecom"));
const DailyTelecomList = lazy(() => import("./tables/manshi/DailyTelecomList"));
const EditManual = lazy(() => import("./edit/manshi/EditManual"));
const EditLift1 = lazy(() => import("./edit/manshi/EditLift1"));
const EditPossession = lazy(() => import("./edit/manshi/EditPossession"));
const EditOsUrc = lazy(() => import("./edit/manshi/EditOsUrc"));
const EditConsume = lazy(() => import("./edit/manshi/EditConsume"));
const EditHonorarium = lazy(() => import("./edit/manshi/EditHonorarium"));
const EditMaterial = lazy(() => import("./edit/manshi/EditMaterial"));
const EditLift2 = lazy(() => import("./edit/manshi/EditLift2"));
const EditContractor = lazy(() => import("./edit/manshi/EditContractor"));
const EditEtsDrill = lazy(() => import("./edit/manshi/EditEtsDrill"));
const EditRep = lazy(() => import("./edit/manshi/EditRep"));
// import Editlab from "./edit/manshi/Editlab";
const EditSerEntry = lazy(() => import("./edit/manshi/EditSerEntry"));

const EditPmlog6 = lazy(() => import("./edit/manshi/EditPmlog6"));
const Editafc = lazy(() => import("./edit/manshi/Editafc"));
const Editpmlogmaintain = lazy(() => import("./edit/manshi/Editpmlogmaintain"));
const ShuntSignal = lazy(() => import("./forms/manshi/ShuntSignal"));

const EarthConnectivity = lazy(() => import("./forms/manshi/EarthConnectivity"));
const EditDailyTelecom = lazy(() => import("./edit/manshi/EditDailyTelecom"));
const EarthConnectivityList = lazy(() => import("./tables/manshi/EarthConnectivityList"));
const EditEarth = lazy(() => import("./edit/manshi/EditEarth"));
const ShuntList = lazy(() => import("./tables/manshi/ShuntList"));
const EditShunt = lazy(() => import("./edit/manshi/EditShunt"));
const Pmsheetoccbcchalfyearlyform = lazy(() => import("./forms/manshi/Pmsheetoccbcchalfyearlyform"));
const Pmsheetoccbcchalfyearlytable = lazy(() => import("./tables/manshi/Pmsheetoccbcchalfyearlytable"));
const Pmsheetoccbcchalfyearlyedit = lazy(() => import("./edit/manshi/Pmsheetoccbcchalfyearlyedit"));
const Afc_pre_list = lazy(() => import("./list/manshi/Afc_pre_list"));
const Daily_tele_list = lazy(() => import("./list/manshi/Daily_tele_list"));
const Earth_connectivity_list = lazy(() => import("./list/manshi/Earth_connectivity_list"));
const Pm_mainlist = lazy(() => import("./list/manshi/Pm_mainlist"));
const Pmoccbcch_list = lazy(() => import("./list/manshi/Pmoccbcch_list"));
const ShuntSignalList = lazy(() => import("./list/manshi/ShuntSignalList"));
const Pm_log6_half_yearly_list = lazy(() => import("./list/manshi/Pm_log6_half_yearly_list"));
const BoxCleaningRecord = lazy(() => import("./forms/satya/BoxCleaningRecord"));
const BoxCleaningRecordList = lazy(() => import("./tables/satya/BoxCleaningRecordList"));
const EditBoxCleaningRecord = lazy(() => import("./edit/satya/EditBoxCleaningRecord"));
const ListBoxCleaningRecord = lazy(() => import("./list/satya/ListBoxCleaningRecord"));
const FacpDrill = lazy(() => import("./forms/satya/FacpDrill"));
const FacpDrillList = lazy(() => import("./tables/satya/FacpDrillList"));
const EditFacpDrill = lazy(() => import("./edit/satya/EditFacpDrill"));
const LatsRegister = lazy(() => import("./forms/satya/LatsRegister"));
const LatsList = lazy(() => import("./tables/satya/LatsList"));
const EditLats = lazy(() => import("./edit/satya/EditLats"));
const EquipmentFailureRegister = lazy(() => import("./forms/satya/EquipmentFailureRegister"));
const EquipmentFailureRegisterList = lazy(() => import("./tables/satya/EquipmentFailureRegisterList"));
const EditEquipment = lazy(() => import("./edit/satya/EditEquipment"));
const MonthlyCabinetRecord = lazy(() => import("./forms/satya/MonthlyCabinetRecord"));
const MonthlyCabinetRecordList = lazy(() => import("./tables/satya/MonthlyCabinetRecordList"));
const EditCabinetRecord = lazy(() => import("./edit/satya/EditCabinetRecord"));
const ListMonthlyCabinetRecord = lazy(() => import("./list/satya/ListMonthlyCabinetRecord"));
const SEREntryPage = lazy(() => import("./forms/satya/SEREntryPage"));
const SEREntryPageList = lazy(() => import("./tables/satya/SEREntryPageList"));
const EditSERPage = lazy(() => import("./edit/satya/EditSERPage"));
const EditShift = lazy(() => import("./edit/satya/EditShift"));
const ShiftLogBook = lazy(() => import("./forms/satya/ShiftLogBook"));
const ShiftLogBookList = lazy(() => import("./tables/satya/ShiftLogBookList"));
const ListShiftLogBook = lazy(() => import("./list/satya/ListShiftLogBook"));
const SwUpdateRegister = lazy(() => import("./forms/satya/SwUpdateRegister"));
const SwUpdateRegisterList = lazy(() => import("./tables/satya/SwUpdateRegisterList"));
const EditSwUpdate = lazy(() => import("./edit/satya/editSwUpdate"));
const TeaCoffeeRegister = lazy(() => import("./forms/satya/TeaCoffeeRegister"));
const TeaCoffeeList = lazy(() => import("./tables/satya/TeaCoffeeList"));
const EditTeaCoffee = lazy(() => import("./edit/satya/EditTeaCoffee"));
const TrainIdRegister = lazy(() => import("./departments/operation/forms/TrainIdChangeRecordForm"));
const TrainIdList = lazy(() => import("./tables/satya/TrainIdList"));
const EditTrainId = lazy(() => import("./edit/satya/EditTrainId"));
const CrewControlCcap = lazy(() => import("./departments/operation/forms/CrewControlCcapForm"));
const CrewControlCcapList = lazy(() => import("./tables/satya/CrewControlCcapList"));
const EditCrew = lazy(() => import("./edit/satya/EditCrew"));
const AfcPreventiveMaintenance = lazy(() => import("./forms/satya/AfcPreventiveMaintenance"));
const AfcPreventiveMaintenanceList = lazy(() => import("./tables/satya/AfcPreventiveMaintenanceList"));
const EditAfcPreventive = lazy(() => import("./edit/satya/EditAfcPreventive"));
const ListAfcPreventiveMaintenance = lazy(() => import("./list/satya/ListAfcPreventiveMaintenance"));

const PMLogBookList = lazy(() => import("./tables/satya/PMLogBookList"));
const EditPMList = lazy(() => import("./edit/satya/EditPMList"));
const ListPMLogBook = lazy(() => import("./list/satya/ListPMLogBook"));
const PMMainline = lazy(() => import("./forms/satya/PMMainline"));
const PMMainlineList = lazy(() => import("./tables/satya/PMMainlineList"));
const EditPMMainline = lazy(() => import("./edit/satya/EditPMMainline"));
const ListPMMainline = lazy(() => import("./list/satya/ListPMMainline"));
const LabMaterialTransactionRegister = lazy(() => import("./forms/satya/LabMaterialTransactionRegister"));
const LabMaterialTransactionList = lazy(() => import("./tables/satya/LabMaterialTransactionList"));
const EditLabMaterial = lazy(() => import("./edit/satya/EditLabMaterial"));
// import EditIncident from "./edit/satya/EditIncident";
// import IncidentRegisterSignals from "./forms/satya/IncidentRegisterSignals";
// import IncidentRegisterSignalsList from "./tables/satya/IncidentRegisterSignalsList";
const EditSchedule = lazy(() => import("./edit/satya/EditSchedule"));
const MonthlyMaintenanceSchedule = lazy(() => import("./forms/satya/MonthlyMaintenanceSchedule"));
const MonthlyMaintenanceScheduleList = lazy(() => import("./tables/satya/MonthlyMaintenanceScheduleList"));
const ListMonthlyMaintenanceSchedule = lazy(() => import("./list/satya/ListMonthlyMaintenanceSchedule"));
const AssuRegReg = lazy(() => import("./forms/chanchal/AssuRegReg"));
const AssuRegList = lazy(() => import("./tables/chanchal/AssuRegList"));
// import AssuRegEdit from "./edit/chanchal/AssuRegEdit";
const AfcGateDrillReg = lazy(() => import("./forms/chanchal/AfcGateDrillReg"));
const AfcGateDrillList = lazy(() => import("./tables/chanchal/AfcGateDrillList"));
const AfcGateDrillEdit = lazy(() => import("./edit/chanchal/AfcGateDrillEdit"));
const ComRecRegReg = lazy(() => import("./forms/chanchal/ComRecReg"));
const ComRecRegList = lazy(() => import("./tables/chanchal/ComRecRegList"));
const ComRecRegEdit = lazy(() => import("./edit/chanchal/ComRecRegEdit"));
const EquFaiRegReg = lazy(() => import("./forms/chanchal/EquFaiReg"));
const EquFaiRegList = lazy(() => import("./tables/chanchal/EquFaiRegList"));
const EquFaiRegEdit = lazy(() => import("./edit/chanchal/EquFaiRegEdit"));
const ManPoiOpeDrillReg = lazy(() => import("./forms/chanchal/ManPoiOpeDrill"));
const ManPoiOpeDrillList = lazy(() => import("./tables/chanchal/ManPoiOpeDrillList"));
const ManPoiOpeDrillEdit = lazy(() => import("./edit/chanchal/ManPoiOpeDrillEdit"));
const GateReg = lazy(() => import("./forms/chanchal/Gate"));
const GateList = lazy(() => import("./tables/chanchal/GateList"));
const GateEdit = lazy(() => import("./edit/chanchal/GateEdit"));
const PmFolUpReg = lazy(() => import("./forms/chanchal/PmFolUp"));
const PmFolUpList = lazy(() => import("./tables/chanchal/PmFolUpList"));
const PmFolUpEdit = lazy(() => import("./edit/chanchal/PmFolUpEdit"));
const ChecklistReg = lazy(() => import("./forms/chanchal/Pm_logbook_half_yearly_other_mainline"));
const ChecklistList = lazy(() => import("./tables/chanchal/Pm_logbook_half_yearly_other_mainline_List"));
const ChecklistEdit = lazy(() => import("./edit/chanchal/Pm_logbook_half_yearly_other_mainline_Edit"));
const Checklist_NewList = lazy(() => import("./list/chanchal/Pm_logbook_half_yearly_other_mainline_NewList"));
const DailyWorkReg = lazy(() => import("./forms/chanchal/DailyWork"));
const DailyWorkList = lazy(() => import("./tables/chanchal/DailyWorkList"));
const DailyWorkEditt = lazy(() => import("./edit/chanchal/DailyWorkEdit"));
const FailureReportReg = lazy(() => import("./forms/chanchal/FailureReport"));
const FailureReportList = lazy(() => import("./tables/chanchal/FailureReportList"));
const FailureReportEdit = lazy(() => import("./edit/chanchal/FailureReportEdit"));
const FailureReport_NewList = lazy(() => import("./list/chanchal/FailureReport_NewList"));
const StationDiaryReg = lazy(() => import("./departments/operation/forms/StationDiarySignallingForm"));
const StationDiaryList = lazy(() => import("./tables/chanchal/StationDiaryList"));
const StationDiaryEdit = lazy(() => import("./edit/chanchal/StationDiaryEdit"));
const StationDiary_NewList = lazy(() => import("./list/chanchal/StationDiary_NewList"));
const ClaimReg = lazy(() => import("./forms/chanchal/ClaimReg"));
const ClaimRegList = lazy(() => import("./tables/chanchal/ClaimRegList"));
const ClaimRegEdit = lazy(() => import("./edit/chanchal/ClaimRegEdit"));
const LineDefectReg = lazy(() => import("./forms/chanchal/LineDefect"));
const LineDefectList = lazy(() => import("./tables/chanchal/LineDefectList"));
const LineDefectEdit = lazy(() => import("./edit/chanchal/LineDefectEdit"));
const PASDrillReg = lazy(() => import("./forms/chanchal/PASDrill"));
const PASDrillList = lazy(() => import("./tables/chanchal/PASDrillList"));
const PASDrillEdit = lazy(() => import("./edit/chanchal/PASDrillEdit"));
const CSCInitRegReg = lazy(() => import("./forms/chanchal/CSCInitReg"));
const CSCInitRegList = lazy(() => import("./tables/chanchal/CSCInitRegList"));
const CSCInitRegEdit = lazy(() => import("./edit/chanchal/CSCInitRegEdit"));
const PreMainWorkReg = lazy(() => import("./forms/chanchal/PreMainWork"));
const PreMainWorkList = lazy(() => import("./tables/chanchal/PreMainWorkList"));
const PreMainWorkEdit = lazy(() => import("./edit/chanchal/PreMainWorkEdit"));
const PreMainWork_NewList = lazy(() => import("./list/chanchal/PreMainWork_NewList"));
const MeasurementVoltageMCBinPDC = lazy(() => import("./forms/chanchal/MeasurementVoltageMCBinPDC"));
const MeasurementVoltageMCBinPDCList = lazy(() => import("./tables/chanchal/MeasurementVoltageMCBinPDCList"));
const MeasurementVoltageMCBinPDCEdit = lazy(() => import("./edit/chanchal/MeasurementVoltageMCBinPDCEdit"));
const MeasurementVoltageMCBinPDC_NewList = lazy(() => import("./list/chanchal/MeasurementVoltageMCBinPDC_NewList"));
// import IncidentRegisterSignals from "./forms/pinki/IncidentRegisterSignals";
// import IncidentRegisterSignalsList from "./tables/pinki/IncidentRegisterSignalsList";
// import EditIncident from "./edit/pinki/EditIncident";

const ParameterReg = lazy(() => import("./forms/pinki/ParameterReg"));
const ParameterList = lazy(() => import("./tables/pinki/ParameterList"));
const EditParameter1 = lazy(() => import("./edit/pinki/EditParameter1"));
// import ParameterList from "./list/pinki/Parameterlist";

const MaterialDistribReg = lazy(() => import("./forms/pinki/MaterialDistribReg"));
const MaterialDistribList = lazy(() => import("./tables/pinki/MaterialDistribList"));
const EditMaterialTrainees = lazy(() => import("./edit/pinki/EditMaterial"));

const FMTSReg = lazy(() => import("./forms/pinki/FMTSReg"));
const FMTSList = lazy(() => import("./tables/pinki/FMTSList"));
const EditFMTS = lazy(() => import("./edit/pinki/EditFMTS"));

const IncidentAccidentReportReg = lazy(() => import("./forms/pinki/IncidentAccidentReportReg"));
const IncidentAccidentReportList = lazy(() => import("./tables/pinki/IncidentAccidentReportList"));
const EditIncidentReport = lazy(() => import("./edit/pinki/EditIncidentReport"));
const IncidentAccidentList = lazy(() => import("./list/pinki/IncidentAccidentList"));
const ManualPointReg = lazy(() => import("./forms/pinki/ManualPointReg"));
const ManualPointListP = lazy(() => import("./tables/pinki/ManualPointList"));
const EditManualPoint = lazy(() => import("./edit/pinki/EditManualPoint"));

const AtcExaminationReg = lazy(() => import("./forms/pinki/AtcExaminationReg"));
const AtcExaminationList = lazy(() => import("./tables/pinki/AtcExaminationList"));
const EditATCExamination = lazy(() => import("./edit/pinki/EditATCExamination"));
const Atc_Examination_list = lazy(() => import("./list/pinki/Atc_Examination_list"));

const HardwareFailureReg = lazy(() => import("./forms/pinki/HardwareFailureReg"));
const HardwareFailureList = lazy(() => import("./tables/pinki/HardwareFailureList"));
const EditHardwareFailure = lazy(() => import("./edit/pinki/EditHardwareFailure"));

const SignalFailureReg = lazy(() => import("./forms/pinki/SignalFailureReg"));
const SignalFailureList = lazy(() => import("./tables/pinki/SignalFailureList"));
const EditSignalFailure = lazy(() => import("./edit/pinki/EditSignalFailure"));

const AxlecounterList = lazy(() => import("./tables/pinki/AxlecounterList"));
const EditAxleCounter = lazy(() => import("./edit/pinki/EditAxleCounter"));
const Axlecounterresetregister = lazy(() => import("./forms/pinki/Axlecounterresetregister"));

const StockmovementList = lazy(() => import("./tables/pinki/StockmovementList"));
const StockMovementCards = lazy(() => import("./forms/store/StockMovementCards"));
const EditStockMovement = lazy(() => import("./edit/pinki/EditStockMovement"));

const DeadStock = lazy(() => import("./forms/pinki/DeadStock"));
const DeadStockList = lazy(() => import("./tables/pinki/DeadStockList"));
const EditDeadStock = lazy(() => import("./edit/pinki/EditDeadStock"));

const AgentCardReg = lazy(() => import("./forms/pinki/AgentCardReg"));
const AgentCardList = lazy(() => import("./tables/pinki/AgentCardList"));
const EditAgentCard = lazy(() => import("./edit/pinki/EditAgentCard"));

const BoxCleaningOutdoorReg = lazy(() => import("./forms/pinki/BoxCleaningOutdoorReg"));
const BoxCleaningOutdoorList = lazy(() => import("./tables/pinki/BoxCleaningOutdoorList"));
const EditBoxCleaning = lazy(() => import("./edit/pinki/EditBoxCleaning"));
const BoxCleaning_Outdoor_list = lazy(() => import("./list/pinki/BoxCleaning_Outdoor_list"));

const ATSList = lazy(() => import("./tables/pinki/ATSList"));
const ATSReg = lazy(() => import("./forms/pinki/ATSReg"));
const EditATS = lazy(() => import("./edit/pinki/EditATS"));
const Ats_list = lazy(() => import("./list/pinki/Ats_list"));

const HandingTakingNoteReg = lazy(() => import("./forms/pinki/HandingTakingNoteReg"));
const HandingTakingNoteList = lazy(() => import("./tables/pinki/HandingTakingNoteList"));
const EditHandingTaking = lazy(() => import("./edit/pinki/EditHandingTaking"));

const PMLogBookReg = lazy(() => import("./forms/pinki/PMLogBookReg"));
const PMLogBookListSDC = lazy(() => import("./tables/pinki/PMLogBookListSDC"));
const EditPMLogBook = lazy(() => import("./edit/pinki/EditPMLogBook"));
const PM_log_Book_list = lazy(() => import("./list/pinki/PM_log_Book_list"));

const AfcPreventiveList = lazy(() => import("./tables/pinki/AfcPreventiveList"));
const AfcPreventiveReg = lazy(() => import("./forms/pinki/AfcPreventiveReg"));
const EditAfcPreventiveGate = lazy(() => import("./edit/pinki/EditAfcPreventive"));
const AfcPreventive_list = lazy(() => import("./list/pinki/AfcPreventive_list"));

const PmsheetMonthlyDepotReg = lazy(() => import("./forms/pinki/PmsheetMonthlyDepotReg"));
const PMsheetMonthlyList = lazy(() => import("./tables/pinki/PMsheetMonthlyList"));
const EditPMsheetMonthlyDepot = lazy(() => import("./edit/pinki/EditPMsheetMonthlyDepot"));
const Pm_sheet_monthly_list = lazy(() => import("./list/pinki/Pm_sheet_monthly_list"));
const Grievance = lazy(() => import("./forms/isha/Grievance"));
const EditGrievance = lazy(() => import("./edit/isha/EditGrivance"));
const GrievanceList = lazy(() => import("./tables/isha/GrievanceList"));

const ContractualSpareTesting = lazy(() => import("./forms/isha/ContractualSpareTesting"));
const ContractualSpareTestingTable = lazy(() => import("./tables/isha/ContractualSpareTestingTable"));
const EditContractualSpareTest = lazy(() => import("./edit/isha/EditContractualSpareTesting"));

const Loanreg = lazy(() => import("./forms/isha/Loanreg"));
const LoanregList = lazy(() => import("./tables/isha/LoanregList"));
const EditLoanreg = lazy(() => import("./edit/isha/EditLoanreg"));

const FanRack = lazy(() => import("./forms/isha/FanRack"));
const EditFanRack = lazy(() => import("./edit/isha/EditFanRack"));
const FanRackTabel = lazy(() => import("./tables/isha/FanRackTable"));
const FanRackList = lazy(() => import("./list/isha/FanRackList"));

const FilterReplacement = lazy(() => import("./forms/isha/FilterReplacement"));
const EditFilterReplacement = lazy(() => import("./edit/isha/EditFilterReplacement"));
const FilterReplacementTable = lazy(() => import("./tables/isha/FilterReplacementTable"));
const FilterReplacementList = lazy(() => import("./list/isha/FilterReplacementList"));

const AlxeCounter = lazy(() => import("./forms/isha/AxleCounter"));
const AxleCounterTable = lazy(() => import("./tables/isha/AxleCounterTable"));
const EditAxle = lazy(() => import("./edit/isha/EditAxleCounter"));
const AxelCounteMaintenanceRecord = lazy(() => import("./list/isha/AxleCounterMaintenanceList"));
const PREVENTIVEMAINTENACE_CC_CCHS = lazy(() => import("./forms/isha/PREVENTIVEMAINTENACE_CC_CCHS"));
const PREVENTIVEMAINTENACE_CC_CCHSTable = lazy(() => import("./tables/isha/PREVENTIVEMAINTENACE_CC_CCHSTable"));
const EditPREVENTIVEMAINTENACE_CC_CCHS = lazy(() => import("./edit/isha/Edit PREVENTIVEMAINTENACE_CC_CCHS"));

const CSCInitializationDetailRegister = lazy(() => import("./forms/isha/CSCInitializationDetailRegister"));
const CSCInitializationDetailRegisterList = lazy(() => import("./tables/isha/CSCInitializationDetailRegisterList"));
const EditCSCInitializationDetailRegister = lazy(() => import("./edit/isha/EditCSCInitializationRegister"));

const DeviceApplicationSoftwareLIST = lazy(() => import("./tables/isha/DeviceApplicationSoftwareLIST"));
const DeviceApplicationSoftware = lazy(() => import("./forms/isha/DeviceApplicationSoftware"));
const EditDeviceApplicationSoftware = lazy(() => import("./edit/isha/EditDeviceApplicationSoftware"));
const PREVENTIVEMAINTENACE_CC_CCHSList = lazy(() => import("./list/isha/PREVENTIVEMAINTENACE_CC_CCHSList"));
const AttendanceRegisterList = lazy(() => import("./tables/isha/AttendanceRegisterList"));
const AttendanceRegister = lazy(() => import("./forms/isha/AttendanceRegister"));

const LMRCTable = lazy(() => import("./tables/isha/LMRCTable"));
// import LatsRegister from "./forms/isha/LMRC";
// import EditLats from "./edit/isha/EditLATSVDU";

const ControTankenOver = lazy(() => import("./forms/isha/ControlTakenOver"));

const EditControlTakenOver = lazy(() => import("./edit/isha/EditControlTakenOver"));

const ESPList = lazy(() => import("./tables/isha/ESPList"));
const ESP = lazy(() => import("./forms/isha/ESP"));
const EditEsp = lazy(() => import("./edit/isha/EditEsp"));

const ForeignCurrencyForm = lazy(() => import("./forms/store/ForeignCurrencyForm"));
const FoundForeignCurrencyList = lazy(() => import("./tables/isha/FoundForeignCurrencyList"));
const EditFoundForeignCurrency = lazy(() => import("./edit/isha/EditFoundForeignCurrency"));

const DAR = lazy(() => import("./forms/isha/DAR"));
const DARList = lazy(() => import("./tables/isha/DARList"));
const EditDar = lazy(() => import("./edit/isha/EditDAR"));

const IncidentAccidentOprationReg = lazy(() => import("./forms/isha/IncidentAccidentReg"));
const IncidentAccidentRegOperationList = lazy(() => import("./tables/isha/IncidentAccidentRegList"));
const IncidentAccidentRegisterOperationEdit = lazy(() => import("./edit/isha/EditIncidentAccidentReg"));
const EditAttendanceRegister = lazy(() => import("./edit/isha/EditAttendanceRegister"));
const DailyTransactionRegister_RECEIPTS = lazy(() => import("./forms/isha/DailyTransactionRegister_RECEIPTS"));
const DailyTransactionRegisterList_RECEIPTS = lazy(() => import("./tables/isha/DailyTransactionRegisterList_RECEIPTS"));
const EditDailyTransactionRegister_RECEIPTS = lazy(() => import("./edit/isha/EditDailyTransactionRegister_RECEIPTS"));

const AFCPREVENTIVEMAINTENANCCHECKLISTHalfYearly = lazy(() => import("./forms/isha/AfcPreventiveMaintenanceCheckListHalfYearly"));
const EditAfcPreventiveHalfyearly = lazy(() => import("./edit/isha/EditAfcPreventiveHalfYearly"));
const AfcPreventiveMaintenanceTable = lazy(() => import("./tables/isha/AfcPreventiveMaintenanceTable"));
const AfcPreventiveMaintenanceHalfYearlyList = lazy(() => import("./list/isha/AFCPreventiveMaintenanceHalfYearlyList"));

const PMLOGBOOKMAINLINE9 = lazy(() => import("./forms/isha/PMLOGBOOKMAINLINE9"));
const EditPMLOGBOOKMAINLINE9 = lazy(() => import("./edit/isha/EditPMLOGBOOKMAAINLINE9"));
const PMLOGBOOKMAINLINE9Table = lazy(() => import("./tables/isha/PMLOGBOOKMAINLINE9Table"));
const PMLOGBOOKMAINLINE9List = lazy(() => import("./list/isha/PMLOGBOOKMAINLINE9List"));
const IncidentRegisterSignals = lazy(() => import("./forms/monika/IncidentRegisterSignals"));
const IncidentRegisterSignalsList = lazy(() => import("./tables/monika/IncidentRegisterSignalsList"));
const EditIncident = lazy(() => import("./edit/monika/EditIncident"));
const Escalator = lazy(() => import("./forms/monika/Escaltor"));
const EscalatorList = lazy(() => import("./tables/monika/EscalatorList"));
const EscalatorEdit = lazy(() => import("./edit/monika/EscalatorEdit"));
// import FirstAidRegister from "./forms/monika/FirstAidRegister";
// import FirstAidRegisterList from "./tables/monika/FirstAidRegisterList";
const FirstAidEdit = lazy(() => import("./edit/monika/FirstAidEdit"));

const Handoverrecord = lazy(() => import("./forms/monika/Handoverrecord"));
const HandoverRecordList = lazy(() => import("./tables/monika/HandoverRecordList"));
const PettyRepairForm = lazy(() => import("./forms/store/PettyRepairForm"));
const PeetyrepairRegisterList = lazy(() => import("./tables/monika/PeetyrepairRegisterList"));
const PeetyEdit = lazy(() => import("./edit/monika/PeetyEdit"));

const Linedefect = lazy(() => import("./forms/monika/Linedefect"));
const LinedefectList = lazy(() => import("./tables/monika/LinedefectList"));

const LibraryBookRegisterList = lazy(() => import("./tables/monika/LibraryBookRegisterList"));
const Library = lazy(() => import("./forms/monika/Library"));
const InspactionRegister = lazy(() => import("./forms/monika/InspactionRegister"));
const InspactionRegisterList = lazy(() => import("./tables/monika/InspactionRegisterList"));

const DailycheckRegister = lazy(() => import("./forms/monika/DailycheckRegister"));
const DailycheckRegisterList = lazy(() => import("./tables/monika/DailycheckRegisterList"));
const HandlingRegister = lazy(() => import("./forms/monika/HandlingRegister"));
const HandlingRegisterList = lazy(() => import("./tables/monika/HandlingRegisterList"));
const MaintenanceSchedule = lazy(() => import("./forms/monika/MaintenanceSchedule"));
const MaintenanceScheduleList = lazy(() => import("./tables/monika/MaintenanceScheduleList"));
const Officers = lazy(() => import("./forms/monika/Officers"));
const OfficersList = lazy(() => import("./tables/monika/OfficersList"));
const EarlyMaintainSchedule = lazy(() => import("./forms/monika/EarlyMaintainSchedule"));
const EarlyMaintainScheduleList = lazy(() => import("./tables/monika/EarlyMaintainScheduleList"));
const DocumentManagement = lazy(() => import("./forms/monika/DocumentManagement"));
const DocumentManagementList = lazy(() => import("./tables/monika/DocumentManagementList"));
const PmLogBook5 = lazy(() => import("./forms/monika/PmLogBook5"));
const PmLogBook5List = lazy(() => import("./tables/monika/PmLogBook5List"));
const DailTelecomMainCheckReg = lazy(() => import("./forms/monika/DailyTelecomMainCheckReg"));

const DailyTelecomMainList = lazy(() => import("./tables/monika/DailyTelecomMainList"));

const PmLogBookMainline = lazy(() => import("./forms/monika/PmLogBookMainline"));
const PmLogBookMainlineList = lazy(() => import("./tables/monika/PmLogBookMainlineList"));
const InspactionEdit = lazy(() => import("./edit/monika/InspactionEdit"));
const DocumentEdit = lazy(() => import("./edit/monika/DocumentEdit"));
const HandoverEdit = lazy(() => import("./edit/monika/HandoverEdit"));
const HandlingEdit = lazy(() => import("./edit/monika/HandlingEdit"));
const LibraryEdit = lazy(() => import("./edit/monika/LibraryEdit"));
const LineEdit = lazy(() => import("./edit/monika/LineEdit"));
const DailyTelecomMainEdit = lazy(() => import("./edit/monika/DailyTelecomMainEdit"));
const DailycheckRegisterEdit = lazy(() => import("./edit/monika/DailycheckRegisterEdit"));
const EarlyMaintainEdit = lazy(() => import("./edit/monika/EarlyMaintainEdit"));
const PmLogBookEdit = lazy(() => import("./edit/monika/PmLogBookEdit"));
const PmLogMainlineEdit = lazy(() => import("./edit/monika/PmLogMainlineEdit"));
const OfficersEdit = lazy(() => import("./edit/monika/OfficersEdit"));
const PMIRS = lazy(() => import("./forms/monika/PMIRS"));
const MaintenanceEdit = lazy(() => import("./edit/monika/MaintenanceEdit"));
const PMIRSList = lazy(() => import("./tables/monika/PMIRSList"));
const DCS = lazy(() => import("./forms/monika/DCS"));
const DCSList = lazy(() => import("./tables/monika/DCSList"));
const DCSEdit = lazy(() => import("./edit/monika/DCSEdit"));
const PMIRSEdit = lazy(() => import("./edit/monika/PMIRSEdit"));
const EKTRegister = lazy(() => import("./forms/monika/EKTRegister"));
const EKTList = lazy(() => import("./tables/monika/EKTList"));
const EKTEdit = lazy(() => import("./edit/monika/EKTEdit"));
const DailycheckRegisterLists = lazy(() => import("./list/monika/DailycheckRegisterLists"));
const DailyTelecomMainLists = lazy(() => import("./list/monika/DailyTelecomMainLists"));
const DCSLists = lazy(() => import("./list/monika/DCSLists"));
const EarlyMaintainScheduleLists = lazy(() => import("./list/monika/EarlyMaintainScheduleLists"));
const EKTLists = lazy(() => import("./list/monika/EKTLists"));
const MaintenanceScheduleLists = lazy(() => import("./list/monika/MaintenanceScheduleLists"));
const OfficersLists = lazy(() => import("./list/monika/OfficersLists"));
const PMIRSLists = lazy(() => import("./list/monika/PMIRSLists"));
const PmLogBook5Lists = lazy(() => import("./list/monika/PmLogBook5Lists"));
const PmLogBookMainlineLists = lazy(() => import("./list/monika/PmLogBookMainlineLists"));
// import IncidentRegisterSignals from "./forms/akshra/IncidentRegisterSignals";
// import IncidentRegisterSignalsList from "./tables/akshra/IncidentRegisterSignalsList";
// import EditIncident from "./edit/akshra/EditIncident";
const Afcgatedrill = lazy(() => import("./forms/akshra/Afcgatedrill"));
const AfcgatedrillList = lazy(() => import("./tables/akshra/AfcgatedrillList"));
const Inout = lazy(() => import("./forms/akshra/Inout"));
const InoutList = lazy(() => import("./tables/akshra/InoutList"));
const Tssreg = lazy(() => import("./forms/akshra/Tsrreg"));
const TsrregList = lazy(() => import("./tables/akshra/TsrregList"));

const EmefiremandrillList = lazy(() => import("./tables/akshra/EmefiremandrillList"));
const Emefiremandrill = lazy(() => import("./forms/akshra/Emefiremandrill"));
const Dtrreg = lazy(() => import("./forms/akshra/Dtrreg"));
const DtrregList = lazy(() => import("./tables/akshra/DtrregList"));

const Agentissue = lazy(() => import("./forms/akshra/Agentissue"));
const AgentissueList = lazy(() => import("./tables/akshra/AgentissueList"));
const ChecklistListview = lazy(() => import("./tables/akshra/ChecklistList"));
const Checklist = lazy(() => import("./forms/akshra/Checklist"));
const LoanregTelecomList = lazy(() => import("./tables/akshra/LoanregList"));
const LoanregTelecom = lazy(() => import("./forms/akshra/Loanreg"));

const Dtrleftside = lazy(() => import("./forms/akshra/Dtrleftside"));
const DtrleftsideList = lazy(() => import("./tables/akshra/DtrleftsideList"));
const Dtrsignalsissue = lazy(() => import("./forms/akshra/Dtrsignalsissue"));
const DtrsignalsissueList = lazy(() => import("./tables/akshra/DtrsignalsissueList"));
const Dtrsignalsreceipts = lazy(() => import("./forms/akshra/Dtrsignalsreceipts"));
const DtrsignalsreceiptsList = lazy(() => import("./tables/akshra/DtrsignalsreceiptsList"));
const Pmsheet = lazy(() => import("./forms/akshra/Pmsheet"));
const PmsheetList = lazy(() => import("./tables/akshra/PmsheetList"));

const Pmloogbook = lazy(() => import("./forms/akshra/Pmloogbook"));
const PmloogbookList = lazy(() => import("./tables/akshra/PmloogbookList"));
const EditChecklist = lazy(() => import("./edit/akshra/EditChecklist"));
const EditTraininduction = lazy(() => import("./edit/akshra/EditTraininduction"));
const EditAgentissue = lazy(() => import("./edit/akshra/EditAgentissue"));
const EditBioocc = lazy(() => import("./edit/akshra/EditBioocc."));
const EditBioreg = lazy(() => import("./edit/akshra/EditBioreg"));
const EditDtrleftside = lazy(() => import("./edit/akshra/EditDtrleftside"));
const EditDtrreg = lazy(() => import("./edit/akshra/EditDtrreg"));
const EditDtrsignalsissue = lazy(() => import("./edit/akshra/EditDtrsignalsissue"));
const EditDtrsignalsreceipts = lazy(() => import("./edit/akshra/EditDtrsignalsreceipts"));
const EditEmefire = lazy(() => import("./edit/akshra/EditEmefire"));
const UnderFalseFloorCleaning = lazy(() => import("./forms/akshra/Falsefloor"));
const UnderFalseFloorCleaningList = lazy(() => import("./tables/akshra/FalsefloorList"));
const EditInout = lazy(() => import("./edit/akshra/EditInout"));
const EditLoanregTelecom = lazy(() => import("./edit/akshra/EditLoanreg"));
const EditTsrreg = lazy(() => import("./edit/akshra/EditTsrreg"));
const EditPmsheet = lazy(() => import("./edit/akshra/EditPmsheet"));
const EditFalsefloor = lazy(() => import("./edit/akshra/EditFalsefloor"));
const EditPmloogbook = lazy(() => import("./edit/akshra/EditPmloogbook"));
const Checklistafcmainline = lazy(() => import("./list/akshra/Checklistafc"));
const ChecklistAfc = lazy(() => import("./list/akshra/Checklistafc"));
const Falsefloor_NewList = lazy(() => import("./list/akshra/Falsefloor_Newlist"));
const Pmloogbook_NewList = lazy(() => import("./list/akshra/Pmloogbook_Newlist"));
const DtrIssueStore = lazy(() => import("./forms/store/DtrIssueStore"));
const DtrReceiptStore = lazy(() => import("./forms/store/DtrReceiptStore"));
const DtrReceiptStoreList = lazy(() => import("./tables/store/DrtReceiptStoreList"));
const DtrIssueStoreList = lazy(() => import("./tables/store/DtrIssueStoreList"));
const AssetregisterSignal = lazy(() => import("./forms/store/AssetregisterSignal"));
const AssetregisterlistSignal = lazy(() => import("./tables/store/AssetregisterlistSignal"));
const RequisitionSignal = lazy(() => import("./forms/store/RequisitionSignal"));
const RequisitionSlip = lazy(() => import("./tables/store/RequisitionList"));

const TeaCofee = lazy(() => import("./forms/store/TeaCofee"));
const TeaCofeeList = lazy(() => import("./tables/store/TeaCofeeList"));

// import ParameterList from "./tables/ParameterList";
const Parameter = lazy(() => import("./forms/store/Parameter"));
const CardRefund = lazy(() => import("./forms/store/CardRefund"));
const CardRefundList = lazy(() => import("./tables/store/CardRefundList"));
const EscaaltorDrill = lazy(() => import("./forms/store/EscaaltorDrill"));
const EscalatorDrillList = lazy(() => import("./tables/store/EscalatorDrillList"));
// import RequisitionSlip from "./forms/store/RequisitionSlip";
const RequisitionSlipList = lazy(() => import("./tables/store/RequisitionSlipList"));
const TrainIdRecordReg = lazy(() => import("./forms/store/TrainIdRecordReg"));
const TrainIdRecordReglist = lazy(() => import("./tables/store/TrainIdRecordRegList"));

const AssetRegisterList = lazy(() => import("./tables/store/AssetRegisterList"));
const AssetRegister = lazy(() => import("./forms/store/AssetRegister"));
const ControlTakenOverList = lazy(() => import("./tables/isha/ControltakenOverList"));
const BudgetAllotmentForm = lazy(() => import("./forms/store/BudgetAllotmentForm"));
// import CssShiftLogBook from "./forms/store/CssShiftLogBook";
const CSSShiftLog = lazy(() => import("./forms/satya/CSSShiftLog"));
const CSSShiftLogList = lazy(() => import("./tables/satya/CSSShiftLogList"));
const SMPSSYSTEMMAINTENANCERECORD = lazy(() => import("./forms/isha/SMPSSYSTEMMAINTENANCERECORD"));
const SMPSSYSTEMMAINTENANCERECORDTable = lazy(() => import("./tables/isha/SMPSSYSTEMMAINTENANCERECORDTable"));
const SMPSSYSTEMMAINTENANCERECORDList = lazy(() => import("./list/isha/SMPSSystemMaintenanceRecordLIST"));
const PMSheetoccYearly = lazy(() => import("./forms/isha/PMSheetOCCYearly"));
const PMSheetoccYearlyList = lazy(() => import("./list/isha/PMOCCYearlyList"));
const PMSheetoccYearlyTable = lazy(() => import("./tables/isha/PMSheetOCCYearlyTable"));
const PMSheetDepotQuartForm2Reg = lazy(() => import("./forms/rajiv/PMSheetDepotQuartForm22Reg"));
const PMSheetDepotQuartForm2List = lazy(() => import("./tables/rajiv/PMSheetDepotQuartForm22List"));
const NightAfcGateDrill = lazy(() => import("./forms/store/NightAfcGateDrill"));
const NightAfcGateDrillList = lazy(() => import("./tables/store/NightAfcGateDrilList"));
const NightAfcGateDrillEdit = lazy(() => import("./edit/store/NightAfcGateDrilEdit"));
const EstimateLOARegister = lazy(() => import("./forms/isha/EstimateLOA"));
const EstimateLOARegisterList = lazy(() => import("./tables/isha/EstimateLOAList"));
const EditEstimateLOARegister = lazy(() => import("./edit/isha/EditEstimateLOA"));
const DailycheckListMainline = lazy(() => import("./forms/store/DailycheckListMainline"));
const DailycheckListMainlineView = lazy(() => import("./tables/store/DailycheckListMainlineView"));
const UPS_Room_Entry_Register = lazy(() => import("./forms/UPSRoomEntryRegister"));
const UPS_Room_Entry_Register_List = lazy(() => import("./tables/UPSRoomEntryList"));
const LedgerForm = lazy(() => import("./forms/store/LedgerForm"));
const LedgerTable = lazy(() => import("./tables/store/LedgerTable"));
const DtrReceipt = lazy(() => import("./forms/store/DtrReceipt"));
const ListLabMaterialTransactionRegister = lazy(() => import("./list/satya/ListLabMaterialTransactionRegister"));
const BudgetRegisterPayment = lazy(() => import("./tables/store/BudgetRegisterPayment"));
const NewbudgetPayment = lazy(() => import("./forms/store/NewbudgetPayment"));
const BudgetAllotmentEdit = lazy(() => import("./edit/store/BudgetAllotmentEdit"));
const BudgetAllotmentList = lazy(() => import("./tables/store/BudgetAllotmentList"));
const EditAssetRegister = lazy(() => import("./edit/store/EditAssetRegister"));
const ListCSSShiftLog = lazy(() => import("./list/satya/ListCSSShiftLog"));
const EditCSSShiftLog = lazy(() => import("./edit/satya/EditCSSShiftLog"));
const FMTSData = lazy(() => import("./list/pinki/FMTSData"));
const RequisitionSList = lazy(() => import("./list/store/RequisitionSList"));
const EditDTRIssue = lazy(() => import("./edit/store/EditDTRIssue"));
const EditRequisitionSignal = lazy(() => import("./edit/store/EditRequisitionSignal"));
const PMLogBookTVM = lazy(() => import("./forms/satya/PMLogBookTVM"));

const DailyCheckList = lazy(() => import("./list/store/DailyCheckList"));
const EditPMSheetoccYearlyTable = lazy(() => import("./edit/isha/EditPMSheetoccYearlyTable"));
const QuarterlyMaintenanceForm = lazy(() => import("./forms/store/QuarterlyMaintenanceForm"));
const UpsMaintenanceForm = lazy(() => import("./forms/store/UpsMaintenanceForm"));
const HalfYearlyMaintenanceForm = lazy(() => import("./forms/store/HalfYearlyMaintenanceForm"));
const QuarterlyMaintenanceOccBccForm = lazy(() => import("./forms/store/QuarterlyMaintenanceOccBccForm"));
const RequisitionEdit = lazy(() => import("./edit/store/RequisitionEdit"));
const ActivityLog = lazy(() => import("./tables/store/ActivityLog"));
const ActivityLogDetail = lazy(() => import("./tables/store/ActivityLogDetail"));
const UPS_Room_entry_register_edit = lazy(() => import("./edit/EditUPSRoomEntryReg"));
const DailyTransactionRegister_ISSUE = lazy(() => import("./forms/store/DailyTransactionRegister_ISSUE"));
const EditSMPSSYSTEMMAINTENANCERECORD = lazy(() => import("./edit/isha/EditSMPSSYSTEMMAINTENANCERECORD"));
const StationEarning = lazy(() => import("./reducer/store/StationEarning"));
const StationEarningList = lazy(() => import("./tables/store/StationEarningList"));
const StationEarningEdit = lazy(() => import("./edit/store/StationEarningEdit"));
const PmStationQuarterlyForm = lazy(() => import("./forms/store/PmStationQuarterlyForm"));
const PmoccbccQuarterlyData = lazy(() => import("./list/store/PmoccbccQuarterlyData"));
const PmoccbccQuarterlyList = lazy(() => import("./tables/store/PmoccbccQuarterlyList"));
const PmStationMonthlyForm = lazy(() => import("./forms/store/PmStationMonthlyForm"));
const PmDepotQuarterlyList = lazy(() => import("./list/store/PmDepotQuarterlyList"));
const PmDepotQuarterlyView = lazy(() => import("./tables/store/PmDepotQuarterlyView"));
const PmStationMonthlyList = lazy(() => import("./list/store/PmStationMonthlyList"));
const PmStationMonthlyVIew = lazy(() => import("./tables/store/PmStationMonthlyVIew"));
const PmStationQuarterlyList = lazy(() => import("./list/store/PmStationQuarterlyList"));
const PmStationQuarterlyView = lazy(() => import("./tables/store/PmStationQuarterlyView"));
const PmDepotHalfYearlyList = lazy(() => import("./list/store/PmDepotHalfYearlyList"));
const PmdepotHalfyearlyTable = lazy(() => import("./tables/store/PmdepotHalfyearlyTable"));
const BioDataRegister = lazy(() => import("./forms/store/BioDataRegister"));

// ========================================
// DEPARTMENT-BASED FORM IMPORTS (Migrated)
// ========================================
// ================================
// SIGNALLING DEPARTMENT FORMS (45 forms - 100% Complete)
// ================================

// Daily Operations Forms
const StationDiarySignallingForm = lazy(() => import("./departments/signalling/forms/StationDiarySignallingForm"));
const SEREntryForm = lazy(() => import("./departments/signalling/forms/SEREntryForm"));
const IncidentRegisterSignallingForm = lazy(() => import("./departments/signalling/forms/IncidentRegisterSignallingForm"));
const AtcExaminationRegisterForm = lazy(() => import("./departments/signalling/forms/AtcExaminationRegisterForm"));
const HardwareFailureRegisterForm = lazy(() => import("./departments/signalling/forms/HardwareFailureRegisterForm"));
const SignalFailureRegisterForm = lazy(() => import("./departments/signalling/forms/SignalFailureRegisterForm"));
const AxleCounterMaintenanceForm = lazy(() => import("./departments/signalling/forms/AxleCounterMaintenanceForm"));
const GatePassForm = lazy(() => import("./departments/signalling/forms/GatePassForm"));

// Equipment & Hardware Forms
const HardwareFailureForm = lazy(() => import("./departments/signalling/forms/HardwareFailureForm"));
const ReplacementRegisterForm = lazy(() => import("./departments/signalling/forms/ReplacementRegisterForm"));
const AssetRegisterForm = lazy(() => import("./departments/signalling/forms/AssetRegisterForm"));
const JobCardForm = lazy(() => import("./departments/signalling/forms/JobCardForm"));
const LabFaultyItemRegisterForm = lazy(() => import("./departments/signalling/forms/LabFaultyItemRegisterForm"));
const ContractualSpareTestingRegisterForm = lazy(() => import("./departments/signalling/forms/ContractualSpareTestingRegisterForm"));
const MeasurementVoltageMCBinPDCForm = lazy(() => import("./departments/signalling/forms/MeasurementVoltageMCBinPDCForm"));
const BoxCleaningOutdoorForm = lazy(() => import("./departments/signalling/forms/BoxCleaningOutdoorForm"));
const SignallingEquipmentFailureRegisterForm = lazy(() => import("./departments/signalling/forms/EquipmentFailureRegisterForm"));
const AssuranceSystemForm = lazy(() => import("./departments/signalling/forms/AssuranceSystemForm"));

// PM Maintenance Records
const ColorLightMaintenanceForm = lazy(() => import("./departments/signalling/forms/ColorLightMaintenanceForm"));
const AtsCabinetMaintenanceForm = lazy(() => import("./departments/signalling/forms/AtsCabinetMaintenanceForm"));
const TomHalfYearlyMaintenanceForm = lazy(() => import("./departments/signalling/forms/TomHalfYearlyMaintenanceForm"));
const AfcGateMaintenanceForm = lazy(() => import("./departments/signalling/forms/AfcGateMaintenanceForm"));
const OccBccHalfYearlyMaintenanceForm = lazy(() => import("./departments/signalling/forms/OccBccHalfYearlyMaintenanceForm"));
const UpsMaintenanceSignallingForm = lazy(() => import("./departments/signalling/forms/UpsMaintenanceForm"));
const PMPointMachineMaintenanceRecordForm = lazy(() => import("./departments/signalling/forms/PMPointMachineMaintenanceRecordForm"));
const PMPointMachineMaintenanceRecordTDPForm = lazy(() => import("./departments/signalling/forms/PMPointMachineMaintenanceRecordTDPForm"));
const ShuntSignalMaintenanceRecordForm = lazy(() => import("./departments/signalling/forms/ShuntSignalMaintenanceRecordForm"));
const QuarterlyTrainInspectionForm = lazy(() => import("./departments/signalling/forms/QuarterlyTrainInspectionForm"));
const PmFollowupSheetForm = lazy(() => import("./departments/signalling/forms/PmFollowupSheetForm"));

// Administrative Forms
const LedgerSignallingForm = lazy(() => import("./departments/signalling/forms/LedgerSignallingForm"));
const DailyTransactionRegisterReceiptForm = lazy(() => import("./departments/signalling/forms/DailyTransactionRegisterReceiptForm"));
const DailyTransactionRegisterIssueForm = lazy(() => import("./departments/signalling/forms/DailyTransactionRegisterIssueForm"));
const LoanRegisterForm = lazy(() => import("./departments/signalling/forms/LoanRegisterForm"));
const DailyWorkDoneRegisterForm = lazy(() => import("./departments/signalling/forms/DailyWorkDoneRegisterForm"));
const HandoverTakingOverNoteForm = lazy(() => import("./departments/signalling/forms/HandoverTakingOverNoteForm"));
const PermanentLoanRegisterForm = lazy(() => import("./departments/signalling/forms/PermanentLoanRegisterForm"));
const ContractWorkDoneRegisterForm = lazy(() => import("./departments/signalling/forms/ContractWorkDoneRegisterForm"));
const GrievanceRegisterForm = lazy(() => import("./departments/signalling/forms/GrievanceRegisterForm"));

// Operations & System Maintenance
const HalfYearlyMainlineMaintenanceForm = lazy(() => import("./departments/signalling/forms/HalfYearlyMainlineMaintenanceForm"));
const PmLogbookHalfYearlyOtherMainlineForm = lazy(() => import("./departments/signalling/forms/PmLogbookHalfYearlyOtherMainlineForm"));
const PreventiveMaintenanceWorksheetCentralComputerForm = lazy(() => import("./departments/signalling/forms/PreventiveMaintenanceWorksheetCentralComputerForm"));
const InspectionRegisterForm = lazy(() => import("./departments/signalling/forms/InspectionRegisterForm"));
const RequisitionForm = lazy(() => import("./departments/signalling/forms/RequisitionForm"));
const EktMaintenanceForm = lazy(() => import("./departments/signalling/forms/EktMaintenanceForm"));
const BioDataRegisterList = lazy(() => import("./list/store/BioDataRegisterList"));
const BioDataRegisterView = lazy(() => import("./tables/store/BioDataRegisterView"));
const BiodataRegisterEdit = lazy(() => import("./edit/store/BiodataRegisterEdit"));
const EquipmentFailureOcc = lazy(() => import("./forms/store/EquipmentFailureOcc"));
const EquipmentFailureOccView = lazy(() => import("./tables/store/EquipmentFailureOccView"));
const EditEquipmentFailureOcc = lazy(() => import("./edit/store/EditEquipmentFailureOcc"));
const UnreadableCardRefundForm = lazy(() => import("./departments/operation/forms/UnreadableCardRefundDetailsForm"));
const UnreadableCardRefundDetails = lazy(() => import("./tables/store/UnreadableCardRefundDetails"));
const UnreadableCardRefundEdit = lazy(() => import("./edit/store/UnreadableCardRefundEdit"));
const StockmovementcardsList = lazy(() => import("./list/store/StockmovementcardsList"));
const StockmovementcardsView = lazy(() => import("./tables/store/StockmovementcardsView"));
const StockMovementTokens = lazy(() => import("./departments/operation/forms/StockMovementTokensForm"));
const StockMovementTokensList = lazy(() => import("./list/store/StockMovementTokensList"));
const StockMovementTokensview = lazy(() => import("./tables/store/StockMovementTokensview"));
const DailyChecklistMainlineEdit = lazy(() => import("./edit/store/DailyChecklistMainlineEdit"));
const PMLogBookMonthly = lazy(() => import("./tables/store/PMLogBookMonthly"));
const PmFollowUpList = lazy(() => import("./list/chanchal/PmFollowUpList"));
const EditUpsMaintenanceForm = lazy(() => import("./edit/store/EditUpsMaintenanceForm"));
const EditHalfYearlyMaintenance = lazy(() => import("./edit/store/EditHalfYearlyMaintenance"));
const QuarterlyMaintenanceOccBccEdit = lazy(() => import("./edit/store/QuarterlyMaintenanceOccBccEdit"));
const PmStationMonthlyEdit = lazy(() => import("./edit/store/PmStationMonthlyEdit"));
const PmStationQuarterlyEdit = lazy(() => import("./edit/store/PmStationQuarterlyEdit"));
const StockMovementTokensEdit = lazy(() => import("./edit/store/StockMovementTokensEdit"));
const BudgetPaymentEdit = lazy(() => import("./edit/store/BudgetPaymentEdit"));
const AllDeptFormList = lazy(() => import("./pages/AllDeptFormList"));

// Universal Form Components - Migration Implementation



// FINANCE DEPARTMENT FORMS (4 forms - 100% Complete)
const ExpenditureBudgetRegisterForm = lazy(() => import("./departments/finance/forms/ExpenditureBudgetRegisterForm"));
const EstimateAndLOABudgetRegisterForm = lazy(() => import("./departments/finance/forms/EstimateAndLOABudgetRegisterForm"));
const BudgetPaymentsRegisterForm = lazy(() => import("./departments/finance/forms/BudgetPaymentsRegisterForm"));
const StationEarningRegisterForm = lazy(() => import("./departments/finance/forms/StationEarningRegisterForm"));

// OPERATION DEPARTMENT FORMS (47 forms - 100% Complete)
// Priority 1: Safety-Critical Forms
const EquipmentFailureRegisterForm = lazy(() => import("./departments/operation/forms/EquipmentFailureRegisterForm"));
const CrewControlIncidentAccidentForm = lazy(() => import("./departments/operation/forms/CrewControlIncidentAccidentForm"));
const OCCIncidentAccidentForm = lazy(() => import("./departments/operation/forms/OCCIncidentAccidentForm"));
const CrewControlLineDefectForm = lazy(() => import("./departments/operation/forms/CrewControlLineDefectForm"));

// Priority 2: Equipment & Maintenance Forms
const PettyRepairRegisterForm = lazy(() => import("./departments/operation/forms/PettyRepairRegisterForm"));
const OutstandingRecordRegisterForm = lazy(() => import("./departments/operation/forms/OutstandingRecordRegisterForm"));
const StockMovementRegisterForm = lazy(() => import("./departments/operation/forms/StockMovementRegisterForm"));
const StockMovementTokensForm = lazy(() => import("./departments/operation/forms/StockMovementTokensForm"));
const OCCEquipmentFailureForm = lazy(() => import("./departments/operation/forms/OCCEquipmentFailureForm"));

// Priority 3: Train Operations Forms
const TrainIdChangeRecordForm = lazy(() => import("./departments/operation/forms/TrainIdChangeRecordForm"));
const TrainInductionDetailRegisterForm = lazy(() => import("./departments/operation/forms/TrainInductionDetailRegisterForm"));
const PossessionRegisterForm = lazy(() => import("./departments/operation/forms/PossessionRegisterForm"));
const TSRRegisterForm = lazy(() => import("./departments/operation/forms/TSRRegisterForm"));
const UnplannedTORecordForm = lazy(() => import("./departments/operation/forms/UnplannedTORecordForm"));

// Priority 4: Crew Management Forms
const AttendanceRegisterForm = lazy(() => import("./departments/operation/forms/AttendanceRegisterForm"));
const CompetencyValidityForm = lazy(() => import("./departments/operation/forms/CompetencyValidityForm"));

// Priority 5: Training & Materials Forms
const MaterialDistributionForm = lazy(() => import("./departments/operation/forms/MaterialDistributionForm"));
const CBTTrainingForm = lazy(() => import("./departments/operation/forms/CBTTrainingForm"));
const HonorariumRegisterForm = lazy(() => import("./departments/operation/forms/HonorariumRegisterForm"));
const LibraryBookIssueRegisterForm = lazy(() => import("./departments/operation/forms/LibraryBookIssueRegisterForm"));

// Priority 6: Found Property & Claims Forms
const ClaimRegistrationRegisterForm = lazy(() => import("./departments/operation/forms/ClaimRegistrationRegisterForm"));
const FoundArticlesRegisterForm = lazy(() => import("./departments/operation/forms/FoundArticlesRegisterForm"));
const FoundCashRegisterForm = lazy(() => import("./departments/operation/forms/FoundCashRegisterForm"));
const FoundForeignCurrencyRegisterForm = lazy(() => import("./departments/operation/forms/FoundForeignCurrencyRegisterForm"));

// Priority 7: Administrative Forms
const BioDataRegisterForm = lazy(() => import("./departments/operation/forms/BioDataRegisterForm"));

// Additional Existing Forms (Previously Migrated)
const UnreadableCardRefundDetailsForm = lazy(() => import("./departments/operation/forms/UnreadableCardRefundDetailsForm"));
const FirstAidRegisterForm = lazy(() => import("./departments/operation/forms/FirstAidRegisterForm"));
const OperationLiftRescueForm = lazy(() => import("./departments/operation/forms/OperationLiftRescueForm"));
const OperationStationDiaryForm = lazy(() => import("./departments/operation/forms/OperationStationDiaryForm"));
const TerEntryRegisterForm = lazy(() => import("./departments/operation/forms/TerEntryRegisterForm"));
const UpsRoomEntryRegisterForm = lazy(() => import("./departments/operation/forms/UpsRoomEntryRegisterForm"));
const CrewControlCcapForm = lazy(() => import("./departments/operation/forms/CrewControlCcapForm"));

// Priority 8: Comprehensive Operation Management Forms
const CSSShiftLogBookForm = lazy(() => import("./departments/operation/forms/CSSShiftLogBookForm"));
const StationDiaryForm = lazy(() => import("./departments/operation/forms/StationDiaryForm"));
const DailyTrainOperationRegisterForm = lazy(() => import("./departments/operation/forms/DailyTrainOperationRegisterForm"));
const OperationCompetencyRegisterForm = lazy(() => import("./departments/operation/forms/OperationCompetencyRegisterForm"));
const TrafficControlRegisterForm = lazy(() => import("./departments/operation/forms/TrafficControlRegisterForm"));
const SafetyBriefingRegisterForm = lazy(() => import("./departments/operation/forms/SafetyBriefingRegisterForm"));
const PassengerServiceRegisterForm = lazy(() => import("./departments/operation/forms/PassengerServiceRegisterForm"));
const EmergencyResponseRegisterForm = lazy(() => import("./departments/operation/forms/EmergencyResponseRegisterForm"));

// Priority 9: Final Operation Excellence Forms
const OperationManpowerRegisterForm = lazy(() => import("./departments/operation/forms/OperationManpowerRegisterForm"));
const VehicleMovementRegisterForm = lazy(() => import("./departments/operation/forms/VehicleMovementRegisterForm"));
const OperationPerformanceRegisterForm = lazy(() => import("./departments/operation/forms/OperationPerformanceRegisterForm"));
const IncidentInvestigationRegisterForm = lazy(() => import("./departments/operation/forms/IncidentInvestigationRegisterForm"));
const MaintenanceCoordinationRegisterForm = lazy(() => import("./departments/operation/forms/MaintenanceCoordinationRegisterForm"));
const OperationCommunicationLogForm = lazy(() => import("./departments/operation/forms/OperationCommunicationLogForm"));

function App() {
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = token && token !== "undefined" && token !== "null";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (
      isAuthenticated &&
      (currentPath == "/dashboard" || currentPath == "/login")
    ) {
      navigate("/dashboard");
    } else if (!isAuthenticated && currentPath != "/login") {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <div className="container-fluid m-0 p-0">
      <ToastContainer />
      <Loader />

      {isAuthenticated && (
        <>
          <div className="row pt-0">
            <SideBar />
            <Header />
            <div className="main-contain">
              <Suspense fallback={<div className="d-flex justify-content-center p-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>}>
                <Routes>
                  <Route path="/user/add" element={<AddUser />} />
                  <Route path="/admin/add" element={<CreateAdmin />} />
                  <Route path="/formlist" element={<FormList />} />
                  <Route path="/formlist/all" element={<AllDeptFormList />} />
                  <Route path="/user/list" element={<ListUser />} />
                  <Route path="/user/edit" element={<EditUser />} />
                  <Route path="/Admin/list" element={<AdminList />} />
                  <Route path="/Admin/edit" element={<EditAdmin />} />
                  <Route path="/station/add" element={<Stationadd />} />
                  <Route path="/station/list" element={<StationList />} />
                  <Route path="/station/edit" element={<StationEdit />} />
                  <Route path="/form/list" element={<AllForm />} />
                  {/* <Route path="/table/list" element={<AdminList />} /> */}
                  <Route
                    path="/employee/form/list"
                    element={<ListAssignedForm />}
                  />
                  <Route
                    path="/employee/form/list"
                    element={<ListAssignedForm />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                  <Route path="/viewaccount" element={<ViewAccount />} />
                
                {/* ========================================== */}
                {/* DEPARTMENT-BASED FORM ROUTES (Migrated)   */}
                {/* ========================================== */}
                
                {/* FINANCE DEPARTMENT ROUTES (4 forms) */}
                <Route path="/form/expenditure-budget-register" element={<ExpenditureBudgetRegisterForm />} />
                <Route path="/form/estimate-and-loa-budget-register" element={<EstimateAndLOABudgetRegisterForm />} />
                <Route path="/form/budget-payments-register" element={<BudgetPaymentsRegisterForm />} />
                <Route path="/form/station-earning-register" element={<StationEarningRegisterForm />} />
                
                {/* OPERATION DEPARTMENT ROUTES (47 forms) */}
                {/* Priority 1: Safety-Critical Forms */}
                <Route path="/form/equipment_failure_register" element={<EquipmentFailureRegisterForm />} />
                <Route path="/form/crew-incident-accident" element={<CrewControlIncidentAccidentForm />} />
                <Route path="/form/incident-accident" element={<OCCIncidentAccidentForm />} />
                <Route path="/form/line-defect" element={<CrewControlLineDefectForm />} />
                
                {/* Priority 2: Equipment & Maintenance Forms */}
                <Route path="/form/petty-repair-register" element={<PettyRepairRegisterForm />} />
                <Route path="/form/outstanding-record-register" element={<OutstandingRecordRegisterForm />} />
                <Route path="/form/stock-movement-register-cards" element={<StockMovementRegisterForm />} />
                <Route path="/form/stock-movement-register-tokens" element={<StockMovementTokensForm />} />
                <Route path="/form/equipment-failure-occ-register" element={<OCCEquipmentFailureForm />} />
                
                {/* Priority 3: Train Operations Forms */}
                <Route path="/form/train-id-change-record-register" element={<TrainIdChangeRecordForm />} />
                <Route path="/form/train-induction-detail-register" element={<TrainInductionDetailRegisterForm />} />
                <Route path="/form/possession-register" element={<PossessionRegisterForm />} />
                <Route path="/form/tsr-register" element={<TSRRegisterForm />} />
                <Route path="/form/unplanned-to-record" element={<UnplannedTORecordForm />} />
                
                {/* Priority 4: Crew Management Forms */}
                <Route path="/form/attendance-register" element={<AttendanceRegisterForm />} />
                <Route path="/form/competency-record-register" element={<CompetencyValidityForm />} />
                
                {/* Priority 5: Training & Materials Forms */}
                <Route path="/form/material-distribution" element={<MaterialDistributionForm />} />
                <Route path="/form/cbt-training" element={<CBTTrainingForm />} />
                <Route path="/form/honorarium-register" element={<HonorariumRegisterForm />} />
                <Route path="/form/library-book-issue-register" element={<LibraryBookIssueRegisterForm />} />
                
                {/* Priority 6: Found Property & Claims Forms */}
                <Route path="/form/claim-registration-register" element={<ClaimRegistrationRegisterForm />} />
                <Route path="/form/details-related-to-foundreceived-articles" element={<FoundArticlesRegisterForm />} />
                <Route path="/form/details-related-to-foundreceived-cash" element={<FoundCashRegisterForm />} />
                <Route path="/form/details-related-to-foundreceived-foreign-currency" element={<FoundForeignCurrencyRegisterForm />} />
                
                {/* Priority 7: Administrative Forms */}
                <Route path="/form/bio-data-register" element={<BioDataRegisterForm />} />
                
                {/* Additional Existing Forms (Previously Migrated) */}
                <Route path="/form/unreadable-card-refund-details" element={<UnreadableCardRefundDetailsForm />} />
                <Route path="/form/first-aid-register" element={<FirstAidRegisterForm />} />
                <Route path="/form/operation-lift-rescue-register" element={<OperationLiftRescueForm />} />
                <Route path="/form/operation-station-diary" element={<OperationStationDiaryForm />} />
                <Route path="/form/ter-entry-register" element={<TerEntryRegisterForm />} />
                <Route path="/form/ups-room-entry-register" element={<UpsRoomEntryRegisterForm />} />
                <Route path="/form/crew-control-ccap" element={<CrewControlCcapForm />} />
                
                {/* Priority 8: Comprehensive Operation Management Forms */}
                <Route path="/form/css-shift-logbook" element={<CSSShiftLogBookForm />} />
                <Route path="/form/station-diary" element={<StationDiaryForm />} />
                <Route path="/form/daily-train-operation-register" element={<DailyTrainOperationRegisterForm />} />
                <Route path="/form/operation-competency-register" element={<OperationCompetencyRegisterForm />} />
                <Route path="/form/traffic-control-register" element={<TrafficControlRegisterForm />} />
                <Route path="/form/safety-briefing-register" element={<SafetyBriefingRegisterForm />} />
                <Route path="/form/passenger-service-register" element={<PassengerServiceRegisterForm />} />
                <Route path="/form/emergency-response-register" element={<EmergencyResponseRegisterForm />} />
                
                {/* Priority 9: Final Operation Excellence Forms */}
                <Route path="/form/operation-manpower-register" element={<OperationManpowerRegisterForm />} />
                <Route path="/form/vehicle-movement-register" element={<VehicleMovementRegisterForm />} />
                <Route path="/form/operation-performance-register" element={<OperationPerformanceRegisterForm />} />
                <Route path="/form/incident-investigation-register" element={<IncidentInvestigationRegisterForm />} />
                <Route path="/form/maintenance-coordination-register" element={<MaintenanceCoordinationRegisterForm />} />
                <Route path="/form/operation-communication-log" element={<OperationCommunicationLogForm />} />
                
                {/* SIGNALLING DEPARTMENT ROUTES (45 forms - 100% Complete) */}
                {/* Daily Operations Forms */}
                <Route path="/form/station-diary-signalling" element={<StationDiarySignallingForm />} />
                <Route path="/form/ser-entry" element={<SEREntryForm />} />
                <Route path="/form/incident-register" element={<IncidentRegisterSignallingForm />} />
                <Route path="/form/atc-examination" element={<AtcExaminationRegisterForm />} />
                <Route path="/form/hardware-failure" element={<HardwareFailureRegisterForm />} />
                <Route path="/form/signal-failure" element={<SignalFailureRegisterForm />} />
                <Route path="/form/axel-counter-maintenance" element={<AxleCounterMaintenanceForm />} />
                <Route path="/form/gate-pass" element={<GatePassForm />} />

                {/* Equipment & Hardware Forms */}
                <Route path="/form/hardware-failure-signalling" element={<HardwareFailureForm />} />
                <Route path="/form/replacement-register" element={<ReplacementRegisterForm />} />
                <Route path="/form/asset-register" element={<AssetRegisterForm />} />
                <Route path="/form/job-card" element={<JobCardForm />} />
                <Route path="/form/lab-faulty-item-register" element={<LabFaultyItemRegisterForm />} />
                <Route path="/form/contractual-spare-testing-register" element={<ContractualSpareTestingRegisterForm />} />
                <Route path="/form/measurement-voltage-mcb" element={<MeasurementVoltageMCBinPDCForm />} />
                <Route path="/form/outdoor-box-cleaning" element={<BoxCleaningOutdoorForm />} />
                <Route path="/form/efr-register" element={<SignallingEquipmentFailureRegisterForm />} />
                <Route path="/form/assurance-register" element={<AssuranceSystemForm />} />

                {/* PM Maintenance Records */}
                <Route path="/form/color-light-miantenance" element={<ColorLightMaintenanceForm />} />
                <Route path="/form/ats-cabinet-maintenance-monthly" element={<AtsCabinetMaintenanceForm />} />
                <Route path="/form/tom-half-yearly-maintenance" element={<TomHalfYearlyMaintenanceForm />} />
                <Route path="/form/afc-gate-maintenance" element={<AfcGateMaintenanceForm />} />
                <Route path="/form/occ-bcc-half-yearly-maintenance" element={<OccBccHalfYearlyMaintenanceForm />} />
                <Route path="/form/ups-maintenance-signalling" element={<UpsMaintenanceSignallingForm />} />
                <Route path="/form/pm-point-maintenance-record" element={<PMPointMachineMaintenanceRecordForm />} />
                <Route path="/form/pm-point-maintenance-record-tpd" element={<PMPointMachineMaintenanceRecordTDPForm />} />
                <Route path="/form/shunt-signal-maintenance" element={<ShuntSignalMaintenanceRecordForm />} />
                <Route path="/form/onboard-atc-underframe" element={<QuarterlyTrainInspectionForm />} />
                <Route path="/form/pm-followup-sheet" element={<PmFollowupSheetForm />} />

                {/* Administrative Forms */}
                <Route path="/form/ledger-siganalling" element={<LedgerSignallingForm />} />
                <Route path="/form/daily-transaction-register-receipt" element={<DailyTransactionRegisterReceiptForm />} />
                <Route path="/form/daily-transaction-register-Issue" element={<DailyTransactionRegisterIssueForm />} />
                <Route path="/form/loan-register" element={<LoanRegisterForm />} />
                <Route path="/form/daily-work-done-register" element={<DailyWorkDoneRegisterForm />} />
                <Route path="/form/handintaking-over-note" element={<HandoverTakingOverNoteForm />} />
                <Route path="/form/permanent-loan-register" element={<PermanentLoanRegisterForm />} />
                <Route path="/form/contract-work-done-register" element={<ContractWorkDoneRegisterForm />} />
                <Route path="/form/grievance-register" element={<GrievanceRegisterForm />} />

                {/* Operations & System Maintenance */}
                <Route path="/form/half-yearly-mainline-maintenance" element={<HalfYearlyMainlineMaintenanceForm />} />
                <Route path="/form/pm-logbook-half-yearly-other-mainline" element={<PmLogbookHalfYearlyOtherMainlineForm />} />
                <Route path="/form/preventive-maintenance-worksheet-central-computer" element={<PreventiveMaintenanceWorksheetCentralComputerForm />} />
                <Route path="/form/inspection-register" element={<InspectionRegisterForm />} />
                <Route path="/form/requisition" element={<RequisitionForm />} />
                <Route path="/form/ekt-maintenance" element={<EktMaintenanceForm />} />
                
                {/* ========================================== */}
                {/* END DEPARTMENT-BASED FORM ROUTES          */}
                {/* ========================================== */}
                
               
                <Route path="/admin/activity-log" Component={ActivityLog} />
                <Route
                  path="/view/admin/activity-log"
                  Component={ActivityLogDetail}
                />
                <Route path="/form/dtr-receipt" Component={DtrReceipt} />
                
                <Route
                  path="/form/incident-register"
                  Component={IncidentRegisterSignals}
                />
                <Route
                  path="/list/incident-register"
                  Component={IncidentRegisterSignalsList}
                />
                <Route
                  path="/edit/incident-register"
                  Component={EditIncident}
                />
                 <Route
                  path="/form/pm-station-quarterly"
                  Component={PmStationQuarterlyForm}
                />
                 <Route
                  path="/edit/pm-station-quarterly"
                  Component={PmStationQuarterlyEdit}
                />
                 <Route
                  path="/list/tsr-register"
                  Component={TsrregList}
                />
                   <Route
                  path="/edit/tsr-register"
                  Component={EditTsrreg}
                />
                 <Route
                  path="/list/pm-station-quarterly"
                  Component={PmStationQuarterlyList}
                />
                  <Route
                  path="/view/pm-station-quarterly"
                  Component={PmStationQuarterlyView}
                />
                 <Route
                  path="/form/pm-station-monthly"
                  Component={PmStationMonthlyForm}
                />
                  <Route
                  path="/list/pm-station-monthly"
                  Component={PmStationMonthlyList}
                />
                  <Route
                  path="/view/pm-station-monthly"
                  Component={PmStationMonthlyVIew}
                />
                  <Route
                  path="/edit/pm-station-monthly"
                  Component={PmStationMonthlyEdit}
                />
                <Route
                  path="/form/details-related-to-foundreceived-articles"
                  Component={FoundArticlesForm}
                />
                <Route
                  path="/List/details-related-to-foundreceived-articles"
                  Component={FoundReceiveArtList}
                />
                <Route
                  path="/edit/details-related-to-foundreceived-articles"
                  Component={FoundReceivedArticleEdit}
                />
                <Route
                  path="/form/color-light-miantenance"
                  Component={SignalMainLineRegister}
                />
                <Route
                  path="/view/color-light-miantenance"
                  Component={SignalMainlineList}
                />
                
                 <Route
                  path="/list/station-earning-register"
                  Component={StationEarningList}
                />
                  <Route
                  path="/edit/station-earning-register"
                  Component={StationEarningEdit}
                />
                <Route
                  path="/list/color-light-miantenance"
                  Component={ColorLightSignalling}
                />
                <Route
                  path="/edit/color-light-miantenance"
                  Component={SignalMainline_Edit}
                />
                <Route
                  path="/form/esp-quarterly-maintenance"
                  Component={ESPQuaterlyMaintanance}
                />
                   <Route
                  path="/form/unreadable-card-refund-details"
                  Component={UnreadableCardRefundForm}
                />
                      <Route
                  path="/list/unreadable-card-refund-details"
                  Component={UnreadableCardRefundDetails}
                />
                       <Route
                  path="/edit/unreadable-card-refund-details"
                  Component={UnreadableCardRefundEdit}
                />
                <Route
                  path="/view/esp-quarterly-maintenance"
                  Component={ESPQuarterlyList}
                />
                <Route
                  path="/list/esp-quarterly-maintenance"
                  Component={ESPQuarterlySignalling}
                />
                <Route
                  path="/edit/esp-quarterly-maintenance"
                  Component={ESP_Quarterly_Edit}
                />
                <Route
                  path="/form/ter-entry-register"
                  Component={TER_Entry_Register}
                />
                <Route
                  path="/list/ter-entry-register"
                  Component={TER_Entry_List}
                />
                <Route
                  path="/edit/ter-entry-register"
                  Component={Ter_entry_register_edit}
                />
                {/* <Route
                  path="/form/police-custody-register"
                  Component={PoliceCtdRegister}
                />
                <Route
                  path="/list/police-custody-register"
                  Component={PoliceCtdRegList}
                />
                <Route
                  path="/edit/police-custody-register"
                  Component={PoliceCtdRegEdit}
                /> */}
                <Route
                  path="/form/night_lats_vdu_drill_register"
                  Component={LatsVduDrillReg}
                />
                <Route
                  path="/list/night_lats_vdu_drill_register"
                  Component={LatsVduDrillList}
                />
                <Route
                  path="/edit/night_lats_vdu_drill_register"
                  Component={LatsVduDrillEdit}
                />
                <Route
                  path="/list/loan-register-sdc"
                  Component={LoanRegisterList}
                />
                <Route
                  path="/form/loan-register-sdc"
                  Component={LoanRegister}
                />
                <Route
                  path="/edit/loan-register-sdc"
                  Component={LoanRegisterEdit}
                />
                <Route
                  path="/form/first-aid-register"
                  Component={FirstAidRegister}
                />
                <Route
                  path="/edit/first-aid-register"
                  Component={FirstAidRegisterEdit}
                />
                <Route
                  path="/form/outstanding-record-register"
                  Component={OutstandingRecReg}
                />
                <Route
                  path="/list/outstanding-record-register"
                  Component={OutStandingRecRegList}
                />
                <Route
                  path="/edit/outstanding-record-register"
                  Component={OutStandingRecRegEdit}
                />
                {/* <Route path="/afclist" Component={AfcgatedrillList} /> */}
                <Route
                  path="/list/crew-incident-accident"
                  Component={IncidentAccidentRegOperationList}
                />
                <Route
                  path="/form/crew-incident-accident"
                  Component={IncidentAccidentReg}
                />
                <Route
                  path="/edit/crew-incident-accident"
                  Component={IncidentAccidentRegisterEdit}
                />
                <Route
                  path="/list/honorarium-register"
                  Component={HonoriumRegList}
                />
                <Route
                  path="/form/honorarium-register"
                  Component={HonorariumReg}
                />
                <Route
                  path="/edit/honorarium-register"
                  Component={HonoriumRegEdit}
                />
                <Route
                  path="/form/list-of-honorarium-registers"
                  Component={ListHonorariumReg}
                />
                <Route
                  path="/list/list-of-honorarium-registers"
                  Component={ListHonoriumRegList}
                />
                <Route
                  path="/edit/list-of-honorarium-registers"
                  Component={ListHonorariumEdit}
                />
                <Route
                  path="/form/checklist-and-pm-occbcc"
                  Component={Update_PM_Occ_Bcc}
                />
                <Route
                  path="/view/checklist-and-pm-occbcc"
                  Component={Update_PM_Occ_Bcc_List}
                />
                <Route
                  path="/list/checklist-and-pm-occbcc"
                  Component={Update_PM_Occ_Bcc_2Book_list}
                />
                <Route
                  path="/edit/checklist-and-pm-occbcc"
                  Component={Update_Check_List_PM_occ_bcc_Edit}
                />
                <Route
                  path="/form/pm-logbook-yearly2-sdc"
                  Component={CentCompPreventiveForm}
                />
                <Route
                  path="/view/pm-logbook-yearly2-sdc"
                  Component={CentCompPreventiveList}
                />
                <Route
                  path="/list/pm-logbook-yearly2-sdc"
                  Component={CentCompPMlogBook12}
                />
                <Route
                  path="/edit/pm-logbook-yearly2-sdc"
                  Component={CentCompPreventive_Edit}
                />
                //list wala
                <Route
                  path="/list/pm-logbook-half-yearly-other-mainline"
                  Component={AFCAnnexureMainlineList}
                />
                <Route
                  path="/view/pm-logbook-half-yearly-other-mainline"
                  Component={AfcPreAnnexureBList}
                />
                <Route
                  path="/form/pm-logbook-half-yearly-other-mainline"
                  Component={AfcAnnexureBform}
                />
                <Route
                  path="/edit/pm-logbook-half-yearly-other-mainline"
                  Component={AfcAnnexureBEdit}
                />
                <Route
                  path="/form/pm-depot-quarterly"
                  Component={UpsMaintenanceForm}
                />
                <Route
                  path="/view/pm-depot-quarterly"
                  Component={PmDepotQuarterlyView}
                />
                <Route
                  path="/list/pm-depot-quarterly"
                  Component={PmDepotQuarterlyList}
                />
                <Route
                  path="/edit/pm-depot-quarterly"
                  Component={EditUpsMaintenanceForm}
                />



                 <Route
                  path="/form/ups_sys_mntc_register"
                  Component={UpsMaintenanceForm}
                />
                <Route
                  path="/view/ups_sys_mntc_register"
                  Component={PmDepotQuarterlyView}
                />
                <Route
                  path="/list/ups_sys_mntc_register"
                  Component={PmDepotQuarterlyList}
                />
                <Route
                  path="/edit/ups_sys_mntc_register"
                  Component={EditUpsMaintenanceForm}
                />
                <Route path="/form/pm-depot-yearly" Component={DeportFormReg} />
                <Route
                  path="/view/pm-depot-yearly"
                  Component={DeployFormList}
                />
                <Route
                  path="/list/pm-depot-yearly"
                  Component={PMSheetDeportYearlyList}
                />
                <Route
                  path="/edit/pm-depot-yearly"
                  Component={DeportForm_Edit}
                />
                <Route
                  path="/form/pm-logbook-monthly-other-mainline"
                  Component={AfcPreventChkform}
                />
                <Route
                  path="/edit/pm-logbook-monthly-other-mainline"
                  Component={AfcAnnexure_A_Edit}
                />
                <Route
                  path="/view/pm-logbook-monthly-other-mainline"
                  Component={AfcPreventformList}
                />
                <Route
                  path="/list/pm-logbook-monthly-other-mainline"
                  Component={AFCPreventAnnexureAMainlineList}
                />
                
                <Route
                  path="/view/gate-pass-book-store"
                  Component={GatePassList}
                />
                <Route
                  path="/list/gate-pass-book-store"
                  Component={GatePassStoreList}
                />
                <Route
                  path="/edit/gate-pass-book-store"
                  Component={GatePassEdit}
                />
                <Route
                  path="/form/gate-pass-book-mainline"
                  Component={GatePass}
                />
                <Route
                  path="/view/gate-pass-book-mainline"
                  Component={GatePassList}
                />
                <Route
                  path="/list/gate-pass-book-mainline"
                  Component={GatePassStoreList}
                />
                <Route
                  path="/edit/gate-pass-book-mainline"
                  Component={GatePassEdit}
                />
                <Route path="/form/gate-pass" Component={GatePass} />
                <Route path="/view/gate-pass" Component={GatePassList} />
                <Route path="/list/gate-pass" Component={GatePassStoreList} />
                <Route path="/edit/gate-pass" Component={GatePassEdit} />
                
                <Route path="/view/gate-pass-book" Component={GatePassList} />
                <Route
                  path="/list/gate-pass-book"
                  Component={GatePassStoreList}
                />
                <Route path="/edit/gate-pass-book" Component={GatePassEdit} />
                <Route path="/list/cbt-training" Component={CBTTrainingList} />
                <Route path="/edit/cbt-training" Component={EditCbtTraining} />
                <Route
                  path="/form/pm-logbook-monthly-gate-mainline"
                  Component={AFCMonthlyReg}
                />
                <Route
                  path="/edit/pm-logbook-monthly-gate-mainline"
                  Component={EditAFCMonthly}
                />
                <Route
                  path="/list/pm-logbook-monthly-gate-mainline"
                  Component={AFCMonthlyLists}
                />
                <Route
                  path="/view/pm-logbook-monthly-gate-mainline"
                  Component={AFCMontylyList}
                />
                <Route
                  path="/form/card-initialization-tender-sdc"
                  Component={CardInitializationReg}
                />
                <Route
                  path="/edit/card-initialization-tender-sdc"
                  Component={CardInitilizationEdit}
                />
                <Route
                  path="/list/card-initialization-tender-sdc"
                  Component={CardInitializationList}
                />
                <Route
                  path="/form/checklist-and-pm-depot"
                  Component={DailTelecomMainCheckListReg}
                />
                <Route
                  path="/list/checklist-and-pm-depot"
                  Component={DailyTelecomCheckLIstDepotLists}
                />
                <Route
                  path="/view/checklist-and-pm-depot"
                  Component={DailyTelecomCheckList}
                />
                <Route
                  path="/edit/checklist-and-pm-depot"
                  Component={EditDailyTelecomCheckList}
                />
                <Route
                  path="/form/night_facp_drill_regsiter"
                  Component={FACP}
                />
                <Route
                  path="/list/night_facp_drill_regsiter"
                  Component={FACPList}
                />
                <Route
                  path="/edit/night_facp_drill_regsiter"
                  Component={EditFacp}
                />
                <Route
                  path="/form/details-related-to-foundreceived-cash"
                  Component={FoundReceivedCashReg}
                />
                <Route
                  path="/edit/details-related-to-foundreceived-cash"
                  Component={EditFoundReceivedCash}
                />
                <Route
                  path="/list/details-related-to-foundreceived-cash"
                  Component={FoundReceivedCashList}
                />
                <Route path="/form/job-card" Component={JobCard} />
                <Route path="/list/job-card" Component={JobCardLists} />
                <Route path="/view/job-card" Component={jobCardList} />
                <Route path="/edit/job-card" Component={EditJobCard} />{" "}
                <Route
                  path="/form/imprets-register-mainline"
                  Component={ImprestReg}
                />
                <Route
                  path="/edit/imprets-register-mainline"
                  Component={ImprestEdit}
                />
                <Route
                  path="/list/imprets-register-mainline"
                  Component={ImprestReglst}
                />
                 <Route
                  path="/view/imprets-register-mainline"
                  Component={ImprestRegList}
                />
                
                <Route
                  path="/form/loan-register-sdc"
                  Component={LoanRegister}
                />
                <Route
                  path="/edit/loan-register-sdc"
                  Component={LoanRegisterEdit}
                />
                <Route
                  path="/list/loan-register-sdc"
                  Component={LoanRegisterList}
                />
                <Route
                  path="/form/pm-point-maintenance-record"
                  Component={MJL11}
                />
                <Route
                  path="/list/pm-point-maintenance-record"
                  Component={MJL11Lists}
                />
                <Route
                  path="/view/pm-point-maintenance-record"
                  Component={MJL11List}
                />
                <Route
                  path="/edit/pm-point-maintenance-record"
                  Component={EditMJL11}
                />
                <Route
                  path="/form/night_lift_rescue_drill_register"
                  Component={LiftRescueRegister}
                />
                <Route
                  path="/edit/night_lift_rescue_drill_register"
                  Component={OperationLiftRescueEdit}
                />
                <Route
                  path="/list/night_lift_rescue_drill_register"
                  Component={LiftRescueList}
                />
                <Route
                  path="/form/station-diary"
                  Component={OperationStationDiaryReg}
                />
                <Route
                  path="/list/station-diary"
                  Component={OperationStationDiaryLists}
                />
                <Route
                  path="/view/station-diary"
                  Component={OperationStationDiaryList}
                />
                <Route
                  path="/edit/station-diary"
                  Component={EditStationDiary}
                />
                <Route
                  path="/form/pm-log-book-monthly-sdc"
                  Component={PMLogBook3Reg}
                />
                <Route
                  path="/list/pm-log-book-monthly-sdc"
                  Component={PMLogBook3Lists}
                />
                <Route
                  path="/view/pm-log-book-monthly-sdc"
                  Component={PMLogBook3List}
                />
                <Route
                  path="/edit/pm-log-book-monthly-sdc"
                  Component={EditPMLogBook3}
                />
                <Route
                  path="/form/pm-logbook-monthly-gate-mainline"
                  Component={PMLogBookMainLine3Reg}
                />
                <Route
                  path="/list/pm-logbook-monthly-gate-mainline"
                  Component={PMLogBookMainline3Lists}
                />
                <Route
                  path="/view/pm-logbook-monthly-gate-mainline"
                  Component={PMLogBookMainLine3List}
                />
                <Route
                  path="/edit/pm-logbook-monthly-gate-mainline"
                  Component={EditPMLogBookMainline3}
                />
                <Route
                  path="/form/pm-depot-monthy"
                  Component={PmsheetMontlyDepotReg}
                />
                <Route
                  path="/list/pm-depot-monthy"
                  Component={PMsheetMonthlyLists}
                />
                <Route
                  path="/view/pm-depot-monthy"
                  Component={PmsheetDepotMontly}
                />
                <Route
                  path="/edit/pm-depot-monthy"
                  Component={EditPMSheetMonthlyDepot}
                />
                <Route
                  path="/form/police-custody-register"
                  Component={PoliceCustodyReg}
                />
                <Route
                  path="/list/police-custody-register"
                  Component={PoliceCustodyRegList}
                />
                <Route
                  path="/edit/police-custody-register"
                  Component={EditPoliceCustody}
                />{" "}
                <Route
                  path="/form/onboard-atc-underframe"
                  Component={QuarterlyTrainInspection}
                />
                <Route
                  path="/list/onboard-atc-underframe"
                  Component={QuarterlyTrainInspectionLists}
                />
                <Route
                  path="/view/onboard-atc-underframe"
                  Component={QuarterlyTrainInspectionList}
                />
                <Route
                  path="/edit/onboard-atc-underframe"
                  Component={EditQTrainInspection}
                />{" "}
                <Route
                  path="/form/entry-exit-register-sdc"
                  Component={SDCEntryExitReg}
                />
                <Route
                  path="/edit/entry-exit-register-sdc"
                  Component={EditSDCEntryExit}
                />
                <Route
                  path="/list/entry-exit-register-sdc"
                  Component={SDCEntryExitList}
                />
                <Route path="/form/smps-six-monthlry-record" Component={SMPS} />
                <Route
                  path="/list/smps-six-monthlry-record"
                  Component={SMPSLists}
                />
                <Route
                  path="/view/smps-six-monthlry-record"
                  Component={SMPSList}
                />
                <Route
                  path="/edit/smps-six-monthlry-record"
                  Component={EditSMPS}
                />
                <Route
                  path="/form/night_manual_points_operation_drill_register"
                  Component={ManualPointDrill}
                />
                <Route
                  path="/list/night_manual_points_operation_drill_register"
                  Component={ManualPointList}
                />
                <Route
                  path="/edit/night_manual_points_operation_drill_register"
                  Component={EditManual}
                />
                <Route
                  path="/form/possession-register"
                  Component={PossessionRegister}
                />
                <Route
                  path="/list/possession-register"
                  Component={PossessionRegisterList}
                />
                <Route
                  path="/edit/possession-register"
                  Component={EditPossession}
                />
                <Route
                  path="/form/night_ets_drill_regsiter"
                  Component={ETSDrill}
                />
                <Route
                  path="/list/night_ets_drill_regsiter"
                  Component={ETSDrillList}
                />
                <Route
                  path="/edit/night_ets_drill_regsiter"
                  Component={EditEtsDrill}
                />
                <Route
                  path="/form/material-distribution"
                  Component={MaterialDistribution}
                />
                <Route
                  path="/list/material-distribution"
                  Component={MaterialDistributionList}
                />
                <Route
                  path="/edit/material-distribution"
                  Component={EditMaterial}
                />
                <Route
                  path="/form/urc-and-os-entry-register-sdc"
                  Component={Os_Urc_In_Out}
                />
                <Route
                  path="/list/urc-and-os-entry-register-sdc"
                  Component={Os_Urc_List}
                />
                <Route
                  path="/edit/urc-and-os-entry-register-sdc"
                  Component={EditOsUrc}
                />
                <Route
                  path="/form/consumables-register-mainline"
                  Component={Consumables}
                />
                <Route
                  path="/list/consumables-register-mainline"
                  Component={ConsumablesList}
                />
                <Route
                  path="/edit/consumables-register-mainline"
                  Component={EditConsume}
                />
                <Route
                  path="/form/contract-work-done-register-telecom"
                  Component={Contractor_Work_Done}
                />
                <Route
                  path="/list/contract-work-done-register-telecom"
                  Component={Contractor_Work_Done_List}
                />
                <Route
                  path="/edit/contract-work-done-register-telecom"
                  Component={EditContractor}
                />
                <Route
                  path="/form/contract-work-done-register"
                  Component={Contractor_Work_Done}
                />
                <Route
                  path="/list/contract-work-done-register"
                  Component={Contractor_Work_Done_List}
                />
                <Route
                  path="/edit/contract-work-done-register"
                  Component={EditContractor}
                />
                <Route
                  path="/form/pm-logbook-monthly-tvm-mainline"
                  Component={Afc_prevention}
                />
                <Route
                  path="/list/pm-logbook-monthly-tvm-mainline"
                  Component={Afc_pre_list}
                />
                <Route
                  path="/view/pm-logbook-monthly-tvm-mainline"
                  Component={Afc_preventionList}
                />
                <Route
                  path="/edit/pm-logbook-monthly-tvm-mainline"
                  Component={Editafc}
                />
                <Route path="/form/ser-entry" Component={SerEntry} />
                <Route path="/list/ser-entry" Component={SerEntryList} />
                <Route path="/edit/ser-entry" Component={EditSerEntry} />
                <Route
                  path="/form/replacement-register"
                  Component={ReplacementReg}
                />
                <Route
                  path="/list/replacement-register"
                  Component={ReplacementList}
                />
                <Route path="/edit/replacement-register" Component={EditRep} />
                <Route
                  path="/form/night_lift_rescue_drill_register"
                  Component={LiftRescue1}
                />
                <Route
                  path="/list/night_lift_rescue_drill_register"
                  Component={LiftRescue1list}
                />
                <Route
                  path="/edit/night_lift_rescue_drill_register"
                  Component={EditLift1}
                />
                <Route
                  path="/form/night_lift_rescue_drill2_register"
                  Component={LiftRescue2}
                />
                <Route
                  path="/list/night_lift_rescue_drill2_register"
                  Component={LiftRescue2list}
                />
                <Route
                  path="/edit/night_lift_rescue_drill2_register"
                  Component={EditLift2}
                />
                <Route
                  path="/form/honorarium-register"
                  Component={Honorarium}
                />
                <Route
                  path="/list/honorarium-register"
                  Component={HonorariumList}
                />
                <Route
                  path="/edit/honorarium-register"
                  Component={EditHonorarium}
                />
                <Route
                  path="/form/pm-logbook-tom-half-yearly-sdc"
                  Component={Pmlog6}
                />
                <Route
                  path="/view/pm-logbook-tom-half-yearly-sdc"
                  Component={Pmlog6List}
                />
                <Route
                  path="/edit/pm-logbook-tom-half-yearly-sdc"
                  Component={EditPmlog6}
                />
                <Route
                  path="/list/pm-logbook-tom-half-yearly-sdc"
                  Component={Pm_log6_half_yearly_list}
                />
                <Route
                  path="/form/pm-logbook-monthly-tom-mainline"
                  Component={PmlogMaintain}
                />
                <Route
                  path="/edit/pm-logbook-monthly-tom-mainline"
                  Component={Editpmlogmaintain}
                />
                <Route
                  path="/view/pm-logbook-monthly-tom-mainline"
                  Component={PmlogMaintainList}
                />
                <Route
                  path="/list/pm-logbook-monthly-tom-mainline"
                  Component={Pm_mainlist}
                />
                <Route
                  path="/form/checklist-and-pm-station"
                  Component={DailyTelecom}
                />
                <Route
                  path="/view/checklist-and-pm-station"
                  Component={DailyTelecomList}
                />
                <Route
                  path="/edit/checklist-and-pm-station"
                  Component={EditDailyTelecom}
                />
                <Route
                  path="/list/checklist-and-pm-station"
                  Component={Daily_tele_list}
                />
                <Route
                  path="/form/shunt-signal-maintenance"
                  Component={ShuntSignal}
                />
                <Route
                  path="/list/shunt-signal-maintenance"
                  Component={ShuntSignalList}
                />
                <Route
                  path="/edit/shunt-signal-maintenance"
                  Component={EditShunt}
                />
                <Route
                  path="/view/shunt-signal-maintenance"
                  Component={ShuntList}
                />
                <Route
                  path="/form/earth-connection"
                  Component={EarthConnectivity}
                />
                <Route
                  path="/list/earth-connection"
                  Component={Earth_connectivity_list}
                />
                <Route
                  path="/view/earth-connection"
                  Component={EarthConnectivityList}
                />
                <Route path="/edit/earth-connection" Component={EditEarth} />
                <Route
                  path="/form/pm-occ-bcc-half-yearly"
                  Component={Pmsheetoccbcchalfyearlyform}
                />
                <Route
                  path="/list/pm-occ-bcc-half-yearly"
                  Component={Pmoccbcch_list}
                />
                <Route
                  path="/edit/pm-occ-bcc-half-yearly"
                  Component={Pmsheetoccbcchalfyearlyedit}
                />
                <Route
                  path="/view/pm-occ-bcc-half-yearly"
                  Component={Pmsheetoccbcchalfyearlytable}
                />
                <Route
                  path="/form/indoor-box-cleaning"
                  Component={BoxCleaningRecord}
                />
                <Route
                  path="/view/indoor-box-cleaning"
                  Component={BoxCleaningRecordList}
                />
                <Route
                  path="/edit/indoor-box-cleaning"
                  Component={EditBoxCleaningRecord}
                />
                <Route
                  path="/list/indoor-box-cleaning"
                  Component={ListBoxCleaningRecord}
                />
                {/* <Route
                  path="/form/night_facp_drill_regsiter"
                  Component={FacpDrill}
                /> */}
                {/* <Route
                  path="/list/night_facp_drill_regsiter"
                  Component={FacpDrillList}
                /> */}
                {/* <Route
                  path="/edit/night_facp_drill_regsiter"
                  Component={EditFacp}
                /> */}
                <Route
                  path="/form/night_lats_vdu_drill_register"
                  Component={LatsRegister}
                />
                <Route
                  path="/list/night_lats_vdu_drill_register"
                  Component={LatsList}
                />
                <Route
                  path="/edit/night_lats_vdu_drill_register"
                  Component={EditLats}
                />
                <Route
                  path="/form/lab-faulty-item-register"
                  Component={LabMaterialTransactionRegister}
                />
                <Route
                  path="/view/lab-faulty-item-register"
                  Component={LabMaterialTransactionList}
                />
                <Route
                  path="/list/lab-faulty-item-register"
                  Component={ListLabMaterialTransactionRegister}
                />
                <Route
                  path="/edit/lab-faulty-item-register"
                  Component={EditLabMaterial}
                />
              
                <Route
                  path="/list/equipment_failure_register"
                  Component={EquipmentFailureRegisterList}
                />
                <Route
                  path="/edit/equipment_failure_register"
                  Component={EditEquipment}
                />
               
                <Route
                  path="/form/ats-cabinet-maintenance-monthly"
                  Component={MonthlyCabinetRecord}
                />

              <Route
                  path="/form/equipment-failure-occ-register"
                  Component={EquipmentFailureOcc}
                />
                <Route
                  path="/list/equipment-failure-occ-register"
                  Component={EquipmentFailureOccView}
                />
                  <Route
                  path="/edit/equipment-failure-occ-register"
                  Component={EditEquipmentFailureOcc}
                />
                <Route
                  path="/view/ats-cabinet-maintenance-monthly"
                  Component={MonthlyCabinetRecordList}
                />
                <Route
                  path="/edit/ats-cabinet-maintenance-monthly"
                  Component={EditCabinetRecord}
                />
                <Route
                  path="/list/ats-cabinet-maintenance-monthly"
                  Component={ListMonthlyCabinetRecord}
                />
                {/* <Route path="/form/ser-entry" Component={SEREntryPage} />
                <Route path="/list/ser-entry" Component={SEREntryPageList} />
                <Route path="/edit/ser-entry" Component={EditSERPage} /> */}
                <Route
                  path="/form/shift-log-book-sdc"
                  Component={ShiftLogBook}
                />
                <Route
                  path="/view/shift-log-book-sdc"
                  Component={ShiftLogBookList}
                />
                <Route path="/edit/shift-log-book-sdc" Component={EditShift} />
                <Route
                  path="/list/shift-log-book-sdc"
                  Component={ListShiftLogBook}
                />


<Route
                  path="/form/instruction-shift-log-book"
                  Component={ShiftLogBook}
                />
                <Route
                  path="/view/instruction-shift-log-book"
                  Component={ShiftLogBookList}
                />
                <Route path="/edit/instruction-shift-log-book" Component={EditShift} />
                <Route
                  path="/list/instruction-shift-log-book"
                  Component={ListShiftLogBook}
                />


                <Route
                  path="/form/shift-log-book-mainline"
                  Component={ShiftLogBook}
                />
                <Route
                  path="/view/shift-log-book-mainline"
                  Component={ShiftLogBookList}
                />
                <Route
                  path="/edit/shift-log-book-mainline"
                  Component={EditShift}
                />
                <Route
                  path="/list/shift-log-book-mainline"
                  Component={ListShiftLogBook}
                />
                <Route
                  path="/form/sw-update-register-sdc"
                  Component={SwUpdateRegister}
                />
                <Route
                  path="/list/sw-update-register-sdc"
                  Component={SwUpdateRegisterList}
                />
                <Route
                  path="/edit/sw-update-register-sdc"
                  Component={EditSwUpdate}
                />
                <Route path="/form/teacoffee" Component={TeaCoffeeRegister} />
                <Route path="/list/teacoffee" Component={TeaCoffeeList} />
                <Route path="/edit/teacoffee" Component={EditTeaCoffee} />
                <Route
                  path="/form/train-id-change-record-register"
                  Component={TrainIdRegister}
                />
                <Route
                  path="/list/train-id-change-record-register"
                  Component={TrainIdList}
                />
                <Route
                  path="/edit/train-id-change-record-register"
                  Component={EditTrainId}
                />
                <Route
                  path="/form/unplanned-to-record"
                  Component={CrewControlCcap}
                />
                <Route
                  path="/list/unplanned-to-record"
                  Component={CrewControlCcapList}
                />
                <Route path="/edit/unplanned-to-record" Component={EditCrew} />
                <Route
                  path="/form/pm-logbook-monthly-tom-mainline"
                  Component={AfcPreventiveMaintenance}
                />
                <Route
                  path="/view/pm-logbook-monthly-tom-mainline"
                  Component={AfcPreventiveMaintenanceList}
                />
               
                <Route
                  path="/list/pm-logbook-monthly-tom-mainline"
                  Component={ListAfcPreventiveMaintenance}
                />
                <Route
                  path="/form/pm-logbook-tvm-half-yearly-sdc"
                  Component={PMLogBookTVM}
                />
                <Route
                  path="/view/pm-logbook-tvm-half-yearly-sdc"
                  Component={PMLogBookList}
                />
                <Route
                  path="/edit/pm-logbook-tvm-half-yearly-sdc"
                  Component={EditPMList}
                />
                <Route
                  path="/list/pm-logbook-tvm-half-yearly-sdc"
                  Component={ListPMLogBook}
                />
                <Route
                  path="/form/pm-logbook-monthly-other-mainline"
                  Component={PMMainline}
                />
                <Route
                  path="/view/pm-logbook-monthly-other-mainline"
                  Component={PMMainlineList}
                />
                <Route
                  path="/edit/pm-logbook-monthly-other-mainline"
                  Component={EditPMMainline}
                />
                <Route
                  path="/list/pm-logbook-monthly-other-mainline"
                  Component={ListPMMainline}
                />
                <Route
                  path="/form/incident-register"
                  Component={IncidentRegisterSignals}
                />
                <Route
                  path="/list/incident-register"
                  Component={IncidentRegisterSignalsList}
                />
                <Route
                  path="/edit/incident-register"
                  Component={EditIncident}
                />
                <Route
                  path="/form/pm-occ-bcc-monthly"
                  Component={MonthlyMaintenanceSchedule}
                />
                <Route
                  path="/view/pm-occ-bcc-monthly"
                  Component={MonthlyMaintenanceScheduleList}
                />
                <Route
                  path="/edit/pm-occ-bcc-monthly"
                  Component={EditSchedule}
                />
                <Route
                  path="/list/pm-occ-bcc-monthly"
                  Component={ListMonthlyMaintenanceSchedule}
                />
                <Route
                  path="/form/assurance-register-mainline"
                  Component={AssuRegReg}
                />
                <Route
                  path="/list/assurance-register-mainline"
                  Component={AssuRegList}
                />
                
                
                <Route
                  path="/list/assurance-register"
                  Component={AssuRegList}
                />
                <Route
                  path="/form/assurance-register-telecom"
                  Component={AssuRegReg}
                />
                <Route
                  path="/list/assurance-register-telecom"
                  Component={AssuRegList}
                />
              
              
                <Route
                  path="/form/occ-afc-gate-drill"
                  Component={AfcGateDrillReg}
                />
                <Route
                  path="/list/occ-afc-gate-drill"
                  Component={AfcGateDrillList}
                />
                <Route
                  path="/edit/occ-afc-gate-drill"
                  Component={AfcGateDrillEdit}
                />
                {/* Competency Record Register */}
                <Route
                  path="/form/competency-record-register"
                  Component={ComRecRegReg}
                />
                <Route
                  path="/list/competency-record-register"
                  Component={ComRecRegList}
                />
                <Route
                  path="/edit/competency-record-register"
                  Component={ComRecRegEdit}
                />
                {/* Equipment Failure Station Register */}
                <Route
                  path="/form/equipment_failure_register"
                  Component={EquFaiRegReg}
                />
                <Route
                  path="/list/equipment_failure_register"
                  Component={EquFaiRegList}
                />
                <Route
                  path="/edit/equipment_failure_register"
                  Component={EquFaiRegEdit}
                />
                {/* Manual point operation Drill */}
                <Route
                  path="/form/manual-point-operation-drill"
                  Component={ManPoiOpeDrillReg}
                />
                <Route
                  path="/list/manual-point-operation-drill"
                  Component={ManPoiOpeDrillList}
                />
                <Route
                  path="/edit/manual-point-operation-drill"
                  Component={ManPoiOpeDrillEdit}
                />
                {/* LIFT RESCUE DRILL */}
                <Route
                  path="/form/night_lift_rescue_drill2_register"
                  Component={GateReg}
                />
                <Route
                  path="/list/night_lift_rescue_drill2_register"
                  Component={GateList}
                />
                <Route
                  path="/edit/night_lift_rescue_drill2_register"
                  Component={GateEdit}
                />
                {/* PM FOLLOWUP SHEET */}
                <Route
                  path="/form/pm-follow-up-mainline"
                  Component={PmFolUpReg}
                />
                <Route
                  path="/list/pm-follow-up-mainline"
                  Component={PmFollowUpList}
                />
                 <Route
                  path="/view/pm-follow-up-mainline"
                  Component={PmFolUpList}
                />
                <Route
                  path="/edit/pm-follow-up-mainline"
                  Component={PmFolUpEdit}
                />
                {/* AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY) (ANNEXURE-B)*/}
                <Route
                  path="/form/pm-logbook-half-yearly-other-mainline"
                  Component={ChecklistReg}
                />
                <Route
                  path="/view/pm-logbook-half-yearly-other-mainline"
                  Component={ChecklistList}
                />
                <Route
                  path="/edit/pm-logbook-half-yearly-other-mainline"
                  Component={ChecklistEdit}
                />
                <Route
                  path="/list/pm-logbook-half-yearly-other-mainline"
                  Component={Checklist_NewList}
                />
                {/* DAILY WORK DONE REGISTER */}
                <Route
                  path="/form/daily-work-done-register"
                  Component={DailyWorkReg}
                />
                <Route
                  path="/list/daily-work-done-register"
                  Component={DailyWorkList}
                />
                <Route
                  path="/edit/daily-work-done-register"
                  Component={DailyWorkEditt}
                />
                {/* EQUIPMENT FAILURE REPORT or EFR Format-signals*/}
                <Route path="/form/efr-register" Component={FailureReportReg} />
                <Route
                  path="/view/efr-register"
                  Component={FailureReportList}
                />
                <Route
                  path="/edit/efr-register"
                  Component={FailureReportEdit}
                />
                <Route
                  path="/list/efr-register"
                  Component={FailureReport_NewList}
                />
                {/* STATION DIARY (SIGNALLING) */}
                <Route
                  path="/form/station-diary-signalling"
                  Component={StationDiaryReg}
                />
                <Route
                  path="/view/station-diary-signalling"
                  Component={StationDiaryList}
                />
                <Route
                  path="/edit/station-diary-signalling"
                  Component={StationDiaryEdit}
                />
                <Route
                  path="/list/station-diary-signalling"
                  Component={StationDiary_NewList}
                />
                {/* Claim Registration Register */}
               
                <Route
                  path="/list/claim-registration-register"
                  Component={ClaimRegList}
                />
                <Route
                  path="/edit/claim-registration-register"
                  Component={ClaimRegEdit}
                />
                {/* Line Defect Register */}
                <Route path="/form/line-defect" Component={LineDefectReg} />
                <Route path="/list/line-defect" Component={LineDefectList} />
                <Route path="/edit/line-defect" Component={LineDefectEdit} />
                {/* PIDS/PAS Drill */}
                <Route path="/form/pidspas-drill" Component={PASDrillReg} />
                <Route path="/list/pidspas-drill" Component={PASDrillList} />
                <Route path="/edit/pidspas-drill" Component={PASDrillEdit} />
                {/* CSC Initialization Detail Register or Card initialization form */}
                {/* <Route
                  path="/form/card-initialization-tender-sdc"
                  Component={CSCInitRegReg}
                />
                <Route
                  path="/list/card-initialization-tender-sdc"
                  Component={CSCInitRegList}
                />
                <Route
                  path="/edit/card-initialization-tender-sdc"
                  Component={CSCInitRegEdit}
                /> */}
                {/* PREVENTIVE MAINTENACE WORKSHEET OF CENTRAL COMPUTER (YEARLY) */}
                <Route
                  path="/form/pm-logbook-yearly1-sdc"
                  Component={PreMainWorkReg}
                />
                <Route
                  path="/view/pm-logbook-yearly1-sdc"
                  Component={PreMainWorkList}
                />
                <Route
                  path="/edit/pm-logbook-yearly1-sdc"
                  Component={PreMainWorkEdit}
                />
                <Route
                  path="/list/pm-logbook-yearly1-sdc"
                  Component={PreMainWork_NewList}
                />
                {/* Measurement of Voltage at MCB in PDC SIX MONTHLY MAINTENANCE RECORD	 */}
                <Route
                  path="/form/measurement-voltage-mcb"
                  Component={MeasurementVoltageMCBinPDC}
                />
                <Route
                  path="/view/measurement-voltage-mcb"
                  Component={MeasurementVoltageMCBinPDCList}
                />
                <Route
                  path="/edit/measurement-voltage-mcb"
                  Component={MeasurementVoltageMCBinPDCEdit}
                />
                <Route
                  path="/list/measurement-voltage-mcb"
                  Component={MeasurementVoltageMCBinPDC_NewList}
                />
                <Route
                  path="/form/incident-register"
                  Component={IncidentRegisterSignals}
                />
                <Route
                  path="/list/incident-register"
                  Component={IncidentRegisterSignalsList}
                />
                <Route
                  path="/edit/incident-register"
                  Component={EditIncident}
                />
                <Route
                  path="/form/parameter-register-sdc"
                  Component={ParameterReg}
                />
                <Route
                  path="/list/parameter-register-sdc"
                  Component={ParameterList}
                />
                <Route
                  path="/edit/parameter-register-sdc"
                  Component={EditParameter1}
                />
                <Route
                  path="/list/parameter-register-sdc"
                  Component={ParameterList}
                />
                <Route
                  path="/form/material-distribution-to-trainees"
                  Component={MaterialDistribReg}
                />
                <Route
                  path="/list/material-distribution-to-trainees"
                  Component={MaterialDistribList}
                />
                <Route
                  path="/edit/material-distribution-to-trainees"
                  Component={EditMaterialTrainees}
                />
                <Route path="/form/fmts-sdc" Component={FMTSReg} />
                <Route path="/list/fmts-sdc" Component={FMTSData} />
                <Route path="/edit/fmts-sdc" Component={EditFMTS} />
                <Route path="/view/fmts-sdc" Component={FMTSList} />
                <Route path="/form/fmts" Component={FMTSReg}/>
                <Route path="/list/fmts" Component={FMTSData} />
                <Route path="/view/fmts" Component={FMTSList} />
                <Route path="/edit/fmts" Component={EditFMTS} />
                <Route path="/form/fmts-book-mainline" Component={FMTSReg} />
                <Route path="/list/fmts-book-mainline" Component={FMTSData} />
                <Route path="/edit/fmts-book-mainline" Component={EditFMTS} />
                <Route path="/view/fmts-book-mainline" Component={FMTSList} />
                <Route
                  path="/form/incident-accident"
                  Component={IncidentAccidentReportReg}
                />
                <Route
                  path="/view/incident-accident"
                  Component={IncidentAccidentReportList}
                />
                 <Route
                  path="/list/incident-accident"
                  Component={IncidentAccidentList}
                />
                <Route
                  path="/edit/incident-accident"
                  Component={EditIncidentReport}
                />
                <Route
                  path="/form/night_manual_points_operation_drill_register"
                  Component={ManualPointReg}
                />
                <Route
                  path="/list/night_manual_points_operation_drill_register"
                  Component={ManualPointListP}
                />
                <Route
                  path="/edit/night_manual_points_operation_drill_register"
                  Component={EditManualPoint}
                />
                <Route
                  path="/form/atc-examination"
                  Component={AtcExaminationReg}
                />
                <Route
                  path="/view/atc-examination"
                  Component={AtcExaminationList}
                />
                <Route
                  path="/edit/atc-examination"
                  Component={EditATCExamination}
                />
                <Route
                  path="/list/atc-examination"
                  Component={Atc_Examination_list}
                />
                <Route
                  path="/form/hardware-failure"
                  Component={HardwareFailureReg}
                />
                <Route
                  path="/list/hardware-failure"
                  Component={HardwareFailureList}
                />
                <Route
                  path="/edit/hardware-failure"
                  Component={EditHardwareFailure}
                />
              
                <Route
                  path="/list/signal-failure"
                  Component={SignalFailureList}
                />
                <Route
                  path="/edit/signal-failure"
                  Component={EditSignalFailure}
                />
                <Route
                  path="/form/axle_counter_reset_register"
                  Component={Axlecounterresetregister}
                />
                <Route
                  path="/list/axle_counter_reset_register"
                  Component={AxlecounterList}
                />
                <Route
                  path="/edit/axle_counter_reset_register"
                  Component={EditAxleCounter}
                />
                <Route
                  path="/list/stock-movement-register-cards"
                  Component={StockmovementcardsList}
                />
                  <Route
                  path="/view/stock-movement-register-cards"
                  Component={StockmovementcardsView}
                />
                <Route
                  path="/form/stock-movement-register-cards"
                  Component={StockMovementCards}
                />
                <Route
                  path="/form/stock-movement-register-tokens"
                  Component={StockMovementTokens}
                />
                <Route
                  path="/list/stock-movement-register-tokens"
                  Component={StockMovementTokensList}
                />
                <Route
                  path="/view/stock-movement-register-tokens"
                  Component={StockMovementTokensview}
                />
                <Route
                  path="/edit/stock-movement-register-tokens"
                  Component={StockMovementTokensEdit}
                />
                <Route
                  path="/edit/stock-movement-register-cards"
                  Component={EditStockMovement}
                />
                <Route path="/form/dead-stock" Component={DeadStock} />
                <Route path="/list/dead-stock" Component={DeadStockList} />
                <Route path="/edit/dead-stock" Component={EditDeadStock} />
                <Route
                  path="/form/agent-card-registers-sdc"
                  Component={AgentCardReg}
                />
                <Route
                  path="/list/agent-card-registers-sdc"
                  Component={AgentCardList}
                />
                <Route
                  path="/edit/agent-card-registers-sdc"
                  Component={EditAgentCard}
                />
                <Route
                  path="/form/ats-maintenance-halfyearly"
                  Component={ATSReg}
                />
                <Route
                  path="/view/ats-maintenance-halfyearly"
                  Component={ATSList}
                />
                <Route
                  path="/edit/ats-maintenance-halfyearly"
                  Component={EditATS}
                />
                <Route
                  path="/list/ats-maintenance-halfyearly"
                  Component={Ats_list}
                />
                <Route
                  path="/form/outdoor-box-cleaning"
                  Component={BoxCleaningOutdoorReg}
                />
                <Route
                  path="/view/outdoor-box-cleaning"
                  Component={BoxCleaningOutdoorList}
                />
                <Route
                  path="/edit/outdoor-box-cleaning"
                  Component={EditBoxCleaning}
                />
                <Route
                  path="/list/outdoor-box-cleaning"
                  Component={BoxCleaning_Outdoor_list}
                />
                <Route
                  path="/form/pm-depot-monthy"
                  Component={PmsheetMonthlyDepotReg}
                />
                <Route
                  path="/view/pm-depot-monthy"
                  Component={PMsheetMonthlyList}
                />
                <Route
                  path="/edit/pm-depot-monthy"
                  Component={EditPMsheetMonthlyDepot}
                />
                <Route
                  path="/list/pm-depot-monthy"
                  Component={Pm_sheet_monthly_list}
                />
                <Route
                  path="/form/permanent-loan-register"
                  Component={HandingTakingNoteReg}
                />
                <Route
                  path="/list/permanent-loan-register"
                  Component={HandingTakingNoteList}
                />
                <Route
                  path="/edit/permanent-loan-register"
                  Component={EditHandingTaking}
                />
                <Route
                  path="/form/pm-logbook-sdc-half-yearly-sdc"
                  Component={PMLogBookReg}
                />
                <Route
                  path="/view/pm-logbook-sdc-half-yearly-sdc"
                  Component={PMLogBookListSDC}
                />
                <Route
                  path="/edit/pm-logbook-sdc-half-yearly-sdc"
                  Component={EditPMLogBook}
                />
                <Route
                  path="/list/pm-logbook-sdc-half-yearly-sdc"
                  Component={PM_log_Book_list}
                />
                <Route
                  path="/view/pm-logbook-half-yearly-gate-mainline"
                  Component={AfcPreventiveList}
                />
                <Route
                  path="/form/pm-logbook-half-yearly-gate-mainline"
                  Component={AfcPreventiveReg}
                />
                <Route
                  path="/edit/pm-logbook-half-yearly-gate-mainline"
                  Component={EditAfcPreventiveGate}
                />
                <Route
                  path="/list/pm-logbook-half-yearly-gate-mainline"
                  Component={AfcPreventive_list}
                />
                <Route
                  path="/form/contractual-spare-testing-register"
                  Component={ContractualSpareTesting}
                />
                <Route
                  path="/list/contractual-spare-testing-register"
                  Component={ContractualSpareTestingTable}
                />
                <Route
                  path="/edit/contractual-spare-testing-register"
                  Component={EditContractualSpareTest}
                />
                <Route path="/form/loan-register" Component={Loanreg} />
                <Route path="/list/loan-register" Component={LoanregList} />
                <Route path="/edit/loan-register" Component={EditLoanreg} />
                <Route path="/form/fan-rack-cleaning" Component={FanRack} />
                <Route path="/list/fan-rack-cleaning" Component={FanRackList} />
                <Route path="/edit/fan-rack-cleaning" Component={EditFanRack} />
                <Route
                  path="/view/fan-rack-cleaning"
                  Component={FanRackTabel}
                />
                <Route
                  path="/form/axel-counter-maintenance"
                  Component={AlxeCounter}
                />
                <Route
                  path="/list/axel-counter-maintenance"
                  Component={AxelCounteMaintenanceRecord}
                />
                <Route
                  path="/view/axel-counter-maintenance"
                  Component={AxleCounterTable}
                />
                <Route
                  path="/edit/axel-counter-maintenance"
                  Component={EditAxle}
                />
                <Route
                  path="/form/filter-replacement"
                  Component={FilterReplacement}
                />
                <Route
                  path="/edit/filter-replacement"
                  Component={EditFilterReplacement}
                />
                <Route
                  path="/view/filter-replacement"
                  Component={FilterReplacementTable}
                />
                <Route
                  path="/list/filter-replacement"
                  Component={FilterReplacementList}
                />
                <Route
                  path="/edit/grievance-register"
                  Component={EditGrievance}
                />
                <Route path="/form/grievance-register" Component={Grievance} />
                <Route
                  path="/list/grievance-register"
                  Component={GrievanceList}
                />
                {/* <Route
                  path="/form/card-initialization-tender-sdc"
                  Component={CSCInitializationDetailRegister}
                />
                <Route
                  path="/list/card-initialization-tender-sdc"
                  Component={CSCInitializationDetailRegisterList}
                />
                <Route
                  path="/edit/card-initialization-tender-sdc"
                  Component={EditCSCInitializationDetailRegister}
                /> */}
                <Route
                  path="/form/pm-logbook-workstations-half-yearly-sdc"
                  Component={PREVENTIVEMAINTENACE_CC_CCHS}
                />
                <Route
                  path="/list/pm-logbook-workstations-half-yearly-sdc"
                  Component={PREVENTIVEMAINTENACE_CC_CCHSList}
                />
                <Route
                  path="/edit/pm-logbook-workstations-half-yearly-sdc"
                  Component={EditPREVENTIVEMAINTENACE_CC_CCHS}
                />
                <Route
                  path="/view/pm-logbook-workstations-half-yearly-sdc"
                  Component={PREVENTIVEMAINTENACE_CC_CCHSTable}
                />
                <Route
                  path="/form/sw-update-register-sdc"
                  Component={DeviceApplicationSoftware}
                />
                <Route
                  path="/list/sw-update-register-sdc"
                  Component={DeviceApplicationSoftwareLIST}
                />
                <Route
                  path="/edit/sw-update-register-sdc"
                  Component={EditDeviceApplicationSoftware}
                />
                <Route
                  path="/list/night_lats_vdu_drill_register"
                  Component={LatsVduDrillList}
                />
                <Route
                  path="/form/night_lats_vdu_drill_register"
                  Component={LatsRegister}
                />
                <Route
                  path="/edit/night_lats_vdu_drill_register"
                  Component={EditLats}
                />
                <Route
                  path="/form/details-related-to-foundreceived-foreign-currency"
                  Component={ForeignCurrencyForm}
                />
                <Route
                  path="/list/details-related-to-foundreceived-foreign-currency"
                  Component={FoundForeignCurrencyList}
                />
                <Route
                  path="/edit/details-related-to-foundreceived-foreign-currency"
                  Component={EditFoundForeignCurrency}
                />
                <Route path="/form/esp_drill_register" Component={ESP} />
                <Route path="/list/esp_drill_register" Component={ESPList} />
                <Route path="/edit/esp_drill_register" Component={EditEsp} />
                <Route
                  path="/form/control-take-over-handover-register"
                  Component={ControTankenOver}
                />
                <Route
                  path="/list/control-take-over-handover-register"
                  Component={ControlTakenOverList}
                />
                <Route
                  path="/edit/control-take-over-handover-register"
                  Component={EditControlTakenOver}
                />
                <Route path="/form/dar" Component={DAR} />
                <Route path="/list/dar" Component={DARList} />
                <Route path="/edit/dar" Component={EditDar} />
                <Route
                  path="/form/crew-incident-accident"
                  Component={IncidentAccidentOprationReg}
                />
                <Route
                  path="/list/crew-incident-accident"
                  Component={IncidentAccidentRegOperationList}
                />
                <Route
                  path="/edit/crew-incident-accident"
                  Component={IncidentAccidentRegisterOperationEdit}
                />
                <Route
                  path="/form/attendance-register"
                  Component={AttendanceRegister}
                />
                <Route
                  path="/list/attendance-register"
                  Component={AttendanceRegisterList}
                />
                <Route
                  path="/edit/attendance-register"
                  Component={EditAttendanceRegister}
                />
                <Route
                  path="/edit/daily-transaction-register-mainline"
                  Component={EditDailyTransactionRegister_RECEIPTS}
                />
                <Route
                  path="/form/daily-transaction-register-mainline"
                  Component={DailyTransactionRegister_RECEIPTS}
                />
                <Route
                  path="/list/daily-transaction-register-mainline"
                  Component={DailyTransactionRegisterList_RECEIPTS}
                />
                <Route
                  path="/form/daily-transaction-register-store-receipt"
                  Component={DailyTransactionRegister_RECEIPTS}
                />
                <Route
                  path="/list/daily-transaction-register-store-receipt"
                  Component={DailyTransactionRegisterList_RECEIPTS}
                />
                <Route
                  path="/form/daily-transaction-register-telecom-receipt"
                  Component={DailyTransactionRegister_RECEIPTS}
                />
                <Route
                  path="/list/daily-transaction-register-telecom-receipt"
                  Component={DailyTransactionRegisterList_RECEIPTS}
                />
                
                <Route
                  path="/list/pm-logbook-half-yearly-tvm-mainline"
                  Component={PMLOGBOOKMAINLINE9List}
                />
                <Route
                  path="/edit/pm-logbook-half-yearly-tvm-mainline"
                  Component={EditPMLOGBOOKMAINLINE9}
                />
                <Route
                  path="/view/pm-logbook-half-yearly-tvm-mainline"
                  Component={PMLOGBOOKMAINLINE9Table}
                />
                <Route
                  path="/form/pm-logbook-half-yearly-tom-mainline"
                  Component={AFCPREVENTIVEMAINTENANCCHECKLISTHalfYearly}
                />
                <Route
                  path="/list/pm-logbook-half-yearly-tom-mainline"
                  Component={AfcPreventiveMaintenanceHalfYearlyList}
                />
                <Route
                  path="/edit/pm-logbook-half-yearly-tom-mainline"
                  Component={EditAfcPreventiveHalfyearly}
                />
                <Route
                  path="/view/pm-logbook-half-yearly-tom-mainline"
                  Component={AfcPreventiveMaintenanceTable}
                />
                <Route
                  path="/form/incident-register"
                  Component={IncidentRegisterSignals}
                />
                <Route
                  path="/list/incident-register"
                  Component={IncidentRegisterSignalsList}
                />
                <Route
                  path="/edit/incident-register"
                  Component={EditIncident}
                />
                <Route
                  path="/form/night_escalator_drill_register"
                  Component={Escalator}
                />
                <Route
                  path="list/night_escalator_drill_register"
                  Component={EscalatorList}
                />
                <Route
                  path="/edit/night_escalator_drill_register"
                  Component={EscalatorEdit}
                />
                <Route
                  path="/form/first-aid-register"
                  Component={FirstAidRegister}
                />
                <Route
                  path="/list/first-aid-register"
                  Component={FirstAidRegisterList}
                />
                <Route
                  path="/edit/first-aid-register"
                  Component={FirstAidEdit}
                />
                <Route
                  path="/form/control-take-over-handover-register"
                  Component={Handoverrecord}
                />
                <Route
                  path="/list/control-take-over-handover-register"
                  Component={HandoverRecordList}
                />
                <Route
                  path="/edit/control-take-over-handover-register"
                  Component={HandoverEdit}
                />
                <Route
                  path="/form/petty-repair-register"
                  Component={PettyRepairForm}
                />
                <Route
                  path="/edit/petty-repair-register"
                  Component={PeetyEdit}
                />
                <Route
                  path="/list/petty-repair-register"
                  Component={PeetyrepairRegisterList}
                />
                <Route path="/form/line-defect" Component={Linedefect} />
                <Route path="/list/line-defect" Component={LinedefectList} />
                <Route path="/edit/line-defect" Component={LineEdit} />
                <Route
                  path="/form/library-book-issue-register"
                  Component={Library}
                />
                <Route
                  path="/edit/library-book-issue-register"
                  Component={LibraryEdit}
                />
                <Route
                  path="/list/library-book-issue-register"
                  Component={LibraryBookRegisterList}
                />
                <Route
                  path="/form/inspection-register-mainline"
                  Component={InspactionRegister}
                />
                <Route
                  path="/list/inspection-register-mainline"
                  Component={InspactionRegisterList}
                />
                <Route
                  path="/edit/inspection-register-mainline"
                  Component={InspactionEdit}
                />
                <Route
                  path="/form/inspection-register"
                  Component={InspactionRegister}
                />
                <Route
                  path="/list/inspection-register"
                  Component={InspactionRegisterList}
                />
                <Route
                  path="/edit/inspection-register"
                  Component={InspactionEdit}
                />
                <Route
                  path="/form/inspection-register-telecom"
                  Component={InspactionRegister}
                />
                <Route
                  path="/list/inspection-register-telecom"
                  Component={InspactionRegisterList}
                />
                <Route
                  path="/edit/inspection-register-telecom"
                  Component={InspactionEdit}
                />
                <Route
                  path="/form/daily-checklist-register-sdc"
                  Component={DailycheckRegister}
                />
                <Route
                  path="/edit/daily-checklist-register-sdc"
                  Component={DailycheckRegisterEdit}
                />
                <Route
                  path="/list/daily-checklist-register-sdc"
                  Component={DailycheckRegisterLists}
                />
                <Route
                  path="/view/daily-checklist-register-sdc"
                  Component={DailycheckRegisterList}
                />
                <Route
                  path="/form/handintaking-over-note"
                  Component={HandlingRegister}
                />
                <Route
                  path="/list/handintaking-over-note"
                  Component={HandlingRegisterList}
                />
                <Route
                  path="/edit/handintaking-over-note"
                  Component={HandlingEdit}
                />
                <Route
                  path="/form/pm-station-half-yearly"
                  Component={HalfYearlyMaintenanceForm}
                />
                <Route
                  path="/edit/pm-station-half-yearly"
                  Component={MaintenanceEdit}
                />
                <Route
                  path="/list/pm-station-half-yearly"
                  Component={MaintenanceScheduleLists}
                />
                <Route
                  path="/view/pm-station-half-yearly"
                  Component={MaintenanceScheduleList}
                />
                <Route path="/form/officer-colony" Component={Officers} />
                <Route path="/edit/officer-colony" Component={OfficersEdit} />
                <Route path="/list/officer-colony" Component={OfficersLists} />
                <Route path="/view/officer-colony" Component={OfficersList} />
                <Route
                  path="/form/pm-station-yearly"
                  Component={EarlyMaintainSchedule}
                />
                <Route
                  path="/edit/pm-station-yearly"
                  Component={EarlyMaintainEdit}
                />
                <Route
                  path="/list/pm-station-yearly"
                  Component={EarlyMaintainScheduleLists}
                />
                <Route
                  path="/view/pm-station-yearly"
                  Component={EarlyMaintainScheduleList}
                />
                <Route
                  path="/form/inout-document"
                  Component={DocumentManagement}
                />
                <Route
                  path="/list/inout-document"
                  Component={DocumentManagementList}
                />
                <Route path="/edit/inout-document" Component={DocumentEdit} />
                <Route
                  path="/form/pm-logbook-gate-half-yearly-sdc"
                  Component={PmLogBook5}
                />
                <Route
                  path="/edit/pm-logbook-gate-half-yearly-sdc"
                  Component={PmLogBookEdit}
                />
                <Route
                  path="/list/pm-logbook-gate-half-yearly-sdc"
                  Component={PmLogBook5Lists}
                />
                <Route
                  path="/view/pm-logbook-gate-half-yearly-sdc"
                  Component={PmLogBook5List}
                />
                {/* <Route
                  path="/form/checklist-and-pm-depot"
                  Component={DailTelecomMainCheckReg}
                />
                <Route
                  path="/edit/checklist-and-pm-depot"
                  Component={DailyTelecomMainEdit}
                />
                <Route
                  path="/list/checklist-and-pm-depot"
                  Component={DailyTelecomMainLists}
                />
                <Route
                  path="/view/checklist-and-pm-depot"
                  Component={DailyTelecomMainList}
                /> */}
                <Route
                  path="/form/pm-logbook-monthly-tvm-mainline"
                  Component={PmLogBookMainline}
                />
                <Route
                  path="/edit/pm-logbook-monthly-tvm-mainline"
                  Component={PmLogMainlineEdit}
                />
                {/* <Route
                  path="/list/pm-logbook-monthly-tvm-mainline"
                  Component={PmLogBookMainlineLists}
                /> */}
                {/* <Route
                  path="/view/pm-logbook-monthly-tvm-mainline"
                  Component={PmLogBookMainlineList}
                /> */}
                <Route
                  path="/form/pm-point-maintenance-record-tpd"
                  Component={PMIRS}
                />
                <Route
                  path="/edit/pm-point-maintenance-record-tpd"
                  Component={PMIRSEdit}
                />
                <Route
                  path="/list/pm-point-maintenance-record-tpd"
                  Component={PMIRSLists}
                />
                <Route
                  path="/view/pm-point-maintenance-record-tpd"
                  Component={PMIRSList}
                />
                <Route path="/form/ekt-maintenance" Component={EKTRegister} />
                <Route path="/list/ekt-maintenance" Component={EKTLists} />
                <Route path="/view/ekt-maintenance" Component={EKTList} />
                <Route path="/edit/ekt-maintenance" Component={EKTEdit} />
                <Route path="/form/dcs-tre-maintenance" Component={DCS} />
                <Route path="/edit/dcs-tre-maintenance" Component={DCSEdit} />
                <Route path="/list/dcs-tre-maintenance" Component={DCSLists} />
                <Route path="/view/dcs-tre-maintenance" Component={DCSList} />
                <Route
                  path="/form/incident-register"
                  Component={IncidentRegisterSignals}
                />
                <Route
                  path="/list/incident-register"
                  Component={IncidentRegisterSignalsList}
                />
                <Route
                  path="/edit/incident-register"
                  Component={EditIncident}
                />
                <Route
                  path="/form/train-induction-detail-register"
                  Component={Afcgatedrill}
                />
                <Route
                  path="/list/train-induction-detail-register"
                  Component={AfcgatedrillList}
                />
                <Route
                  path="/edit/train-induction-detail-register"
                  Component={EditTraininduction}
                />
                <Route path="/form/inout-document" Component={Inout} />
                <Route path="/list/inout-document" Component={InoutList} />
                <Route path="/edit/inout-document" Component={EditInout} />
               
                
                <Route
                  path="/form/emergency-fireman-exit-drill"
                  Component={Emefiremandrill}
                />
                <Route
                  path="/list/emergency-fireman-exit-drill"
                  Component={EmefiremandrillList}
                />
                <Route
                  path="/edit/emergency-fireman-exit-drill"
                  Component={EditEmefire}
                />
                <Route
                  path="/form/daily-transaction-register-mainline-issue"
                  Component={DailyTransactionRegister_ISSUE}
                />
                <Route
                  path="/list/daily-transaction-register-mainline-issue"
                  Component={DtrIssueStoreList}
                />
                <Route
                  path="/edit/daily-transaction-register-mainline-issue"
                  Component={EditDTRIssue}
                />
                <Route
                  path="/form/agent-card-registers-sdc"
                  Component={Agentissue}
                />
                <Route
                  path="/list/agent-card-registers-sdc"
                  Component={AgentissueList}
                />
                <Route
                  path="/edit/agent-card-registers-sdc"
                  Component={EditAgentissue}
                />
                <Route
                  path="/form/pm-logbook-half-yearly-tvm-mainline"
                  Component={Checklist}
                />
                <Route
                  path="/view/pm-logbook-half-yearly-tvm-mainline"
                  Component={ChecklistListview}
                />
                <Route
                  path="/edit/pm-logbook-half-yearly-tvm-mainline"
                  Component={EditChecklist}
                />
                <Route
                  path="/list/pm-logbook-half-yearly-tvm-mainline"
                  Component={ChecklistAfc}
                />
                <Route
                  path="/form/loan-register-telecom"
                  Component={LoanregTelecom}
                />
                <Route
                  path="/list/loan-register-telecom"
                  Component={LoanregTelecomList}
                />
                <Route
                  path="/edit/loan-register-telecom"
                  Component={EditLoanregTelecom}
                />
                <Route
                  path="form/daily-transaction-register-Issue"
                  Component={DailyTransactionRegister_ISSUE}
                />
                <Route
                  path="/list/daily-transaction-register-Issue"
                  Component={DtrIssueStoreList}
                />
                <Route
                  path="/edit/daily-transaction-register-Issue"
                  Component={EditDTRIssue}
                />
                <Route
                  path="form/daily-transaction-register-telecom-issues"
                  Component={DailyTransactionRegister_ISSUE}
                />
                <Route
                  path="/list/daily-transaction-register-telecom-issues"
                  Component={DtrIssueStoreList}
                />
                <Route
                  path="/edit/daily-transaction-register-telecom-issues"
                  Component={EditDTRIssue}
                />
                <Route
                  path="/form/daily-transaction-register-receipt"
                  Component={DailyTransactionRegister_RECEIPTS}
                />
                <Route
                  path="/list/daily-transaction-register-receipt"
                  Component={DailyTransactionRegisterList_RECEIPTS}
                />
                <Route
                  path="/edit/daily-transaction-register-receipt"
                  Component={EditDailyTransactionRegister_RECEIPTS}
                />
                {/* <Route
                  path="/form/daily-transaction-register-store-receipt"
                  Component={DtrReceiptStore}
                /> */}
                <Route
                  path="/list/daily-transaction-register-store-receipt"
                  Component={DailyTransactionRegisterList_RECEIPTS}
                />
                <Route
                  path="/edit/daily-transaction-register-store-receipt"
                  Component={EditDailyTransactionRegister_RECEIPTS}
                />
                <Route
                  path="/form/daily-transaction-register-store-issue"
                  Component={DailyTransactionRegister_ISSUE}
                />
                <Route
                  path="/list/daily-transaction-register-store-issue"
                  Component={DtrIssueStoreList}
                />
                <Route
                  path="/edit/daily-transaction-register-store-issue"
                  Component={EditDTRIssue}
                />
                <Route path="/form/pm-depot-monthy" Component={Pmsheet} />
                <Route path="/view/pm-depot-monthy" Component={PmsheetList} />
                <Route path="/edit/pm-depot-monthy" Component={EditPmsheet} />
                <Route
                  path="/list/pm-depot-monthy"
                  Component={Pmloogbook_NewList}
                />
                
                <Route
                  path="/list/bio-data-register"
                  Component={BioDataRegisterView}
                />
                
                <Route path="/edit/bio-data-register" Component={BiodataRegisterEdit} />
               
                
                <Route
                  path="/edit/bio-data-register-occ"
                  Component={EditBioocc}
                />
                <Route
                  path="/form/pm-logbook-monthly-tom-mainline"
                  Component={Pmloogbook}
                />
                <Route
                  path="/view/pm-logbook-monthly-tom-mainline"
                  Component={PmloogbookList}
                />
                
                <Route
                  path="/list/pm-logbook-monthly-tom-mainline"
                  Component={Pmloogbook_NewList}
                />
                <Route
                  path="/form/false_floor_cleasing"
                  Component={UnderFalseFloorCleaning}
                />
                <Route
                  path="/view/false_floor_cleasing"
                  Component={UnderFalseFloorCleaningList}
                />
                <Route
                  path="/edit/false_floor_cleasing"
                  Component={EditFalsefloor}
                />
                <Route
                  path="/list/false_floor_cleasing"
                  Component={Falsefloor_NewList}
                />
                <Route
                  path="/list/asset-register"
                  Component={AssetregisterlistSignal}
                />
                <Route
                  path="/edit/asset-register"
                  Component={EditAssetRegister}
                />
                <Route
                  path="/edit/asset_register"
                  Component={EditAssetRegister}
                />
                <Route
                  path="/form/asset-register"
                  Component={AssetregisterSignal}
                />
                <Route
                  path="/list/asset_register"
                  Component={AssetregisterlistSignal}
                />
               
                <Route
                  path="/edit/daily-transaction-register-telecom-receipt"
                  Component={EditDailyTransactionRegister_RECEIPTS}
                />
               
                <Route path="/list/requisition" Component={RequisitionSList} />
                <Route
                  path="/edit/requisition"
                  Component={EditRequisitionSignal}
                />
                <Route
                  path="/view/requisition"
                  Component={RequisitionSlipList}
                />
                <Route
                  path="/form/requisition-sdc"
                  Component={RequisitionSignal}
                />
                <Route
                  path="/list/requisition-sdc"
                  Component={RequisitionSList}
                />
                <Route
                  path="/list/requisition-mainline"
                  Component={RequisitionSList}
                />
                <Route
                  path="/list/requisition-register"
                  Component={RequisitionSList}
                />
                <Route
                  path="/edit/requisition-sdc"
                  Component={EditRequisitionSignal}
                />
                <Route
                  path="/view/requisition-sdc"
                  Component={RequisitionSlipList}
                />
                <Route
                  path="/form/requisition-register"
                  Component={RequisitionSignal}
                />
                <Route
                  path="/view/requisition-register"
                  Component={RequisitionSlipList}
                />
                <Route
                  path="/form/requisition-mainline"
                  Component={RequisitionSignal}
                />
                 <Route
                  path="/edit/requisition-mainline"
                  Component={EditRequisitionSignal}
                />
                <Route
                  path="/view/requisition-mainline"
                  Component={RequisitionSlipList}
                />
                <Route path="/TeaCofee/register" Component={TeaCofee} />
                <Route path="/TeaCofee/list" Component={TeaCofeeList} />
                <Route path="/parameter/register" Component={Parameter} />
                <Route path="/Parameter/list" Component={ParameterList} />
                <Route path="/cardrefund/register" Component={CardRefund} />
                <Route path="/cardRefund" Component={CardRefundList} />
                <Route
                  path="/escalatordrill/register"
                  Component={EscaaltorDrill}
                />
                <Route path="/drilllist" Component={EscalatorDrillList} />
                <Route
                  path="/requisitionslip/register"
                  Component={RequisitionSlip}
                />
                <Route
                  path="/Requisition/list"
                  Component={RequisitionSlipList}
                />
                <Route path="trainid/register" Component={TrainIdRecordReg} />
                <Route path="/TrainId/list" Component={TrainIdRecordReglist} />
                <Route
                  path="/assetregister/register"
                  Component={AssetRegister}
                />
                <Route
                  path="/AssetRegister/list"
                  Component={AssetRegisterList}
                />
                <Route path="/form/css-shift-logbook" Component={CSSShiftLog} />
                <Route
                  path="/view/css-shift-logbook"
                  Component={CSSShiftLogList}
                />
                <Route
                  path="/list/css-shift-logbook"
                  Component={ListCSSShiftLog}
                />
                <Route
                  path="/edit/css-shift-logbook"
                  Component={EditCSSShiftLog}
                />
                <Route
                  path="/list/smps_sys_mntc_register"
                  Component={SMPSSYSTEMMAINTENANCERECORDList}
                />
                <Route
                  path="/view/smps_sys_mntc_register"
                  Component={SMPSSYSTEMMAINTENANCERECORDTable}
                />
                <Route
                  path="/edit/smps_sys_mntc_register"
                  Component={EditSMPSSYSTEMMAINTENANCERECORD}
                />
                <Route
                  path="/form/smps_sys_mntc_register"
                  Component={SMPSSYSTEMMAINTENANCERECORD}
                />
                <Route
                  path="/form/pm-occ-bcc-yearly"
                  Component={PMSheetoccYearly}
                />
                <Route
                  path="/list/pm-occ-bcc-yearly"
                  Component={PMSheetoccYearlyList}
                />
                <Route
                  path="/view/pm-occ-bcc-yearly"
                  Component={PMSheetoccYearlyTable}
                />
                <Route
                  path="/edit/pm-occ-bcc-yearly"
                  Component={EditPMSheetoccYearlyTable}
                />
                <Route
                  path="/edit/requisition-register"
                  Component={EditRequisitionSignal}
                />
                <Route
                  path="/form/night_afc_gate_drill"
                  Component={NightAfcGateDrill}
                />
                <Route
                  path="/list/night_afc_gate_drill"
                  Component={NightAfcGateDrillList}
                />
                <Route
                  path="/edit/night_afc_gate_drill"
                  Component={NightAfcGateDrillEdit}
                />
                <Route
                  path="/form/estimate-and-loa-budget-register"
                 Component={EstimateLOARegister}/>
                <Route
                  path="/list/estimate-and-loa-budget-register"
                  Component={EstimateLOARegisterList}
                />
                <Route
                  path="/edit/estimate-and-loa-budget-register"
                  Component={EditEstimateLOARegister}
                />
                <Route
                  path="/form/daily-checklist-mainline"
                  Component={DailycheckListMainline}
                />
                 <Route
                  path="/edit/daily-checklist-mainline"
                  Component={DailyChecklistMainlineEdit}
                />
                <Route
                  path="/list/daily-checklist-mainline"
                  Component={DailyCheckList}
                />
                <Route
                  path="/view/daily-checklist-mainline"
                  Component={DailycheckListMainlineView}
                />
                <Route
                  path="/form/ups-room-entry"
                  Component={UPS_Room_Entry_Register}
                />
                <Route
                  path="/list/ups-room-entry"
                  Component={UPS_Room_Entry_Register_List}
                />
                <Route
                  path="/edit/ups-room-entry"
                  Component={UPS_Room_entry_register_edit}
                />
                <Route path="/form/ledger-mainline" Component={LedgerForm} />
                <Route path="/list/ledger-mainline" Component={LedgerTable} />
                <Route
                  path="/list/ledger-siganalling"
                  Component={LedgerTable}
                />
                
                <Route path="/list/ledger-store" Component={LedgerTable} />
                <Route path="/form/ledger" Component={LedgerForm} />
                <Route path="/list/ledger" Component={LedgerTable} />
                <Route
                  path="/list/budget-payments-register"
                  Component={BudgetRegisterPayment}
                />
                <Route
                  path="/form/budget-payments-register"
                  Component={NewbudgetPayment}
                />
                 <Route
                  path="/edit/budget-payments-register"
                  Component={BudgetPaymentEdit}
                />
                <Route
                  path="/edit/expenditure-budget-register"
                  Component={BudgetAllotmentEdit}
                />
                <Route
                  path="/list/expenditure-budget-register"
                  Component={BudgetAllotmentList}
                />
                <Route
                  path="/form/pm-depot-half-yearly"
                  Component={HalfYearlyMaintenanceForm}
                />
                  <Route
                  path="/list/pm-depot-half-yearly"
                  Component={PmDepotHalfYearlyList}
                />
                   <Route
                  path="/view/pm-depot-half-yearly"
                  Component={PmdepotHalfyearlyTable}
                />
                  <Route
                  path="/edit/pm-depot-half-yearly"
                  Component={EditHalfYearlyMaintenance}
                />
                <Route
                  path="/form/pm-occ-bcc-quarterly"
                  Component={QuarterlyMaintenanceOccBccForm}
                />
                 <Route
                  path="/list/pm-occ-bcc-quarterly"
                  Component={PmoccbccQuarterlyData}
                />
                 <Route
                  path="/view/pm-occ-bcc-quarterly"
                  Component={PmoccbccQuarterlyList}
                />
                 <Route
                  path="/edit/pm-occ-bcc-quarterly"
                  Component={QuarterlyMaintenanceOccBccEdit}
                />
              </Routes>
              </Suspense>
            </div>
          </div>
        </>
      )}

      {!isAuthenticated && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<AddUser />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
