import { apiSlice } from ".";


export interface MgnregaDetails { 
  _id: string;
  fin_year: string;
  month: string;
  state_code: string;
  state_name: string;
  district_code: string;
  district_name: string;
  Approved_Labour_Budget: string;
  Average_Wage_rate_per_day_per_person: string;
  Average_days_of_employment_provided_per_Household: string;
  Differently_abled_persons_worked: string;
  Material_and_skilled_Wages: string;
  Number_of_Completed_Works: string;
  Number_of_GPs_with_NIL_exp: string;
  Number_of_Ongoing_Works: string;
  Persondays_of_Central_Liability_so_far: string;
  SC_persondays: string;
  SC_workers_against_active_workers: string;
  ST_persondays: string;
  ST_workers_against_active_workers: string;
  Total_Adm_Expenditure: string;
  Total_Exp: string;
  Total_Households_Worked: string;
  Total_Individuals_Worked: string;
  Total_No_of_Active_Job_Cards: string;
  Total_No_of_Active_Workers: string;
  Total_No_of_HHs_completed_100_Days_of_Wage_Employment: string;
  Total_No_of_JobCards_issued: string;
  Total_No_of_Workers: string;
  Total_No_of_Works_Takenup: string;
  Wages: string;
  Women_Persondays: string;
  percent_of_Category_B_Works: string;
  percent_of_Expenditure_on_Agriculture_Allied_Works: string;
  percent_of_NRM_Expenditure: string;
  percentage_payments_gererated_within_15_days: string;
  Remarks: string;
}

export interface ViewAllProductResponse {
    index_name: string;
    records: {
      data: MgnregaDetails[];
    };
    total: number;
    // offset: string;
    // limit: string;
}

export interface ICommonSearchQuery {
    limit: number;
    skip?: number;
    page?: number;
    q?: string;
    state_name?: string;
    district_name?: string;
    month?: string;
    fin_year?: string;
}

export interface IViewMgnregaRecordById {
  record: MgnregaDetails;
}

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
     viewAllProducts: builder.query<ViewAllProductResponse, ICommonSearchQuery>({
      query: ({ limit, page, state_name, district_name, month, fin_year }) => {
        const stateFilter = state_name ? `&state_name=${state_name}` : "";
        const districtFilter = district_name ? `&district_name=${district_name}` : "";
        const monthFilter = month ? `&month=${month}` : "";
        const finYearFilter = fin_year ? `&fin_year=${fin_year}` : "";

        const url = `/api/records?pageSize=${limit}&page=${page}${stateFilter}${districtFilter}${monthFilter}${finYearFilter}`;
        return {
          url: url,
          method: "GET",
        };
      },
    }),

    viewProductById: builder.query<IViewMgnregaRecordById, string>({
      query: (id) => {
        const url = `/api/record/${id}`;
        return {
          url: url,
          method: "GET",
        };
      },
    }),
// filters%5Bstate_name%5D
    // viewAllAuditLogs: builder.query<IViewAllActivityLogs, ICommonSearchQuery>({
    //   query: ({ page, perPage, q, type }) => {
    //     const url = type
    //       ? `/audit-log?page=${page}&limit=${perPage}&q=${q}&type=${type}`
    //       : `/audit-log?page=${page}&limit=${perPage}&q=${q}`;
    //     return {
    //       url: url,
    //       method: "GET",
    //     };
    //   },
    // }),

    
  }),
});

export const { useViewAllProductsQuery, useViewProductByIdQuery } =
  productApi;

export default productApi;
