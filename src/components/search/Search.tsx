import React, {  useEffect } from 'react'
import { useSelector } from 'react-redux';
import MyInput from '../../modules/Input/MyInput';
import MyButton from '../../modules/MyButton';
import classes from './Search.module.scss';
import {  setDaysValue, setHotels, setLocalValue, setOutValue, setPhotos} from '../../redux/Hotels';
import { RootState, useAppDispatch } from '../../redux/store';
import Calendar from './Calendar';
import Service from '../../API/Service';
import {  useGetHotelsByNameQuery} from '../../API/ServisRTK';


const Search:React.FC = () =>{
  const local = useSelector((state: RootState) => state.hotels.location);
  const datein = useSelector((state: RootState) => state.hotels.date);
  const dateout = useSelector((state: RootState) => state.hotels.out);
  const days = useSelector((state: RootState) => state.hotels.days);
  const dispatch = useAppDispatch()
  const { data} = useGetHotelsByNameQuery({ local, datein, dateout });
  const localHundler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLocalValue(e.target.value));
   
  };
   
   const daysHundler = (e: React.ChangeEvent<HTMLInputElement>) => {
     dispatch(setDaysValue(e.target.value));
     dispatch(setOutValue())
   };

    const hundlerSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (data?.length) dispatch(setHotels(data));
      Service.photos(dispatch, setPhotos, data);
    };
    
    useEffect(() => {
      dispatch(setOutValue());
      
      Service.fetch(dispatch, setHotels, setPhotos, local, datein, dateout);
     
    }, []);
    
  return (
    <form action="" className={classes.form} onSubmit={(e) => hundlerSearch(e)}>
      <MyInput
        children={'Локация'}
        value={local}
        className={classes.input}
        valid={true}
        label={classes.label}
        onChange={localHundler}
      />
      <Calendar />
      <MyInput
        children={'Количество дней'}
        value={days}
        className={classes.marg}
        label={classes.label}
        valid={true}
        onChange={daysHundler}
      />

      <MyButton onClick={()=>hundlerSearch}>Найти</MyButton>
    </form>
  );
}

export default Search





