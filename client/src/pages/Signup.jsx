import React, {  useState } from 'react'
import "./signup.css"
import { Link,useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate()
    const [alert, setAlert] = useState("")
    const [show,setShow] = useState(false)
    const [Username, setUsername] = useState("")
    const [Password1, setPassword1] = useState("")
    const [email, setEmail] = useState("")

    const userSignup = (event) => {
        event.preventDefault();
       
        if (Username===""&&Password1===""&&email==="") {
            setAlert("All fields must be filled")
        } else {
            const dataToSubmit = {
                Username: Username,
                Pass: Password1,
                email: email
            }
            fetch("/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSubmit)
            }).then(res => res.json()).then(data => {
                data.message ? setAlert(data.message) : navigate("/login")
            })
        }
       
    }

   
    return (
        <div>
            <div className="signup">
                <div className="center">
                    <form action="#" onSubmit={userSignup}>
                        <div className='label'>
                            <h5>Name</h5>
                        </div>
                        <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} name="" id="" placeholder='Enter your name' />
                        <div className='label'>
                            <h5>Email</h5>
                        </div>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="" id="" placeholder='Enter your email' />
                        
                        <div className='label'>
                            <h5>New password
                            </h5>                        </div>
                        <input type={show === false ? "password" : "text"} value={Password1} onChange={(pass1) => setPassword1(pass1.target.value)} name="" id="" placeholder='Enter new Password' />
                        <div className='span'> <span className='alert'>{alert}</span></div>
                        <div className='span'><span><input type="checkbox" onChange={(e) => { setShow(e.target.checked) }} />Show Password</span></div>
                        
                        <div>

                            <button type='submit'> Register</button>
                            <button ><Link to={"/login"}>Login</Link></button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
