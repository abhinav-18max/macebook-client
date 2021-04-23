import Header from '../Header/header'
import Footer from '../Footer/footer'
import styles from './layout.module.scss'

const Layout = ({children}) => {
    return(
        <div className={styles.layout}>
            <div className={styles.container}>
                <Header/>
                <div className="container">
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout