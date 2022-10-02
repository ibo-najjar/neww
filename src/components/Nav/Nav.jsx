import React from 'react'
import './Nav.scss'
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { CgUserList } from 'react-icons/cg';
import { HiOutlineUserGroup,HiOutlineInformationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logonv.png'

const Nav = () => {
  return (
    <div className='app__nav'>
      <div className='nav-logo'>
          <img src={logo}/>
        </div>
      <ul className='nav-items'>
        
      <Link to="/home">
        <li className='item'><CgUserList/><h3>كاست</h3></li>
        </Link>

        <Link to="/add">
          <li className='item'>
          <AiOutlineUserAdd/><h3>إضافة كاست</h3></li>
        </Link>
        
        <Link to="/table">
          <li className='item'>
            <HiOutlineUserGroup/><h3>طلبات</h3></li>
        </Link>

        <Link to="/orders">
          <li className='item'>
            <HiOutlineUserGroup/><h3> عرض الطلبات </h3></li>
        </Link>
        
        <Link to="/home">
        <li className='item'><HiOutlineInformationCircle/><h3>About</h3></li>
        </Link>
        
        <Link to="/">
          <li className='item'>
            <BiLogOutCircle/><h3>logout</h3></li>
        </Link>

      </ul>
    </div>
  )
}
<Link to="/add">
        <button className='btn btn-add'>add</button>
      </Link>

export default Nav