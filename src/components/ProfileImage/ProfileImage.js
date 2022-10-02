import React from 'react'
import './ProfileImage.scss'
import noPic from '../../assets/nopic.png'

const ProfileImage = (params) => {

  function selectImage() {
    if(params.data.imgName1) return params.data.imgName1
    if(params.data.imgName2) return params.data.imgName2
    if(params.data.imgName3) return params.data.imgName3
    if(params.data.imgName4) return params.data.imgName4
    return null
  }
  // to-do check if image exists in server
  return (
    <div className='app__ProfileImage'>
      <img width="100%" height="100%" src={
        selectImage()?  `${process.env.REACT_APP_SERVER_URL}public/${selectImage()?.replace(/ /g,"%20")}`: noPic}/>
    </div>
  )
}

export default ProfileImage