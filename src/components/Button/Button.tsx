import React from 'react'
import styles from './Button.module.scss';

const Button = (props: any) => {
  return (
    <button className={styles.button} type={props.type}>{props.text}</button>
  )
}

export default Button;