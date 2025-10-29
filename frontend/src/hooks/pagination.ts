import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import useCreateQuery from "./createQuery";
// import { useNavigate } from "react-router-dom";


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
      console.log("usememo pagination called");
    return ({ pageIndex, pageSize });
  },
    [pageIndex, pageSize]
  );

console.log("Pagination Hook - pageIndex:", pageIndex, "pageSize:", pageSize);
console.log("Pagination Hook - pagination object:", page, per_page);
// useEffect(() => {
//   console.log("runninggggg")
//     const query = createQueryString({
//       page: pageIndex + 1,
//       per_page: pageSize,
//     });

//     navigate(`${location.pathname}?${query}`, { replace: true });
//   }, [pageIndex, pageSize, createQueryString, location.pathname, navigate]);


  return {pageIndex, pageSize, setPagination, pagination};
}