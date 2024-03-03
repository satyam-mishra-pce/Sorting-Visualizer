import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';

import "./preferences.css";
import Counter, { useCounterValue } from '../Counter/Counter';
import ComboBox, { useComboBoxValue } from '../ComboBox/ComboBox';
import CheckBox, { useChecked } from '../CheckBox/CheckBox';
import PlainButton from "../PlainButton/PlainButton";
import AccentButton from "../AccentButton/AccentButton";
import TintedButton from "../TintedButton/TintedButton";
import insertionSort from '../../Utils/InsertionSort';
import RangeBar, { useRangeBarValue } from '../RangeBar/RangeBar';
import selectionSort from '../../Utils/SelectionSort';
import bubbleSort from '../../Utils/BubbleSort';
import mergeSort from '../../Utils/MergeSort';
import quickSort from '../../Utils/QuickSort';

const Preferences = ({
    className = "",
    data,
    setData,
    shuffledState,
}) => {

    const [viewMode, setViewMode] = useState(0);
    const [isSorting, setSorting] = useState(false);
    const [isShuffled, setShuffled] = shuffledState;
    const [timeElapsed, setTimeElapsed] = useState(0);
    const sortingAlgoOptions = {
        "insertion-sort": "Insertion Sort",
        "selection-sort": "Selection Sort",
        "bubble-sort": "Bubble Sort",
        "merge-sort": "Merge Sort",
        "quick-sort": "Quick Sort"
    };

    const sortingAlgoFunctions = {
        "insertion-sort": insertionSort,
        "selection-sort": selectionSort,
        "bubble-sort": bubbleSort,
        "merge-sort": mergeSort,
        "quick-sort": quickSort
    }

    const sortingTimeFunctions = {
        "insertion-sort": n => n * n,
        "selection-sort": n => n * n,
        "bubble-sort": n => n * n,
        "merge-sort": n => n * Math.log(n),
        "quick-sort": n => n * Math.log(n)
    }

    const abortControllerRef = useRef(null);

    const handleSorting = (algo, arr, setArr, speedFactor) => {
        if (!isShuffled) return;

        collapseView();
        setSorting(true);
        setTimeElapsed(0);
        const measureTime = setInterval(() => {
            setTimeElapsed(old => old + 1);
        }, 1000)

        abortControllerRef.current = new AbortController();
        sortingAlgoFunctions[algo](arr, setArr, speedFactor, abortControllerRef.current.signal)
            .then(() => {
                setShuffled(false);
            })
            .catch((err) => {

            })
            .finally(() => {
                setSorting(false);
                clearInterval(measureTime);
            });
    }

    const abortSorting = () => {
        if (!abortControllerRef.current) return;

        abortControllerRef.current.abort();
    }

    const getTimeString = seconds => {
        seconds = Math.floor(seconds)
        const hrs = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        const mins = Math.floor(seconds / 60);
        seconds = seconds % 60;

        const pad = (s) => {
            s = "00" + s;
            const n = s.length;
            return s[n - 2] + s[n - 1];
        }

        return `${pad(hrs)}:${pad(mins)}:${pad(seconds)}`;
    }

    const rowsState = useCounterValue(data.rows);
    const [rows, setRows] = rowsState;
    // useEffect(() => { setRows(data.rows) }, [data.rows]);
    useEffect(() => { setData({ ...data, rows: rows }) }, [rows]);

    const columnsState = useCounterValue(data.columns);
    const [columns, setColumns] = columnsState;
    // useEffect(() => { setColumns(data.columns) }, [data.columns]);
    useEffect(() => { setData({ ...data, columns: columns }) }, [columns]);

    const sortingAlgorithmState = useComboBoxValue(data.sortingAlgorithm);
    const [sortingAlgorithm, setSortingAlgorithm] = sortingAlgorithmState;
    // useEffect(() => { setSortingAlgorithm(data.sortingAlgorithm) }, [data.sortingAlgorithm]);
    useEffect(() => { setData({ ...data, sortingAlgorithm: sortingAlgorithm }) }, [sortingAlgorithm])

    const speedFactorState = useRangeBarValue(data.speedFactor);
    const [speedFactor, setSpeedFactor] = speedFactorState;
    // useEffect(() => { setSpeedFactor(data.speedFactor) }, [data.speedFactor]);
    useEffect(() => { setData({ ...data, speedFactor: speedFactor }) }, [speedFactor]);

    const gridlineVisibilityState = useChecked(data.showGridlines);
    const [gridlineVisibility, setGridlineVisibility] = gridlineVisibilityState;
    // useEffect(() => { setGridlineVisibility(data.gridlineVisibility) }, [data.showGridlines]);
    useEffect(() => { setData({ ...data, showGridlines: gridlineVisibility }) }, [gridlineVisibility])

    const indexVisibilityState = useChecked(data.showIndex);
    const [indexVisibility, setIndexVisibility] = indexVisibilityState;
    // useEffect(() => { setIndexVisibility(data.indexVisibility) }, [data.showIndex]);
    useEffect(() => { setData({ ...data, showIndex: indexVisibility }) }, [indexVisibility])

    const expandView = () => {
        setViewMode(1)
        $(".preference-items").slideDown(200);
    }
    
    const collapseView = () => {
        if (window.matchMedia("(max-width: 900px)").matches) {
            setViewMode(0);
            $(".preference-items").slideUp(200, () => {
                $(".preference-items").css("display", "");
            });
        }
    }

    const viewToggleFunction = () => {
        if (1 - viewMode) {
            expandView();
        } else {
            collapseView();
        }
    }


    return (
        <div className={`preferences ${className} ${viewMode ? "expanded" : ""}`}>
            <div className="content">
                <div className='title'>
                    <h2>Visualizer Preferences</h2>
                    <button className={`view-toggle`} onClick={viewToggleFunction}><i className="fa-solid fa-chevron-up"></i></button>
                </div>
                <div className='preference-items'>
                    <div className='row-layout'>
                        <div className={`column-layout padded ${isSorting ? "disabled" : ""}`}>
                            <label htmlFor='row-counter'>Rows</label>
                            <Counter valueState={rowsState} min={2} max={16} id='row-counter' className='top-spaced' disabled={isSorting} />
                        </div>
                        <div className={`column-layout padded ${isSorting ? "disabled" : ""}`}>
                            <label htmlFor='column-counter'>Columns</label>
                            <Counter valueState={columnsState} min={2} max={16} id='column-counter' className='top-spaced' disabled={isSorting} />
                        </div>
                    </div>
                    <div className={`column-layout padded top-spaced ${isSorting ? "disabled" : ""}`}>
                        <label htmlFor='sorting-algorithm'>Sorting Algorithm</label>
                        <ComboBox
                            optionList={sortingAlgoOptions}
                            valueState={sortingAlgorithmState}
                            id='sorting-algorithm'
                            buttonClassName="top-spaced"
                            disabled={isSorting}
                        />
                    </div>
                    <div className={`column-layout padded top-spaced ${isSorting ? "disabled" : ""}`}>
                        <label htmlFor='speed-factor'>Speed</label>
                        <RangeBar
                            valueState={speedFactorState}
                            min={1}
                            max={1000}
                            dangerThreshold={650}
                            dangerThresholdText='The speed of the algorithm is capped by the limits of the processor.'
                            id='speed-factor'
                            className='top-spaced'
                            disabled={isSorting}
                            labelSuffix={" moves per sec"}
                        />
                    </div>
                    <div className='row-layout padded top-spaced'>
                        <CheckBox label='Show Gridlines' className='top-spaced' valueState={gridlineVisibilityState} />
                    </div>
                    <div className='row-layout padded top-spaced'>
                        <CheckBox label='Show Index' className='top-spaced' valueState={indexVisibilityState} />
                    </div>
                    <div className='row-layout top-spaced'>
                        <div className='column-layout padded'>
                            <TintedButton text="Shuffle" className='shuffle-btn' onClick={data.shuffle} disabled={isSorting} />
                        </div>
                        <div className='column-layout padded'>
                            <TintedButton text="Arrange" className='arrange-btn' onClick={data.arrange} disabled={isSorting || !isShuffled} />
                        </div>
                    </div>
                    <div className='gap'></div>
                    <div className='row-layout justify-space-between padded'>
                        <div className='time-info column-layout'>
                            <span className='estimated'>
                                <b>Estimated:</b> {
                                    getTimeString(
                                        sortingTimeFunctions[sortingAlgorithm](
                                            rows * columns
                                        ) / speedFactor
                                    )
                                }
                            </span>
                            <span className='elasped'><b>Elapsed:</b> {getTimeString(timeElapsed)}</span>
                        </div>
                        <AccentButton
                            text={isSorting ? "Stop" : "Start"}
                            className='control-btn start'
                            onClick={() => {
                                isSorting
                                    ? abortSorting()
                                    : handleSorting(sortingAlgorithm, data.sliceOrderState[0], data.sliceOrderState[1], speedFactor)
                            }}
                            disabled={!isShuffled}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preferences