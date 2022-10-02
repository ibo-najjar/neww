import React, {useState, useEffect} from 'react'
import {useNavigate , useParams, Link} from 'react-router-dom'
import './AddCust.scss'
import axios from "axios"
import { toast } from 'react-toastify'
import Select from 'react-select'
import countries from '../utils/countries'
import { TagsInput } from "react-tag-input-component";
import {AiOutlinePlus} from 'react-icons/ai'

const initialState = {
  name: "",
  country: "",
  email: "",
  contact: "",
  imgUrl: "",
  role: "",
  country: "",
  contributions: "",
  tags: "",
  gender: "ذكر"
} //default values

const langaugesOptions = [
  {value: 'english', label: 'انجليزي'},
  {value: 'arabic', label: 'عربي'},
  {value: 'otherLangs', label: 'اخرى'},
]

const skinColors = [
  {value: 'أبيض', label: 'أبيض'},
  {value: 'فاتح', label: 'فاتح'},
  {value: 'حنطي', label: 'حنطي'},
  {value: 'أسمر', label: 'أسمر'},
  {value: 'أسود', label: 'أسود'},
]

const full_time_options = [
  {value: 'طالب', label: 'طالب'},
  {value: 'موظف', label: 'موظف'},
  {value: 'عاطل', label: 'عاطل'}
]

const talent_options = [
  {value: 'تمثيل', label: 'تمثيل'},
  {value: 'غناء', label: 'غناء'},
  {value: 'رقص', label: 'رقص'},
  {value: 'القاء', label: 'القاء'}
]



