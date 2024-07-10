import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const ImagesSet = () => {
  const images = [
    { id: 1, url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, url: 'https://images.unsplash.com/photo-1426260193283-c4daed7c2024?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, url: 'https://images.unsplash.com/photo-1430931071372-38127bd472b8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 6, url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 7, url: 'https://images.unsplash.com/photo-1488992783499-418eb1f62d08?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 8, url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const [model, setModel] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const openImage = (index: number) => {
    setCurrentImgIndex(index);
    setModel(true);
  };

  const closeModal = () => {
    setModel(false);
  };

  const goToPreviousImage = () => {
    setCurrentImgIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImgIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className={`${model ? 'flex' : 'hidden'} fixed inset-0 justify-center items-center bg-black bg-opacity-90 z-50`}>
        <img src={images[currentImgIndex].url} alt="model" className="max-w-full max-h-full p-5" />
        <CloseIcon
          onClick={closeModal}
          className="absolute top-4 right-4 text-6xl text-white cursor-pointer"
        />
        <ArrowBackIosIcon
          onClick={goToPreviousImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-6xl text-white cursor-pointer"
        />
        <ArrowForwardIosIcon
          onClick={goToNextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-6xl text-white cursor-pointer"
        />
      </div>
      <div className="gallery space-y-4 columns-1 sm:columns-2 md:columns-3 px-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="pics cursor-pointer mb-3 transition-opacity duration-350 hover:opacity-80"
            onClick={() => openImage(index)}
          >
            <img src={image.url} alt="gallery" className="w-full h-auto" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImagesSet;
