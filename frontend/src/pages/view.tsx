import { DataTable } from "@/components/data-table";
import { personColumn } from "@/components/data-table/columns/person";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import type { DataTableFilterField } from "@/hooks/filter";
import useDataTableFilter from "@/hooks/filter";
import useCreateQuery from "@/hooks/createQuery";
import { useNavigate } from "react-router-dom";
import usePagination from "@/hooks/pagination";
import { useViewAllProductsQuery, type MgnregaDetails } from "@/redux/services/product";
import { getCoreRowModel,  useReactTable } from "@tanstack/react-table";
import { Calendar } from "lucide-react";
import {  useEffect } from "react";

import { useSearchParams } from "react-router-dom";

const mockData: MgnregaDetails[] = [];

export default function ViewAllMgnregaDetails(){
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();
const createQueryString = useCreateQuery();

  const { pageIndex, pageSize, setPagination, pagination } = usePagination();
  const stateName = searchParams.get("state_name") ?? "";
  const districtName = searchParams.get("district_name") ?? "";
  const month = searchParams.get("month") ?? "";
  const fin_year = searchParams.get("fin_year") ?? "";
  const filterFields: DataTableFilterField<MgnregaDetails>[] = [
   
    {
      label: "Financial Year",
      value: "fin_year",
      placeholder: "Select Financial Year",
      options: [
          { label: "2018-2019", value: "2018-2019" },
          { label: "2019-2020", value: "2019-2020" },
          { label: "2020-2021", value: "2020-2021" },
          { label: "2021-2022", value: "2021-2022" },
          { label: "2022-2023", value: "2022-2023" },
          { label: "2023-2024", value: "2023-2024" },
          { label: "2024-2025", value: "2024-2025" },
      ]
    },
  
    {
        label: "Month",
        value: "month",
        placeholder: "Select Month",
        options: [
           { label: "January", value: "Jan" },
           { label: "February", value: "Feb" },
           { label: "March", value: "Mar" },
           { label: "April", value: "Apr" },
           { label: "May", value: "May" },
           { label: "June", value: "Jun" },
           { label: "July", value: "Jul" },    
           { label: "August", value: "Aug" },
           { label: "September", value: "Sep" },
           { label: "October", value: "Oct" },
           { label: "November", value: "Nov" },
           { label: "December", value: "Dec" },
                
        ]
        
    }
    
  ];

  
  const { columnFilters, setColumnFilters } = useDataTableFilter<MgnregaDetails>({ filterFields });
  // console.log("Column Filters in View Page:", columnFilters);
  const { data: products } = useViewAllProductsQuery({limit: pageSize, page: pageIndex + 1, state_name: stateName, district_name: districtName, month: month, fin_year: fin_year });
  
  useEffect(()=>{
    // console.log("Column Filters Changed in View Page:");
       if(columnFilters.length>0){
        table.setPageIndex(0);
       }
  },[columnFilters])

  useEffect(() => {
  // console.log("Pagination useEffect running", pageIndex)
    const query = createQueryString({
      page: pageIndex + 1,
      per_page: pageSize,
    });

    navigate(`${location.pathname}?${query}`, { replace: true });
  }, [pageIndex, pageSize, createQueryString, location.pathname, navigate]);
  
  const table = useReactTable({
    data: products?.records?.data || mockData,
   
    columns: personColumn,
    state:{
      pagination,
      columnFilters,
    },
    
    onColumnFiltersChange: setColumnFilters,
     rowCount: products?.total ?? 0,
    // rowCount: mockData.length,
    onPaginationChange: setPagination,
    manualPagination:true,
      manualFiltering:true,
    getCoreRowModel: getCoreRowModel(),
  
  })


 

  return (
     <div className="container max-w-7xl mx-auto p-10">
        <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl">{districtName}</h1>
            <p className="text-muted-foreground">मासिक रिकॉर्ड / Monthly Records</p>
            <p className="text-sm text-muted-foreground">राज्य / State: {stateName}</p>
          </div>

          
        </div>

        <div>
           <DataTableToolbar table={table} filterFields={filterFields}/>
        </div>
        </div>
        <div>
            <DataTable table={table} />
            <div className="p-6">
               <DataTablePagination table={table} />
            </div>
          </div>
     </div>
  
   )
}