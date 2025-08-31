import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducer/AuthReducer";
// import IncidentRegisterSignalsReducer from "../reducer/IncidentRegisterSignalsReducer";
import FoundReceiveArtReducer from "../reducer/FoundReceiveArtReducer";
import PoliceCtdRegReducer from "../reducer/PoliceCtdRegReducer";
import LatsVduDrillReducer from "../reducer/LatsVduDrillReducer";
import FirstAidRegisterReducer from "../reducer/FirstAidRegisterReducer";
import IncidentAccidentRegReducer from "../reducer/IncidentAccidentRegReducer";
import OutstandRecRegReducer from "../reducer/OutstandRecRegReducer";
import HonorariumRegReducer from "../reducer/HonorariumRegReducer";
import ListHonorariumReducer from "../reducer/ListHonorariumReducer";
import LoanRegisterReducer from "../reducer/LoanRegisterReducer";
import TER_Entry_Reducer from "../reducer/TER_Entry_Reducer";
import AfcPreAnnexureBReducer from "../reducer/AfcPreAnnexureBReducer";
import AfcPreventReducer from "../reducer/AfcPreventReducer";
import CentCompPreReducer from "../reducer/CentCompPreReducer";
import DepotyearlyReducer from "../reducer/DepotyearlyReducer";
import PmSheetReducer from "../reducer/PmSheetReducer";
import Update_Check_List_PM_occ_bcc_Red from "../reducer/Update_Check_List_PM_occ_bcc_Red";
import GatePassReducer from "../reducer/GatePassReducer";
import ESPQuarterlyMaintananceSignalReducer from "../reducer/ESPQuarterlyMaintananceSignalReducer";
import ColorLightSignalMainlineReducer from "../reducer/ColorLightSignalMainlineReducer";
import ManualPointReducer from "../reducer/manshi/ManualPointReducer";
import PossessionReducer from "../reducer/manshi/PossesionReducer";
import EtsDrillReducer from "../reducer/manshi/EtsDrillReducer";
import MaterialDistributionReducer from "../reducer/manshi/MaterialDistributionReducer";
import In_OutReducer from "../reducer/manshi/In_OutReducer";
import ConsumableReducer from "../reducer/manshi/ConsumableReducer";
import ContractorReducer from "../reducer/manshi/ContractorReducer";
import Afc_preventionReducer from "../reducer/manshi/Afc_preventionReducer";
import SerEntryReducer from "../reducer/manshi/SerEntryReducer";
import ReplacementReducer from "../reducer/manshi/ReplacementReducer";
import LiftRescue1Reducer from "../reducer/manshi/LiftRescue1Reducer";
import LiftRescue2Reducer from "../reducer/manshi/LiftRescue2Reducer";
import HonorariumReducer from "../reducer/manshi/HonorariumReducer";
import Pmlog6Reducer from "../reducer/manshi/Pmlog6Reducer";
import PmlogMaintainReducer from "../reducer/manshi/PmlogMaintainReducer";
import DailyTelecomReducer from "../reducer/manshi/DailyTelecomReducer";
import EarthReducer from "../reducer/manshi/EarthReducer";
import ShuntReducer from "../reducer/manshi/ShuntReducer";
import Pmsheetoccbcchalfyearlyreducer from "../reducer/manshi/Pmsheetoccbcchalfyearlyreducer";
import PoliceCustodyRegReducer from "../reducer/rajiv/PoliceCustodyRegReducer";
import LiftRescueDrillReducer from "../reducer/rajiv/LiftRescueDrillReducer";
import FoundReceivedCashReducer from "../reducer/rajiv/FoundReceivedCashReducer";
import CBTTrainingReducer from "../reducer/rajiv/CBTTrainingReducer";
// import LoanRegisterReducer from "../reducer/rajiv/LoanRegisterReducer";
import imprestRegReducer from "../reducer/rajiv/ImprestRegReducer";
import SDCEntryExitReducer from "../reducer/rajiv/SDCEntryExitReducer";
import AFCMonthlyReducer from "../reducer/rajiv/AFCMonthlyReducer";
import jobCardReducer from "../reducer/rajiv/jobCardReducer";
import DailyTelecomCheckListReducer from "../reducer/rajiv/DailyTelecomCheckListReducer";
import PMsheetMonthlyReducer from "../reducer/rajiv/PMsheetMonthlyDepotReducer";
import FACPReducer from "../reducer/rajiv/FACPReducer";
import LiftRescueReducer from "../reducer/rajiv/OperationLiftRescueReducer";
import OperationStationDiaryReducer from "../reducer/rajiv/OperationStationDiaryReducer";
import PMLogBook3Reducer from "../reducer/rajiv/PMLogBook3Reducer";
import PMLogBookMainLine3Reducer from "../reducer/rajiv/PMLogBookMainLine3Reducer";
import CardInitializationReducer from "../reducer/rajiv/CardInitializationReducer";
import MJL11Reducer from "../reducer/rajiv/MJL11Reducer";
import TrainInspectionReducer from "../reducer/rajiv/QuarterlyTrainInspection";
import SMPSReducer from "../reducer/rajiv/SMPSReducer";

