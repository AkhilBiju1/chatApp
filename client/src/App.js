import React, {  useContext, useEffect } from 'react'
 import ChatList from './components/leftside/ChatList';
 import ChatSection from './components/rightside/ChatSection';
import './App.css'
import Signup from './pages/Signup';
import Login from './pages/Login';
import {   Routes , Route,useNavigate } from 'react-router-dom'
import { AuthContext } from './context/context';


function App() {
    
    
    

    return (
        <div className="App">
            
           
                
                    <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login  />} />
                
                    
                   
                    </Routes>
               
            

         
         
        </div>
    );
}


function Home() {
    
     
    const {user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            fetch('/session', {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(data => {

                if (data) {
                    console.log(data);
                    setUser(data)
                } else {
                    navigate("/login")
                }

            })
        }

    },[user])
   

  return (
      <div className="wrapper" >

          <ChatList />
          <ChatSection />
      </div>
  )
}

export default App;
