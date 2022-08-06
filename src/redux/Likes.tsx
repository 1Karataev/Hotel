import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hotel } from './Hotels';

export interface hotelLike {
  hotelId: number;
  hotelName: string;
  priceFrom: number;
  stars: string;
  date: string;
  days: string;
}


interface LikesHotel {
  location: string;
  date: string;
  days: string;
  hotel: Hotel[];
}
const initialState: LikesHotel = {
  location: '',
  date: '',
  days: '',
  hotel: JSON.parse(localStorage.getItem('hotels') ?? '[]'),
};


const likesSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<hotelLike>) {
      state.hotel.push(action.payload);
      localStorage.setItem('hotels', JSON.stringify(state.hotel))
    },
    
    setDelete(state, action: PayloadAction<number>) {
       state.hotel = state.hotel.filter((a, i) => a.hotelId !== action.payload);
       localStorage.setItem('hotels', JSON.stringify(state.hotel));
    },
  },
});
export const { setItem, setDelete } = likesSlice.actions;

export default likesSlice.reducer;
