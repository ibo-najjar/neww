import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [auth, setAuth] = useState({});

  const userAuth = async () => {
    await axios
      .get("/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        //console.log(response.data)
        setAuth(response.data.auth);
        //console.log("status",auth)
      });
  };

  useEffect(() => {
    userAuth();
  }, []);
  //console.log("auth",auth)

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
