import { Link } from 'react-router-dom'
import styles from './header.module.css'
import { useAppSelector } from '../../app/hooks'
import { validateHeaderName } from 'http'

export default function Header() {

  const { user } = useAppSelector(store => store.authSlice)



  return (
    <header className={styles.header}>
          <div>
            <p>{user.username}</p>
          </div>

          <Link to={'/'} className={styles.link}>home</Link>
          <Link to={'/weatherApi'} className={styles.link}>weatherApi</Link>
          <Link to={'/weatherCities'} className={styles.link}>weatherCities</Link>
          <Link to={'/auth'} className={styles.link}>auth</Link>
    </header>
  )
}
