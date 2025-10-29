import type { ColumnFiltersState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "./debounce";
import useCreateQuery from "./createQuery";
import usePagination from "./pagination";

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}


interface UseDataTableFilterProps<TData> {
  
  filterFields: DataTableFilterField<TData>[];
}
export default function useDataTableFilter<TData>({ filterFields = [] }: UseDataTableFilterProps<TData>) {
   
    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams();
    const createQueryString=  useCreateQuery();
    // const {setPagination} = usePagination();
    const { searchableColumns, filterableColumns } = useMemo(
    () => ({
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    }),
    [filterFields]
  );

    const initialColumnFilters: ColumnFiltersState = useMemo(() => {
    return Array.from(searchParams.entries()).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        const faceted = filterableColumns.find((col) => col.value === key);
        const searchable = searchableColumns.find((col) => col.value === key);
        
        if (faceted) {
          filters.push({ id: key, value: value.split(".") });
        } else if (searchable) {
          filters.push({ id: key, value: [value] });
        }
        return filters;
      },
      []
    );
  }, [filterableColumns, searchableColumns, searchParams]);

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters);
  
  const debouncedSearchableFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) =>
          searchableColumns.find((col) => col.value === filter.id)
        )
      ),
      500
    )
  ) as ColumnFiltersState;

 const facetedFilters = columnFilters.filter((filter) =>
    filterableColumns.find((col) => col.value === filter.id)
  );

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    

    if (!mounted ) {
      setMounted(true);
      return;
    }
   console.log("*******************")
    const newParams: Record<string, string | number | null> = {page: 1};

    for (const filter of debouncedSearchableFilters) {
     
      if (typeof filter.value === "string") {
        newParams[filter.id] = filter.value;
      } else {
        newParams[filter.id] = null;
      }
     
    }

   
    for (const filter of facetedFilters) {
     
      if (typeof filter.value === "object" && Array.isArray(filter.value)) {
        Object.assign(newParams, { [filter.id]: filter.value.join(".") });
      }
   
    }

    // Clean removed filters
    for (const key of searchParams.keys()) {
      const isSearchable = searchableColumns.find((col) => col.value === key);
      const isFilterable = filterableColumns.find((col) => col.value === key);
      const notInState = !columnFilters.find((filter) => filter.id === key);

      if ((isSearchable || isFilterable) && notInState) {
        newParams[key] = null;
      }
    }

    // console.log("New Params for Navigation:", newParams);           
    const query = createQueryString(newParams);
    navigate(`${location.pathname}?${query}`, {
      replace: true,
    });
    
    // setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    
  }, [
    JSON.stringify(debouncedSearchableFilters),
    JSON.stringify(facetedFilters),
  ]);

  return {
    columnFilters,
    setColumnFilters,

  }

}