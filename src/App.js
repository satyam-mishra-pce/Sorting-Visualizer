import { useState } from "react";
import Home from "./Pages/Home";
import { useImageDataContext } from "./Contexts/ImageData";
import Main from "./Pages/Main";


const App = () => {

  const [imageData] = useImageDataContext();

  return (
    <>
      <h1 style={{
        position: "fixed",
        top: "-1000px",
        left: "-1000px"
      }}>Visualize Sorting, like never before.</h1>
      {
        imageData.length === 0
        ? <Home />
        : <Main />
      }
    </>
  );
}

export default App;
