// models/DistrictData.js
import mongoose from "mongoose";

const DistrictDataSchema = new mongoose.Schema(
  {
    fin_year: { type: String, required: true },
    month: { type: String, required: true },
    state_code: { type: String, required: true },
    state_name: { type: String, required: true },
    district_code: { type: String, required: true },
    district_name: { type: String, required: true },
    Approved_Labour_Budget: { type: Number },
    Average_Wage_rate_per_day_per_person: { type: Number },
    Average_days_of_employment_provided_per_Household: { type: Number },
    Differently_abled_persons_worked: { type: Number },
    Material_and_skilled_Wages: { type: Number },
    Number_of_Completed_Works: { type: Number },
    Number_of_GPs_with_NIL_exp: { type: Number },
    Number_of_Ongoing_Works: { type: Number },
    Persondays_of_Central_Liability_so_far: { type: Number },
    SC_persondays: { type: Number },
    SC_workers_against_active_workers: { type: Number },
    ST_persondays: { type: Number },
    ST_workers_against_active_workers: { type: Number },
    Total_Adm_Expenditure: { type: Number },
    Total_Exp: { type: Number },
    Total_Households_Worked: { type: Number },
    Total_Individuals_Worked: { type: Number },
    Total_No_of_Active_Job_Cards: { type: Number },
    Total_No_of_Active_Workers: { type: Number },
    Total_No_of_HHs_completed_100_Days_of_Wage_Employment: { type: Number },
    Total_No_of_JobCards_issued: { type: Number },
    Total_No_of_Workers: { type: Number },
    Total_No_of_Works_Takenup: { type: Number },
    Wages: { type: Number },
    Women_Persondays: { type: Number },
    percent_of_Category_B_Works: { type: Number },
    percent_of_Expenditure_on_Agriculture_Allied_Works: { type: Number },
    percent_of_NRM_Expenditure: { type: Number },
    percentage_payments_gererated_within_15_days: { type: Number },
    Remarks: { type: String },
  },
  { collection: "district_data_v1" } // 👈 important: use your existing collection name
);

export default mongoose.model("DistrictData", DistrictDataSchema);
