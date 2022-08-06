import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Avatar, Checkbox, Rating } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Hotel } from '../redux/Hotels';
import { setDelete, setItem } from '../redux/Likes';
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
    dispatch(setDelete(data.data.hotelId));
    setCheked(!cheked);
  };
  return (
    <div className={classes.content__cart} style={{ flexWrap: 'wrap' }}>
      <div className={classes.content} style={{ width: '100%', padding: '0' }}>
        <h2 style={{ marginBottom: '5px' }}>{data.data.hotelName}</h2>
      </div>
      <div className={classes.content} style={{ paddingLeft: '0', width: 'auto' }}>
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
      <div style={{ width: 'auto', marginRight: '18px' }}>
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={cheked}
          onClick={hundlerClick}
          color={'error'}
          style={{ paddingTop: '0' }}
        />
        <p className={classes.price}>
          <span style={{ marginRight: '8px' }}>Price:</span> <span style={{fontWeight:'400'}}>{data.data.priceFrom} ₽</span>
        </p>
      </div>
    </div>
  );
};

export default Favorit;
