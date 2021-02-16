import React, { useEffect, useState } from 'react'
import "./Sidebar.css"

import Avatar from "@material-ui/core/Avatar"

import SidebatChat from './SidebatChat'
import db from './firebase'
import { useStateValue } from './StateProvider'
function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{user},dispatch]=useStateValue();
    useEffect(() => {
        db.collection("rooms").onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                data: doc.data(),
                iD: doc.id


            })))
        ))
    }, [])

    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src={user.photoURL} />


                <input type="text" placeholder="Search for chats..." />

            </div >


            <div className="sidebar__chats">
                <SidebatChat addNewGroup />
                {rooms.map(room => (
                    <SidebatChat key={room.iD} name={room.data.name} iD={room.iD}></SidebatChat>
                ))}

            </div>


        </div>
    )
}

export default Sidebar
