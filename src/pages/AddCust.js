import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddCust.scss";
import axios from "axios";
import { toast } from "react-toastify";
import countries from "../utils/countries";
import { AiOutlinePlus } from "react-icons/ai";
import {
  TextField,
  InputAdornment,
  FormHelperText,
  Autocomplete,
  Select as MuiSelect,
  Chip,
} from "@mui/material";
import RadioInputs from "../components/Controls/RadioInputs";
import SelectInput from "../components/Controls/SelectInput";
import { v4 as uuidv4 } from "uuid";

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
  gender: "ذكر",
  languages: "",
}; //default values

const langaugesOptions = [
  { value: "english", label: "انجليزي" },
  { value: "arabic", label: "عربي" },
];

const skinColors = [
  { value: "أبيض", label: "أبيض" },
  { value: "فاتح", label: "فاتح" },
  { value: "حنطي", label: "حنطي" },
  { value: "أسمر", label: "أسمر" },
  { value: "أسود", label: "أسود" },
  { value: "", label: "" },
];

const full_time_options = [
  { value: "طالب", label: "طالب" },
  { value: "موظف", label: "موظف" },
  { value: "عاطل", label: "عاطل" },
];

const talent_options = [
  { value: "تمثيل", label: "تمثيل" },
  { value: "غناء", label: "غناء" },
  { value: "رقص", label: "رقص" },
  { value: "القاء", label: "القاء" },
];

const genderItems = [
  { id: "ذكر", title: "ذكر" },
  { id: "انثى", title: "انثى" },
];

