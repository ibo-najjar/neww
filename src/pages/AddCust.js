import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddCust.scss";
import axios from "axios";
import { toast } from "react-toastify";
import countries from "../utils/countries";
import { AiOutlinePlus } from "react-icons/ai";
import { RiVideoUploadFill } from "react-icons/ri";
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
import LinearProgress from "@mui/material/LinearProgress";

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
  const postfix = {
    image1: "1",
    image2: "2",
    image3: "3",
    image4: "4",
    image5: "5",
    video: "video",
  };
  const [img1Prev, setImg1Prev] = useState(null);
  const [state, setState] = useState(initialState);
  const [loadedData1, setLoadedData1] = useState(true);

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
    mediaKey,
  } = state;

  const navigate = useNavigate();
  const { id } = useParams();
  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  useEffect(() => {
    axios.get(`/api/get/${id}`).then((resp) => {
      setState({ ...resp.data[0] });
    });
    if (!id) {
      setMediaUrl(Date.now());
    }
  }, [id]);

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
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success(`${name} was susccefuly added`);
        navigate("/home");
      } else {
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
    setState({ ...state, [name]: value });
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
  const handleImageInputChange1 = async (e) => {
    e.preventDefault();
    setLoadedData1(false);
    console.log("img postfix", postfix[e.target.name]);
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setImg1Prev(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append(
      "my-image-file",
      e.target.files[0],
      mediaUrl
        ? `${mediaUrl}_${postfix[e.target.name]}`
        : `${state.mediaKey}_${postfix[e.target.name]}`
    );
    console.log(`${state.mediaKey}_${postfix[e.target.name]}`);
    const res1 = await axios
      .post("/image-upload", formData)
      .finally(() => setLoadedData1(true));
    console.log(res1);
  };
  const handleVideoInputChange = async (e) => {
    e.preventDefault();
    setLoadedData1(false);
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setImg1Prev(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append(
      "my-video-file",
      e.target.files[0],
      mediaUrl ? `${mediaUrl}_video` : `${state.mediaKey}_video`
    );
    const res1 = await axios
      .post("/video-upload", formData)
      .finally(() => setLoadedData1(true));
    console.log(res1);
  };

  function isRequire(name) {
    return (
      `${process.env.REACT_APP_SERVER_URL}public/${
        mediaUrl ? mediaUrl : mediaKey
      }_${postfix[name]}.png?` + new Date().getTime()
    );
  }
  function isRequireVideo() {
    return (
      `${process.env.REACT_APP_SERVER_URL}public/${
        mediaUrl ? mediaUrl : mediaKey
      }_video.mp4?` + new Date().getTime()
    );
  }

  return (
    <div className="app__add" dir="rtl">
      <h1>اضف كاست</h1>
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
                    backgroundImage: "url(" + isRequire("image1") + ")",
                    backgroundPosition: "center",
                  }}
                />
                {console.log(
                  `${process.env.REACT_APP_SERVER_URL}public/${
                    mediaUrl ? mediaUrl : mediaKey
                  }_1.png`
                )}
              </label>
              <input
                type="file"
                name="image1"
                accept="image/*"
                multiple={false}
                onChange={handleImageInputChange1}
                id="img1"
              />
            </div>

            <div className="image-upload-container ">
              <label htmlFor="img2">
                <AiOutlinePlus
                  className="plus-sign"
                  style={{
                    backgroundImage: "url(" + isRequire("image2") + ")",
                    backgroundPosition: "center",
                  }}
                />
              </label>
              <input
                type="file"
                name="image2"
                accept="image/*"
                multiple={false}
                onChange={handleImageInputChange1}
                id="img2"
              />
            </div>
            <div className="image-upload-container grid5">
              <label htmlFor="img3">
                <AiOutlinePlus
                  className="plus-sign"
                  style={{
                    backgroundImage: "url(" + isRequire("image3") + ")",
                    backgroundPosition: "center",
                  }}
                />
              </label>
              <input
                type="file"
                name="image3"
                accept="image/*"
                multiple={false}
                id="img3"
                onChange={handleImageInputChange1}
              />
            </div>

            <div className="image-upload-container ">
              <label htmlFor="img4">
                <AiOutlinePlus
                  className="plus-sign"
                  style={{
                    backgroundImage: "url(" + isRequire("image4") + ")",
                    backgroundPosition: "center",
                  }}
                />
              </label>
              <input
                type="file"
                name="image4"
                accept="image/*"
                multiple={false}
                id="img4"
                onChange={handleImageInputChange1}
              />
            </div>

            <div className="image-upload-container">
              <label htmlFor="img5">
                <AiOutlinePlus
                  className="plus-sign"
                  style={{
                    backgroundImage: "url(" + isRequire("image5") + ")",
                    backgroundPosition: "center",
                  }}
                />
              </label>
              <input
                type="file"
                name="image5"
                accept="image/*"
                multiple={false}
                id="img5"
                onChange={handleImageInputChange1}
              />
            </div>
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
              value={languages?.split(",") || []}
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
            <Autocomplete
              multiple
              id="tags"
              name="tags"
              value={tags?.split(",") || []}
              options={langaugesOptions.map((option) => option.label)}
              freeSolo
              onChange={handleInputTagsChange}
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
                <TextField {...params} placeholder="tags" />
              )}
            />
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
          <div className="formField">
            <label htmlFor="vid">رفع فيديو</label>
            <button
              className="back-btn"
              type="button"
              style={{ width: "150px" }}
            >
              <label htmlFor="vid" style={{ fontWeight: "800" }}>
                تحميل الفيديو{" "}
                <RiVideoUploadFill style={{ marginRight: "5px" }} />
              </label>
            </button>

            <input
              type="file"
              name="video"
              accept="video/mp4"
              style={{ display: "none" }}
              multiple={false}
              onChange={handleVideoInputChange}
              id="vid"
              className="video-upload-input"
            />
          </div>
        </div>

        <div className="loadingBar">
          {!loadedData1 && <LinearProgress color="inherit" />}
        </div>
      </form>
      <div className="footer_buttons">
        <input
          type="submit"
          form="a-form"
          disabled={!loadedData1}
          value={id ? "تحديث" : "اضافة كاست"}
          className="submit-btn"
          style={{ marginLeft: "10px" }}
        />
        <Link to="/home">
          <input
            type="button"
            value="العودة"
            className="back-btn"
            style={{ marginRight: "10px" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default AddCust;
