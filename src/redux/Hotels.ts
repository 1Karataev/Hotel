import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import axios from "axios";

export interface Hotel {
  hotelId:number,
  hotelName:string,
  priceFrom:number,
  stars:string,
}

interface FilterHotel {
  location:string,
  date:string,
  days:string,
  hotel:Hotel[]
}
const initialState:FilterHotel = {
  location: 'Москва',
  date:  `${new Date().getFullYear() +
    '-' +
    (new Date().getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    new Date().getDate().toString().padStart(2, '0')}`,
  days: '1',
  hotel: [],
 
}
export const  fetchHotels = createAsyncThunk(
'hotels/fetchHotels',
 async  () => {
    //Здесь добавить индикацию загрузки
    const  response  = await axios.get(`http://engine.hotellook.com/api/v2/cache.json?location=${initialState.location}&currency=rub&checkIn=${initialState.date}&checkOut=${initialState.date}&limit=10`)
    return response.data
    
    
  }

)

const hotelSlice = createSlice({
name:'hotels',
initialState,
reducers:{
  setLocalValue(state, action: PayloadAction<string>) {
    state.location = action.payload
  },
  setDaysValue(state, action:PayloadAction<string>){
    state.days = action.payload
  }
}, 
extraReducers: (builder) => {
    builder.addCase(fetchHotels.fulfilled, (state, action) => {
      state.hotel = action.payload
      
      
    })
  },

})
export const {  setLocalValue, setDaysValue} = hotelSlice.actions;
export default hotelSlice.reducer