const AddCust = () => {
  // file variables
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [video, setVideo] = useState(null);

  const [file1Name, setFile1Name] = useState("");
  const [file2Name, setFile2Name] = useState("");
  const [file3Name, setFile3Name] = useState("");
  const [file4Name, setFile4Name] = useState("");
  const [file5Name, setFile5Name] = useState("");
  const [videoName, setVideoName] = useState(null);

  const [img1Prev, setImg1Prev] = useState(null);
  const [img2Prev, setImg2Prev] = useState(null);
  const [img3Prev, setImg3Prev] = useState(null);
  const [img4Prev, setImg4Prev] = useState(null);
  const [img5Prev, setImg5Prev] = useState(null);
  const [videoPrev, setVideoPrev] = useState(null);

  const [selectedRole, setSelectedRole] = useState("");

  const [selectedTags, setSelectedTags] = useState([]);

  const [state, setState] = useState(initialState);

  const [loadedData1, setLoadedData1] = useState(false);
  const [loadedData2, setLoadedData2] = useState(false);
  const [loadedData3, setLoadedData3] = useState(false);
  const [loadedData4, setLoadedData4] = useState(false);
  const [loadedData5, setLoadedData5] = useState(false);
  const [loadedData6, setLoadedData6] = useState(false);

  const {
    name,
    age,
    gender,
    country,
    height,
    weight,
    contributions,
    languages,
    skin_color,
    full_time,
    class_job,
    free_time,
    talents,
    wage,
    country_address,
    city_address,
    first_address,
    email,
    contact,
    imgUrl,
    role,
    tags,
    imgName1,
    imgName2,
    imgName3,
    imgName4,
    imgName5,
    mediaKey,
  } = state;

  const navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isSubmit, setIsSubmit] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    setMediaUrl(Date.now());
  }, []);

  useEffect(() => {
    console.log("state", state);
    //console.log(state.mediaKey);
    //console.log(state.mediaKey);
  }, [state]);

  useEffect(() => {
    axios.get(`/api/get/${id}`).then((resp) => {
      setState({ ...resp.data[0] });
      //console.log("data", resp.data);
      setFile1Name(state.imgName1);
      setFile2Name(state.imgName2);
      setFile3Name(state.imgName3);
      setFile4Name(state.imgName4);
      setFile5Name(state.imgName5);
      setVideoName(state.videoName);
      //console.log("images",file1Name,file2Name,file3Name,file4Name,file5Name,videoName)
    });
  }, [id]);

  useEffect(() => {
    setSelectedTags(selectedTags);
    setState({ ...state, ["tags"]: selectedTags.toString() });
    //console.log("state", selectedTags)
  }, [selectedTags]);

  const uploadImagesToServer = async () => {
    if (image1) {
      // console.log(image1.getAll());
      console.log(image1.values);
      const res1 = await axios
        .post("/image-upload", image1)
        .finally(() => setLoadedData1(true));
      console.log(res1);
      setFile1Name(res1.data);
    } else {
      setFile1Name(state.imgName1);
    }
    if (image2) {
      const res2 = await axios
        .post("/image-upload", image2)
        .finally(() => setLoadedData2(true));
      setFile2Name(res2.data);
    } else {
      setFile2Name(state.imgName2);
    }
    if (image3) {
      const res3 = await axios
        .post("/image-upload", image3)
        .finally(() => setLoadedData3(true));
      setFile3Name(res3.data);
    } else {
      setFile3Name(state.imgName3);
    }
    if (image4) {
      const res4 = await axios
        .post("/image-upload", image4)
        .finally(() => setLoadedData4(true));
      setFile4Name(res4.data);
    } else {
      setFile4Name(state.imgName4);
    }
    if (image5) {
      const res5 = await axios
        .post("/image-upload", image5)
        .finally(() => setLoadedData5(true));
      setFile5Name(res5.data);
    } else {
      setFile5Name(state.imgName5);
    }
  };
  const uploadVideosToServer = async () => {
    if (video) {
      const res6 = await axios
        .post("/image-upload", video)
        .finally(() => setLoadedData6(true));
      setVideoName(res6.data);
    } else {
      setVideoName(state.videoName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      toast.error("please fill everything");
    } else {
      if (!id) {
        axios
          .post("/api/post", {
            name,
            age,
            gender,
            country,
            height,
            weight,
            contributions,
            languages,
            skin_color,
            full_time,
            free_time,
            class_job,
            free_time,
            talents,
            wage,
            country_address,
            city_address,
            first_address,
            email,
            contact,
            imgUrl,
            role,
            tags,
            file1Name,
            file2Name,
            file3Name,
            file4Name,
            file5Name,
            videoName,
            mediaUrl,
          })
          .then(() => {
            setState({
              name: "",
              age: "",
              country: "",
              height: "",
              weight: "",
              contributions: "",
              languages: "",
              skin_color: "",
              full_time: "",
              free_time: "",
              class_job: "",
              talents: "",
              wage: "",
              address_country: "",
              address_city: "",
              address: "",
              email: "",
              contact: "",
              imgUrl: "",
              role: "",
              tags: "",
              file1Name: "",
              file2Name: "",
              file3Name: "",
              file4Name: "",
              file5Name: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success(`${name} was susccefuly added`);
        setIsSubmit(true);
        //navigate('/home')
      } else {
        //console.log("file 1 final",file1Name)
        axios
          .put(`/api/update/${id}`, {
            name,
            age,
            gender,
            country,
            height,
            weight,
            contributions,
            languages,
            skin_color,
            full_time,
            free_time,
            class_job,
            free_time,
            talents,
            wage,
            country_address,
            city_address,
            first_address,
            email,
            contact,
            imgUrl,
            role,
            tags,
            file1Name,
            file2Name,
            file3Name,
            file4Name,
            file5Name,
            videoName,
          })
          .then(() => {
            setState({
              name: "",
              age: "",
              country: "",
              height: "",
              weight: "",
              contributions: "",
              languages: "",
              skin_color: "",
              full_time: "",
              free_time: "",
              class_job: "",
              talents: "",
              wage: "",
              address_country: "",
              address_city: "",
              address: "",
              email: "",
              contact: "",
              imgUrl: "",
              role: "",
              tags: "",
            });
          })
          .catch((err) => {
            if (err) {
              //console.log(err);
              toast.error(err.response.data);
            }
          });
        toast.success(`${name} was susccefuly updated`);
        navigate("/home");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    console.log("name", name, "value", value);
    setState({ ...state, [name]: value });
  };

  const handleCountryInputChange = (country) => {
    //console.log(country);
    setState({ ...state, ["country"]: country.label });
  };

  const handleSelectChange = (e) => {
    //console.log(e.target.value)
    setSelectedRole(e.target.value);
    setState({ ...state, ["role"]: e.target.value });
  };

  const handleInputLangChange = (e, data) => {
    setState({ ...state, ["languages"]: data.toString() });
  };
  const handleInputTalentsChange = (e, data) => {
    setState({ ...state, ["talents"]: data.toString() });
  };
  const handleInputTagsChange = (e, data) => {
    setState({ ...state, ["tags"]: data.toString() });
  };
  const handleInputCountryChange = (e, data) => {
    setState({ ...state, ["country"]: data });
  };

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
    }
    const formData = new FormData();
    console.log("first", e.target.files[0]);
    console.log("asddas", `${state.mediaKey}_1`);
    formData.append(
      "my-image-file",
      e.target.files[0],
      e.target.files[0].name + uuidv4()
    );
    //formData.append("hey", 1);
    setImage1(formData);
  };
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
    formData.append("my-image-file", e.target.files[0], id);
    console.log("2", e.target.files[0].name);
    setImage2(formData);
  };
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
    formData.append("my-image-file", e.target.files[0], e.target.files[0].name);
    console.log("3", e.target.files[0].name);
    setImage3(formData);
  };
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
    formData.append("my-image-file", e.target.files[0], e.target.files[0].name);
    console.log("4", e.target.files[0].name);
    setImage4(formData);
  };
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
    formData.append("my-image-file", e.target.files[0], e.target.files[0].name);
    console.log("5", e.target.files[0].name);
    setImage5(formData);
  };
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
    formData.append("my-image-file", e.target.files[0], e.target.files[0].name);
    setVideo(formData);
    //console.log("video prev",videoPrev)
  };

  function isRequire(stateImage, prevImage) {
    //console.log("prev image",prevImage)
    if (stateImage) {
      if (prevImage) {
        return prevImage;
      } else {
        return `${process.env.REACT_APP_SERVER_URL}public/${stateImage?.replace(
          / /g,
          "%20"
        )}`;
      }
    } else {
      if (prevImage) {
        return prevImage;
      } else {
        // console.log(`${process.env.REACT_APP_SERVER_URL}public/${stateImage}`);
        return `${process.env.REACT_APP_SERVER_URL}public/${stateImage?.replace(
          / /g,
          "%20"
        )}`;
      }
    }
  }
  function isRequireVid(stateVideo, prevVideo) {
    if (stateVideo) {
      if (prevVideo) {
        return prevVideo;
      } else {
        return `../uploaded_images/${stateVideo}`;
      }
    } else {
      if (prevVideo) {
        return prevVideo;
      } else {
        return "";
      }
    }
  }

  return (
    <div className="app__add" dir="rtl">
      <h1>اضف كاست</h1>
      {state.mediaKey + "osdf"}
      <form className="app__add-form" onSubmit={handleSubmit} id="a-form">
        <div className="app__add-box">
          <div className="formField">
            <label htmlFor="name">الإسم</label>
            <TextField
              type="name"
              id="name"
              name="name"
              value={name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="formField">
            <label>الجنس</label>
            <RadioInputs
              name="gender"
              label="gender"
              value={state.gender ? state.gender : ""}
              onChange={handleInputChange}
              items={genderItems}
            />
          </div>

          <div className="formField">
            <label htmlFor="height">الطول</label>
            <TextField
              type="number"
              id="height"
              name="height"
              placeholder=""
              value={height || ""}
              onChange={handleInputChange}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                startAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ marginRight: ".7rem" }}
                  >
                    cm
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="formField">
            <label htmlFor="weight">الوزن</label>
            <TextField
              type="number"
              id="weight"
              name="weight"
              value={weight || ""}
              onChange={handleInputChange}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                startAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ marginRight: ".7rem" }}
                  >
                    kg
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="formField">
            <label htmlFor="email">البريد الإلكتروني</label>
            <TextField
              type="email"
              id="email"
              name="email"
              placeholder="productions@hero.com"
              value={email || ""}
              onChange={handleInputChange}
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </div>
          <div className="formField">
            <label htmlFor="contact">رقم الهاتف</label>
            <TextField
              type="number"
              id="contact"
              name="contact"
              placeholder="05X XXX XX XX"
              value={contact || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="formField">
            <label htmlFor="country">لون البشرة</label>

            <SelectInput
              name="skin_color"
              value={skin_color || ""}
              options={skinColors}
              onChange={handleInputChange}
            />
          </div>
          <div className="formField">
            <label htmlFor="full-time">التفرغ</label>
            <SelectInput
              name="full_time"
              value={full_time || ""}
              options={full_time_options}
              onChange={handleInputChange}
            />
          </div>
          {(full_time === "طالب" || full_time === "موظف") && (
            <div className="formField">
              <label htmlFor="class_job">
                {full_time === "طالب" ? "الصف" : "الوظيفة"}
              </label>
              <TextField
                type="text"
                id="class_job"
                name="class_job"
                helperText={
                  full_time === "طالب"
                    ? "السنة الدراسية او التخصص الجامعي"
                    : "مهنة العمل"
                }
                value={class_job || ""}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="formField">
            <label htmlFor="free_time">أوقات الفراغ بالغالب</label>
            <TextField
              type="text"
              id="email"
              name="free_time"
              placeholder="ايام الاسبوع مساءً"
              value={free_time || ""}
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="upload_images">رفع الصور</label>
          <div className="images-wrapper">
            <div className="image-upload-container">
              <label htmlFor="img1">
                <AiOutlinePlus
                  className="plus-sign"
                  style={{
                    backgroundImage: `url(${isRequire(
                      state.imgName1,
                      img1Prev
                    )})`,
                    backgroundPosition: "center",
                  }}
                />
              </label>
              <input
                type="file"
                name="image1"
                accept="image/*"
                multiple={false}
                onChange={handleImageInputChange1}
                id="img1"
              />
              dsf
            </div>

            <div className="image-upload-container ">
              <label htmlFor="img2">
                <AiOutlinePlus
                  className="plus-sign"
                  style={{
                    backgroundImage: `url(${isRequire(
                      state.imgName2,
                      img2Prev
                    )})`,
                    backgroundPosition: "center",
                  }}
                />
              </label>
              <input
                type="file"
                name="image2"
                accept="image/*"
                multiple={false}
                onChange={handleImageInputChange2}
                id="img2"
              />
            </div>
            <div className="image-upload-container grid5">
              <label htmlFor="img3">
                <AiOutlinePlus
                  className="plus-sign"
                  style={{
                    backgroundImage: `url(${isRequire(
                      state.imgName3,
                      img3Prev
                    )})`,
                    backgroundPosition: "center",
                  }}
                />
              </label>
              <input
                type="file"
                name="image3"
                accept="image/*"
                multiple={false}
                onChange={handleImageInputChange3}
                id="img3"
              />
            </div>

            <div className="image-upload-container ">
              <label htmlFor="img4">
                <AiOutlinePlus
                  className="plus-sign"
                  style={{
                    backgroundImage: `url(${isRequire(
                      state.imgName4,
                      img4Prev
                    )})`,
                    backgroundPosition: "center",
                  }}
                />
              </label>
              <input
                type="file"
                name="image4"
                accept="image/*"
                multiple={false}
                onChange={handleImageInputChange4}
                id="img4"
              />
            </div>

            <div className="image-upload-container">
              <label htmlFor="img5">
                <AiOutlinePlus
                  className="plus-sign"
                  style={{
                    backgroundImage: `url(${isRequire(
                      state.imgName5,
                      img5Prev
                    )})`,
                    backgroundPosition: "center",
                  }}
                />
              </label>
              <input
                type="file"
                name="image5"
                accept="image/*"
                multiple={false}
                onChange={handleImageInputChange5}
                id="img5"
              />
            </div>
            <button
              type="button"
              onClick={uploadImagesToServer}
              className="submit-btn"
            >
              رفع الصور
            </button>
          </div>
        </div>
        <div className="app__add-box">
          <div className="formField">
            <label htmlFor="age">العمر</label>
            <TextField
              type="number"
              id="age"
              name="age"
              value={age || ""}
              onChange={handleInputChange}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
          </div>
          <div className="formField">
            <label htmlFor="contributions">مشاركات سابقة</label>
            <TextField
              multiline
              rows={4}
              id="contributions"
              name="contributions"
              value={contributions || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="formField">
            <label htmlFor="country">الجنسية</label>
            <Autocomplete
              freeSolo
              value={country || ""}
              name="country"
              id="country"
              onChange={handleInputCountryChange}
              options={countries.map((option) => option.label)}
              renderInput={(params) => <TextField name="country" {...params} />}
            />
          </div>

          <div className="formField">
            <label htmlFor="languages">اللغات</label>
            <Autocomplete
              multiple
              id="languages"
              name="languages"
              value={languages?.split(",") || [""]}
              options={langaugesOptions.map((option) => option.label)}
              freeSolo
              onChange={handleInputLangChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    style={{ width: "100px" }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="Favorites" />
              )}
            />
          </div>

          <div className="formField">
            <label htmlFor="tags">علامات البحث</label>
          </div>

          <div className="formField">
            <label htmlFor="talents">المواهب</label>
            <Autocomplete
              multiple
              id="talents"
              name="talents"
              value={talents?.split(",") || []}
              options={talent_options.map((option) => option.label)}
              freeSolo
              onChange={handleInputTalentsChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    style={{ width: "100px" }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} placeholder="talents" />
              )}
            />
          </div>
          <div className="formField">
            <label htmlFor="wage">الأجر الحالي</label>
            <TextField
              type="number"
              id="wage"
              name="wage"
              placeholder="الاجر بالريال على كل عمل"
              value={wage || ""}
              onChange={handleInputChange}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
          </div>
          <label htmlFor="address">العنوان</label>
          <div className="address">
            <TextField
              type="text"
              id="country_address"
              name="country_address"
              placeholder="البلد"
              value={country_address || ""}
              onChange={handleInputChange}
            />
            <TextField
              type="text"
              id="city_address"
              name="city_address"
              placeholder="المدينة"
              value={city_address || ""}
              onChange={handleInputChange}
            />
          </div>
          <TextField
            style={{ marginTop: "20px" }}
            multiline
            rows={4}
            fullWidth
            id="contributions"
            name="first_address"
            placeholder="عنوان"
            value={first_address || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="vid">رفع فيديو</label>
          <input
            type="file"
            name="vid"
            accept="video/mp4,video/x-m4v,video/*"
            multiple={false}
            onChange={handleVideoInputChange}
            id="vid"
            className="video-upload-input"
          />
          {/*<video controls width="100%">
            <source src={videoPrev} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
        </video>*/}
          <p> الفيديو الحالي{" " + state.videoName}</p>
          <button
            type="button"
            onClick={uploadVideosToServer}
            className="submit-btn"
          >
            رفع الفيديو
          </button>
          <p>
            *الرجاء النقر على رفع الصور والفيديو حتى لو لم يتم تعديلها لحفظ
            الملفات السابقة
          </p>
        </div>
      </form>
      <input
        type="submit"
        form="a-form"
        value={id ? "تحديث" : "اضافة كاست"}
        className="submit-btn"
      />
      <Link to="/home">
        <input type="button" value="العودة" className="back-btn" />
      </Link>
      <img src={"localhost:5000/sushi.jpg"} width="100px" height="100px" />
    </div>
  );
};

export default AddCust;
