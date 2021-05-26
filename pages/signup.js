import { useFormik } from 'formik';
import SEO from '../components/seo'
import Layout from '../components/Layout/layout'
import {useAuth} from '../contexts/authContext'
import Router from 'next/router'
import {useEffect} from "react";
import styles from '../styles/pages/signup.module.scss'
import {clientRedirect} from "../lib/redirect";
import Link from "next/link";
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
    const[user,setUser]=useAuth()

    useEffect(()=>{
        if(user) clientRedirect('/feeds')
    },[user])
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

            console.warn(values.username)
            const res =  fetch(`${process.env.API}/registration`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values),
                credentials: 'include'
            })

                console.log("You're Logged In!")
                localStorage.setItem('macebook-isauth', true)
                return Router.replace('/feeds')


        },


    });
  
    return (
        <div className={styles.layout}>
            <SEO title ="Signup | Macebook"/>
            <div className={styles.square}></div>
            <div className={styles.ellipse}></div>
            <div className={styles.for}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.title}><div className={styles.tex}>WELCOME</div> </div>
                <div className={styles.op1}><div className={styles.text}>Student</div> </div>
                <div className={styles.op2}><div className={styles.text}>Alumini</div></div>
                <div className={styles.rb1}></div>
                <div className={styles.rb2}></div>
                <div className={styles.q1}><div className={styles.text}>Are you a</div> </div>
               <div><div className={styles.detail1}><div className={styles.text}>Name</div> </div>
                   <div className={styles.entr1}><input
                       id="name"
                       name="name"
                       type="text"
                       onChange={formik.handleChange}
                       value={formik.values.name}
                   /></div>
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}</div>

               <div><div className={styles.detail2}><div className={styles.text}>Username</div> </div>
                   <div className={styles.entr2}><input
                       id="username"
                       name="username"
                       type="text"
                       onChange={formik.handleChange}
                       value={formik.values.username}
                   /></div>
                   {formik.errors.username ? <div>{formik.errors.username}</div> : null}</div>


                <div><div className={styles.detail3}><div className={styles.text}>Password</div> </div>
                   <div className={styles.entr3}><input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                   /></div>
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}</div>

                <div><div className={styles.detail4}><div className={styles.text}>Password</div> </div>
                    <div className={styles.entr4}> <input
                        id="passwordconfirm"
                        name="passwordconfirm"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.passwordconfirm}
                    /></div>
                    {formik.errors.passwordconfirm ? <div>{formik.errors.passwordconfirm}</div> : null}</div>


               <div className={styles.prf}><div className={styles.text}>Profile Picture</div> </div>
                <div className={styles.choose}><div className={styles.text}>Choose Image</div> </div>
                <div className={styles.google}><button type="submit"><div className={styles.text} >Sign in using Google</div></button></div>
                <div className={styles.signup}><button type="submit"><div className={styles.text} Sign up>Sign Up</div></button></div>

            </form>
                <div className={styles.signin}><button type="submit"><Link href="/login"><a>Sign Up</a></Link></button></div>
            </div>
        </div>
    );
};
export default SignupForm