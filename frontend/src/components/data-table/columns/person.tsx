import { Button } from "@/components/ui/button"
import type { MgnregaDetails } from "@/redux/services/product"
import type { ColumnDef } from "@tanstack/react-table"
import { Briefcase, Calendar, Eye, IndianRupee, Users } from "lucide-react"


 
export const personColumn: ColumnDef<MgnregaDetails>[] = [
  {
    accessorKey: "fin_year",
     header: () => (
      <>
      <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-600" />
          <span className="text-sm">वित्तीय वर्ष</span>
        </div>
          <span className="text-xs text-muted-foreground">Financial Year</span>
      </>
       
  ),
   meta: {
      headerClassName: "text-left !py-4 !px-4 min-w-[140px]",
      // cellClassName: "text-gray-800"
    }

  },
 
  {
    accessorKey: "month",
    header: ()=> (
      <>
        <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">महीना</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Month</span>
      </>
    ),
    meta: {
      headerClassName: "text-left !py-4 !px-4 min-w-[140px]",
      
    }
  },
  {
    accessorKey: "Total_Households_Worked",
    header: ()=>(
      <>
        <div className="flex items-center  gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">परिवार</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Households</span>
      </>
    ),
     cell: ({ row }) => {
       const thouseholdWorkers = Number(row.getValue("Total_Households_Worked")).toFixed(2)

      return   <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>{thouseholdWorkers}</span>
                    </div>
     },
    meta: {
      headerClassName: "text-left !py-4 !px-4 min-w-[140px]",
    
    }
  },
  {
    accessorKey: "Total_Individuals_Worked",
    header: ()=>(
      <>
       <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">कामगार</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Workers</span>
      </>
    ),
     cell: ({ row }) => {
       const tIndividualWorkers = Number(row.getValue("Total_Individuals_Worked")).toFixed(2)

      return        <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-lg">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>{tIndividualWorkers}</span>
                    </div>
     },
    meta: {
      headerClassName: "text-left !py-4 !px-4 min-w-[140px]",
   
    }
  },

  {
   accessorKey:"Total_Exp",
   header: ()=>(
    <>
      <div className="flex items-center  gap-2">
                    <IndianRupee className="w-4 h-4 text-amber-600" />
                    <span className="text-sm">कुल व्यय</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Total Exp </span>
    </>
   ),
    cell: ({ row }) => {
      const totalExp = Number(row.getValue("Total_Exp")).toFixed(2)

      return    <div className="inline-flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-lg">
                      <IndianRupee className="w-4 h-4 text-amber-600" />
                      <span>{totalExp}</span>
                    </div>
    },
    meta: {
      headerClassName: "text-left !py-4 !px-4 min-w-[140px]",
      // cellClassName: "text-gray-800"
    }
  },
  {
    accessorKey: "Number_of_Completed_Works",
    header: ()=>(
      <>
         <div className="flex items-center  gap-2">
                    <Briefcase className="w-4 h-4 text-green-600" />
                    <span className="text-sm">कार्य पूर्ण</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Works Done</span>
      </>
    ),
    cell: ({ row }) => {
       const completedWorks = row.getValue("Number_of_Completed_Works") as string

      return     <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-lg">
                      <Briefcase className="w-4 h-4 text-green-600" />
                      <span>{completedWorks}</span>
                    </div>
     },
    
    meta: {
      headerClassName: "text-left !py-4 !px-4 min-w-[140px]",
      // cellClassName: "text-gray-800"
    }
  },
  {
    id: "actions",
    header: ()=>(
      <>
         <div className="flex items-center   gap-2">
                    <Eye className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">कार्रवाई</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Action</span>
      </>
    ),
    cell: () => {
      return (
         <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      <span className="text-sm">देखें / View</span>
                    </Button>
      )
    }
  }
  // {
  //   accessorKey: "Wages",
  //   header: "Wages",
  // },
  // {
  //   accessorKey: "Approved_Labour_Budget",
  //   header: "Approved Labour Budget",
  // },
  // {
  //   accessorKey: "Total_Adm_Expenditure",
  //   header: "Total Admin Expenditure",
  // }
]