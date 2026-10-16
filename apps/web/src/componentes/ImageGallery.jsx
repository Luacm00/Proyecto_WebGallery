import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageModal from "./ImageModal";

const ImageGallery = ({ images }) => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleShow = (image) => {
    setSelectedImage(image);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="container">
      <div className="row">
        {images.map((image) => (
          <div className="col-md-4 mb-4" key={image.src}>
            <div className="card h-100">
              <img
                src={image.src}
                className="card-img-top"
                alt={image.caption}
                style={{ height: "400px", objectFit: "cover", cursor: "pointer" }}
                loading="lazy"
                onClick={() => handleShow(image)}
              />
              <div className="card-body">
                <p className="card-text">{image.caption}</p>
              </div>
            </div>
          </div>
        ))}
        {selectedImage && (
            <ImageModal show={show} handleClose={handleClose} image={selectedImage} />
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
