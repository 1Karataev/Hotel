import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Avatar, Checkbox, Rating } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Hotel } from '../redux/Hotels';
import { setDelite, setItem } from '../redux/Likes';
import { RootState, useAppDispatch } from '../redux/store';
import classes from './Cart.module.scss';

type Cart = {
  data:Hotel, 
  days:string,
  date:string;
}
const Favorit: React.FC<Cart> = (data) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [cheked, setCheked] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const hundlerClick = () => {
    dispatch(setDelite(data.data.hotelId));
    setCheked(!cheked);
  };
  return (
    <div className={classes.content__cart} >
      <div className={classes.content} style={{ paddingLeft: '0' }}>
        <h2 style={{ marginBottom: '5px' }}>{data.data.hotelName}</h2>
        <p>
          {data.date}-- {data.days} {+data.days == 1 ? 'день' : 4 >= +data.days ? 'дня' : 'дней'}
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
          checkedIcon={<Favorite />}
          checked={cheked}
          onClick={hundlerClick}
          color={'error'}
        />
        <p>
          <span>Price:</span> {data.data.priceFrom} ₽
        </p>
      </div>
    </div>
  );
};

export default Favorit;
