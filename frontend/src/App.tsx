import { Routes, Route } from "react-router-dom";
// import ViewAllMgnregaDetails from "./pages/view";
import DetailView from "./pages/details";
import { StateSelection } from "./pages/StateSelection";
import DistrictSelection from "./pages/DistrictSelection";
import ViewAllMgnregaDetails from "./pages/view";



function App() {
  return (
    <Routes>
      <Route path="/" element={<StateSelection />} />
      <Route path="/view" element={<ViewAllMgnregaDetails />} />
      <Route path="/districts" element={<DistrictSelection />} />
      <Route path="/details" element={<DetailView record={        {
            "fin_year": "2023-2024",
            "month": "Dec",
            "state_code": "35",
            "state_name": "UTTARAKHAND",
            "district_code": "3510",
            "district_name": "CHAMPAWAT",
            "Approved_Labour_Budget": "568311",
            "Average_Wage_rate_per_day_per_person": "214.69525386566",
            "Average_days_of_employment_provided_per_Household": "36",
            "Differently_abled_persons_worked": "80",
            "Material_and_skilled_Wages": "456.526013276",
            "Number_of_Completed_Works": "3363",
            "Number_of_GPs_with_NIL_exp": "0",
            "Number_of_Ongoing_Works": "5524",
            "Persondays_of_Central_Liability_so_far": "568273",
            "SC_persondays": "87176",
            "SC_workers_against_active_workers": "8540",
            "ST_persondays": "991",
            "ST_workers_against_active_workers": "88",
            "Total_Adm_Expenditure": "62.64082",
            "Total_Exp": "1739.221993276",
            "Total_Households_Worked": "15542",
            "Total_Individuals_Worked": "21905",
            "Total_No_of_Active_Job_Cards": "31946",
            "Total_No_of_Active_Workers": "55100",
            "Total_No_of_HHs_completed_100_Days_of_Wage_Employment": "145",
            "Total_No_of_JobCards_issued": "39693",
            "Total_No_of_Workers": "65343",
            "Total_No_of_Works_Takenup": "8887",
            "Wages": "1220.05516",
            "Women_Persondays": "282069",
            "percent_of_Category_B_Works": "36",
            "percent_of_Expenditure_on_Agriculture_Allied_Works": "59.44",
            "percent_of_NRM_Expenditure": "17.65",
            "percentage_payments_gererated_within_15_days": "99.98",
            "Remarks": "NA"
        }} onBack={()=>console.log("Back to List clicked")}/>} />

      {/* <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;