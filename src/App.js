import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.js";
import AddCust from "./pages/AddCust";
import View from "./pages/View";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Table from "./pages/Table";
import Orders from "./pages/Orders";
import ViewOrder from "./pages/ViewOrder";
import axios from "axios";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#000",
    },
  },
});

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
//https://casts-server-wphs.vercel.app/
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/add" element={<AddCust />} />
            <Route exact path="/update/:id" element={<AddCust />} />
            <Route exact path="/table" element={<Table />} />
            <Route exact path="/edit-order/:id" element={<Table />} />
            <Route exact path="/orders" element={<Orders />} />
          </Route>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/view/:id" element={<View />} />
          <Route exact path="/view-order/:id" element={<ViewOrder />} />
        </Routes>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
