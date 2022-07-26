import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MyInput from '../../modules/Input/MyInput';
import MyButton from '../../modules/MyButton';
import classes from '../../pages/Main.module.scss';
import { fetchHotels, setDaysValue, setLocalValue } from '../../redux/Hotels';
import { RootState, useAppDispatch } from '../../redux/store';
import debounce from 'lodash.debounce';
const Search:React.FC = () =>{
  const local = useSelector((state: RootState) => state.hotels.location);
  const days = useSelector((state: RootState) => state.hotels.days);
  const dispatch = useAppDispatch()
  const fetch = useCallback(
    debounce((e) => dispatch(fetchHotels()), 300)
  , []);
   
  const localHundler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLocalValue(e.target.value));
   fetch(e);
  };
   
   const daysHundler =(e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setDaysValue(e.target.value))
      fetch(e)
    }

  return (
    <form action="" className={classes.form}>
      <MyInput
        children={'Локация'}
        value={local}
        onChange={localHundler}
      />
      <select name="" id=""></select>
      <MyInput children={'Количество дней'} value={days} onChange={daysHundler} />

      <MyButton />
    </form>
  );
}

export default Search




