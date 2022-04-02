import React from 'react'
import './Details.css'
const Details = () => {
  return (
    <div className='profile_details'>
      <div className='profile_identification'>
        <div className='profile_img'></div>
        <div className='profile_names'>
          <h1>Shubham kumar</h1>
          <p>@Shubham</p>
        </div>
      </div>
      <div className='profile_description'>
        <p>
          We're super proud to educate the Developers community and place
          students in the best companies on the planet. ⭐
        </p>
      </div>
    </div>
  )
}

export default Details
