import React, { useEffect, useState, useRef } from 'react'
import Header from '../Components/Header/Header'
import { useImageDataContext } from '../Contexts/ImageData'
import getSlicedImages from '../Utils/GetSlicedImages';

import "./main.css";
import Preferences from '../Components/Preferences/Preferences';
import generateRange from '../Utils/GenerateRange';
import randomizeArray from '../Utils/RandomizeArray';
import Spinner from 'react-spinner-material';

const Main = () => {

    const slicedImagesWrapperRef = useRef(null);
    const [imageData] = useImageDataContext();
    const [fileType, fileBase64] = imageData;
    const [sliceWidth, setSliceWidth] = useState(0);
    const [slicedImages, setSlicedImages] = useState([]);
    const [sliceOrder, setSliceOrder] = useState([]);
    const [isShuffled, setShuffled] = useState(false);
    const obs = new ResizeObserver((entries) => {
        const width = entries[0].borderBoxSize[0].inlineSize;
        setSliceWidth(width / preferences.columns);
    });

    const isCornerSlice = (index) => {
        return [0, preferences.columns - 1, (preferences.rows - 1) * preferences.columns, preferences.rows * preferences.columns - 1].indexOf(index) + 1
    }

    const [preferences, setPreferences] = useState({
        rows: 4,
        columns: 4,
        sortingAlgorithm: "insertion-sort",
        speedFactor: 200,
        showGridlines: true,
        showIndex: false,
        shuffle: () => {},
        arrange: () => {},
        sliceOrderState: [sliceOrder, setSliceOrder]
    });

    
    useEffect(() => {
        
        // Update the slice grid, and arrange function
        const arrange = () => {
            console.log("Running arrange");
            setShuffled(false);
            setSliceOrder(generateRange(preferences.rows * preferences.columns));
        }
        
        getSlicedImages(fileType, fileBase64, preferences.rows, preferences.columns).then(res => {
            setSlicedImages(res)
            setPreferences({...preferences, arrange: arrange});
        });

        const slicedImagesWrapper = slicedImagesWrapperRef.current;
        if (!slicedImagesWrapper)
            return
        obs.observe(slicedImagesWrapper);


        return () => {
            obs.unobserve(slicedImagesWrapper);
        }

    }, [preferences.rows, preferences.columns]);

    useEffect(() => {
        const len = slicedImages.length;
        const arr = generateRange(len);
        if (isShuffled)
            randomizeArray(arr);
        setSliceOrder(arr);
    }, [slicedImages]);

    useEffect(() => {
        const shuffle = () => {
            let arr = [...sliceOrder];
            randomizeArray(arr);
            setSliceOrder(arr);
            setShuffled(true);
        }
        setPreferences({...preferences, shuffle: shuffle, sliceOrderState: [sliceOrder, setSliceOrder]});
    }, [sliceOrder]);


    return (
        <div id='main'>
            <Header />
            <div id='workspace'>
                <div className={`${slicedImages.length && slicedImages.length === sliceOrder.length ? "slice-wrapper" : "loader-wrapper"} ${preferences.showGridlines ? "gridlines" : ""}`}
                    style={{
                        "--rows": preferences.rows,
                        "--columns": preferences.columns,
                        "--slice-width": sliceWidth + "px"
                    }}
                    ref={slicedImagesWrapperRef}
                >
                    {
                        slicedImages.length
                        &&
                        slicedImages.length === sliceOrder.length
                        ? sliceOrder.map((i, gridIndex) => {
                            return (
                                <div
                                    key={i}
                                    className='slice'
                                >
                                    <img
                                        alt={'slice-' + (i + 1)}
                                        src={slicedImages[i]}
                                        className={isCornerSlice(gridIndex) ? "corner-slice" + isCornerSlice(gridIndex) : ""}
                                    />
                                    <span className={`index-label ${preferences.showIndex ? "visible" : ""}`}>
                                        {i + 1}
                                    </span>
                                </div>
                            )
                        })
                        : <Spinner radius={40} color={"#00C3B9"} stroke={4} visible={true} />   
                    }
                </div>
                <div className='mid-space'></div>
                <Preferences className={"side-preferences"} data={preferences} setData={setPreferences} shuffledState={[isShuffled, setShuffled]}/>
            </div>
        </div>
    )
}

export default Main