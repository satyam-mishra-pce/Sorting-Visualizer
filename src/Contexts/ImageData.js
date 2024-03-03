import { createContext, useContext, useState } from "react";

const imageDataContext = createContext(null);

const ImageDataContextProvider = ({children}) => {
    const [imageData, setImageData] = useState([]);

    return <imageDataContext.Provider value={[imageData, setImageData]}>
        {children}
    </imageDataContext.Provider>
}

export const useImageDataContext = () => {
    const imageDataState = useContext(imageDataContext);
    if (imageDataContext === null)
        throw new Error("useImageDataContext must be used within ImageDataContextProvider.")

    return imageDataState;
}

export default ImageDataContextProvider;