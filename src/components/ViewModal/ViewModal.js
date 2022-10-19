import React, { createRef } from "react";
import "./ViewModal.scss";
import tallImg from "../../assets/tall.jpg";
import pic1 from "../../assets/Picture1.jpg";
import pic2 from "../../assets/Picture2.jpg";
import pic3 from "../../assets/Picture3.jpg";
import pic4 from "../../assets/Picture4.jpg";
import noPic from "../../assets/nopic.png";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ReactToPdf from "react-to-pdf";
import View from "../../pages/View.js";
import smallLogo from "../../assets/smalllogo.png";
import { BsTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";

const options = {
  orientation: "landscape",
  unit: "in",
};

const ViewModal = ({ data }) => {
  const ref = createRef();
  console.log("data", data);
  return (
    <div className="viewModal_container" dir="rtl">
      <div className="viewModal_picturesContainer">
        <div className="modal-row">
          <div className="user-overview_image-container-modal">
            <img
              width="100%"
              height="100%"
              src={`${process.env.REACT_APP_SERVER_URL}public/${data.mediaKey}_2.png`}
            />
          </div>
          <div className="user-overview_image-container-modal">
            <img
              width="100%"
              height="100%"
              src={`${process.env.REACT_APP_SERVER_URL}public/${data.mediaKey}_4.png`}
            />
          </div>
        </div>
        <div className="modal-row">
          <div className="user-overview_image-container-modal">
            <img
              width="100%"
              height="100%"
              src={`${process.env.REACT_APP_SERVER_URL}public/${data.mediaKey}_1.png`}
            />
          </div>
          <div className="user-overview_image-container-modal">
            <img
              width="100%"
              height="100%"
              src={`${process.env.REACT_APP_SERVER_URL}public/${data.mediaKey}_5.png`}
            />
          </div>
        </div>

        <div className="user-overview_video-container-modal">
          <video width="310px" height="100%" controls>
            <source
              src={`${process.env.REACT_APP_SERVER_URL}public/videos/${data.mediaKey}_video.mp4`}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div className="more-info">
        <div className="row-info">
          <h4 id="header-name">ID</h4>
          <h4 id="sub-info">{data.id}</h4>
        </div>
        <div className="row-info">
          <h4 id="header-name">الجنسية</h4>
          <h4 id="sub-info">{data.country}</h4>
        </div>
        <div className="row-info-long" id="span-text">
          <h4 id="header-name">مشاركات سابقة</h4>
          <h4 id="sub-info">{data.contributions}</h4>
        </div>
        <div className="row-info">
          <h4 id="header-name">اللغات</h4>
          <h4 id="sub-info">{data.langauges}</h4>
        </div>
        <div className="row-info">
          <h4 id="header-name">المواهب</h4>
          <h4 id="sub-info">{data.talents}</h4>
        </div>
        <div className="row-info">
          <h4 id="header-name">التفرغ</h4>
          <h4 id="sub-info">
            {data.full_time}
            {" " + data.class_job}
          </h4>
        </div>
        <div className="row-info-long" id="span-text">
          <h4 id="header-name">اوقات الفراغ</h4>
          <h4 id="sub-info">{data.free_time}</h4>
        </div>
        <div className="row-info">
          <h4 id="header-name">الاجر الحالي</h4>
          <h4 id="sub-info">{data.wage}</h4>
        </div>
        <div className="break-info" />
        <div className="row-info-long">
          <h4 id="header-name">العنوان</h4>
          <h4 id="sub-info">
            {data.country_address}
            {" " + data.city_address}
            {" " + data.first_address}
          </h4>
        </div>
        <div className="row-info">
          <h4 id="header-name">التواصل</h4>
          <h4 id="sub-info">
            <BsTelephoneFill />
            <br />
          </h4>
        </div>
        <div className="row-info">
          <h4 id="header-name"></h4>
          <h4 id="sub-info">
            {data.email}
            <HiMail />
            <br />
          </h4>
        </div>
      </div>
    </div>
  );
};
export default ViewModal;
