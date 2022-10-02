import React, { useEffect, useState,useMemo,useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import Nav from '../components/Nav/Nav'
import axios from 'axios'
import _ from 'underscore'
import { Link } from 'react-router-dom'
import {FiEdit2} from 'react-icons/fi'
import { GrView } from 'react-icons/gr'
import './Orders.scss'

const Orders = () => {

  const [orders,setOrders] = useState();
  const [groupedOrders,setGroupedOrders] = useState();
  const gridRef = useRef();
  const [query, setQuery] = useState("");
  const [columnDefs, setColumnDefs] = useState([
    {field: 'order_name'},
    {field: 'order_key'},
    {field: 'casts_ordered'},
    {headerName: 'edit', field:"edit",
      cellRenderer: (params) => <div
        className='edit-order-button'>
        <Link to={`/edit-order/${params.data.order_key}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <FiEdit2 className='btn btn-edit'>Edit</FiEdit2>
        </Link>
        <Link to={`/view-order/${params.data.order_key}`}>
          <GrView className='btn btn-view'>view</GrView>
        </Link>
      </div>},

  ]);

  const defaultColDef = useMemo( ()=> ({
    sortable: true,
    flex: 1, 
    autoHeight: true
  }));

  const loadOrders = async () => {
    const response = await axios.get(`/api/get-orders?q=${query}`);
    setOrders(response.data)
  }

  useEffect(()=> {
    loadOrders();
    console.log(orders)
  },[])
  return (
    <div className='app__home' >
    <div className='app__header'>
      
    </div>
    <Nav/>
    <div className='app__main' dir='rtl'>
        <div className="ag-theme-material" style={{width: '100%', height: 793}}>
          <AgGridReact
            rowHeight={80}
            ref={gridRef} 
            suppressRowClickSelection={true}
            rowData={orders} 
            rowSelection={'multiple'}
            columnDefs={columnDefs} 
            defaultColDef={defaultColDef}
            animateRows={true} 
            pagination={true}
            paginationPageSize={0}
            paginationAutoPageSize={true}
            onGridReady={(params)=>params.api.sizeColumnsToFit()}
          />
        </div>
    </div>
        <div className='app__footer'>
          
        </div>
    </div>
  )
}

export default Orders