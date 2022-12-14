import React, { useEffect, useState } from 'react'
import classes from './Main.module.scss'
import Cart from '../components/Cart';
import {  setHotels, setOutValue } from '../redux/Hotels';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import Search from '../components/search/Search';
import Favorit from '../components/Favorit';
import { useNavigate } from 'react-router-dom';
import { setAuth, setValid } from '../redux/Auth';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import { useGetHotelsByNameQuery } from '../API/ServisRTK';


const  Main:React.FC =  () => {
  const hotels = useSelector((store: RootState) => store?.hotels.hotel);
  const days = useSelector((store: RootState) => store?.hotels.days);
  const datein = useSelector((store: RootState) => store?.hotels.date);
   const dateout = useSelector((state: RootState) => state.hotels.out);
  const local = useSelector((store: RootState) => store?.hotels.location);
  const photos = useSelector((store: RootState) => store?.hotels.photos)
  const [price, setPrice] = useState<boolean>(true)
  const [rate, setRate] = useState<boolean>(true);
  const dispatch = useAppDispatch()
  const like = [...useSelector((store: RootState)=>store.like.hotel)]
  const navigate = useNavigate();
  const { data, isLoading, error} = useGetHotelsByNameQuery({ local, datein, dateout });
  const logOut =()=>{
    dispatch(setAuth({ login: '', password: '' }));
    dispatch(setValid(false))

    // return navigate('/') пояснение подробное в registration
  } 
 useEffect(() => {
   dispatch(setOutValue());
   
 }, []);


  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <h2> Simple Hotel Check</h2>
        <div onClick={logOut} style={{ cursor: 'pointer' }}>
          <span
            style={{
              width: '12px',
              fontSize: '16px',
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: '400',
              color: '#41522E',
            }}>
            Выйти
          </span>{' '}
          <span
            style={{
              width: '12px',
              fontSize: '16px',
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: '400',
              color: '#41522E',
            }}>
            →
          </span>
        </div>
      </header>
      <div className={classes.container}>
        <div className={classes.side}>
          <Search />
          <div className={classes.like}>
            <h2>Избранное</h2>
            <div className={classes.like_filter}>
              <button onClick={() => setRate(!rate)}>
                Рейтинг{' '}
                <span
                  className={
                    rate ? classes.spangreen : [classes.spangreen, classes.rotate].join(' ')
                  }
                />{' '}
                <span
                  className={
                    rate ? [classes.spangrey, classes.rotategray].join(' ') : classes.spangrey
                  }
                />
              </button>
              <button onClick={() => setPrice(!price)}>
                Цена{' '}
                <span
                  className={
                    price ? classes.spangreen : [classes.spangreen, classes.rotate].join(' ')
                  }
                />{' '}
                <span
                  className={
                    price ? [classes.spangrey, classes.rotategray].join(' ') : classes.spangrey
                  }
                />
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                overflow: 'auto',
              }}>
              {like ? (
                like
                  .sort((a, b) =>
                    price && rate
                      ? b.priceFrom - a.priceFrom || +b.stars - +a.stars
                      : price
                      ? b.priceFrom - a.priceFrom || +a.stars - +b.stars
                      : rate
                      ? a.priceFrom - b.priceFrom || +b.stars - +a.stars
                      : a.priceFrom - b.priceFrom || +a.stars - +b.stars,
                  )
                  .map((hotel) => (
                    <Favorit key={hotel.hotelId} data={hotel} days={hotel.days} date={hotel.date} />
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
              Отели<span>{'>'}</span> {local}
            </h2>
            <p>{datein}</p>
          </div>

          <motion.div className={classes.corusel}>
            {!isLoading ? (
              <motion.div
                drag="x"
               
                dragConstraints={{
                  right: 0,
                  left: - 2750
                }}
                className={classes.corusel_inner}>
                {photos.map((img, i) => (
                  <motion.div className={classes.photo} key={i}>
                    <img src={img} alt="" key={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <CircularProgress color="success" />
            )}
          </motion.div>

          <p>
            Добавлено в Избранное:{' '}
            <span style={{ fontStyle: 'normal', fontWeight: '500', color: '#41522E' }}>
              {like.length}
            </span>{' '}
            {like.length == 0 ? 'отелей' : like.length == 1 ? 'отель' : 'отеля'}
          </p>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              marginLeft: '5%',
              overflow: 'auto',
            }}>
            {!isLoading ? (
              hotels.map((hotel) => (
                <Cart key={hotel.hotelId} data={hotel} days={days} date={datein} />
              ))
            ) : (
              <CircularProgress color="success" style={{ alignSelf: 'center' }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main