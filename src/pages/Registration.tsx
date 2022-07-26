import React from 'react'
import MyInput from '../modules/Input/MyInput';
import MyButton from '../modules/MyButton';
import classes from './Registration.module.scss'
const Registration:React.FC = () => {
  return (
    <div className={classes.container}>
      <form action="">
        <h2>Simple Hotel Check</h2>
        <MyInput children={'Логин'} value={''} onChange={''}/>
        <MyInput children={'Пароль'} value={''} onChange={''}/>
        <MyButton />
      </form>
    </div>
  );
}

export default Registration