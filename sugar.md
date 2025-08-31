set NODE_OPTIONS=--max_old_space_size=8192

https://docs.google.com/spreadsheets/d/1McxtVYzzu0SJ_Q6zrOEX1N89XcGcaDoTfhIKVVXOKCA/edit?gid=1557881002#gid=1557881002

curl --location 'https://uat-nsws-mnstrportal.investindia.gov.in/nsws_license/saveP2Data' \
--header 'access-id: SaveP2Data' \
--header 'access-secret: SaveP2Data#0605_NSWS@1252' \
--header 'api-key: SaveP2Data#0605@AK1161' \
--header 'Content-Type: application/json' \
--header 'Cookie: JSESSIONID=87C2405550A874E21D02299E47E6A504' \
--data '[
{
"approvalId": "M009_D001_A076",
"swsId": "SW3795947361",
"projectNumber": "P_11",
"forms": [
{
"name": "P2 Form (Directorate of Sugar)",
"sections": [
{
"sectionName": "Form applied for -",
"fieldResponses": [
{
"fieldName": "Sugar Season",
"inputValue": "2023-24"
},
{
"fieldName": "Month",
"inputValue": "October"
}
]
},
{
"sectionName": "Sugar Mill Details",
"fieldResponses": [
{
"fieldName": "Name of the Undertaking/Group",
"inputValue": "bkrlpwicpk"
},
{
"fieldName": "Plant Name",
"inputValue": "ZIRA"
},
{
"fieldName": "Plant Code",
"inputValue": "102"
},
{
"fieldName": "State",
"inputValue": "ANDAMAN AND NICOBAR ISLANDS"
}
]
},
{
"sectionName": "Cane Crushed",
"fieldResponses": [
{
"fieldName": "Capacity (In TCD for sugar mills/Tons Per Day (TPD) for refineries)",
"inputValue": "100"
},
{
"fieldName": "Cane Crushed - During the Month (MT)",
"inputValue": "1000"
}
]
},
{
"sectionName": "Production of white / refined / Raw Sugar from Domestic sources",
"fieldResponses": [
{
"fieldName": "Select",
"inputValue": "[\"2(I) White / Refined Sugar\",\"2(II) Raw Sugar\",\"2(III) Procured sugar\",\"3(1) Diversion/sale of B-heavy/Syrup/sugarcane juice/sugar\",\"3(2) Ethanol Production\"]"
},
{
"fieldName": "2(I) White / Refined Sugar",
"subFields": [
{
"fieldName": "a) From Cane - During the Month (MT)",
"inputValue": "20"
},
{
"fieldName": "b) From Reprocessing unmarketable old Sugar - During the Month (MT)",
"inputValue": "7"
},
{
"fieldName": "c) From raw procured from other domestic sugar mills - During the Month (MT)",
"inputValue": "10"
},
{
"fieldName": "c(1) From transferred white sugar from other domestic sugar mills - During the Month (MT)",
"inputValue": "20"
},
{
"fieldName": "c(2) From Raw Sugar used from own Stock - During the Month (MT)",
"inputValue": "8"
},
{
"fieldName": "c(3) White sugar produced from own stock of raw sugar - During the Month (MT)",
"inputValue": "20"
}
]
},
{
"fieldName": "2(II) Raw Sugar",
"subFields": [
{
"fieldName": "a) From Cane - During the Month (MT)",
"inputValue": "10"
},
{
"fieldName": "b) From Reprocessing unmarketable old Sugar - During the Month (MT)",
"inputValue": "10"
},
{
"fieldName": "c) Raw sugar procured from other domestic sugar mills",
"inputValue": "10"
}
]
},
{
"fieldName": "2(III) Procured sugar",
"subFields": [
{
"fieldName": "a) Raw Sugar - Internal transfer from other group sugar mills - During the Month (MT)",
"inputValue": "10"
},
{
"fieldName": "Internal transfer - Plant Code",
"inputValue": "101"
},
{
"fieldName": "Internal transfer - Plant Name",
"inputValue": "GURDASPUR"
},
{
"fieldName": "b) From Imported Raw Sugar - During the Month (MT)",
"inputValue": "10"
}
]
},
{
"fieldName": "3(1) Diversion/sale of B-heavy/Syrup/sugarcane juice/sugar",
"subFields": [
{
"fieldName": "(i).a. Qty of Syrup/Sugarcane Juice/Sugar diverted for ethanol - During the Month (in MT)",
"inputValue": "10"
},
{
"fieldName": "(ii).a. Qty of B-Heavy diverted for ethanol - During the Month (MT)",
"inputValue": "20"
},
{
"fieldName": "(iii).a. Qty of C-Heavy diverted for ethanol - During the Month (MT)",
"inputValue": "11"
},
{
"fieldName": "(iv) Sale of B-Heavy - During the Month (MT)",
"inputValue": "12"
},
{
"fieldName": "(v) Sale of Syrup/Sugarcane Juice/Sugar - During the Month (MT)",
"inputValue": "13"
},
{
"fieldName": "(vi) Sale of C-Heavy - During the Month (MT)",
"inputValue": "14"
}
]
},
{
"fieldName": "3(2) Ethanol Production",
"subFields": [
{
"fieldName": "(i).b. Ethanol Production from In-house Syrup/Sugarcane Juice/Sugar - During the Month (in KL)",
"inputValue": "11"
},
{
"fieldName": "(ii).b. Ethanol Production from In-house B-Heavy - During the Month (in KL)",
"inputValue": "12"
},
{
"fieldName": "(iii).b. Ethanol Production from In-house C-Heavy - During the Month (in KL)",
"inputValue": "13"
}
]
},
{
"fieldName": "4. Recovery % age",
"subFields": [
{
"fieldName": "4 (i) Purity of Mixed Juice (Monthly Average) - During Month (in MT)",
"inputValue": "40"
},
{
"fieldName": "4 (ii) Pol in Mixed Juice % Cane (Monthly Average) - During the Month (in MT)",
"inputValue": "12"
}
]
}
]
},
{
"sectionName": "Dispatches",
"fieldResponses": [
{
"fieldName": "Select",
"inputValue": "[\"6.1.1 Domestic Dispatch w.r.t. monthly release quantity\",\"6.1.2 Domestic Dispatch w.r.t. additional allotment, if any\",\"6.1.3 Domestic Dispatch w.r.t. extended quota\",\"6.1.4 Any other domestic Dispatch\",\"6.2 BISS Dispatch of unmarketable old Sugar for further processing\",\"6.3 Internal transfer of raw sugar within a group\",\"6.4 Internal transfer of white sugar within a group\",\"6.5 Sale of raw sugar to other sugar mills for domestic purpose\"]"
},
{
"fieldName": "6.1.1 Domestic Dispatch w.r.t. monthly release quantity",
"subFields": [
{
"fieldName": "Release Order - Date",
"inputValue": "01/01/2024"
},
{
"fieldName": "Release order - Qty Released (MT)",
"inputValue": "120"
},
{
"fieldName": "Qty Dispatched - During the Month (MT)",
"inputValue": "100"
},
{
"fieldName": "Remarks",
"inputValue": "GHFJHGJHG"
}
]
},
{
"fieldName": "6.1.2 Domestic Dispatch w.r.t. additional allotment, if any",
"subFields": [
{
"fieldName": "Release Order - Date",
"inputValue": "23/09/2023"
},
{
"fieldName": "Release order - Qty Released (MT)",
"inputValue": "100"
},
{
"fieldName": "Qty Dispatched - During the Month (MT)",
"inputValue": "90"
},
{
"fieldName": "Remarks",
"inputValue": "GFBVCV"
}
]
},
{
"fieldName": "6.1.3 Domestic Dispatch w.r.t. extended quota",
"subFields": [
{
"fieldName": "Release Order - Date",
"inputValue": "09/01/2024"
},
{
"fieldName": "Release order - Qty Released (MT)",
"inputValue": "210"
},
{
"fieldName": "Qty Dispatched - During the Month (MT)",
"inputValue": "200"
},
{
"fieldName": "Remarks",
"inputValue": "UKJHKJHKJ"
}
]
},
{
"fieldName": "6.1.4 Any other domestic Dispatch",
"subFields": [
{
"fieldName": "Release Order - Date",
"inputValue": "08/01/2024"
},
{
"fieldName": "Release order - Qty Released (MT)",
"inputValue": "56"
},
{
"fieldName": "Qty Dispatched - During the Month (MT)",
"inputValue": "34"
},
{
"fieldName": "Remarks",
"inputValue": "HVNVNB"
}
]
},
{
"fieldName": "6.2 BISS Dispatch of unmarketable old Sugar for further processing",
"subFields": [
{
"fieldName": "Release Order - Date",
"inputValue": "17/01/2024"
},
{
"fieldName": "Qty Used for reprocessing - During the Month (MT)",
"inputValue": "100"
}
]
},
[
{
"fieldName": "6.3 Internal transfer of raw sugar within a group",
"serialNumber": "1",
"subFields": [
{
"fieldName": "Plant code of sugar mill to which sugar transferred",
"inputValue": "101"
},
{
"fieldName": "Qty Transferred to other mills - During the Month (MT)",
"inputValue": "10"
}
]
},
{
"fieldName": "6.3 Internal transfer of raw sugar within a group",
"serialNumber": "2",
"subFields": [
{
"fieldName": "Plant code of sugar mill to which sugar transferred",
"inputValue": "102"
},
{
"fieldName": "Qty Transferred to other mills - During the Month (MT)",
"inputValue": "20"
}
]
},
{
"fieldName": "6.3 Internal transfer of raw sugar within a group",
"serialNumber": "3",
"subFields": [
{
"fieldName": "Plant code of sugar mill to which sugar transferred",
"inputValue": "103"
},
{
"fieldName": "Qty Transferred to other mills - During the Month (MT)",
"inputValue": "30"
}
]
}
],
[
{
"fieldName": "6.4 Internal transfer of white sugar within a group",
"serialNumber": "1",
"subFields": [
{
"fieldName": "Plant code of sugar mill to which sugar transferred",
"inputValue": "201"
},
{
"fieldName": "Qty Transferred to other mills - During the Month (MT)",
"inputValue": "10"
}
]
},
{
"fieldName": "6.4 Internal transfer of white sugar within a group",
"serialNumber": "2",
"subFields": [
{
"fieldName": "Plant code of sugar mill to which sugar transferred",
"inputValue": "202"
},
{
"fieldName": "Qty Transferred to other mills - During the Month (MT)",
"inputValue": "20"
}
]
},
{
"fieldName": "6.4 Internal transfer of white sugar within a group",
"serialNumber": "3",
"subFields": [
{
"fieldName": "Plant code of sugar mill to which sugar transferred",
"inputValue": "203"
},
{
"fieldName": "Qty Transferred to other mills - During the Month (MT)",
"inputValue": "30"
}
]
}
],
[
{
"fieldName": "6.5 Sale of raw sugar to other sugar mills for domestic purpose",
"serialNumber": "1",
"subFields": [
{
"fieldName": "Plant code of sugar mill to which sugar transferred",
"inputValue": "301"
},
{
"fieldName": "Qty Transferred to other mills - During the Month (MT)",
"inputValue": "10"
}
]
},
{
"fieldName": "6.5 Sale of raw sugar to other sugar mills for domestic purpose",
"serialNumber": "2",
"subFields": [
{
"fieldName": "Plant code of sugar mill to which sugar transferred",
"inputValue": "302"
},
{
"fieldName": "Qty Transferred to other mills - During the Month (MT)",
"inputValue": "20"
}
]
},
{
"fieldName": "6.5 Sale of raw sugar to other sugar mills for domestic purpose",
"serialNumber": "3",
"subFields": [
{
"fieldName": "Plant code of sugar mill to which sugar transferred",
"inputValue": "303"
},
{
"fieldName": "Qty Transferred to other mills - During the Month (MT)",
"inputValue": "30"
}
]
}
],
{
"fieldName": "HSN code and related details",
"subFields": [
{
"fieldName": "Total Quantity of Sales (in MT) for HSN Code - 17011490",
"inputValue": "100"
},
{
"fieldName": "Total Quantity of Sales (in MT) for HSN Code - 17019990",
"inputValue": "40"
},
{
"fieldName": "Total Quantity of Sales (in MT) for HSN Code - Others",
"inputValue": "40"
}
]
}
]
},
{
"sectionName": "Export",
"fieldResponses": [
{
"fieldName": "Select",
"inputValue": "[\"6.6 (a) Export under OGL/Export Quota- (i) White/ refined Sugar\",\"6.6 (a) Export under OGL- (ii) Raw Sugar (including SEZ refinery)\",\"6.6 (a) Export under OGL- (iii) Raw Sugar Sold to Refineries for Export by Invoice\",\"6.6 (b) Export under AAS (White Sugar)\"]"
},
{
"fieldName": "6.6 (a) Export under OGL/Export Quota- (i) White/ refined Sugar",
"subFields": [
{
"fieldName": "Release Order (if applicable) - No.",
"inputValue": "56765"
},
{
"fieldName": "Release Order (if applicable) - Date",
"inputValue": "14/01/2024"
},
{
"fieldName": "Release Order (if applicable) - Qty released (MT)",
"inputValue": "100"
},
{
"fieldName": "Qty Dispatched - During the Month (MT)",
"inputValue": "80"
}
]
},
{
"fieldName": "6.6 (a) Export under OGL- (ii) Raw Sugar (including SEZ refinery)",
"subFields": [
{
"fieldName": "Release Order (if applicable) - No.",
"inputValue": "6876"
},
{
"fieldName": "Release Order (if applicable) - Date",
"inputValue": "15/01/2024"
},
{
"fieldName": "Release Order (if applicable) - Qty released (MT)",
"inputValue": "67"
},
{
"fieldName": "Qty Dispatched - During the Month (MT)",
"inputValue": "56"
}
]
},
{
"fieldName": "6.6 (a) Export under OGL- (iii) Raw Sugar Sold to Refineries for Export by Invoice",
"subFields": [
{
"fieldName": "Release Order (if applicable) - No.",
"inputValue": "657687"
},
{
"fieldName": "Release Order (if applicable) - Date",
"inputValue": "17/01/2024"
},
{
"fieldName": "Qty Dispatched - During the Month (MT)",
"inputValue": "67"
},
{
"fieldName": "Name of mill/refinery to whom sold",
"inputValue": "HGJHKHJHK"
}
]
},
{
"fieldName": "6.6 (b) Export under AAS (White Sugar)",
"subFields": [
{
"fieldName": "Export Order (if applicable) - No.",
"inputValue": "687876"
},
{
"fieldName": "Export Order (if applicable) - Date",
"inputValue": "21/01/2024"
},
{
"fieldName": "Export Order (if applicable) - Qty released",
"inputValue": "90"
},
{
"fieldName": "Qty Received - During the Month (MT)",
"inputValue": "23"
}
]
}
]
},
{
"sectionName": "Import",
"fieldResponses": [
{
"fieldName": "Is there any import applicable?",
"inputValue": "Yes"
},
{
"fieldName": "6.7 (a) Import under OGL â€“ (i) White/refined Sugar - Qty Received - During the Month (MT)",
"inputValue": "20"
},
{
"fieldName": "6.7 (a) Import under OGL â€“ (ii) Raw Sugar - Qty Received - During the Month (MT)",
"inputValue": "10"
},
{
"fieldName": "6.7 (b) Import under AAS - Qty Received - During the Month (MT)",
"inputValue": "5"
}
]
},
{
"sectionName": "Stock of Sugar (In MT)",
"fieldResponses": [
{
"fieldName": "Factory Premises - White Sugar",
"subFields": [
{
"fieldName": "Opening Stock",
"inputValue": "500"
}
]
},
{
"fieldName": "Factory Premises - BISS / Brown Sugar, If any",
"subFields": [
{
"fieldName": "Opening Stock",
"inputValue": "41"
},
{
"fieldName": "Closing Stock",
"inputValue": "20"
}
]
},
{
"fieldName": "Factory Premises - Raw Sugar",
"subFields": [
{
"fieldName": "Opening Stock",
"inputValue": "255"
}
]
},
{
"fieldName": "Outside Godown (Duty paid) - White Sugar",
"subFields": [
{
"fieldName": "Opening Stock",
"inputValue": "1"
},
{
"fieldName": "Closing Stock",
"inputValue": "1"
}
]
},
{
"fieldName": "Outside Godown (Duty paid) - BISS / Brown Sugar, If any",
"subFields": [
{
"fieldName": "Opening Stock",
"inputValue": "1"
},
{
"fieldName": "Closing Stock",
"inputValue": "1"
}
]
},
{
"fieldName": "Outside Godown (Duty paid) - Raw Sugar",
"subFields": [
{
"fieldName": "Opening Stock",
"inputValue": "1"
},
{
"fieldName": "Closing Stock",
"inputValue": "1"
}
]
}
]
},
{
"sectionName": "Packing details of Sugar (In MT)",
"fieldResponses": [
{
"fieldName": "50 Kg Jute Bag - Qty in MT",
"inputValue": "78"
},
{
"fieldName": "100 Kg Jute Bag - Qty in MT",
"inputValue": "11"
},
{
"fieldName": "50 Kg PP/HDPE Bag - Qty in MT",
"inputValue": "10"
},
{
"fieldName": "Other Retail Bags (<= 25 Kg and > 100 Kg)/ Loose Sugar - Qty in MT",
"inputValue": "1"
}
]
},
{
"sectionName": "Cane Dues Data",
"fieldResponses": [
{
"fieldName": "Sugar Season - 2023-24",
"subFields": [
{
"fieldName": "Cane Price Payable (in Rs Cr) - During the Month",
"inputValue": "200"
},
{
"fieldName": "Cane Price Paid (in Rs Cr) - During the Month",
"inputValue": "90"
},
{
"fieldName": "No. of farmers from which cane procured - During the Month",
"inputValue": "0"
}
]
},
{
"fieldName": "Sugar Season - 2022-23",
"subFields": [
{
"fieldName": "Cane Crushed",
"inputValue": "1"
},
{
"fieldName": "Sugar Production (in MT)",
"inputValue": "1"
},
{
"fieldName": "Sugar Recovery",
"inputValue": "1"
},
{
"fieldName": "Cane Price Payable (in Rs Cr) - During the Sugar Season",
"inputValue": "46"
},
{
"fieldName": "Cane Price Paid (in Rs Cr) - During the Month",
"inputValue": "0"
},
{
"fieldName": "No. of farmers from which cane procured - During the Month",
"inputValue": "0"
}
]
},
{
"fieldName": "Sugar Season - 2021-22",
"subFields": [
{
"fieldName": "Cane Crushed",
"inputValue": "3"
},
{
"fieldName": "Sugar Production (in MT)",
"inputValue": "4"
},
{
"fieldName": "Sugar Recovery",
"inputValue": "5"
},
{
"fieldName": "Cane Price Payable (in Rs Cr) - During the Sugar Season",
"inputValue": "51"
},
{
"fieldName": "Cane Price Paid (in Rs Cr) - During the Month",
"inputValue": "0"
},
{
"fieldName": "No. of farmers from which cane procured",
"inputValue": "53"
}
]
},
{
"fieldName": "Sugar Season - 2020-21",
"subFields": [
{
"fieldName": "Cane Crushed",
"inputValue": "1"
},
{
"fieldName": "Sugar Production (in MT)",
"inputValue": "2"
},
{
"fieldName": "Sugar Recovery",
"inputValue": "3"
},
{
"fieldName": "Cane Price Payable (in Rs Cr) - During the Sugar Season",
"inputValue": "57"
},
{
"fieldName": "Cane Price Paid (in Rs Cr) - During the Month",
"inputValue": "0"
},
{
"fieldName": "No. of farmers from which cane procured",
"inputValue": "59"
}
]
},
{
"fieldName": "Sugar Season - 2019-20",
"subFields": [
{
"fieldName": "Cane Crushed",
"inputValue": "5"
},
{
"fieldName": "Sugar Production (in MT)",
"inputValue": "6"
},
{
"fieldName": "Sugar Recovery",
"inputValue": "7"
},
{
"fieldName": "Cane Price Payable (in Rs Cr) - During the Sugar Season",
"inputValue": "63"
},
{
"fieldName": "Cane Price Paid (in Rs Cr) - During the Month",
"inputValue": "0"
},
{
"fieldName": "No. of farmers from which cane procured",
"inputValue": "65"
}
]
}
]
}
]
}
]
}
]'
