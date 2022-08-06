import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Avatar, Checkbox, Rating } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Hotel } from '../redux/Hotels';
import { setDelete, setItem } from '../redux/Likes';
import { RootState, useAppDispatch } from '../redux/store';
import HomeIcon from '@mui/icons-material/Home';
import classes from './Cart.module.scss';
type Cart = {
  data: Hotel;
  days: string;
  date: string;
};

const Cart:React.FC<Cart> = (data) => {
  const [value, setValue] = React.useState<number | null>(2);
  const date = useSelector((store:RootState)=>store.hotels.date)
  const days = useSelector((store: RootState) => store?.hotels.days);
  const like = useSelector((store: RootState) => store.like.hotel).some(
    (item) => item.hotelId == data.data.hotelId,
  );
  const dispatch = useAppDispatch()
  
 const hundlerClick = () => {
   !like
     ? dispatch(setItem({ ...data.data, date: date, days: days }))
     : dispatch(setDelete(data.data.hotelId));
  
 };
  return (
    <div className={classes.cart}>
      <Avatar
        style={{ width: '64px', height: '64px' }}
      > <HomeIcon/> </Avatar>
      <div className={classes.content}>
        <h2>{data.data.hotelName}</h2>
        <p>
          {data.date} -- {data.days} {+data.days == 1 ? 'день' : 4 >= +data.days ? 'дня' : 'дней'}
        </p>
        <Rating
          name="simple-controlled"
          value={+data.data.stars}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
      <div style={{ width: '25%' }}>
        <Checkbox
          icon={<FavoriteBorder />}
          color={'error'}
          checkedIcon={<Favorite />}
          checked={like}
          onClick={hundlerClick}
        />
        <p>
          <span style={{ marginRight: '8px' }}>Price:</span>{' '}
          <span style={{ fontWeight: '400' }}>{data.data.priceFrom} ₽</span>
        </p>
      </div>
    </div>
  );
}

export default Cart