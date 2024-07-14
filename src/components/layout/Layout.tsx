import { Link, Outlet } from 'react-router-dom'
import styles from './layout.module.css'

export default function Layout() {
    return (
        <>
            <header className={styles.header}>
                <Link to={'/'} className={styles.link}>home</Link>
                <Link to={'/weatherApi'} className={styles.link}>weatherApi</Link>
                <Link to={'/test'} className={styles.link}>test</Link>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

