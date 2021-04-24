import Link from 'next/link'
import styles from './header.module.scss'

const Header = () => {
    return(
        <nav className={styles.navbar}>
            <Link href="/"><a className={styles.navbarBrand}>Logo</a></Link>
            <ul className={styles.navbarNav}>
                <li className={styles.navbarLink}><Link href="/feeds"><a>Home</a></Link></li>
                <li className={styles.navbarLink}><Link href="/messaging"><a>Messaging</a></Link></li>
                <li className={styles.navbarLink}><Link href="/notifications"><a>Notifications</a></Link></li>
                <li className={styles.navbarLink}><Link href="/profile"><a>User Icon</a></Link></li>
            </ul>
        </nav>
    )
}

export default Header