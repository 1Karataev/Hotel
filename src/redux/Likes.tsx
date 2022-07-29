import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hotel } from './Hotels';




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
  hotel: [],
};


const likesSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<Hotel>) {
      state.hotel.push(action.payload);
    },
    setDelite(state, action: PayloadAction<number>) {
       state.hotel = state.hotel.filter((a, i) => a.hotelId !== action.payload);
    },
  },
});
export const { setItem, setDelite } = likesSlice.actions;

export default likesSlice.reducer;
