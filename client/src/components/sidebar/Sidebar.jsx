import React  from 'react'
import './sidebar.css'
import { AuthContext } from '../../context/context'
import logo from "./img.jpg"
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
function Sidebar(props) {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
 const Logout = ()=> {
    fetch("/logout", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(data => {

      if (data === null) {
        setUser(null)
        navigate("/login")
      }

    })
  }

  return (
    <div className={props.Togle ===true ?"sidbar":"hide"}> 
          
      <button className='close' onClick={() => props.setTogle(false)}><b>X</b></button>
              <img src={logo} alt="" />
                  <h2>{user?user.name:"fghb"}</h2>
             
          <button className='logout' onClick={Logout} ><b>Logout</b></button>
       </div>

  )
}
 
 export default Sidebar
