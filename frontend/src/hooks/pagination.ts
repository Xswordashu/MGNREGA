import {  useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";



export default function usePagination() {
const [searchParams] = useSearchParams();
const page = parseInt(searchParams.get("page") || "1", 10);
const per_page = parseInt(searchParams.get("per_page") || "10", 10);

const [{pageIndex, pageSize}, setPagination] = useState({
    pageIndex: page-1, //initial page index
    pageSize: per_page, //default page size
  });

const pagination = useMemo(
    () => {
    return ({ pageIndex, pageSize });
  },
    [pageIndex, pageSize]
  );

  return {pageIndex, pageSize, setPagination, pagination};
}