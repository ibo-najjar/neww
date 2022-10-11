import React, {
  useState,
  useEffect,
  createRef,
  useCallback,
  useRef,
} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.scss";
import Nav from "../components/Nav/Nav";
import pic1 from "../assets/Picture1.jpg";
import pic2 from "../assets/Picture2.jpg";
import pic3 from "../assets/Picture3.jpg";
import pic4 from "../assets/Picture4.jpg";
import tallPic from "../assets/tall.jpg";
import smallLogo from "../assets/smalllogo.png";
import { BsTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import ReactToPdf from "react-to-pdf";
import { CgFontSpacing } from "react-icons/cg";
import CastsPdf from "../utils/CastsPdf";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { jsPDF } from "jspdf";

const options = {
  orientation: "landscape",
  unit: "in",
};

const View = (props) => {
  const ref = createRef();
  const sex = createRef(null);

  const [user, setUser] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/api/get/${id}`).then((resp) => setUser({ ...resp.data[0] }));
    console.log(user);
  }, [id]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  async function copyTextToClipboard() {
    if ("clipboard" in navigator) {
      toast.success("page link copied to clipboard");
      return await navigator.clipboard.writeText(`/view/${id}`);
    } else {
      return document.execCommand("copy", true, `${id}`);
    }
  }

  const toPdf = () => {
    const content = sex.current;

    const doc = new jsPDF();
    doc.html(content, {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
      width: 200, // <- here
      windowWidth: 200, // <- here,
    });
  };

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
    <div className="app__view" dir="rtl" ref={sex}>
      <div className="view-name">
        <div className="profile-and-name">
          <div className="app__ProfileImage">
            <img width="100%" height="100%" src={pic1} />
          </div>
          <h1>احمد الشمري</h1>
        </div>
        <div className="app__small-logo">
          <img width="100%" height="100%" src={smallLogo} />
        </div>
      </div>
      <div className="view-container">
        {!props.isModal && (
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
                ahmed@hero.productions
                <HiMail />
                <br />
              </h4>
            </div>
          </div>
        )}
        <div className="user-overview" ref={ref}>
          <div className="user-overiview_tall-image">
            <div className="user-overview_image-container">
              <img width="100%" height="100%" src={tallPic} />
            </div>
          </div>
          <div className="user-overview_images-row">
            <div className="user-overview_image-container">
              <img width="100%" height="100%" src={pic2} />
            </div>
            <div className="user-overview_image-container">
              <img width="100%" height="100%" src={pic1} />
            </div>
            <div className="user-overview_image-container">
              <img width="100%" height="100%" src={pic3} />
            </div>
            <div className="user-overview_image-container">
              <img width="100%" height="100%" src={pic4} />
            </div>
          </div>
        </div>
        <div className="user-overview_video-container">
          {console.log(
            `${
              process.env.REACT_APP_SERVER_URL
            }public/${user.videoName?.replace(/ /g, "%20")}`
          )}
          {user.videoName && (
            <video width="100%" height="100%" controls>
              <source
                src={`${
                  process.env.REACT_APP_SERVER_URL
                }public/${user.videoName?.replace(/ /g, "%20")}`}
                type="video/mp4"
              />
            </video>
          )}
          {!user.videoName && <h1>no video</h1>}
        </div>
        <div className="view-buttons">
          <button onClick={handleCopyClick}>لينك المشاركة</button>
          <PDFDownloadLink document={<CastsPdf />} fileName="form">
            {({ loading }) =>
              loading ? (
                <button>loading</button>
              ) : (
                <button>تصدير pdf adv</button>
              )
            }
          </PDFDownloadLink>

          <button onClick={toPdf}>تصدير pdf</button>

          <button>
            <Link to={"/home"}>
              <BiArrowBack />
            </Link>
          </button>
        </div>

        <PDFViewer>
          <CastsPdf />
        </PDFViewer>
      </div>
    </div>
  );
};

export default View;