import FacpDrillReducer from "../reducer/satya/FacpDrillReducer";
import LatsReducer from "../reducer/satya/LatsReducer";
import EquipmentFailureRegisterReducer from "../reducer/satya/EquipmentFailureRegisterReducer";
import MonthlyCabinetRecordReducer from "../reducer/satya/MonthlyCabinetRecordReducer";
import SEREntryPageReducer from "../reducer/satya/SEREntryPageReducer";
import ShiftLogBookReducer from "../reducer/satya/ShiftLogBookReducer";
import SwUpdateRegisterReducer from "../reducer/satya/SwUpdateRegisterReducer";
import TeaCoffeeReducer from "../reducer/satya/TeaCoffeeReducer";
import TrainIdReducer from "../reducer/satya/TrainIdReducer";
import AfcPreventiveMaintenanceReducer from "../reducer/satya/AfcPreventiveMaintenanceReducer";
import PMLogBookTVMReducer from "../reducer/satya/PMLogBookTVMReducer";
import PMMainlineReducer from "../reducer/satya/PMMainlineReducer";
import CrewControlCcapReducer from "../reducer/satya/CrewControlCcapReducer";
import LabMaterialTransactionReducer from "../reducer/satya/LabMaterialTransactionReducer";
import AssuRegReducer from "../reducer/chanchal/AssuRegReducer";
import AfcGateDrillReducer from "../reducer/chanchal/AfcGateDrillReducer";
import ComRecRegReducer from "../reducer/chanchal/ComRecRegReducer";
import EquFaiRegReducer from "../reducer/chanchal/EquFaiRegReducer";
import ManPoiOpeDrillReducer from "../reducer/chanchal/ManPoiOpeDrillReducer";
import GateReducer from "../reducer/chanchal/GateReducer";
import PmFolUpReducer from "../reducer/chanchal/PmFolUpReducer";
import Pm_logbook_half_yearly_other_mainline_Reducer from "../reducer/chanchal/Pm_logbook_half_yearly_other_mainline_Reducer";
import DailyWorkReducer from "../reducer/chanchal/DailyWorkReducer";
import FailureReportReducer from "../reducer/chanchal/FailureReportReducer";
import StationDiaryReducer from "../reducer/chanchal/StationDiaryReducer";
import ClaimRegReducer from "../reducer/chanchal/ClaimRegReducer";
import LineDefectReducer from "../reducer/chanchal/LineDefectReducer";
import PASDrillReducer from "../reducer/chanchal/PASDrillReducer";
import CSCInitRegReducer from "../reducer/chanchal/CSCInitRegReducer";
import PreMainWorkReducer from "../reducer/chanchal/PreMainWorkReducer";
import MeasurementVoltageMCBinPDCReducer from "../reducer/chanchal/MeasurementVoltageMCBinPDCReducer";
// import IncidentRegisterSignalsReducer from "../reducer/satya/IncidentRegisterSignalsReducer";
// import IncidentRegisterSignalsReducer from "../reducer/pinki/IncidentRegisterSignalsReducer";
import ParameterReducer from "../reducer/pinki/ParameterReducer";
// import MaterialDistributionReducer from "../reducer/pinki/MaterialDistributionReducer";
import FMTSReducer from "../reducer/pinki/FMTSReducer";
import AxleCounterResetRegisterReducer from "../reducer/pinki/AxleCounterResetRegisterReducer";
import StockMovementRegisterReducer from "../reducer/pinki/StockMovementRegisterReducer";
import DeadStockReducer from "../reducer/pinki/DeadStockReducer";
import AtcExaminationReducer from "../reducer/pinki/AtcExaminationReducer";
import SignalFailureReducer from "../reducer/pinki/SignalFailureReducer";
import HardwareFailureReducer from "../reducer/pinki/HardwareFailureReducer";
// import ManualPointReducer from "../reducer/pinki/ManualPointReducer";
import IncidentAccidentReportReducer from "../reducer/pinki/IncidentAccidentReportReducer";
import AgentCardReducer from "../reducer/pinki/AgentCardReducer";
import ATSReducer from "../reducer/pinki/ATSReducer";
import boxcleaningoutdoor from "../reducer/pinki/BoxCleaningOutdoorReducer";
import HandingTakingNoteReducer from "../reducer/pinki/HandingTakingNoteReducer";
import PMLogBookSDCReducer from "../reducer/pinki/PMLogBookSDCReducer";
import PMsheetMonthlyDepotReducer from "../reducer/pinki/PMsheetMonthlyDepotReducer";
import AfcPreventiveReducer from "../reducer/pinki/AfcPreventiveReducer";
import LoanregReducer from "../reducer/isha/LoanregReducer";

