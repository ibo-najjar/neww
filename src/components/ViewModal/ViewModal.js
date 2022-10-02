import React, { createRef } from 'react'
import './ViewModal.scss'
import tallImg from '../../assets/tall.jpg'
import pic1 from '../../assets/Picture1.jpg'
import pic2 from '../../assets/Picture2.jpg'
import pic3 from '../../assets/Picture3.jpg'
import pic4 from '../../assets/Picture4.jpg'
import noPic from '../../assets/nopic.png'
import {PDFDownloadLink,PDFViewer} from '@react-pdf/renderer'
import ReactToPdf from "react-to-pdf";
import View from '../../pages/View.js'

const options = {
  orientation: 'landscape',
  unit: 'in',
};

const ViewModal = ({data}) => {

  const ref = createRef();

  return (
    <div className='app__modalView' dir='rtl' ref={ref}>
      <View isModal={true}/>
    </div>
  )
}


export default ViewModal