import React from 'react'
import './ViewButton.scss'
import {Link} from 'react-router-dom'

const ViewButton = (params) => {

  return (
    <div className='view-button-container'>
      <Link to={`/view/${params.data.id}`}>
      <button className='view-button'>معاينة</button>         
      </Link>
    </div>
  )
}

export default ViewButton