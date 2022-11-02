import React from 'react'
import styles from '../styles/Home.module.css'

type SchoolProps = {
  name: string
  state: string
}

const School: React.FC<SchoolProps> = ({ name, state }) => {
  // Here we destructre name and state from props, and assign them below
  return (
    <section className={styles.school}>
      <span className={styles.schoolIcon}>
        {/* Sets the icon as the first letter of the school name */}
        <h1>{name[0]}</h1>
      </span>
      <span className={styles.schoolInfo}>
        <h5>{name}</h5>
        <p>{state}</p>
      </span>
    </section>
  )
}

export default School
