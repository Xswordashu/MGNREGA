import { useCallback } from "react";
export default function useCreateQuery() {
    const createQueryString = useCallback(
      (params: Record<string, string | number | null>) => {
       
        const newSearchParams = new URLSearchParams(window.location.search);
        // console.log("params", params);
        for (const [key, value] of Object.entries(params)) {
          if (value === null) {
            newSearchParams.delete(key);
          } else {
            newSearchParams.set(key, String(value));
          }
        }
  
           
        return newSearchParams.toString();
      },

      
      []
    );

    return createQueryString;
}