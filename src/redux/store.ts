import { configureStore  } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import hotels from './Hotels'
import like from './Likes'
import auth from './Auth'
import { hotelsApi } from "../API/ServisRTK";


export const store = configureStore({
  reducer:{
    hotels,
    like,
    auth,
    [hotelsApi.reducerPath]:hotelsApi.reducer
  },
  middleware:  (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(hotelsApi.middleware),

})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>


