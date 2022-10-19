import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS
import Nav from "../components/Nav/Nav";
import "./Table.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import ProfileImage from "../components/ProfileImage/ProfileImage.js";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import ViewModal from "../components/ViewModal/ViewModal";
import noPic from "../assets/nopic.png";
import ArabicNormalize from "../utils/ArabicNormalize";
import countries from "../utils/countries";
import TopNav from "../components/TopNav/TopNav";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";

const initialState = {
  name: "",
  age: [0, 100],
  country: "",
  height: [0, 250],
  weight: [0, 250],
  langauges: "",
  skin_color: "",
  full_time: "",
  class_job: "",
  country_address: "",
  city_address: "",
  talents: "",
  wage: [0, 100000],
  tags: "",
  gender: "",
};

const skinColors = [
  { value: "أبيض", label: "أبيض" },
  { value: "فاتح", label: "فاتح" },
  { value: "حنطي", label: "حنطي" },
  { value: "أسمر", label: "أسمر" },
  { value: "أسود", label: "أسود" },
];

const initOrderState = {
  order_key: "",
  order_name: "",
};

const full_time_options = [
  { value: "طالب", label: "طالب" },
  { value: "موظف", label: "موظف" },
  { value: "عاطل", label: "عاطل" },
];

const talents_options = [
  { value: "تمثيل", label: "تمثيل" },
  { value: "غناء", label: "غناء" },
  { value: "رقص", label: "رقص" },
  { value: "القاء", label: "القاء" },
];

const genderOptions = [
  { value: "ذكر", label: "ذكر" },
  { value: "انثى", label: "انثى" },
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};

