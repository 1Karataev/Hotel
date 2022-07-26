import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Avatar, Checkbox, Rating } from '@mui/material';
import React, { useState } from 'react'
import { Hotel } from '../redux/Hotels';
import { setDelite, setItem } from '../redux/Likes';
import { useAppDispatch } from '../redux/store';
import classes from './Cart.module.scss';


const Cart:React.FC<Hotel> = ({...data}) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [cheked, setCheked] = useState<boolean>(false)
  const dispatch = useAppDispatch()

 const hundlerClick = () => {
   setCheked(!cheked);
   !cheked ? dispatch(setItem({ ...data })) : dispatch(setDelite(data.hotelId));
  
 };
  return (
    <div className={classes.cart}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <div className={classes.content}>
        <h2>{data.hotelName}</h2>
        <p>7 июля 2020 -- 1 день</p>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
      <div>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={cheked} onClick={hundlerClick}
        />
        <p>
          <span>Price:</span> {data.priceFrom} ₽
        </p>
      </div>
    </div>
  );
}

export default Cart