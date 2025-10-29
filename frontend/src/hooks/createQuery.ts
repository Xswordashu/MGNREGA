import { useCallback } from "react";
import { useLocation } from "react-router-dom";



export default function useCreateQuery() {
    const location = useLocation();
    
    const createQueryString = useCallback(
      (params: Record<string, string | number | null>) => {
        console.log("Creating query string with params:", params);
        console.log("location.search:", location.search);
        const newSearchParams = new URLSearchParams(location.search);
        // console.log("params", params);
        for (const [key, value] of Object.entries(params)) {
          if (value === null) {
            newSearchParams.delete(key);
          } else {
            newSearchParams.set(key, String(value));
          }
        }
  
             console.log("query string", newSearchParams.toString());
        return newSearchParams.toString();
      },

      
      [location.search]
    );

    return createQueryString;
}