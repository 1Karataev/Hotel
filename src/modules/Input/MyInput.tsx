import React from 'react'
import classes from './MyInput.module.scss'
  type Input = {
    children: string;
    value: string;
    placeholder?:string,
    valid?:Boolean
    onChange?: any;
    ref?:any,
    className?:string
    label?:string
  };

const MyInput:React.FC<Input> = React.forwardRef((props, ref) => {
  return (
    <div className={[classes.container, props.label].join(' ')}>
      <label htmlFor="text" className={!props.valid ? classes.novalid : ''}>
        {props.children}
      </label>
      <input
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        className={props.className}
        {...ref}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
})

export default MyInput