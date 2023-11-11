import React, { useState, useContext } from 'react'
import './ChatSection.css'
import { AuthContext } from '../../context/context';
import sent from './sent.png'
import Messeges from './Messeges'
import io from "socket.io-client"

const URL ='http://localhost:5000';
const socket = io.connect(URL)


function ChatSection() {
  const { user, messeger, roomId, chat, setchat, unread, setUnread,seenId } = useContext(AuthContext)
  
  
  const [messege, SetMessege] = useState("")
  const unreadid = unread
  const i = unreadid.indexOf(seenId);
  if (i > -1) {
    unreadid.splice(i, 1); 
  }
  setUnread(unreadid);
  return (

    <div className='chatSection'>
      {messeger ?
        <div>
          <div className="top">
            <h4>{messeger ? messeger : ""}</h4>
            <span>Online</span>
          </div>
          <div className='bottom'>
            <div>
              <input type="text" value={messege} onChange={(e) => SetMessege(e.target.value)} placeholder='write a message....' />
              <button onClick={() => {
                if (messege !== "") {
                  let today = new Date();
                  let time = today.getHours() + ':' + today.getMinutes()

                  setchat([...chat, { text: messege, time: time , person : "right", room :roomId }])
                  socket.emit("send_message", { text: messege, time: time ,person:"left" ,senter_id :user._id, room :roomId})
                  SetMessege("")
                  


                }
              }}><img src={sent} alt="" /></button>
            </div>

          </div>
          <div className="mid">
            <Messeges chat={chat} />
            



          </div>

        </div>
        :
        <h4 className='selectchatmsg'>Select a chat to start messaging</h4>}


    </div>
  )
}

export default ChatSection
