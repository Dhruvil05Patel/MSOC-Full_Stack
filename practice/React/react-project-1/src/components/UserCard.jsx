import React from 'react'
import './UserCard.css'

const UserCard = (props) => {
  return (
    <div className='user-container'>
      <p id='userTitle'>{props.name}</p>
      <img id='userPic' src={props.pic} alt="dhruvil" />
      <p id='user-desc'>{props.desc}</p>
    </div>
  )
}

export default UserCard
