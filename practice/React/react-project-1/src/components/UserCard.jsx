import React from 'react'
import './UserCard.css'

const UserCard = (props) => {

  function handlePic() {
    alert("dont try to spy on mee")
  }

  return (
    <div className='user-container'>
      <p id='userTitle'>{props.name}</p>
      <img onMouseOver={handlePic} id='userPic' src={props.pic} alt="dhruvil" />
      <p id='user-desc'>{props.desc}</p>
    </div>
  )
}

export default UserCard
