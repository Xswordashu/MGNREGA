import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {  useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { MGNREGA_API_REDUCER_KEY } from "./constant";
import { apiSlice } from "./services";


export const store = configureStore({
  reducer: {
   
    [MGNREGA_API_REDUCER_KEY]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
