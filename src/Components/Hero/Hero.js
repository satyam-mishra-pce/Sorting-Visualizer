import React from 'react'
import "./hero.css"
import ImageChooser from '../ImageChooser/ImageChooser'
import TintedButton from '../TintedButton/TintedButton'
import SampleImageData from '../../Data/SampleImageData.json';
import { useImageDataContext } from '../../Contexts/ImageData';

const Hero = () => {

    const setImageData = useImageDataContext()[1];

  return (
    <div className='hero'>
        <div className='line-1'>
            <div className='white-black-grad'>
                <div className="word-1">
                    Visualize&nbsp;
                </div>
            </div>
            <div className='word-2'>
                <div className='accent-black-grad'>
                    Sorting 
                </div>
                <div className='white-black-grad'>
                    , 
                </div>
            </div>
        </div>
        <div className='line-2'>
            like never before.
        </div>
        <ImageChooser />
        <div className='phone-view-try'>
            <TintedButton text='Try with sample image' className='try-btn' onClick={() => {setImageData(SampleImageData)}}/>
        </div>
    </div>
  )
}

export default Hero;