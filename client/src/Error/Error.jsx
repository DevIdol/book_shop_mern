import React from 'react'
import styles from './Error.module.css'

const Error = ({status, text}) => {
  return (
    <div className={styles.error}>
       <h1>{status}</h1>
      <p>{text}</p>
    </div>
  )
}

export default Error
