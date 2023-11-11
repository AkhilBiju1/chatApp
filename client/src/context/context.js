import { createContext, useState } from "react";
import React from 'react'
export const AuthContext = createContext(null)



function Context({ children }) {
  const [unread, setUnread] = useState([])
  const [user, setUser] = useState(null)
  const [roomId, setroomId] = useState("")
  const [messeger, setMesseger] = useState("")
  const [chat, setchat] = useState([])
  const [seenId,setSeenId] =useState("")
  return (
    <AuthContext.Provider value={{ user, setUser, roomId, setroomId, messeger, setMesseger, chat, setchat, unread, setUnread ,seenId,setSeenId}}>
          {children}
    </AuthContext.Provider>
      
    
  )

}

export default Context
