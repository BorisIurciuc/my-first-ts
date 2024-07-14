import { Link } from 'react-router-dom'
import styles from './header.module.css'

export default function Header() {
  return (
    <div className={styles.header}>
        <Link to={'/'} className={styles.link}>home</Link>
        <Link to={'/weatherApi'} className={styles.link}>weatherApi</Link>
        <Link to={'/weatherCities'} className={styles.link}>weatherCities</Link>
    </div>
  )
}
