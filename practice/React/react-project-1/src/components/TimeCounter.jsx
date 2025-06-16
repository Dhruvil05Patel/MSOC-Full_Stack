import React, {useState} from 'react'
import './TimeCounter.css'

const TimeCounter = () => {
  const [count, setcount] = useState(0);
  return (
    <div className='counter'>
      <p id='counter-info'>
        You have clicked {count} times
      </p>
      <button id='counter-button' onClick={()=>{
        setcount(count+1)
      }}>
        click here
      </button>
    </div>
  )
}

export default TimeCounter