import GrievanceReducer from "../reducer/isha/GrievanceReducer";
import FanRackReducer from "../reducer/isha/FanRackReducer";
import FilterReducer from "../reducer/isha/FilterReplacementReducer";
import ContractualSpareTestingReducer from "../reducer/isha/ContractualSpareTestingReducer";
import AxleCounterReducer from "../reducer/isha/AxleCounterReducer";
import SoftwareUpdateReducer from "../reducer/isha/DeviceApplicationSoftwareReducer";
import CSCInitializationDetailReducer from "../reducer/isha/CSCInitializationDetailRegisterReducer";
import PMLB9Reducer from "../reducer/isha/PREVENTIVEMAINTENACE_CC_CCHSReducer";
import ESPDRILLReducer from "../reducer/isha/ESPDRILLReducer";
import DARReducer from "../reducer/isha/DARReducer";
import FoundForeignCurrencyReducer from "../reducer/isha/FoundForeignCurrencyReducer";
import IncidentAccidentReducer from "../reducer/isha/IncidentAccidentRegReducer";
import LATSVDUReducer from "../reducer/isha/LATSVDUReducer";
import ControlTakenOverReducer from "../reducer/isha/ControlTakenOverReducer";
import AttendanceReducer from "../reducer/isha/AttendanceReducer";
import DailyReceiptReducer from "../reducer/isha/DailyReceiptRedeucer";
import PMLBM9REducer from "../reducer/isha/PMLBM9REducer";
import AFCPREVENTIVEMAINTENANCEHalfYearly from "../reducer/isha/AFCHALFMONTLYReducer";
import IncidentRegisterSignalsReducer from "../reducer/monika/IncidentRegisterSignalsReducer";
import EscalatorReducer from "../reducer/monika/EscalatorReducer";
import HandoverrecordReducer from "../reducer/monika/HandoverrecordReducer";
import peetyrepairReducer from "../reducer/monika/peetyrepairReducer";
// import LineDefectReducer from "../reducer/monika/LineDefectReducer";
import LibraryBookReducer from "../reducer/monika/LibraryBookReducer";
import InspactionReducer from "../reducer/monika/InspactionReducer";
import DailycheckReducer from "../reducer/monika/DailycheckReducer";
import HandlingRegisterReducer from "../reducer/monika/HandlingRegisterReducer";
import MaintenanceReducer from "../reducer/monika/MaintenanceReducer";
import OfficerReducer from "../reducer/monika/OfficerReducer";
import EarlyReducer from "../reducer/monika/EarlyReducer";
import DocumentManagementReducer from "../reducer/monika/DocumentManagementReducer";
// import FirstAidRegisterReducer from "../reducer/monika/FirstAidRegisterReducer";
import PmLogBookReducer from "../reducer/monika/PmLogBookReducer";
import DailyTelecomMainReducer from "../reducer/monika/DailyTelecomMainReducer";
// import FmtSectionReducer from "../reducer/monika/FmtSectionReducer";
import PmLogBookMainlineReducer from "../reducer/monika/PmLogBookMainlineReducer";
import DCSReducer from "../reducer/monika/DCSReducer";
import PMIRSReducer from "../reducer/monika/PMIRSReducer";
import EKTReducer from "../reducer/monika/EKTReducer";
// import IncidentRegisterSignalsReducer from "../reducer/akshra/IncidentRegisterSignalsReducer";
// import AfcGateDrillReducer from "../reducer/akshra/AfcGateDrillReducer";

import TsrrReducer from "../reducer/akshra/TsrrReducer";
import EmefiremandrillReducer from "../reducer/akshra/EmefiremandrillReducer";
import DtrregReducer from "../reducer/akshra/DtrregReducer";