const Table = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [ordersToDelete, setOrdersToDelete] = useState([]);
  const [newSelected, setNewSelected] = useState([]);
  const gridRef = useRef();
  const [state, setState] = useState(initialState);

  const [orderState, setOrderState] = useState(initOrderState);
  const { id } = useParams();

  const [query, setQuery] = useState("");

  //Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState({});

  const loadData = async () => {
    const response = await axios.get(`/api/get?q=${query}`);
    setData(response.data);
    //console.log(data)
  };

  useEffect(() => {
    loadData();
    //console.log(orderId)
  }, [query]);
  useEffect(() => {
    //console.log(state);
  }, [state]);

  //reloads on refresh
  async function getSelectedCasts() {
    const resp = await axios.get(`/api/get-orders/${id}`);
    setOrderState({ ...resp.data[0] });
  }

  useEffect(() => {
    getSelectedCasts();
    setNewSelected(orderState.casts_ordered);
  }, [id]);

  const handleOrderNameChange = (e) => {
    setOrderState({ ...orderState, ["order_name"]: e.target.value });
    //console.log(orderState);
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "معاينة",
      field: "view",
      cellRenderer: (params) => (
        <div>
          <GrView
            className="btn btn-view"
            onClick={() => {
              openModal();
              setCurrentId(params.data);
            }}
          />
        </div>
      ),

      minWidth: 40,
      maxWidth: 80,
      filter: false,
    },
    { headerName: "المدينة", field: "city_address" },
    { headerName: "السعر", field: "wage" },

    {
      headerName: "الاسم",
      field: "name",
      filter: true,
      minWidth: 40,
      maxWidth: 200,
    },
    { field: "id", filter: false, minWidth: 40, maxWidth: 80 },
    {
      headerName: "",
      field: "img",
      cellRenderer: ProfileImage,
      minWidth: 40,
      maxWidth: 80,
      filter: false,
      sortable: false,
    },
    {
      headerName: "select",
      field: "select",
      headerCheckboxSelection: false,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      minWidth: 40,
      maxWidth: 50,
      headerClass: "ag-left-aligned-header",
      filter: false,
      sortable: false,
    },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    autoHeight: true,
  }));

  const onSelectionChanged = (e) => {
    //console.log(e.api.getSelectedRows());
    setSelected(e.api.getSelectedRows());
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const ordersArray = selected.map((key) => key.id);
    const casts_ordered = orderState.casts_ordered;
    const order_name = orderState.order_name;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    if (!orderState.order_name) {
      toast.error("please choose order name");
    } else {
      if (!id) {
        //console.log("id", id);
        axios
          .post("/api/post-order", {
            order_name,
            ordersArray,
            today,
          })
          .then(() => {
            setOrderState({ order_key: "", order_name: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success(`${order_name} was susccefuly added`);
        //navigate('/home')
      } else {
        axios
          .put(`/api/update-order/${orderState.order_key}`, {
            ordersArray,
            order_name,
            casts_ordered,
            today,
            ordersToDelete,
          })
          .then(() => {
            setOrdersToDelete([]);
          })
          .catch((err) => toast.error(err.response.data));
        toast.success(`${order_name} was susccefuly updated`);
      }
    }
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    //console.log("state: ", state);
  };
  const handleCountryInputChange = (e, val) => {
    //console.log(val, e);
    setState({ ...state, ["country"]: val });
  };
  const handleGenderInputChange = (e, val) => {
    //console.log(val, e);
    setState({ ...state, ["gender"]: val });
  };
  const handleFullTimeInputChange = (e, val) => {
    //console.log(val, e);
    setState({ ...state, ["full_time"]: val });
  };
  const handleTalentsInputChange = (e, val) => {
    //console.log(val, e);
    setState({ ...state, ["talents"]: val });
  };
  const handleSkinColorChange = (e, val) => {
    //console.log(val, e);
    setState({ ...state, ["skin_color"]: val });
  };
  const handleRangeChange = (e, val) => {
    //console.log(val, e);
    setState({ ...state, [e.target.name]: val });
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  });

  const wageLabelFormat = (e) => {
    //console.log("yooo", e);
    return formatter.format(e);
  };

  function isEmpty(str) {
    //console.log(str);
    return str?.toString() || "";
  }

  function isZero(num) {
    return num ? num : 0;
  }

  function search(rows) {
    //console.log(rows);
    try {
      return rows.filter(
        (row) =>
          !orderState.casts_ordered?.includes(row.id) &&
          isEmpty(ArabicNormalize(row.name))
            .toLowerCase()
            .indexOf(ArabicNormalize(state.name.toLowerCase())) > -1 &&
          isEmpty(row.langauges)
            .toLowerCase()
            .indexOf(state.langauges.toLowerCase()) > -1 &&
          isZero(row.age) >= parseInt(state.age[0], 10) &&
          isZero(row.age) <= parseInt(state.age[1], 10) &&
          isZero(row.wage) >= parseInt(state.wage[0], 10) &&
          isZero(row.wage) <= parseInt(state.wage[1], 10) &&
          isZero(row.height) >= parseInt(state.height[0], 10) &&
          isZero(row.height) <= parseInt(state.height[1], 10) &&
          isZero(row.weight) >= parseInt(state.weight[0], 10) &&
          isZero(row.weight) <= parseInt(state.weight[1], 10) &&
          isEmpty(row.country)
            .toLowerCase()
            .indexOf(state.country.toLowerCase()) > -1 &&
          isEmpty(ArabicNormalize(row.langauges ? row.langauges : ""))
            .toLowerCase()
            .indexOf(ArabicNormalize(state.langauges).toLowerCase()) > -1 &&
          ArabicNormalize(isEmpty(row.full_time))
            .toLowerCase()
            .indexOf(state.full_time.toLowerCase()) > -1 &&
          ArabicNormalize(isEmpty(row.country_address))
            .toLowerCase()
            .indexOf(ArabicNormalize(state.country_address).toLowerCase()) >
            -1 &&
          ArabicNormalize(isEmpty(row.city_address))
            .toLowerCase()
            .indexOf(state.city_address.toLowerCase()) > -1 &&
          ArabicNormalize(isEmpty(row.talents))
            .toLowerCase()
            .indexOf(ArabicNormalize(state.talents).toLowerCase()) > -1 &&
          ArabicNormalize(isEmpty(row.tags))
            .toLowerCase()
            .indexOf(ArabicNormalize(state.tags).toLowerCase()) > -1 &&
          isEmpty(row.gender).toLowerCase().indexOf(state.gender) > -1 &&
          isEmpty(row.skin_color).toLowerCase().indexOf(state.skin_color) >
            -1 &&
          ArabicNormalize(isEmpty(row.class_job))
            .toLowerCase()
            .indexOf(ArabicNormalize(state.class_job.toLowerCase())) > -1
      );
    } catch (err) {
      console.log("error", err);
    }
  }
  function searchSelected(rows) {
    //console.log("selected orders",orderState.casts_ordered)
    //console.log("rows",rows)
    return rows.filter((row) => orderState.casts_ordered?.includes(row.id));
    //console.log("rows after",rows)
  }

  function deselectCast(value) {
    if (selected.length > 0) {
      toast.error("please update selected changes before deleting");
      return;
    }
    setOrderState({
      ...orderState,
      ["casts_ordered"]: orderState.casts_ordered.filter(
        (item) => item !== value.id
      ),
    });
    toast.success(`${value.id} has been deleted from your order`);
  }

  const handleResetAll = () => {
    setState(initialState);
  };

  return (
    <>
      <TopNav />
      <div className="app__home">
        <div className="app__header"></div>
        <Nav />
        <div className="app__main" dir="rtl">
          <div className="search-box">
            <div className="search-box-texts">
              <div className="input-wrapper">
                <label htmlFor="name-search">اسم</label>
                <TextField
                  id="name-search"
                  name="name"
                  type="search"
                  fullWidth
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-wrapper">
                <label>جنسية</label>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  name="country"
                  onInputChange={handleCountryInputChange}
                  options={countries}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                    />
                  )}
                />
              </div>
              <div className="input-wrapper">
                <label>جنس</label>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  name="gender"
                  onInputChange={handleGenderInputChange}
                  options={genderOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                    />
                  )}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="lang-search">اللغة</label>
                <TextField
                  id="lang-search"
                  name="langauges"
                  type="search"
                  fullWidth
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-wrapper">
                <label>التفرغ</label>
                <Autocomplete
                  fullWidth
                  disablePortal
                  freeSolo
                  name="full_time"
                  id="full_time-search"
                  options={full_time_options}
                  onInputChange={handleFullTimeInputChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      name="full_time"
                    />
                  )}
                />
              </div>
              <div className="input-wrapper">
                <label>البلد</label>
                <TextField
                  id="country_address-search"
                  name="country_address"
                  type="search"
                  fullWidth
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-wrapper">
                <label>المدينة</label>
                <TextField
                  id="city-search"
                  name="city_address"
                  type="search"
                  fullWidth
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-wrapper">
                <label>الموهبة</label>
                <Autocomplete
                  fullWidth
                  disablePortal
                  freeSolo
                  name="talents"
                  id="talents-search"
                  options={talents_options}
                  onInputChange={handleTalentsInputChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      name="talents"
                    />
                  )}
                />
              </div>

              <div className="input-wrapper">
                <label>لون البشرة</label>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  name="skin_color"
                  onInputChange={handleSkinColorChange}
                  options={skinColors}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                    />
                  )}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="class_job-search">الصف / الوظيفة</label>
                <TextField
                  id="class_job-search"
                  name="class_job"
                  type="search"
                  fullWidth
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="search-box-ranges">
              <div>
                <div className="range-container">
                  <label>العمر</label>
                  <Slider
                    getAriaLabel={() => "age"}
                    defaultValue={[0, 100]}
                    min={0}
                    max={100}
                    name="age"
                    valueLabelDisplay="on"
                    onChange={handleRangeChange}
                    color="secondary"
                  />
                </div>
                <div className="range-container">
                  <label>wage</label>
                  <Slider
                    getAriaLabel={() => "wage"}
                    defaultValue={[0, 10000]}
                    step={100}
                    min={0}
                    max={10000}
                    name="wage"
                    valueLabelDisplay="on"
                    valueLabelFormat={wageLabelFormat}
                    onChange={handleRangeChange}
                    color="secondary"
                  />
                </div>
                <div className="range-container">
                  <label>height</label>
                  <Slider
                    getAriaLabel={() => "height"}
                    defaultValue={[0, 250]}
                    step={1}
                    min={0}
                    max={250}
                    name="height"
                    valueLabelDisplay="on"
                    onChange={handleRangeChange}
                    color="secondary"
                  />
                </div>
                <div className="range-container">
                  <label>weight</label>
                  <Slider
                    getAriaLabel={() => "wage"}
                    defaultValue={[0, 250]}
                    step={1}
                    min={0}
                    max={250}
                    name="weight"
                    valueLabelDisplay="on"
                    onChange={handleRangeChange}
                    color="secondary"
                  />
                </div>
                <div className="input-wrapper">
                  <label>علامات البحث</label>
                  <TextField
                    id="tags-search"
                    name="tags"
                    type="search"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </div>
                <button onClick={handleResetAll}>reset</button>
              </div>
            </div>
          </div>
          <div className="ag-theme-material" style={{ height: 793 }}>
            <AgGridReact
              rowClass={"ag-grid__table-custom"}
              rowHeight={80}
              ref={gridRef}
              suppressRowClickSelection={true}
              rowData={search(data)}
              rowSelection={"multiple"}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              onSelectionChanged={onSelectionChanged}
              pagination={true}
              paginationPageSize={0}
              paginationAutoPageSize={true}
            />
          </div>
          <div className="order-box">
            <form>
              {/*JSON.stringify(selected.map(key=>key.id))*/}
              {/*orderState.casts_ordered?.join('-')*/}

              <label htmlFor="group-name">order name</label>
              <input
                type="text"
                id="groupname"
                name="groupname"
                placeholder="enter your order name"
                value={orderState.order_name || ""}
                onChange={handleOrderNameChange}
              ></input>
              <Link to={id ? "/orders" : "/table"}>
                <button id="order-button" onClick={handleOrderSubmit}>
                  {id ? "update" : "add to order"}
                </button>
              </Link>
            </form>
            <div className="selected-orders_table_wrapper">
              <h3>your orders</h3>
              <table className="selected-orders_table">
                <thead>
                  <tr>
                    <th>صورة</th>
                    <th>الاسم</th>
                    <th>السعر</th>
                    <th>المدينة</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {searchSelected(data).map((value, key) => {
                    return (
                      <tr key={key} className="table-row">
                        <td id="image">
                          <div className="app__ProfileImage-selected">
                            <img
                              width="100%"
                              height="100%"
                              src={value.imageName4 ? value.imageName4 : noPic}
                            />
                          </div>
                        </td>
                        <td>
                          {value.name}_{value.id}
                        </td>
                        <td>20,000$</td>
                        <td>المدينة المنورة</td>
                        <td>
                          <FiTrash2
                            className="btn btn-delete"
                            onClick={() => deselectCast(value)}
                          >
                            delete
                          </FiTrash2>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
            ariaHideApp={false}
          >
            <AiOutlineClose id="close-icon" onClick={closeModal} />
            <ViewModal data={currentId} />
          </Modal>
        </div>
        <div className="app__footer"></div>
      </div>
    </>
  );
};

export default Table;
