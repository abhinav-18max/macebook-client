import { useFormik } from 'formik';
import SEO from '../components/seo'
import Layout from '../components/Layout/layout'
import Router from 'next/router'

const validate = values => {
    const errors = {};
  
    if (!values.username) {
        errors.username = 'Username required';
    } else if (!/^[A-Za-z]+/.test(values.name.trim())) {
        errors.name = 'Enter a valid name';
    }

    if (!values.email) {
        errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
  
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
    }

    if (!values.passwordconfirm) {
        errors.passwordconfirm = 'Password is required';
    } else if (values.passwordconfirm !== values.password) {
        errors.passwordconfirm = 'Passwords do not match';
    }
    return errors;
}

const  SignupForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            location:'',
            phonenumber:'',
            password:'',
            passwordconfirm:''
        },
        validate,
        onSubmit: values => {
            console.warn(values)
            const res =  fetch(`${process.env.API}/registration`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values),
                credentials: 'include'
            })
        },
    });
  
    return (
        <Layout>
            <SEO title ="Signup | Macebook"/>
            <form onSubmit={formik.handleSubmit}>
               <div><label htmlFor="Name"> Name</label>
                   <input
                       id="name"
                       name="name"
                       type="text"
                       onChange={formik.handleChange}
                       value={formik.values.name}
                   />
                   {formik.errors.name ? <div>{formik.errors.name}</div> : null}</div>

               <div><label htmlFor="username">User Name</label>
                   <input
                       id="username"
                       name="username"
                       type="text"
                       onChange={formik.handleChange}
                       value={formik.values.username}
                   />
                   {formik.errors.username ? <div>{formik.errors.username}</div> : null}</div>

                <div><label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}</div>

                <div><label htmlFor="phonenumber">Phone number</label>
                    <input
                        id="phonenumber"
                        name="phonenumber"
                        type="phonenumber"
                        onChange={formik.handleChange}
                        value={formik.values.phonenumber}
                    />
                    {formik.errors.phonenumber ? <div>{formik.errors.phonenumber}</div> : null}</div>

                <div><label htmlFor="location">Location</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.location}
                    />
                    {formik.errors.location ? <div>{formik.errors.location}</div> : null}</div>

                <div><label htmlFor="password">password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}</div>

                <div><label htmlFor="password">password</label>
                    <input
                        id="passwordconfirm"
                        name="passwordconfirm"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.passwordconfirm}
                    />
                    {formik.errors.passwordconfirm ? <div>{formik.errors.passwordconfirm}</div> : null}</div>

                <div><button type="submit">Sign up</button></div>
            </form>
        </Layout>
    );
};
export default SignupForm