const AddCust = () => {
  // file variables
  const [image1,setImage1] = useState(null);
  const [image2,setImage2] = useState(null);
  const [image3,setImage3] = useState(null);
  const [image4,setImage4] = useState(null);
  const [image5,setImage5] = useState(null);
  const [video,setVideo] = useState(null);

  const[file1Name,setFile1Name] = useState("");
  const[file2Name,setFile2Name] = useState("");
  const[file3Name,setFile3Name] = useState("");
  const[file4Name,setFile4Name] = useState("");
  const[file5Name,setFile5Name] = useState("");
  const[videoName,setVideoName] = useState(null);

  const[img1Prev,setImg1Prev] = useState(null);
  const[img2Prev,setImg2Prev] = useState(null);
  const[img3Prev,setImg3Prev] = useState(null);
  const[img4Prev,setImg4Prev] = useState(null);
  const[img5Prev,setImg5Prev] = useState(null);
  const[videoPrev,setVideoPrev] = useState(null);

  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLanguages, setSelectedLanguages] =   useState([]);
  const [otherLangBool, setOtherLangBool] = useState(false)
  const [otherLang, setOtherLang] = useState('')

  const [selectedTags,setSelectedTags] = useState([])

  const [state,setState] = useState(initialState);

  const [loadedData1,setLoadedData1] = useState(false);
  const [loadedData2,setLoadedData2] = useState(false);
  const [loadedData3,setLoadedData3] = useState(false);
  const [loadedData4,setLoadedData4] = useState(false);
  const [loadedData5,setLoadedData5] = useState(false);
  const [loadedData6,setLoadedData6] = useState(false);

  const {name,age,gender,country,height,weight,contributions,languages,skin_color,full_time,class_job,free_time,talents,wage,country_address,city_address,first_address,email,contact,imgUrl,role,tags,imgName1,imgName2,imgName3,imgName4,imgName5} = state;

  const navigate = useNavigate();

  const {id} = useParams();

  const [file,setFile] = useState(null);
  const [progress,setProgress] = useState(null);
  const [isSubmit,setIsSubmit] = useState(null);

  useEffect(()=> {
    console.log("state",state)
  },[state]);

  useEffect(()=> {
      axios.get(`/api/get/${id}`).then((resp) => {
      setState({...resp.data[0]})
      console.log("data",resp.data)
      setFile1Name(state.imgName1)
      setFile2Name(state.imgName2)
      setFile3Name(state.imgName3)
      setFile4Name(state.imgName4)
      setFile5Name(state.imgName5)
      setVideoName(state.videoName)
      //console.log("images",file1Name,file2Name,file3Name,file4Name,file5Name,videoName)
    })
  }, [id])

  useEffect(()=> {
    setSelectedTags(selectedTags);
    setState({...state, ["tags"]:selectedTags.toString()});
    //console.log("state", selectedTags)
  },[selectedTags])

  useEffect(()=> {
    setSelectedLanguages(selectedLanguages);
    setState({...state, ["languages"]:selectedLanguages.toString()});
  },[selectedLanguages])

  const uploadImagesToServer = async () => {
    if(image1) {
      const res1 = await axios.post('/image-upload', image1).finally(()=> setLoadedData1(true));
      setFile1Name(res1.data);
    } else {
      setFile1Name(state.imgName1)
    }
    if(image2) {
      const res2 = await axios.post('/image-upload', image2).finally(()=> setLoadedData2(true));
      setFile2Name(res2.data);
    } else {
      setFile2Name(state.imgName2)
    }
    if(image3) {
      const res3 = await axios.post('/image-upload', image3).finally(()=> setLoadedData3(true));
      setFile3Name(res3.data);
    } else {
      setFile3Name(state.imgName3)
    }
    if(image4) {
      const res4 = await axios.post('/image-upload', image4).finally(()=> setLoadedData4(true));
      setFile4Name(res4.data);
    } else {
      setFile4Name(state.imgName4)
    }
    if(image5) {
      const res5 = await axios.post('/image-upload', image5).finally(()=> setLoadedData5(true));
      setFile5Name(res5.data);
    } else {
      setFile5Name(state.imgName5)
    }
    
  }
  const uploadVideosToServer = async () => {
    if(video) {
      const res6 = await axios.post('/image-upload',video).finally(()=> setLoadedData6(true))
      setVideoName(res6.data);
    } else {
      setVideoName(state.videoName)
    }
  }

  useEffect(()=> {
    //console.log("images",file1Name,file2Name,file3Name,file4Name,file5Name,videoName)
  },[file1Name,file2Name,file3Name,file4Name,file5Name,videoName]);

  const handleSubmit = async (e) => {
    e.preventDefault();    
    //console.log("FILE NAMES",file1Name,file2Name,file3Name,file4Name,file5Name);
    if(!name || !email || !contact) {
      toast.error("please fill everything");
    } else {
      if(!id) {
        axios
        .post("/api/post", {name,age,gender,country,height,weight,contributions,languages,skin_color,full_time,free_time,class_job,free_time,talents,wage,country_address,city_address,first_address,email,contact,imgUrl,role,tags,file1Name,file2Name,file3Name,file4Name,file5Name,videoName
        }).then(() => {
          setState({name: "", age: "", country: "",height:"",weight: "",contributions:"",languages:"",skin_color:"",full_time:"",free_time:"",class_job:"",talents:"",wage:"",address_country:"",address_city:"",address:"",email: "", contact:"",imgUrl:"",role:"",tags:"",file1Name:"",file2Name:"",file3Name:"",file4Name:"",file5Name:"",});
        }).catch((err) => toast.error(err.response.data));
        toast.success(`${name} was susccefuly added`);
        setIsSubmit(true);
        //navigate('/home')
      } else {
        //console.log("file 1 final",file1Name)
        axios
        .put(`/api/update/${id}`, {
          name,age,gender,country,height,weight,contributions,languages,skin_color,full_time,free_time,class_job,free_time,talents,wage,country_address,city_address,first_address,email,contact,imgUrl,role,tags,file1Name,file2Name,file3Name,file4Name,file5Name,videoName
        }).then(() => {
          setState({name: "", age: "", country: "",height:"",weight: "",contributions:"",languages:"",skin_color:"",full_time:"",free_time:"",class_job:"",talents:"",wage:"",address_country:"",address_city:"",address:"",email: "", contact:"",imgUrl:"",role:"",tags:""});
        }).catch((err) => {
          if(err) {
            //console.log(err);
            toast.error(err.response.data)
          }
        });
        toast.success(`${name} was susccefuly updated`);
          navigate('/home'); 
      } 
    }
  }

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setState({...state,[name]:value})
    //console.log(state)
  }

  const handleCountryInputChange = (country) => {
    //console.log(country);
    setState({...state, ["country"]:country.label})
  }

  const handleSkinColorInputChange = (color) => {
    setState({...state, ["skin_color"]:color.value})
  }

  const handleLangaugeInputChange = (langs) => {
    let result = langs.map(a=>a.label === 'اخرى'? addOther(a): removeOther(a)).filter(function(item){
      return typeof item ==='string';  
    });
    //console.log("r4sult",result)
    setSelectedLanguages(result)
    setState({...state,["languages"]:result.toString()})
  }

  function removeOther(a) {
    setOtherLangBool(false)
    return a.label
  }

  function addOther(a){
    setOtherLangBool(true)
    return otherLang
  }

  const handleSelectChange = (e) => {
    //console.log(e.target.value)
    setSelectedRole(e.target.value);
    setState({...state,["role"]:e.target.value})
  }

  //images functions 
  const handleImageInputChange1 = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setImg1Prev(reader.result);
      };
      reader.readAsDataURL(file);
    };
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    console.log("1",e.target.files[0].name)
    setImage1(formData);
  }
  const handleImageInputChange2 = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setImg2Prev(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    console.log("2",e.target.files[0].name)
    setImage2(formData);
  }
  const handleImageInputChange3 = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setImg3Prev(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    console.log("3",e.target.files[0].name)
    setImage3(formData);
  }
  const handleImageInputChange4 = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setImg4Prev(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    console.log("4",e.target.files[0].name)
    setImage4(formData);
  }
  const handleImageInputChange5 = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader1 = new FileReader();
      let file = e.target.files[0];
      reader1.onloadend = () => {
        setImg5Prev(reader1.result);
      };
      reader1.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    console.log("5",e.target.files[0].name)
    setImage5(formData);
  }
  const handleVideoInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader1 = new FileReader();
      let file = e.target.files[0];
      reader1.onloadend = () => {
        setVideoPrev(reader1.result);
      };
      reader1.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    setVideo(formData);
    //console.log("video prev",videoPrev)
  }
  
  function isRequire(stateImage,prevImage) {
    //console.log("prev image",prevImage)
    if(stateImage) {
      if(prevImage) {
        return prevImage;
      } else {
        return `${process.env.REACT_APP_SERVER_URL}public/${stateImage?.replace(/ /g,"%20")}`;
      }
    } else {
      if(prevImage) {
        return prevImage;
      } else {
        console.log(`${process.env.REACT_APP_SERVER_URL}public/${stateImage}`);
        return `${process.env.REACT_APP_SERVER_URL}public/${stateImage?.replace(/ /g,"%20")}`;
      }
    }
  }
  function isRequireVid(stateVideo,prevVideo) {
    if(stateVideo) {
      if(prevVideo) {
        return prevVideo;
      } else {
        return `../uploaded_images/${stateVideo}`
      }
    } else {
      if(prevVideo) {
        return prevVideo;
      } else {
        return ""
      }
    }
  } 
  
  return (
    <div className='app__add' dir='rtl'>
      <h1>اضف كاست</h1>
      <form 
        className='app__add-form'
        onSubmit={handleSubmit}
        id="a-form"

      >
      <div className='app__add-box'>
        <label htmlFor='name'>الإسم</label>
          <input 
          type="text"
          id='name'
          name='name'
          placeholder="مثال: عبدالله الغامدي"
          value={name || ""}
          onChange={handleInputChange}
          />
          
          <label >الجنس</label>
          <div className='radio-buttons'>
          <div >
            <input type="radio" id="gender-male" name="gender" value="ذكر" onChange={handleInputChange} checked={state.gender === "ذكر"}/>    
            <label htmlFor="gender-male">ذكر</label>      
          </div>

          <div>
            <input type="radio" id="gender-female" name="gender" value="انثى" onChange={handleInputChange} checked={state.gender === "انثى"}/>
            <label >انثى</label>
          </div>
          </div>

          

          <label htmlFor='height'>(in cm) الطول</label>
          <input 
          type="number"
          id='height'
          name='height'
          placeholder="مثال: 175"
          value={height || ""}
          onChange={handleInputChange}
          />

          <label htmlFor='weight'>(in kg) الوزن</label>
          <input 
          type="number"
          id='weight'
          name='weight'
          placeholder="مثال: 70"
          value={weight || ""}
          onChange={handleInputChange}
          />


          <label htmlFor='email'>البريد الإلكتروني</label>
          <input 
          type="email"
          id='email'
          name='email'
          placeholder="productions@hero.com"
          value={email || ""}
          onChange={handleInputChange}
          />
          
          <label htmlFor='contact'>رقم الهاتف</label>
          <input 
          type="number"
          id='contact'
          name='contact'
          placeholder='05X XXX XX XX'
          value={contact || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='country'>لون البشرة</label>
          <Select options={skinColors} name='country' className='select-country' onChange={handleSkinColorInputChange} styles={{color:"black"}} placeholder={skin_color}/>

          <label htmlFor='full-time'>التفرغ</label>
          <Select options={full_time_options} name='full_time' className='select-country' onChange={(e) => {
            setState({...state, ["full_time"]:e.value})
          }} styles={{color:"black"}} placeholder={full_time}/>

          <label htmlFor='class/job'>الصف/الوظيفة
          </label>
          <input 
          type="text"
          id='email'
          name='class_job'
          placeholder='الصف العاشر/محاسب'
          value={class_job || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='free_time'>أوقات الفراغ بالغالب</label>
          <input 
          type="text"
          id='email'
          name='free_time'
          placeholder='ايام الاسبوع مساءً'
          value={free_time || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='upload_images'>رفع الصور</label>
          <div className='images-wrapper'>
            <div className='image-upload-container'>
              <label htmlFor="img1">
                <AiOutlinePlus className='plus-sign'  style={{
                backgroundImage: `url(${isRequire(state.imgName1,img1Prev)})`,
                backgroundPosition: 'center'
              }}/>
              </label >
              <input type="file" name="image1" accept="image/*" multiple={false} onChange={handleImageInputChange1} id="img1"  />
            </div>

            <div className='image-upload-container '>
              <label htmlFor="img2">
                <AiOutlinePlus className='plus-sign'  style={{
                backgroundImage: `url(${isRequire(state.imgName2,img2Prev)})`,
                backgroundPosition: 'center'
              }}/>
              </label >
              <input type="file" name="image2" accept="image/*" multiple={false} onChange={handleImageInputChange2} id="img2" />
            </div>

            <div className='image-upload-container grid5'>
              <label htmlFor="img3">
                <AiOutlinePlus className='plus-sign'  style={{
                backgroundImage: `url(${isRequire(state.imgName3,img3Prev)})`,
                backgroundPosition: 'center'
              }}/>
              </label >
              <input type="file" name="image3" accept="image/*" multiple={false} onChange={handleImageInputChange3} id="img3"  />
            </div>

            <div className='image-upload-container '>
              <label htmlFor="img4">
                <AiOutlinePlus className='plus-sign'  style={{
                backgroundImage: `url(${isRequire(state.imgName4,img4Prev)})`,
                backgroundPosition: 'center'
              }}/>
              </label >
              <input type="file" name="image4" accept="image/*" multiple={false} onChange={handleImageInputChange4} id="img4"  />
            </div>

            <div className='image-upload-container'>
              <label htmlFor="img5">
                <AiOutlinePlus className='plus-sign'  style={{
                backgroundImage: `url(${isRequire(state.imgName5,img5Prev)})`,
                backgroundPosition: 'center'
              }}/>
              </label >
              <input type="file" name="image5" accept="image/*" multiple={false} onChange={handleImageInputChange5} id="img5"  />
            </div>
            <button type='button' onClick={uploadImagesToServer} className='submit-btn'>رفع الصور</button>
          </div>
          </div>
          <div className='app__add-box'>
        <label htmlFor='age'>العمر</label>
          <input 
          type="number"
          id='age'
          name='age'
          placeholder='21'
          value={age || ""}
          onChange={handleInputChange}
          />

          <label htmlFor='contributions'>مشاركات سابقة</label>
          <textarea 
          rows="5" cols="60"
          id='contributions'
          name='contributions'
          placeholder='مسلسل شباب البومب'
          value={contributions || ""}
          onChange={handleInputChange}
          />

          <label htmlFor='country'>الجنسية</label>
          <Select options={countries} name='country' className='select-country' onChange={handleCountryInputChange} styles={{color:"black"}} placeholder={country}/>

          <label htmlFor='languages'>اللغات</label>
          <Select options={langaugesOptions} name='languages' className='select-langauge'  onChange={handleLangaugeInputChange} styles={{color:"black"}} placeholder={state.langauges || ""} isMulti />
          
          {otherLangBool && <div><label htmlFor='age'>لغات اخرى</label>
          <input 
          required
          type="text"
          id='age'
          name='age'
          placeholder="فرنسي"
          value={otherLang || ""}
          onChange={(e) => setOtherLang(e.target.value)}
          /></div>}
          <label htmlFor='tags'>علامات البحث</label>
          <div className='tags-container'>
          <TagsInput
            value={selectedTags}
            onChange={setSelectedTags}
            name="tags"
            placeHolder={state.tags||"علامات البحث"}
            id="tags-input"
          />
          </div>

          <label htmlFor='talents'>المواهب</label>
          <Select options={talent_options} name='full_time' className='select-country' onChange={(e) => {
            setState({...state, ["talents"]:e.value})
          }} styles={{color:"black"}} placeholder={talents}/>

          <label htmlFor='wage'>الأجر الحالي (بالأردور)
          </label>
          <input 
          type="number"
          id='email'
          name='wage'
          placeholder="الاجر بالريال على كل عمل"
          value={wage || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='address'>العنوان</label>
          <div className='address'>
          <input 
          type="text"
          id='email'
          name='country_address'
          placeholder='البلد'
          value={state.country_address || ""}
          onChange={handleInputChange}
          />
          <input 
          type="text"
          id='email'
          name='city_address'
          placeholder='المدينة'
          value={state.city_address || ""}
          onChange={handleInputChange}
          />
          </div>
          <textarea 
          style={{marginTop:"20px"}}
          rows="5" cols="60"
          id='contributions'
          name='first_address'
          placeholder='عنوان'
          value={state.first_address || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='vid'>رفع فيديو
          </label>
          <input type="file" name="vid" accept="video/mp4,video/x-m4v,video/*"multiple={false} onChange={handleVideoInputChange} id="vid" className='video-upload-input' />
          {/*<video controls width="100%">
            <source src={videoPrev} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
        </video>*/}
            <p> الفيديو الحالي{  " "+state.videoName}</p>
            <button type='button' onClick={uploadVideosToServer} className='submit-btn'>رفع الفيديو</button>
            <p>*الرجاء النقر على رفع الصور والفيديو حتى لو لم يتم تعديلها لحفظ الملفات السابقة</p>
      </div>
      </form>
      <input type="submit" form="a-form" value={id ? "تحديث" : "اضافة كاست"} className="submit-btn"/>
          <Link to="/home">
            <input type="button" value="العودة" className='back-btn'/>
          </Link>
          <img src={'localhost:5000/sushi.jpg'} width='100px' height='100px'/>
    </div>
  )
}

export default AddCust