import AgentissueReducer from "../reducer/akshra/AgentissueReducer";
import ChecklistReducer from "../reducer/akshra/ChecklistReducer";
import LoanregTelecomReducer from "../reducer/akshra/LoanregTelecomReducer";

import DtrleftsideReducer from "../reducer/akshra/DtrleftsideReducer";
import DtrsignalsissueReducer from "../reducer/akshra/DtrsignalsissueReducer";
import DtrsignalsreceiptsReducer from "../reducer/akshra/DtrsignalsreceiptsReducer";

import DtrReceiptStoreReducer from "../reducer/store/DtrReceiptStoreReducer";
import DtrIssueStoreReducer from "../reducer/store/DtrIssueStoreReducer";
import PmsheetReducer from "../reducer/akshra/PmsheetReducer";
import BiodataRegReducer from "../reducer/akshra/BiodataRegReducer";
import BiodataoccReducer from "../reducer/akshra/BiodataoccReducer";

import PmloogbookReducer from "../reducer/akshra/PmloogbookReducer";
import InoutReducer from "../reducer/akshra/InoutReducer";
import FalsefloorReducer from "../reducer/akshra/FalsefloorReducer";
import AssetregistersignalReducer from "../reducer/store/AssetregistersignalReducer";
import RequisitionReducer from "../reducer/store/RequisitionReducer";
import TeaCofeesReducer from "../reducer/store/TeaCofeesReducer";
// import ParameterReducer from "../reducer/store/ParameterReducer";
import CardRefundReducer from "../reducer/store/CardRefundReducer";
import EscalatorDrillReducer from "../reducer/store/EscalatorDrillReducer";

import RequisitionSlipReducer from "../reducer/store/RequisitionSlipReducer";
import TrainIdRecordRegReducer from "../reducer/store/TrainIdRecordRegReducer";
import AssetRegisterReducer from "../reducer/store/AssetRegisterReducer";
import CSSShiftLogReducer from "../reducer/satya/CSSShiftLogReducer";
import smpsSystem from "../reducer/isha/SMPSSYSTEMMAINTENANCERECORDReducer";
import pm8 from "../reducer/isha/PM8reducer";
import NightAfcGateDrill from "../reducer/store/NightAfcGateDrillReducer";
import EstimateLOA from "../reducer/isha/EstimateLOAReducer";
import UPSRoomEntryReducer from "../reducer/UPSRoomEntryRegReducer";
import LedgerReducer from "../reducer/store/LedgerReducer";
import BudgetRegisterPaymentReducer from "../reducer/store/BudgetRegisterPaymentReducer";
import BudgetAllotmentReducer from "../reducer/store/BudgetAllotmentReducer";
import tableDataReducer from "../reducer/redux/tableDataSlice";
import MonthlyMaintenanceScheduleReducer from "../reducer/satya/MonthlyMaintenanceScheduleReducer";
import BoxCleaningRecordReducer from "../reducer/satya/BoxCleaningRecordReducer";
import ActivityLogReducer from "../reducer/store/ActivityLogReducer";
import DailyIssueReducer from "../reducer/store/DailyIssueReducer";
import RedirectReducer from "../reducer/RedirectReducer";
import StationEarningReducer from "../reducer/store/StationEarningReducer"
import HalfYearlyMaintenanceFormReducer from "../reducer/store/HalfYearlyMaintenanceFormReducer"

