import React ,{useEffect,useRef,useContext} from 'react'
import { AuthContext } from '../../context/context';


function Messeges(props) {

    const divRef = useRef(null);
    const {user, roomId } = useContext(AuthContext)

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });
    

    return (
        <div className='chat' >
           
           
            {props.chat ?
                props.chat.map((value) => {
                    if (value) {

                        if (value.person === "right" &&value.room === roomId) {
                            return (
                                <div className="right">
                                    <p className='chat'>{value.text  }</p>
                                    <span>{value.time}</span>
                                </div>
                            )
                        }
                        else if ((value.person === "left" && value.room === roomId) && value.senter_id!==user._id){
                            return (
                                <div className="left">
                                    <p className='chat'>{value.text }</p>
                                    <span>{value.time}</span>
                                </div>
                            )
                        }


                    }
                    return null
                }):""   
        }
            
                       <div className='dummy'
                ref={divRef}>
            </div>
        </div>
    )
}

export default Messeges
