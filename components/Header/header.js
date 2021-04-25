import {useState, useEffect} from 'react'
import Link from 'next/link'
import styles from './header.module.scss'
import Router from 'next/router'

const Header = () => {
    const [isAtuenticated, setIsAtuenticated] = useState(false)

    useEffect(async () => {
        if(localStorage.getItem('macebook-isauth')){
            setIsAtuenticated(true)
        }else{
            setIsAtuenticated(false)
        }
    })

    const handleLogout = async () => {
        if(localStorage.getItem('macebook-isauth')){
            localStorage.removeItem('macebook-isauth')
        }
        const res = await fetch(`${process.env.API}/api/logout`, {
            method: 'GET',
            credentials: 'include'
        })
        console.log(res)
        Router.replace('/')
        return
    }

    return(
        <nav className={styles.navbar}>
            <Link href="/"><a className={styles.navbarBrand}>Logo</a></Link>
            {isAtuenticated ? 
            <ul className={styles.navbarNav}>
                <li className={styles.navbarLink}><Link href="/feeds"><a>Home</a></Link></li>
                <li className={styles.navbarLink}><Link href="/messaging"><a>Messaging</a></Link></li>
                <li className={styles.navbarLink}><Link href="/notifications"><a>Notifications</a></Link></li>
                <li className={styles.navbarLink}><Link href="/profile"><a>User Icon</a></Link></li>
                <li className={styles.navbarLink}><Link href="/settings"><a>Settings</a></Link></li>
                <li className={styles.navbarLink} onClick={handleLogout}>Logout</li>
            </ul> :
            <div>
                <ul className={styles.navbarNav}>
                    <li className={styles.navbarLink}><Link href="/login"><a>Login</a></Link></li>
                </ul>
            </div>}
        </nav>
    )
}

export default Header