import { Link } from 'react-router-dom'
import styles from './header.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logoutUser } from '../../features/auth/authSlice'

export default function Header() {
  const { user } = useAppSelector(store => store.authSlice)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.removeItem('storage-token')
    dispatch(logoutUser())
  }

  return (
    <header className={styles.header}>
      {user.username ? (
        <>
          <div>
            <p>{user.username}</p>
          </div>
          <Link to={'/'} className={styles.link}>home</Link>
          <Link to={'/weatherApi'} className={styles.link}>weatherApi</Link>
          <Link to={'/weatherCities'} className={styles.link}>weatherCities</Link>
          <Link onClick={handleLogout} to={'/auth'} className={styles.link}>logout</Link>
          </>
      ) : (
          <Link to={'/auth'} className={styles.link}>auth</Link>
      )}
    </header>

  )
}
