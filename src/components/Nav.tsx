import Image from 'next/image'
import Logo from '../assets/logo.svg'
import styles from '../styles/Home.module.css'

const Nav = () => {
  return (
    <nav className={styles.navWrapper}>
      <span className={styles.navContent}>
        <Image src={Logo} className={styles.logo} alt='Logo' />
        <h5>BEACON</h5>
      </span>
    </nav>
  )
}

export default Nav
