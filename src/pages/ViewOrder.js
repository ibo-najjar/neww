import React,{useState, useMemo,useEffect,useRef} from 'react'
import './ViewOrder.scss'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom'
import pic1 from '../assets/Picture1.jpg'
import pic2 from '../assets/Picture2.jpg'
import pic3 from '../assets/Picture3.jpg'
import pic4 from '../assets/Picture4.jpg'
import tallPic from '../assets/tall.jpg'
import smallLogo from '../assets/smalllogo.png'
import {BsTelephoneFill} from 'react-icons/bs'
import {HiMail} from 'react-icons/hi';
import {BiArrowBack} from 'react-icons/bi';
import { toast } from 'react-toastify'


const ViewOrder = () => {
  const [user, setUser] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const {id} = useParams();
  useEffect(()=> {
    axios.get(`/api/get/${id}`).then((resp) => setUser({...resp.data[0]}));
  }, [id])

  async function copyTextToClipboard() {
    if ('clipboard' in navigator) {
      toast.success("page link copied to clipboard")
      return await navigator.clipboard.writeText(`/view/${id}`);
    } else {
      return document.execCommand('copy', true, `${id}`);
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
  }

  return (
    <div className='app__view' dir='rtl'>
      <div className='view-name'>
        <div className='profile-and-name'>
        <div className='app__ProfileImage'>
          <img width="100%" height="100%" src={pic1}/>
          </div>
          <h1>احمد الشمري</h1>
        </div>
        <div className='app__small-logo'>
          <img width="100%" height="100%" src={smallLogo}/>
        </div>
      </div>
      <div className='view-container'>
        <div className='more-info'>
          <div className='row-info'>
            <h4 id='header-name'>ID</h4>
            <h4 id='sub-info'>13269</h4>
          </div>
          <div className='row-info'>
            <h4 id='header-name'>الجنسية</h4>
            <h4 id='sub-info'>السعودية</h4>
          </div>
          <div className='row-info-long' id='span-text'>
            <h4 id='header-name'>مشاركات سابقة</h4>
            <h4 id='sub-info'>يوتيرن, مسلسل شبا البومب الحلقة الرابعة</h4>
          </div>
          <div className='row-info'>
            <h4 id='header-name'>اللغات</h4>
            <h4 id='sub-info'>عربي, انجليزي, اسباني</h4>
          </div>
          <div className='row-info'>
            <h4 id='header-name'>المواهب</h4>
            <h4 id='sub-info'>غناء, القاء</h4>
          </div>
          <div className='row-info'>
            <h4 id='header-name'>التفرغ</h4>
            <h4 id='sub-info'>طالب الصف الثاني عشر</h4>
          </div>
          <div className='row-info'>
            <h4 id='header-name'>اوقات الفراغ</h4>
            <h4 id='sub-info'>5,000 ريال</h4>
          </div>
          <div className='row-info'>
            <h4 id='header-name'>الاجر الحالي</h4>
            <h4 id='sub-info'>نهاية الاسبوع من التساعه صباحا</h4>
          </div>
          <div className='break-info'/>
          <div className='row-info-long'>
            <h4 id='header-name'>العنوان</h4>
            <h4 id='sub-info'>السعودية الرياض شارع الملك عبدالله</h4>
          </div>
          <div className='row-info'>
            <h4 id='header-name'>التواصل</h4>
            <h4 id='sub-info'>05530644972<BsTelephoneFill/><br/></h4>
          </div>
          <div className='row-info'>
            <h4 id='header-name'></h4>
            <h4 id='sub-info'>ahmed@hero.productions<HiMail/><br/></h4>
          </div>

        </div>
          <div className='user-overview'>
            <div className='modal-conatainer'>
            <div className='grid-item-1 grid-item'>
              1
            </div>
            <div className='grid-item-2 grid-item'>
              <img width="100%" height="100%" src={tallPic}/>
            </div>
            <div className='grid-item-3 grid-item'>
              <p>الاسم:{"احمد الشمري"}</p>
            </div>
            <div className='grid-item-4 grid-item'>
              <h4 id='header-name'>العمر</h4>
              <h4 id='sub-info'>43</h4>
              <h4 id='header-name'>الطول</h4>
              <h4 id='sub-info'>173cm</h4>
              <h4 id='header-name'>الوزن</h4>
              <h4 id='sub-info'>73kg</h4>
            </div>
            <div className='grid-item-5 grid-item'>
            <img width="100%" height="100%" src={pic1}></img>
            </div>
            <div className='grid-item-6 grid-item'>
            <img width="100%" height="100%" src={pic2}></img>
            </div>
            <div className='grid-item-7 grid-item'>
            <img width="100%" height="100%" src={pic3}></img>
            </div>
            <div className='grid-item-8 grid-item'>
            <img width="100%" height="100%" src={pic4}></img>
            </div>
            <div className='grid-item-9 grid-item'>
              
          </div>
      </div>
        </div>
        <div className='view-buttons'>
          <button onClick={handleCopyClick}>لينك المشاركة</button>
          <button>تصدير pdf</button>
          <button><BiArrowBack/></button>
        </div>

      </div>
    </div>
  )
}

export default ViewOrder