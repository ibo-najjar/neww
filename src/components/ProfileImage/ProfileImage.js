import React from "react";
import "./ProfileImage.scss";
import noPic from "../../assets/nopic.png";

const ProfileImage = (params) => {
  //console.log(params.data.mediaKey);
  const image = `${process.env.REACT_APP_SERVER_URL}public/${params.data.mediaKey}_1.png`;
  return (
    <div className="app__ProfileImage">
      <img
        width="100%"
        height="100%"
        src={image}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = noPic;
        }}
      />
    </div>
  );
};

export default ProfileImage;
