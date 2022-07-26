import { configureStore  } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import hotels from './Hotels'
import like from './Likes'

export const store = configureStore({
  reducer:{
    hotels,
    like
  }
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>