import React, { useState, useRef, useEffect } from 'react';

import "./image-chooser.css"
import AccentButton from '../AccentButton/AccentButton';
import { useImageDataContext } from '../../Contexts/ImageData';
import readFile from '../../Utils/ReadFile';

const ImageChooser = () => {

    const fileInputRef = useRef(null);
    const dropperRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [dropperState, setDropperState] = useState("initial");
    const setImageData = useImageDataContext()[1];

    const handleFileChooser = () => {
        const fileInput = fileInputRef.current;
        if (!fileInput)
            return;
        fileInput.click();
    }

    const onFileSelected = (evt) => {
        const files = evt.target.files;

        if (!(files.length)) {
            setSelectedFileName(null);
            setImageData([])
            return;
        }

        const file = files[0];

        if (!(file.type.startsWith("image/"))) {
            alert("File not supported!");
            setSelectedFileName(null);
            setImageData([])
            return;
        }

        setSelectedFileName(file.name);
        readFile(file).then(res => { setImageData([file.type, res]) });
    }

    const handleDragOver = evt => {
        evt.preventDefault();
        setDropperState("dragging");
    };

    const handleDragLeave = evt => {
        const target = evt.fromElement;
        const dropper = dropperRef.current;
        if (dropper.contains(target))
            return
        setDropperState("initial");
    };

    const handleDrop = evt => {
        evt.preventDefault();
        const files = evt.dataTransfer?.files;
        setDropperState("initial");

        if (!files || !files.length) {
            setSelectedFileName(null);
            setImageData([])
            return;
        }

        const file = files[0];
        if (!(file.type.startsWith("image/"))) {
            alert("File not supported!");
            setSelectedFileName(null);
            setImageData([])
            return;
        }

        setSelectedFileName(file.name);
        readFile(file).then(res => { setImageData([file.type, res]) });
    }

    useEffect(() => {
        const dropper = dropperRef.current;
        if (!dropper)
            return;
        dropper.addEventListener("dragover", handleDragOver);
        dropper.addEventListener("dragleave", handleDragLeave);
        dropper.addEventListener("drop", handleDrop);

        return () => {
            dropper.removeEventListener("dragover", handleDragOver);
            dropper.removeEventListener("dragleave", handleDragLeave);
            dropper.removeEventListener("drop", handleDrop);
        }
    }, [])

    return (
        <div className={`image-chooser ${dropperState}`} ref={dropperRef}>

            <div className='drop-label'>
                {dropperState === "initial" ? "Drop an image here." : "Drop it down!"}
            </div>
            {
                dropperState === "initial"
                &&
                <>
                    <div className='or-text'>
                        or
                    </div>
                    <div className='browsing-options'>
                        <AccentButton text='Choose File' className='choose-file' onClick={handleFileChooser} />
                        <div className='selected-file-name'>{selectedFileName ? selectedFileName : "No file chosen"}</div>
                    </div>
                </>
            }

            <input type='file' accept='image/*' aria-hidden="true" style={{ display: "none" }} ref={fileInputRef} onChange={onFileSelected} />

        </div>
    )
}

export default ImageChooser