const store = configureStore({
  reducer: {
    activitylog: ActivityLogReducer,
    data: tableDataReducer,
    schedule: MonthlyMaintenanceScheduleReducer,
    auth: AuthReducer,
    redirect: RedirectReducer,
    estimateloa: EstimateLOA,
    stationearning:StationEarningReducer,
    pmdepothalfyearly:HalfYearlyMaintenanceFormReducer,
    budgetallotment: BudgetAllotmentReducer,
    budgetpayment: BudgetRegisterPaymentReducer,
    ledger: LedgerReducer,
    dailyissue: DailyIssueReducer,
    upsroomentry: UPSRoomEntryReducer,
    smpssystem: smpsSystem,
    nightafcgate: NightAfcGateDrill,
    pmoccbcc: pm8,
    csslog: CSSShiftLogReducer,
    assetregister: AssetregistersignalReducer,
    requisition: RequisitionReducer,
    dtrissue: DtrIssueStoreReducer,
    dtrreceipt: DtrReceiptStoreReducer,
    incidentsignalsMain: IncidentRegisterSignalsReducer,
    foundrcvartstate: FoundReceiveArtReducer,
    signallightstate: ColorLightSignalMainlineReducer,
    espquarterlystate: ESPQuarterlyMaintananceSignalReducer,
    policectdstate: PoliceCtdRegReducer,
    latsvdudrillstate: LatsVduDrillReducer,
    firstaidstore: FirstAidRegisterReducer,
    inacregstore: IncidentAccidentRegReducer,
    outstandrecstore: OutstandRecRegReducer,
    honoriumstore: HonorariumRegReducer,
    listhonoriumstore: ListHonorariumReducer,
    loanregisterstore: LoanRegisterReducer,
    terentrystate: TER_Entry_Reducer,
    gatepassstore: GatePassReducer,

    afcpreventchkformstate: AfcPreventReducer,
    deportstate: DepotyearlyReducer,
    pmsheetstate: PmSheetReducer,
    updatepmoccbcc: Update_Check_List_PM_occ_bcc_Red,
    afcannexurestate: AfcPreAnnexureBReducer,
    centcompstate: CentCompPreReducer,
    manualdrill: ManualPointReducer,
    possession: PossessionReducer,
    ets: EtsDrillReducer,
    mater: MaterialDistributionReducer,
    inout: In_OutReducer,
    consume: ConsumableReducer,
    contract: ContractorReducer,
    afc: Afc_preventionReducer,
    Ser: SerEntryReducer,
    Rep: ReplacementReducer,
    pmsheetoccbcc: Pmsheetoccbcchalfyearlyreducer,

    Lift1: LiftRescue1Reducer,
    Lift2: LiftRescue2Reducer,

    Hono: HonorariumReducer,
    Pmlog6: Pmlog6Reducer,
    PmlogMaintain: PmlogMaintainReducer,
    DailyTelecomManshi: DailyTelecomReducer,
    Earth: EarthReducer,
    Shunt: ShuntReducer,
    policeCustodyReg: PoliceCustodyRegReducer,
    liftRescueDrill: LiftRescueDrillReducer,
    foundReceivedCash: FoundReceivedCashReducer,
    cbtTraining: CBTTrainingReducer,
    loanRegister: LoanRegisterReducer,
    imprestRegister: imprestRegReducer,
    sdcEntryExit: SDCEntryExitReducer,
    afcMonthly: AFCMonthlyReducer,
    jobCard: jobCardReducer,
    dailyTelecomCheckList: DailyTelecomCheckListReducer,
    PMsheetMonthly: PMsheetMonthlyReducer,
    FACPRegister: FACPReducer,
    LiftRescue: LiftRescueReducer,
    OperationStationDiary: OperationStationDiaryReducer,
    PMLogBook3: PMLogBook3Reducer,
    PMLogBookMainLine3: PMLogBookMainLine3Reducer,
    CardInitialization: CardInitializationReducer,
    MJL11: MJL11Reducer,
    TrainInspection: TrainInspectionReducer,
    SMPS: SMPSReducer,

    boxcleaningRecord: BoxCleaningRecordReducer,
    facp: FacpDrillReducer,
    vdu: LatsReducer,
    equipmentregister: EquipmentFailureRegisterReducer,
    monthlyrecord: MonthlyCabinetRecordReducer,
    SERpage: SEREntryPageReducer,
    shiftbook: ShiftLogBookReducer,
    swregister: SwUpdateRegisterReducer,
    coffee: TeaCoffeeReducer,
    train: TrainIdReducer,
    afcmaintenance: AfcPreventiveMaintenanceReducer,
    book: PMLogBookTVMReducer,
    mainline: PMMainlineReducer,
    crewccap: CrewControlCcapReducer,
    labmaterial: LabMaterialTransactionReducer,
    incidentsignalsChanchal: IncidentRegisterSignalsReducer,
    assuReg: AssuRegReducer,
    afcGateDrill: AfcGateDrillReducer,
    comRecReg: ComRecRegReducer,
    equFaiReg: EquFaiRegReducer,
    manPoiOpeDrill: ManPoiOpeDrillReducer,
    gate: GateReducer,
    pmFolUp: PmFolUpReducer,
    checklist: Pm_logbook_half_yearly_other_mainline_Reducer,
    dailyWork: DailyWorkReducer,
    failureReport: FailureReportReducer,
    stationDiary: StationDiaryReducer,
    claimReg: ClaimRegReducer,
    lineDefect: LineDefectReducer,
    pASDrill: PASDrillReducer,
    cSCInitReg: CSCInitRegReducer,
    preMainWork: PreMainWorkReducer,
    MCBinPDC: MeasurementVoltageMCBinPDCReducer,
    incidentsignalsSatya: IncidentRegisterSignalsReducer,
    parameter: ParameterReducer,
    materialdistribution: MaterialDistributionReducer,
    fmtsbook: FMTSReducer,
    axlecounter: AxleCounterResetRegisterReducer,
    stockmovement: StockMovementRegisterReducer,
    deadstock: DeadStockReducer,
    agentcard: AgentCardReducer,
    afcpreventive: AfcPreventiveReducer,
    atcexamination: AtcExaminationReducer,
    signalfailure: SignalFailureReducer,
    hardwarefailure: HardwareFailureReducer,
    pmsheetmonthly: PMsheetMonthlyDepotReducer,
    manualpoint: ManualPointReducer,
    // materialdistribution: MaterialDistributionReducer,
    incidentaccidentreport: IncidentAccidentReportReducer,
    handingtakingnote: HandingTakingNoteReducer,
    pmlogbook: PMLogBookSDCReducer,
    // stocktoken: StockMovementTokenReducer,
    atshalfyearly: ATSReducer,
    boxcleaningOutdoor: boxcleaningoutdoor,
    boxindoor: BoxCleaningRecordReducer,
    Loanregister: LoanregReducer,
    grievance: GrievanceReducer,
    Fan: FanRackReducer,
    Filter: FilterReducer,
    ContractualSpare: ContractualSpareTestingReducer,
    addAxleCounter: AxleCounterReducer,
    Softwareupdate: SoftwareUpdateReducer,
    CSCInitializationDetail: CSCInitializationDetailReducer,
    PMLOGBOOK9: PMLB9Reducer,
    espdrill: ESPDRILLReducer,
    Dar: DARReducer,
    Foundforeigncurrency: FoundForeignCurrencyReducer,
    Incidentaccident: IncidentAccidentReducer,
    Latsvdu: LATSVDUReducer,
    Controltakenover: ControlTakenOverReducer,
    attendance: AttendanceReducer,
    daliyreceipt: DailyReceiptReducer,
    AFCPREVENTIVEMAINTENANCECHECKLIST: AFCPREVENTIVEMAINTENANCEHalfYearly,
    PMbm9: PMLBM9REducer,
    incidentsignalsIsha: IncidentRegisterSignalsReducer,
    Escalator: EscalatorReducer,
    handover: HandoverrecordReducer,
    peetyrepairregister: peetyrepairReducer,
    Linedefect: LineDefectReducer,
    LibraryBook: LibraryBookReducer,
    InspactionRegister: InspactionReducer,
    // FmtSection: FmtSectionReducer,
    Dailycheck: DailycheckReducer,
    handlingRegister: HandlingRegisterReducer,
    Maintenance: MaintenanceReducer,
    Officers: OfficerReducer,
    EarlyMaintain: EarlyReducer,
    Document: DocumentManagementReducer,
    FirstAid: FirstAidRegisterReducer,
    PmLogBook: PmLogBookReducer,
    DailyTelecomMain: DailyTelecomMainReducer,
    PMbookMainline: PmLogBookMainlineReducer,
    DCS: DCSReducer,
    PMIRS: PMIRSReducer,
    EKTRegister: EKTReducer,
    incidentsignalsCommon: IncidentRegisterSignalsReducer,
    afcdrill: AfcGateDrillReducer,
    inoutreg: InoutReducer,
    tsrrr: TsrrReducer,
    emedrill: EmefiremandrillReducer,
    dtr: DtrregReducer,
    agent: AgentissueReducer,
    checkk: ChecklistReducer,
    loan: LoanregTelecomReducer,
    dtrle: DtrleftsideReducer,
    dtrsi: DtrsignalsissueReducer,
    dtrrec: DtrsignalsreceiptsReducer,
    PmsheetMonthly: PmsheetReducer,
    bioreg: BiodataRegReducer,
    bioocc: BiodataoccReducer,

    logbook: PmloogbookReducer,
    falsefloor: FalsefloorReducer,
    teacofee: TeaCofeesReducer,
    parameterStore: ParameterReducer,
    cardrefund: CardRefundReducer,
    escdrill: EscalatorDrillReducer,

    trainid: TrainIdRecordRegReducer,
    assetregistern: AssetRegisterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for actions with non-serializable data (optional)
    }),
});

export default store;
