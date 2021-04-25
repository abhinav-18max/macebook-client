import Layout from '../components/Layout/layout'
import SEO from '../components/seo'

const Settings = (props) => {
    return(
        <Layout>
            <SEO title="Settings | Macebook"/>
            <h1>Settings</h1>
            <h3>Profile</h3>
            <button>Change Username</button>
            <button>Change Password</button>
            <h3>Account</h3>
            <button>Delete Account</button>
        </Layout>
    )
}

export default Settings