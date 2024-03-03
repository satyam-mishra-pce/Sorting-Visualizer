import React from 'react'

import "./header.css";
import TintedButton from '../TintedButton/TintedButton';
import PlainButton from '../PlainButton/PlainButton';
import { useImageDataContext } from '../../Contexts/ImageData';
import SampleImageData from "../../Data/SampleImageData.json";


const Header = () => {
  const setImageData = useImageDataContext()[1];

  return (
    <div className='header'>
        <div className='left'>
            <PlainButton text={<><i className='fa fa-chevron-left'></i></>} className='back-btn' onClick={() => {setImageData([])}}/>
            <a href='/'>SortingVisualizer</a>
        </div>
        <div className='right'>
            <TintedButton text='Try with sample image' className='try-btn' onClick={() => {setImageData(SampleImageData)}}/>
        </div>
    </div>
  )
}

export default Header;