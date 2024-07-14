import { Link } from 'react-router-dom'
import styles from './header.module.css'

export default function Header() {
  return (
    <div className={styles.header}>
        <Link to={'/'} className={styles.link}>home</Link>
        <Link to={'/weaterApi'} className={styles.link}>weatherApi</Link>
        <Link to={'/test'} className={styles.link}>test</Link>
    </div>
  )
}
