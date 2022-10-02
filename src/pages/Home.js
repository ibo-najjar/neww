import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.scss'
import {toast} from 'react-toastify'
import axios from 'axios';
import { FiTrash2,FiEdit2 } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import { FaSortAmountDownAlt,FaSortAmountUp } from 'react-icons/fa';
import Nav from '../components/Nav/Nav';
import TopNav from '../components/TopNav/TopNav'

const Home = () => {
  const [data,setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    const response = await axios.get(`/api/get?q=${query}`);
    setData(response.data);
  };

  useEffect(() => {
    console.log(category);
  },[category]);

  useEffect(() => {
    loadData();
  }, [query]); //reloads on refresh

  const deleteContact = (id) => {
    if(window.confirm(`are you sure that u want to delete cutomer with id ${id}`)) {
      axios.delete(`/api/remove/${id}`);
      console.log("deleted")
      toast.success("cutsomer deleted succesfully");
      setTimeout(() => loadData(),500);
    }
  }

  const sorting = (col) => {
    if(order == "ASC") {
      const sorted = [...data].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC")
    }
    if(order == "DSC") {
      const sorted = [...data].sort((a,b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC")
    }
  }
  
  const keys = ["name", "email", "contact"]

  const search = (data) => {
    if(category != "") {
      data = data.filter((item)=> {
        return item.role == category;
      })
    }
    
    return data.filter(
      (item)=>
        keys.some((key)=> item[key].toLowerCase().includes(query))
    );
  }


  return (
    <>
    <TopNav/>
    <div className='app__home'>
      <div className='app__header'>hey</div>
      <Nav/>
      <div className='app__main'>

      <div className='selected-orders_table_wrapper' dir='rtl'>
      <h3>قائمة الكاست</h3>
      <input 
      className="search" 
      placeholder='بحث شامل' 
      type="text"
      onChange={e=>setQuery(e.target.value)}/>
        <table className='selected-orders_table' cellSpacing="15">
          <thead >
            <tr className='table-head'>
              <th onClick={()=>sorting("id")}>
                ID
                </th>
              <th onClick={()=>sorting("name")}>NAME
                {order === "ASC" ? <FaSortAmountDownAlt/> : <FaSortAmountUp/>}
              </th>
              <th onClick={()=>sorting("email")}>EMAIL{order === "ASC" ? <FaSortAmountDownAlt/> : <FaSortAmountUp/>}</th>
              <th onClick={()=>sorting("contact")}>CONTACT{order === "ASC" ? <FaSortAmountDownAlt/> : <FaSortAmountUp/>}</th>
              <th>ALTER</th>
            </tr>
          </thead>
          <tbody>
            {search(data).map((item,index) => {
              return (
                <tr key={item.id}>
                  <th scope='row'>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <FiEdit2 className='btn btn-edit'>Edit</FiEdit2>
                    </Link>
                    <FiTrash2 
                      className='btn btn-delete'
                      onClick={() => deleteContact(item.id)}
                    >delete</FiTrash2>
                    <Link to={`/view/${item.id}`}>
                      <GrView className='btn btn-view'>view</GrView>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      </div>
      <div className='app__footer'>
      </div>
      
    </div>
    </>
  )
}

export default Home;