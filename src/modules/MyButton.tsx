import React, { MouseEventHandler } from 'react'
import classes from './MyButton.module.scss'

type Button = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children:string
}

const MyButton: React.FC<Button> = (props) => {

  return (
    <button className={classes.btn } onClick={props.onClick} >
      {props.children}
    </button>
  );
};

export default MyButton