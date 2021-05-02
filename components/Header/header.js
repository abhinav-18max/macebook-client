import Link from 'next/link'
import styles from './header.module.scss'
import { useAuth } from '../../contexts/authContext'
import { clientRedirect } from '../../lib/redirect'

const Header = () => {
    const [user, setUser] = useAuth()

    const handleLogout = async () => {
        const res = await fetch(`${process.env.API}/logout`, {
            method: 'GET',
            credentials: 'include'
        })
        setUser()
        clientRedirect('/')
    }

    return(
        <nav className={styles.navbar}>
            <Link href="/"><a className={styles.navbarBrand}>Logo</a></Link>
            {user ? 
            <ul className={styles.navbarNav}>
                <li className={styles.navbarLink}><Link href="/feeds"><a>Home</a></Link></li>
                <li className={styles.navbarLink}><Link href="/messaging"><a>Messaging</a></Link></li>
                <li className={styles.navbarLink}><Link href="/notifications"><a>Notifications</a></Link></li>
                <li className={styles.navbarLink}><Link href="/settings"><a>Settings</a></Link></li>
                <li className={styles.navbarLink} onClick={handleLogout}><a>Logout</a></li>
                <li className={styles.navbarLink}><Link href={`/user/${user.username}`}><a><img className={styles.picture} src={user.picture}/></a></Link></li>
            </ul> :
            <div>
                <ul className={styles.navbarNav}>
                    <li className={styles.navbarLink}><Link href="/login"><a>Login</a></Link></li>
                    <li className={styles.navbarLink}><Link href="/registration"><a>Signup</a></Link></li>
                </ul>
            </div>}
        </nav>
    )
}

export default Header