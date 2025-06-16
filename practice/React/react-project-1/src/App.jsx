import React from 'react'
import UserCard from './components/usercard'
import './App.css'
import dhruvilpic from './assets/dhruvil.jpg'
import nishthapic from './assets/nishtha.jpeg'
import TimeCounter from './components/TimeCounter'

const App = () => {
  return (
    <div className='container'>
      <div className="usercard">
          <UserCard name='Dhruvil' desc='I am Dhruvil Patel' pic={dhruvilpic}/>
          <UserCard name='Nishtha' desc='I am Nishtha Icecreamwala' pic={nishthapic}/>
      </div>
      <div className="UserCounter">
          <TimeCounter/>
          <TimeCounter/>
      </div>
    </div>
  )
}

export default App
