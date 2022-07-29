import React from 'react'
import classes from './MyInput.module.scss'
  type Input = {
    children: string;
    value: string;
    onChange?: any;
    ref?:any
  };

const MyInput:React.FC<Input> = React.forwardRef((props, ref) => {
  return (
    <div className={classes.container}>
      <label htmlFor="text">{props.children}</label>
      <input type="text" value={props.value}  {...ref} onChange={(e) => props.onChange(e)} />
    </div>
  );
})

export default MyInput