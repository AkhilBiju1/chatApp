import React, {useState,useContext} from 'react'
import './Login.css'
import { AuthContext } from '../context/context';
import { Link ,useNavigate} from "react-router-dom";
function Login() {
    const { setUser } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [Pass, setPass] = useState("")
    const [alert, setAlert] = useState("")
    const navigate =useNavigate()
    const userLogin = (event) => {
        event.preventDefault()
        if (  Pass === "" && email === "") {
            setAlert("All fields must be filled")
        } else {
            let dataToSubmit = {
               
                Pass: Pass,
                email: email
            }
            console.log(dataToSubmit);
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSubmit)
            }).then(res => res.json()).then(async data => {
               
                if (data.message) {
                    setAlert(data.message)
                }
                if (data.user) {
                    setUser(data.user)
                    navigate("/")
                }
                
            })
        }
    }
    

    return (
        <div className={'login'} >
            <div className='center'>
                <form action="#" onSubmit={userLogin}>
                    <div className='label'>
                        <h5>Email</h5>
                    </div>
                    <input type="email" name="name" id="" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter email' />

                    <div className='label'>
                        <h5>Password</h5>
                    </div>
                    <input type={show === false ? "password" : "text"} name="" id="" value={Pass} onChange={(e) => { setPass(e.target.value) }} placeholder='Enter Password' />
                    <div className='span'> <span className='alert'>{alert}</span></div>

                    <div className='span'><span><input type="checkbox" onChange={(e) => { setShow(e.target.checked) }} />Show Password</span></div>

                    <div>
                        <button type='submit'>Login </button>

                        <button > <Link to={"/signup"}>Signup</Link></button>

                    </div>
                    

                </form>
            </div>
        </div>
    )
}

export default Login
