import React from 'react'
import UserCard from './components/usercard'
import './App.css'
import dhruvilpic from './assets/dhruvil.jpg'
import nishthapic from './assets/nishtha.jpeg'
import TimeCounter from './components/TimeCounter'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
const router = createBrowserRouter([
  {
    path:"/",
    element : <UserCard/>,
  },
  {
    path:"/count",
    element : <TimeCounter/>,
  },
])

const App = () => {

  return (
    <div className='container'>
      <RouterProvider router={router} />
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
