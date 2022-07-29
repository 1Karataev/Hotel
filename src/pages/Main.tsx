import React, { useEffect, useState } from 'react'
import classes from './Main.module.scss'
import Cart from '../components/Cart';
import { fetchHotels } from '../redux/Hotels';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import Search from '../components/search/Search';
import { setDelite } from '../redux/Likes';
import Favorit from '../components/Favorit';

const  Main:React.FC = () => {

  const hotels = useSelector((store: RootState) => store?.hotels.hotel);
  const dispatch = useAppDispatch()
  const like = useSelector((store: RootState) => store?.like.hotel);
  useEffect(()=>{
    dispatch(fetchHotels())
  },[])
 
  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <h2> Simple Hotel Check</h2>
        <div>Выйти</div>
      </header>
      <div className={classes.container}>
        <div className={classes.side}>
          <Search />
          <div className={classes.like}>
            <h2>Избранное</h2>
            <div className={classes.like_filter}>
              <div>рейтинг</div>
              <div>рейтинг</div>
            </div>
            <div>
              {like ? (
                like.map((hotel) => (
                  <Favorit
                    key={hotel.hotelId}
                    {...hotel}
                    
                  />
                ))
              ) : (
                <h2>нет ничего </h2>
              )}
            </div>
          </div>
        </div>

        <div className={classes.hotel}>
          <div className={classes.head}>
            <h2>
              Отели<span>{'>'}</span> Москва{' '}
            </h2>
            <p>07 июля 2020</p>
          </div>
          <div></div>
          <p>Добавлено в Избранное: 3 отеля</p>
          {hotels ? (
            hotels.map((hotel) => (
              <Cart
                key={hotel.hotelId}
                {...hotel}
                />
            ))
          ) : (
            <h2>нет ничего </h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main