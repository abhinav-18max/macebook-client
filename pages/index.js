import SEO from '../components/seo'
import Layout from '../components/Layout/layout'
import styles from '../styles/pages/home.module.scss'

export default function Home() {
  return(
    <Layout>
      <SEO title="MACE Alumini Portal"/>
      <div className={styles.heading}>MACE Alumini Portal</div>
    </Layout>
  )
}
