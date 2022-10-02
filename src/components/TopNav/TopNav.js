import React from 'react'
import { Link } from 'react-router-dom'
import './TopNav.scss'

const TopNav = () => {
  return (
    <div class="topnav" dir='rtl'>
      <Link to='/home'>
        <h5>كاست</h5>
      </Link>
      <Link to='/add'>
        <h5>إضافة كاست</h5>
      </Link>
      <Link to='/table'>
        <h5>طلبات</h5>
      </Link>
      <Link to='/orders'>
        <h5>عرض الطلبات</h5>
      </Link>
      <Link to='/'>
        <h5>logout</h5>
      </Link>

    </div>
  )
}

export default TopNav