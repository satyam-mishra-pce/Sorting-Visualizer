import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import ImageDataContextProvider from './Contexts/ImageData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ImageDataContextProvider>
      <App />
    </ImageDataContextProvider>
);