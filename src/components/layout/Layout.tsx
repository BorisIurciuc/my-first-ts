import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import { useAppDispatch } from '../../app/hooks'
import { useEffect } from 'react'
import { getUserWithToken } from '../../features/auth/authAction'

export default function Layout() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem('storage-token')
        if(token !== null) {
            dispatch(getUserWithToken(token))
        }
    }, [dispatch])


    return (
        <>
            <Header />
                <main>
                    <Outlet />
                </main>
        </>
    )
}

