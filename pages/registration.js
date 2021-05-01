import Layout from '../components/Layout/layout'
import SEO from '../components/seo'
import{useState, useEffect} from 'react';
const registration  =() => {
   const {handleChange,values,handleSubmit} = useform();
    return(
        <div>
            <form>

                <div>
                    <label htmlFor='username'>
                        username
                        <input type='text'
                               name='username'
                               placeholder ="username"
                               value={values.username}
                               onChange ={handleChange}
                               />
                    </label>
                </div>
                <div>
                    <label htmlFor='name'>
                      name
                        <input type='text'
                               name='name'
                               placeholder ="name"
                               value={values.name}
                               onChange ={handleChange}
                        />
                    </label>
                </div>
                <div>
                <label htmlFor='location'>
                       location
                        <input type='text'
                               name='location'
                               placeholder ="location"
                               value={values.location}
                               onChange ={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='phone'>
                       ph number
                        <input type='text'
                               name='phonenumber'
                               placeholder ="phonenumber"
                               value={values.phonenumber}
                               onChange ={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='email'>
                        email
                        <input type='text'
                               name='email'
                               placeholder ="email"
                               value={values.email}
                               onChange ={handleChange}
                               />
                    </label>
                </div>
                <div>
                    <label htmlFor='password'>
                        password
                        <input type='password'
                               name='password1'
                               placeholder ="password"
                               value={values.password1}
                               onChange ={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='password'>
                        confirm password
                        <input type='password'
                               name='password2'
                               placeholder ="password"
                               value={values.password2}
                               onChange ={handleChange}
                        />
                    </label>
                </div>
                <button  type='submit' onClick={handleSubmit}>
                    sign up
                </button>
            </form>
        </div>

    )
}
const useform =()=>{
    const [values,setValues] = useState({
        username:'',
        email:'',
        location:'',
        password1:'',
        password2:''

    });
    const [error, setError]= useState({});
    const [submit,setsubmit] = useState(false);
    const handleChange =e =>{
        const { name,value}=e.target;
        if(values.password1!=values.password2){
            return alert("password not the same")
        }
        else{
            values.password =values.password1
        }



        setValues({
            ...values,
            [name]:value
        });
    };
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setsubmit(true);
        const {name,value}=e.target;
        let userdetails ={
            ...values,
            [name]:value
        }


        const res = await fetch(`${process.env.API}/registration`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userdetails),
                credentials: 'include'
        })



    }
    return {handleChange,values,handleSubmit}
};


export default 