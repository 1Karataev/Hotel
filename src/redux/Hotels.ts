import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export interface Hotel {
  date: string;
  days: string;
  hotelId:number,
  hotelName:string,
  priceFrom:number,
  stars:string,
}

interface FilterHotel {
  location:string,
  date:string,
  days:string,
  out:string,
  photos:string[]
  hotel:Hotel[]
}
const initialState:FilterHotel = {
  location: 'Москва',
  date:  `${new Date().toLocaleDateString().split('.').reverse().join('-')}`,
  days: '1',
  out:  `${new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString().split('.').reverse().join('-')}`,
  photos:[],
  hotel: [],
 
}


const hotelSlice = createSlice({
name:'hotels',
initialState,
reducers:{
  setLocalValue(state, action: PayloadAction<string>) {
    state.location = action.payload
  },
   setDaysValue(state, action:PayloadAction<string>){
    state.days = action.payload
    
  },
  setOutValue(state){
    // const dat = new Date(state.date)
    // dat.setDate(dat.getDate() + +state.days)
    state.out = `${new Date(new Date(state.date).setDate(new Date(state.date).getDate() + +state.days)).toLocaleDateString().split('.').reverse().join('-')}`
    
  },
  setDateValue(state, action:PayloadAction<string>){
    state.date = action.payload
    
  }, 
  setHotels(state, action:PayloadAction<Hotel[]>){
    state.hotel = action.payload
    
  }, 
  setPhotos(state, action:PayloadAction<string[]>){
    state.photos = action.payload
    
  }
},


})
export const { setDaysValue, setLocalValue, setDateValue, setOutValue, setHotels, setPhotos} = hotelSlice.actions;
export default hotelSlice.reducer








