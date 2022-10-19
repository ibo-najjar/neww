import React, { useState, useEffect, createRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.scss";
import smallLogo from "../assets/smalllogo.png";
import { BsTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";

const options = {
  orientation: "landscape",
  unit: "in",
};

const ViewOrder = (props) => {
  const ref = createRef();
  const pdfRef = createRef(null);

  const [user, setUser] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/api/get-orders-cast-data/${id}`)
      .then((resp) => setUser(resp.data));
    console.log(user);
  }, [id]);

  useEffect(() => {
    //console.log(user);
  }, [user]);

  async function copyTextToClipboard() {
    if ("clipboard" in navigator) {
      toast.success("page link copied to clipboard");
      return await navigator.clipboard.writeText(
        `${process.env.REACT_APP_USER_URL}view-order/${id}`
      );
    } else {
      return document.execCommand("copy", true, `${id}`);
    }
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard()
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const phoneFormat = (input) => {
    if (!input || isNaN(input))
      return `input must be a number was sent ${input}`;
    if (typeof input !== "string") input = input.toString();
    if (input.length === 10) {
      return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else {
      return null;
    }
  };

  return (
    <>
      {user ? (
        user.map(function (user, idx) {
          return (
            <>
              {idx === 0 ? (
                <div className="app_view_order-details">
                  <h1>order details</h1>

                  <div className="orders-more-info more-info" dir="rtl">
                    <div className="row-info">
                      <h4 id="header-name">order_id</h4>
                      <h4 id="sub-info">{user.order_key}</h4>
                    </div>
                    <div className="row-info">
                      <h4 id="header-name">اسم الطلب</h4>
                      <h4 id="sub-info">{user.order_name}</h4>
                    </div>
                    <div className="row-info">
                      <h4 id="header-name">التاريخ</h4>
                      <h4 id="sub-info">hey</h4>
                    </div>
                    <button onClick={handleCopyClick}>لينك المشاركة</button>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="app__view" dir="rtl" ref={pdfRef}>
                <div className="view-name">
                  <div className="profile-and-name">
                    <div className="app__ProfileImage">
                      <img
                        width="100%"
                        height="100%"
                        src={`${process.env.REACT_APP_SERVER_URL}public/${user.mediaKey}_1.png`}
                      />
                    </div>
                    <h1>{user.name}</h1>
                  </div>
                </div>
                <div className="view-container">
                  <div className="more-info">
                    <div className="row-info">
                      <h4 id="header-name">ID</h4>
                      <h4 id="sub-info">{user.id}</h4>
                    </div>
                    <div className="row-info">
                      <h4 id="header-name">الجنسية</h4>
                      <h4 id="sub-info">{user.country}</h4>
                    </div>
                    <div className="row-info-long" id="span-text">
                      <h4 id="header-name">مشاركات سابقة</h4>
                      <h4 id="sub-info">{user.contributions}</h4>
                    </div>
                    <div className="row-info">
                      <h4 id="header-name">اللغات</h4>
                      <h4 id="sub-info">{user.langauges}</h4>
                    </div>
                    <div className="row-info">
                      <h4 id="header-name">المواهب</h4>
                      <h4 id="sub-info">{user.talents}</h4>
                    </div>
                    <div className="row-info">
                      <h4 id="header-name">التفرغ</h4>
                      <h4 id="sub-info">
                        {user.full_time}
                        {" " + user.class_job}
                      </h4>
                    </div>
                    <div className="row-info-long" id="span-text">
                      <h4 id="header-name">اوقات الفراغ</h4>
                      <h4 id="sub-info">{user.free_time}</h4>
                    </div>
                    <div className="row-info">
                      <h4 id="header-name">الاجر الحالي</h4>
                      <h4 id="sub-info">{user.wage}</h4>
                    </div>
                    <div className="break-info" />
                    <div className="row-info-long">
                      <h4 id="header-name">العنوان</h4>
                      <h4 id="sub-info">
                        {user.country_address}
                        {" " + user.city_address}
                        {" " + user.first_address}
                      </h4>
                    </div>
                    <div className="row-info">
                      <h4 id="header-name">التواصل</h4>
                      <h4 id="sub-info">
                        {phoneFormat(user.contact)
                          ? phoneFormat(user.contact)
                          : user.contact}
                        <BsTelephoneFill />
                        <br />
                      </h4>
                    </div>
                    <div className="row-info">
                      <h4 id="header-name"></h4>
                      <h4 id="sub-info">
                        {user.email}
                        <HiMail />
                        <br />
                      </h4>
                    </div>
                  </div>

                  <div className="user-overview" ref={ref}>
                    <div className="user-overiview_tall-image">
                      <div className="user-overview_image-container">
                        <img
                          width="100%"
                          height="100%"
                          src={`${process.env.REACT_APP_SERVER_URL}public/${user.mediaKey}_3.png`}
                        />
                      </div>
                    </div>
                    <div className="user-overview_images-row">
                      <div className="user-overview_image-container">
                        <img
                          width="100%"
                          height="100%"
                          src={`${process.env.REACT_APP_SERVER_URL}public/${user.mediaKey}_2.png`}
                        />
                      </div>
                      <div className="user-overview_image-container">
                        <img
                          width="100%"
                          height="100%"
                          src={`${process.env.REACT_APP_SERVER_URL}public/${user.mediaKey}_4.png`}
                        />
                      </div>
                      <div className="user-overview_image-container">
                        <img
                          width="100%"
                          height="100%"
                          src={`${process.env.REACT_APP_SERVER_URL}public/${user.mediaKey}_1.png`}
                        />
                      </div>
                      <div className="user-overview_image-container">
                        <img
                          width="100%"
                          height="100%"
                          src={`${process.env.REACT_APP_SERVER_URL}public/${user.mediaKey}_5.png`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="user-overview_video-container">
                    {console.log(
                      `${process.env.REACT_APP_SERVER_URL}public/videos/${user.mediaKey}_video.mp4`
                    )}

                    <video width="100%" height="100%" controls>
                      <source
                        src={`${process.env.REACT_APP_SERVER_URL}public/videos/${user.mediaKey}_video.mp4`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <h1>loading</h1>
      )}
    </>
  );
};

export default ViewOrder;
