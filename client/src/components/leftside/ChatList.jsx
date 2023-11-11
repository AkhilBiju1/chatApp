import React,{useState,useEffect,useContext} from 'react'
import './chatlist.css'
import logo_red from './img.jpg'
import logo from './img.png'
import { AuthContext } from '../../context/context'
import Sidebar from '../sidebar/Sidebar'
import io from "socket.io-client"
const URL = 'http://localhost:5000';
const socket = io.connect(URL)

function ChatList() {
  const { user, setroomId, setMesseger, chat, setchat, unread, setUnread, setSeenId } = useContext(AuthContext)
  const [selectedIndex, setIndex] = useState("")
  
  const [Togle, setTogle] = useState(false)
  const [chatList, setChatlist] = useState([])
  

  useEffect(() => {
    if (user) {
      fetch("/all-user", {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json()).then(data => {

        if (data) {
          setChatlist(data.users)
          console.log(data.users);
        }


      })

      fetch("/all-rooms", {

        headers: {
          "Content-Type": "application/json"
        },
      }).then(res => res.json()).then(data => {
        data.forEach(room => {
          if (room._id !== "") {
            socket.emit("join_room", room._id);
          }
        });

      })
    }
    
    
  }, [user])

  socket.on("receive_message", (data) => {
    console.log(data);
    setchat([...chat, data])
    if (unread.indexOf(data.senter_id)===-1) {
      setUnread([...unread, data.senter_id])

    }

    
  })




  const ChatHandller = (index, id, name) => {
    setIndex(index)
    setMesseger(name)
    setSeenId(id)
    const dataToSubmit = {

      user2: id
    }
    console.log(dataToSubmit);
    fetch("/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSubmit)
    }).then(res => res.json()).then(data => {
      setroomId(data)
      
    })
  }
  return (
    <div className='chatlist'>
      <Sidebar Togle={Togle} setTogle={setTogle} />
      <div className="top">
              <div className="profile" onClick={()=>setTogle(true)}><img src={logo} alt="profile" /></div>
              <input type="text" name="" id="" placeholder=' Search'/>
      </div>
      <div className="buttom">

        {
          chatList.map((user, index) => {
            
            if (user) {
              return (
                <div key={index} onClick={()=>ChatHandller(index,user._id,user.name) } style={{ backgroundColor: index === selectedIndex ? "rgb(40, 59, 81)" : "" }} className={'chat'}>
                  <div >
                    <img src={logo_red} alt="" className="profile" />
                  </div>
                  <div> <h4 className="name">{user.name}
                    {unread.map((userid) => {
                    if (userid===user._id) {
                      return(
                      <sup style={{ backgroundColor: "#46CA0D", display: "inline-block", width: "8px", height: "8px", border: "0px solid green ", borderRadius: '50%' }} ></sup>
                      )
                    }
                    return null;
                  })}</h4></div>
                </div>
              )
            }
            return null
          })
        }
       
        
      </div>
    </div>
    
  )
}

export default ChatList
