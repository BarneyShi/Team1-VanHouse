/* CITATION:  I used the following reference to learn how to create a modal popup with bootstrap:
              https://react-bootstrap.github.io/components/modal/
   CITATION:  I used the following reference for the phone number format:
              https://www.w3schools.com/tags/att_input_type_tel.asp
   CITATION: I learned the FileReader approach to uploading images from https://stackoverflow.com/a/43992687
*/

import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Cropper from "react-easy-crop";
import "../styles/imagePrep.css";
import { useTranslation } from "react-i18next";

// Presents a modal view with a form for creating a new post
function ImagePrep({ show, handleSubmit, handleClose }) {
  const [images, setImages] = useState([]);

  // Image validation states
  const [imageSizeValid, setImageSizeValid] = useState(true);
  const [imageCountValid, setImageCountValid] = useState(true);
  const [imageErrorMsg, setImageErrorMsg] = useState("");

  // Canvas ref used for cropping and resizing images
  const canvasRef = useRef();

  // CITATION: The next 6 lines are from react-easy-crop example code:
  // https://codesandbox.io/s/y09komm059?file=/src/canvasUtils.js:427-2287
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((area, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const { t, i18n } = useTranslation();

  // Reset the image state
  const resetState = (doReinit) => {
    if (doReinit) {
      setImages([]);
    }
  };

  // Reset the states whenever the modal view is presented
  useEffect(() => {
    resetState(show);
  }, [show]);

  // CITATION: This function is adapted from the react-easy-crop npm package example code:
  // https://codesandbox.io/s/y09komm059?file=/src/canvasUtils.js:0-2287
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  // CITATION: This function is taken from https://stackoverflow.com/a/20965997
  const scaleImage = async (imageSrc, width, height) => {
    const image = await createImage(imageSrc);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx.drawImage(image, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
  };

  // CITATION: This function is adapted from the react-easy-crop npm package example code:
  // https://codesandbox.io/s/y09komm059?file=/src/canvasUtils.js:0-2287
  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
    canvas.width = safeArea;
    canvas.height = safeArea;
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );
    return canvas.toDataURL("image/jpeg");
  };

  // Pass the images into the supplied handleSubmit callback and close
  const submitClicked = async (e) => {
    e.preventDefault();
    if (!imageSizeValid) {
      return;
    }

    let mainImage = await getCroppedImg(images[0], croppedAreaPixels);
    mainImage = await scaleImage(mainImage, 300, 180);
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
      if (e.target.files.length + images.length > maxImageCount) {
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
          setImageErrorMsg(t("Image size limit"));
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

  // Select which image will be used as the main image displayed on the homepage
  const selectAsMain = (event) => {
    const imgSrc = event.target.getAttribute("src");
    const imgIndex = images.indexOf(imgSrc);
    const imageList = [...images];
    const oldMainImg = imageList[0];
    imageList[0] = imageList[imgIndex];
    imageList[imgIndex] = oldMainImg;
    setImages(imageList);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Form onSubmit={submitClicked}>
          <Modal.Header>
            <Modal.Title>{t("Select Images")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Col} controlId="formImages">
              <Form.File
                id="uploadImagesButton"
                name="imageFilePicker"
                multiple
                required
                label={`${t("Upload 1-4 images")}*`}
                feedback={imageErrorMsg}
                accept=".jpg, .jpeg, .png, .tiff"
                isInvalid={!imageSizeValid || !imageCountValid}
                onChange={(e) => {
                  handleImageUpload(e);
                }}
              />
            </Form.Group>
            {images.length > 0 && <p>{t("Select main image")}</p>}
            <Row>
              {images?.map((e, idx) => (
                <span
                  key={Math.floor(Math.random() * 9999)}
                  className="preview-image"
                >
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
            {images.length > 0 && (
              <div>
                <p>{t("Crop main image")}</p>
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
                <p>{t("Scroll to zoom")}</p>
                <canvas id="targetCanvas" ref={canvasRef} />
              </div>
            )}
            <Form.Text className="text-muted">
              * {t("required fields")}
            </Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("Close")}
            </Button>
            <Button variant="primary" type="submit">
              {t("Continue")}
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
