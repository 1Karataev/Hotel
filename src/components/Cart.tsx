import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Avatar, Checkbox, Rating } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Hotel } from '../redux/Hotels';
import { setDelite, setItem } from '../redux/Likes';
import { RootState, useAppDispatch } from '../redux/store';
import classes from './Cart.module.scss';
type Cart = {
  data: Hotel;
  days: string;
  date: string;
};

const Cart:React.FC<Cart> = (data) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [cheked, setCheked] = useState<boolean>(false)
  const date = useSelector((store:RootState)=>store.hotels.date)
  const days = useSelector((store: RootState) => store?.hotels.days);
   const like = [...useSelector((store: RootState) => store.like.hotel)];
  const dispatch = useAppDispatch()

 const hundlerClick = () => {
   setCheked(!cheked);
   !cheked
     ? dispatch(setItem({ ...data.data, date: date, days: days }))
     : dispatch(setDelite(data.data.hotelId));
  
 };
  return (
    <div className={classes.cart}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        style={{ width: '64px', height: '64px' }}
      />
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
      <div style={{ width: '22%' }}>
        <Checkbox
          icon={<FavoriteBorder />}
          color={'error'}
          checkedIcon={<Favorite />}
          checked={cheked}
          onClick={hundlerClick}
        />
        <p>
          <span>Price:</span> {data.data.priceFrom} ₽
        </p>
      </div>
    </div>
  );
}

export default Cart