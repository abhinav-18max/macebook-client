import {useRouter} from 'next/router'
import Layout from '../../components/Layout/layout'
import SEO from '../../components/seo'
import styles from '../../styles/pages/profile.module.scss'

const UserProfile = (props) => {
    const router = useRouter()
    const {username} = router.query
    
    return(
        <Layout>
            <SEO title={`${username} | Macebook`}/>
            {username}
        </Layout>
    )
}

export default UserProfile