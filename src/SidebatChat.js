
import React from 'react'
import "./SidebarChat.css"
import AccountCircle from "@material-ui/icons/AccountCircle"
import db from './firebase'
import { Link } from "react-router-dom"
function SidebatChat({ name,  addNewGroup, iD }) {

    const createNewGroup = () => {

        const groupName = prompt("Enter Group name");
        if (groupName) {
            db.collection("rooms").add({
                name: groupName
            })

        }
    }
    return !addNewGroup ? (
        <Link to={`/rooms/${iD}`}>
            <div className="sidebarChat">
                <AccountCircle />
                <div className="sidebarChat__info">
                    <h3>{name}</h3>
                 
                </div>


            </div>
        </Link>

    ) : (
            <div onClick={createNewGroup} className="sidebarChat">
                <h3>Add New Group</h3>

            </div>
        )
}

export default SidebatChat
