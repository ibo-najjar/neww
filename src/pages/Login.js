import axios from 'axios';
import React, {useState, useEffect} from 'react'
import './Login.scss'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/smalllogo.png'

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  //const [loginStatus,setLoginStatus] = useState(false); 

  axios.defaults.withCredentials = true; //important

  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {
    axios.post("/login", {
      username: username,
      password: password,
    }).then((response) => {
      if(response.data.message) {
        //setLoginStatus(false);
        toast.error(response.data.message)
      } else {
        localStorage.setItem("token",response.data.token);
        navigate('/home');
        //setLoginStatus(true);
        console.log(response.data.result[0])
        toast.success(`logged in as${response.data.result[0].username}`);
      }
    })
  }

  useEffect(()=> {
    axios.get("/login").then((response)=>{
      
      if(response.data.loggedIn == true) {
        //setLoginStatus(response.data.user[0].username)
      }
      
    })
  },[])

  return (
    <div className='app__login'>
      <div className='app__login-form'>
        <div className='login-logo'>
          <img height='100%' width='100%' src={logo}/>
        </div>
        <h1>تسجيل دخول</h1>
      <input 
        type="text"
        placeholder='username...'
        onChange={(e)=> {
          setUsername(e.target.value);
        }}
      />
      <input 
        type="password"
        placeholder='password...'
        onChange={(e)=> {
          setPassword(e.target.value);
        }}
      />
      <button onClick={login}>تسجيل دخول</button>
      <p>الموقع ليس للاستخدام العام</p>

      </div>
      
    </div>
  )
}

export default Login