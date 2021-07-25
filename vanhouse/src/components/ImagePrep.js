/* CITATION:  I used the following reference to learn how to create a modal popup with bootstrap:
              https://react-bootstrap.github.io/components/modal/
   CITATION:  I used the following reference for the phone number format:
              https://www.w3schools.com/tags/att_input_type_tel.asp
   CITATION: I learned the FileReader approach to uploading images from https://stackoverflow.com/a/43992687
*/

import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Cropper from 'react-easy-crop'
import "../styles/imagePrep.css";
import { scaleImage, getCroppedImg } from "./cropUtils"

// Presents a modal view with a form for creating a new post
function ImagePrep({ show, handleSubmit, handleClose }) {

  const formRef = useRef();

  // States set by form inputs
  const [images, setImages] = useState([]);

  // Image validation states
  const [imageSizeValid, setImageSizeValid] = useState(true);
  const [imageCountValid, setImageCountValid] = useState(true);
  const [imageErrorMsg, setImageErrorMsg] = useState("");

  // CITATION: The next 5 lines are from https://codesandbox.io/s/y09komm059?file=/src/canvasUtils.js:427-2287
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((area, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);


  // Resets the states
  const resetStates = (doReinit) => {
    if (doReinit) {
      setImages([]);
    }
  };

  // Reset the states whenever the modal view is presented
  useEffect(() => {
    resetStates(show);
  }, [show]);

  // Create a post object with the form details and send this to the
  // PostCollection component using the callback
  const submitClicked = async (e) => {
    e.preventDefault();
    if (!imageSizeValid) {
      return;
    }
    let mainImage = await getCroppedImg(images[0], croppedAreaPixels);
    mainImage = await scaleImage(mainImage, 300, 180);
    console.log(mainImage);
    handleSubmit(images, mainImage);
    handleClose();
  };

  // Sets image states based on form file input
  // Rejects images if the list is too long or if image files are too large
  const handleImageUpload = (e) => {
    setImageErrorMsg("");
    const maxImageSize = 1000000;
    setImageSizeValid(true);
    if (e.target.files) {
      const imageList = [];
      // Check image count is valid
      const maxImageCount = 4;
      if (e.target.files.length+images.length > maxImageCount) {
        e.target.value = null; // CITATION: https://stackoverflow.com/a/42192710
        setImages([]);
        setImageErrorMsg(
          "Too many images. Please select between 1 and 4 images."
        );
        setImageCountValid(false);
        return;
      }
      for (let i = 0; i < e.target.files.length; i += 1) {
        // Reject files that are too large
        if (e.target.files[i].size > maxImageSize) {
          e.target.value = null; // CITATION: https://stackoverflow.com/a/42192710
          setImages([]);
          setImageErrorMsg(
            "Image file size exceeds 1MB. Please select files under 1MB."
          );
          setImageSizeValid(false);
          return;
        }
        // Add valid files to the images state
        if (e.target.files[i]) {
          const fileReader = new FileReader();
          fileReader.onload = (event) => {
            imageList.push(event.target.result);
            setImages([...imageList]);
          };
          fileReader.readAsDataURL(e.target.files[i]);
        }
      }
    }
  };

  const selectAsMain = (event) => {
    const imgSrc = event.target.getAttribute("src");
    const imgIndex = images.indexOf(imgSrc);
    const imageList = [...images];
    const oldMainImg = imageList[0];
    imageList[0] = imageList[imgIndex];
    imageList[imgIndex] = oldMainImg;
    setImages(imageList);
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Form ref={formRef} onSubmit={submitClicked}>
          <Modal.Header>
            <Modal.Title>Select Images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Col} controlId="formImages">
              <Form.File
                id="uploadImagesButton"
                name="imageFilePicker"
                multiple
                required
                label="Upload 1-4 images *"
                feedback={imageErrorMsg}
                accept=".jpg, .jpeg, .png, .tiff"
                isInvalid={!imageSizeValid || !imageCountValid}
                onChange={(e) => {
                  handleImageUpload(e);
                }}
              />
            </Form.Group>
            {images.length > 0 && 
              <p>Select main image</p>
            }
            <Row>
              {images?.map((e, idx) => (
                <span
                  key={Math.floor(Math.random() * 9999)}
                  className="preview-image">
                  <img
                    className={idx !== 0 ? "user-image" : "main-image"}
                    width="84"
                    height="84"
                    alt="post-images"
                    src={e}
                    onClick={selectAsMain}
                  />
                </span>
              ))}
            </Row>
            {images.length > 0 && 
              <div>
                <p>Crop main image</p>
                <Row>
                  <div className="image-scroll-div">           
                    <div className="crop-div">
                      <Cropper
                        image={images[0]}
                        crop={crop}
                        zoom={zoom}
                        aspect={5 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>                  
                  </div>
                </Row>
                <p>Scroll to zoom</p>
              </div>
              
            }
            <Form.Text className="text-muted">* required fields</Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

ImagePrep.propTypes = {
  show: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ImagePrep;
