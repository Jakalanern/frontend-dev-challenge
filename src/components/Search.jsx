import React from 'react'
import Image from 'next/image'
import SearchIcon from '../assets/search.svg'
import styles from '../styles/Home.module.css'

// Destructure handleSearch from props and add to onChange for input
const Search = ({ handleSearch }) => {
  return (
    <div className={styles.search}>
      <Image
        src={SearchIcon}
        alt='Magnifying glass icon'
        className={styles.searchIcon}
      />
      <input
        type='text'
        placeholder='Search for your school...'
        onChange={handleSearch}
      />
    </div>
  )
}

export default Search
