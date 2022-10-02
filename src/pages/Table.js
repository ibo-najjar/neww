import React,{useState,useEffect,useMemo,useRef} from 'react'
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import Nav from '../components/Nav/Nav';
import './Table.scss'
import {Link, useParams,useNavigate} from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import ProfileImage from '../components/ProfileImage/ProfileImage.js';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai'
import ViewModal from '../components/ViewModal/ViewModal';
import noPic from '../assets/nopic.png'
import ArabicNormalize from '../utils/ArabicNormalize';
import Select from 'react-select';
import countries from '../utils/countries';
import TopNav from '../components/TopNav/TopNav';

const initialState = {
  name: "",
  age_min: 0,
  age_max: 1000,
  country: "",
  height_min: 0,
  height_max: 1000,
  weight_min: 0,
  weight_max: 1000,
  langauges: "",
  skin_color: "",
  full_time: "",
  class_job: "",
  county_address: "",
  city_address: "",
  talents: "",
  wage_min: 0,
  wage_max: 1000,
  tags: ""
}

const initOrderState = {
  order_key: "",
  order_name: "",
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0
  },
};


const Table = () => {
  const [data,setData] = useState([]);
  const [selected,setSelected] = useState([]);
  const [ordersToDelete,setOrdersToDelete] = useState([]);
  const [newSelected,setNewSelected] = useState([]);
  const gridRef = useRef();
  const gridRef2 = useRef();
  const [state,setState] = useState(initialState);

  const [orderState, setOrderState] = useState(initOrderState);
  const {order_name, order_key,casts_ordered} = orderState
  const {id} = useParams();

  const [loaded,setLoaded] = useState(false)

  //const [heightRange,setHeightRange] = useState( {min: 0, max:200});

  const [value, setValue] = useState([1000, 4333])
  const [query, setQuery] = useState("");

  const [searchQ,setSearchQ] = useState({name:"",})
  const navigate = useNavigate();

  //Modal 
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [currentId,setCurrentId] = useState({});
  
  const loadData = async () => {
    const response = await axios.get(`/api/get?q=${query}`);
    setData(response.data);
    //console.log(data)
  };

  const updateOrder = async () => {
    await axios(`/api/update-order/${id}/${orderState.order_key}`)
  }

  useEffect(() => {
    loadData();
    //console.log(orderId)
  }, [query]);

   //reloads on refresh
  async function getSelectedCasts () {
    const resp = await axios.get(`/api/get-orders/${id}`) 
    setOrderState({...resp.data[0]})
    console.log(orderState)
    //console.log("selcted",selected)
  }
   ///api/get-orders/:id
  useEffect(()=> {
    //console.log("id",id)
    getSelectedCasts();
    setNewSelected(orderState.casts_ordered)
      //setLoaded(true)
    
  }, [id])

  useEffect(()=> {
    console.log("change in order state",orderState)
    if(orderState.casts_ordered?.length) {
      setLoaded(true)
      console.log("loaded",orderState)
    }
  }, [orderState])

  const handleOrderNameChange = (e) => {
    setOrderState({...orderState,["order_name"]:e.target.value})
    console.log(orderState)
  }

  const [columnDefs, setColumnDefs] = useState([
    {headerName: "معاينة",field:"view",
      cellRenderer:(params) => <div>
        <GrView className='btn btn-view' onClick={()=>{openModal();setCurrentId(params.data);}}/>     
      </div>,
    
      minWidth: 40,
      maxWidth: 80,
      filter: false
    },
    {headerName: 'المدينة',field: 'city_address'},
    {headerName: 'السعر',field: 'wage'},
    
    {headerName: "الاسم",field: 'name', filter: true,minWidth: 40,
    maxWidth: 200},
    {field: 'id', filter: false,minWidth: 40,
    maxWidth: 80},
    {headerName: "",field:"img",     cellRenderer:ProfileImage,
      minWidth: 40,
      maxWidth: 80,
      filter: false,
      sortable: false
    },
    {
      headerName: 'select',
      field: 'select',
      headerCheckboxSelection: false,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      minWidth: 40,
      maxWidth: 50,
      headerClass: 'ag-left-aligned-header' ,
      filter: false,
      sortable: false,
    }

  ]);

  const defaultColDef = useMemo( ()=> ({
    sortable: true,
    flex: 1, 
    autoHeight: true
  }));

  const onSelectionChanged = (e) => {
    console.log(e.api.getSelectedRows());
    setSelected(e.api.getSelectedRows());
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault();      
    const ordersArray = selected.map(key=>key.id);
    const casts_ordered = orderState.casts_ordered;
    const order_name = orderState.order_name;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    if(!orderState.order_name) {
      toast.error("please choose order name");
    } else {
      if(!id) {
        console.log("id",id)
        axios
        .post("/api/post-order", {
          order_name,
          ordersArray,
          today
        }).then(() => {
          setOrderState({order_key: "", order_name: ""});
        }).catch((err) => toast.error(err.response.data));
        toast.success(`${order_name} was susccefuly added`);
        //navigate('/home') 
      } else {

        axios.put(`/api/update-order/${orderState.order_key}`,{
          ordersArray,
          order_name,
          casts_ordered,
          today,
          ordersToDelete
        }).then(()=>{
          setOrdersToDelete([]);
        }).catch((err) => toast.error(err.response.data))
        toast.success(`${order_name} was susccefuly updated`)
      }
        
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const onValueChange = (values) => {
    setValue(values)
  }

  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setState({...state,[name]:value})
    console.log("state: ",state)
  }
  const handleCountryInputChange = (country) => {
    console.log(country);
    setState({...state, ["country"]:country.label})
  }

  function isEmpty(str) {
    return (str?.toString() || '')
  }

  function isZero(num) {
    return (num? num : 0)
    
  }

  function search(rows) {

    return rows.filter((row) => 
      !orderState.casts_ordered?.includes(row.id) &&
      isEmpty(ArabicNormalize(row.name)).toLowerCase().indexOf(ArabicNormalize(state.name.toLowerCase())) > -1 &&
      isEmpty(row.langauges).toLowerCase().indexOf(state.langauges.toLowerCase()) > -1 &&
      (isZero(row.age) >= parseInt(state.age_min,10) && isZero(row.age) <= parseInt(state.age_max,10)) && (isZero(row.wage) >= parseInt(state.wage_min,10) && isZero(row.wage) <= parseInt(state.wage_max,10)) && (isZero(row.height) >= parseInt(state.height_min,10) && isZero(row.height) <= parseInt(state.height_max,10)) && (isZero(row.weight) >= parseInt(state.weight_min,10) && isZero(row.weight) <= parseInt(state.weight_max,10)) 
    )
  }
  function searchSelected(rows) {
    //console.log("selected orders",orderState.casts_ordered)
    //console.log("rows",rows)
    return rows.filter((row) => 
      orderState.casts_ordered?.includes(row.id)
    )
    //console.log("rows after",rows)
  }

  function deselectCast(value) {
    if(selected.length > 0) {
      toast.error("please update selected changes before deleting")
      return;
    }
    console.log("heyyy");
    console.log(value.id);
    setOrderState({...orderState,["casts_ordered"]:orderState.casts_ordered.filter(item => item !== value.id)})
    console.log(orderState)
    toast.success(`${value.id} has been deleted from your order`);
  }

  return (
    <>
    <TopNav/>
    <div className='app__home'>
      
    <div className='app__header'>
      <h1>CASTS OVERVIEW</h1>
      <h4>hey</h4>
      
    </div>
    
    <Nav/>
    <div className='app__main' dir='rtl'>
      <div className='search-box'>
        <div className='search-box-texts'>
          
          <div className='input-wrapper'>
            <label>اسم</label>
            <input type="text" name='name' onChange={handleInputChange}></input>
          </div>
          <div className='input-wrapper'>
            <label>جنسية</label>
            <Select options={countries} name='country' className='select-country' onChange={handleCountryInputChange} styles={{color:"black"}}/>
          </div>
          <div className='input-wrapper'>
            <label>اللغة</label>
            <input type="text" name='langauges' onChange={handleInputChange}></input>
          </div>
          <div className='input-wrapper'>
            <label>التفرغ</label>
            <input type="text" name='full_time' onChange={handleInputChange}></input>
          </div>
          <div className='input-wrapper'>
            <label>البلد</label>
            <input type="text" name='country_address' onChange={handleInputChange}></input>
          </div>
          <div className='input-wrapper'>
            <label>المدينة</label>
            <input type="text" name='city_address' onChange={handleInputChange}></input>
          </div>
          <div className='input-wrapper'>
            <label>الموهبة</label>
            <input type="text" name='talents' onChange={handleInputChange}></input>
          </div>
          <div className='input-wrapper'> 
            <label>علامات البحث</label>
            <input type="text" name='tags' onChange={handleInputChange}></input>
          </div>
          
        </div>
        <div className='search-box-ranges'>
          <div className='range-container'>
            <label>age</label>
            <div className='range-inputs'>
              <input type="number" name='age_min' onChange={handleInputChange} value={state.age_min}/>
              <hr className='line'></hr>
              <input type="number"  name='age_max' onChange={handleInputChange} value={state.age_max}/>
            </div>
          </div>
          <div className='range-container'>
            <label>wage</label>
            <div className='range-inputs'>
            <input type="number" name='wage_min' onChange={handleInputChange} value={state.wage_min}/>
              <hr className='line'></hr>
              <input type="number" name='wage_max' onChange={handleInputChange} value={state.wage_max}/>
            </div>
          </div>
          <div className='range-container'>
            <label>height</label>
            <div className='range-inputs'>
            <input type="number" name='height_min' onChange={handleInputChange} value={state.height_min}/>
              <hr className='line'></hr>
              <input type="number" name='height_max' onChange={handleInputChange} value={state.height_max}/>
            </div>
          </div>
          <div className='range-container'>
            <label>weight</label>
            <div className='range-inputs'>
            <input type="number" name='weight_min' onChange={handleInputChange} value={state.weight_min}/>
              <hr className='line'></hr>
              <input type="number" name='weight_max' onChange={handleInputChange} value={state.weight_max}/>
            </div>
          </div>
        </div>
        
      </div>
        <div className="ag-theme-material" style={{ height: 793}} >
          <AgGridReact
          rowClass={'ag-grid__table-custom'}
          rowHeight={80}
          ref={gridRef} 
          suppressRowClickSelection={true}
          rowData={search(data)} 
          rowSelection={'multiple'}
          columnDefs={columnDefs} 
          defaultColDef={defaultColDef}
          animateRows={true} 
          onSelectionChanged={onSelectionChanged}
          pagination={true}
          paginationPageSize={0}
          paginationAutoPageSize={true}
          />
        </div>
        <div className='order-box'>
          <form>
            {/*JSON.stringify(selected.map(key=>key.id))*/}
            {/*orderState.casts_ordered?.join('-')*/}

          <label htmlFor='group-name'>order name</label>
          <input type="text"
            id='groupname'
            name='groupname'
            placeholder='enter your order name'
            value={orderState.order_name || ""}
            onChange={handleOrderNameChange}
          >
          </input>
          <Link to={id? '/orders' :'/table'}>
            <button id='order-button' onClick={handleOrderSubmit}>{id? "update" : "add to order"}</button>
          </Link>

          </form>
          <div className='selected-orders_table_wrapper'>
            <h3>your orders</h3>
            <table className='selected-orders_table'>
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
                {
                  searchSelected(data).map((value, key) => {
                    return (
                      <tr key={key} className='table-row'>
                        <td id='image'><div className='app__ProfileImage-selected'>
                            <img width="100%" height="100%" src={
                              value.imageName4?  value.imageName4: noPic}/>
                          </div>
                        </td>
                        <td>{value.name}_{value.id}</td>
                        <td>20,000$</td>
                        <td>المدينة المنورة</td>
                        <td><FiTrash2 
                    className='btn btn-delete'
                    onClick={() => deselectCast(value)}
                  >delete</FiTrash2></td>
                      </tr>
                    )
                  })
                }
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
        <AiOutlineClose id='close-icon' onClick={closeModal}/>
        <ViewModal data={currentId}/>
      </Modal>
    </div>
        <div className='app__footer'>

        </div>
      </div>
      </>
  )
}

export default Table