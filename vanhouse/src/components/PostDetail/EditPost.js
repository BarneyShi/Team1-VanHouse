import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Form, Modal, Col, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import addIcon from "../../assets/addIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import "../../styles/editPost.css";

export default function EditPost({
  show,
  setDisplay,
  post,
  setPost,
  setUpdaedPost,
}) {
  const formRef = useRef();
  const [previewImages, setPreviewImages] = useState();
  const [imageSizeValid, setImageSizeValid] = useState(true);
  const [imageCountValid, setImageCountValid] = useState(true);
  const [imageErrorMsg, setImageErrorMsg] = useState("");
  const [executing, setExecuting] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setPreviewImages(post?.images);
  }, [post]);

  const editPost = async (event) => {
    event.preventDefault();
    setExecuting(true);
    const form = formRef.current;
    const {
      title,
      email,
      phone,
      address,
      postalCode,
      price,
      paymentPeriod,
      leaseLength,
      bedrooms,
      bathrooms,
      sqft,
      utilities,
      pets,
      laundry,
      furnished,
    } = form;
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("price", price.value);
    formData.append("address", address.value);
    formData.append("postalCode", postalCode.value);
    const payments = ["daily", "weekly", "monthly"];
    formData.append("paymentPeriod", payments[paymentPeriod.selectedIndex]);
    const leases = ["0", "6", "12"];
    formData.append("leaseLength", leases[leaseLength.selectedIndex]);
    formData.append("bedrooms", bedrooms.value);
    formData.append("bathrooms", bathrooms.value);
    formData.append("sqft", sqft.value);
    formData.append("utilities", utilities.checked);
    formData.append("pets", pets.checked);
    formData.append("laundry", laundry.checked);
    formData.append("furnished", furnished.checked);
    formData.append("images", JSON.stringify(previewImages));

    const reponse = await fetch(`/post/${post.id}/edit`, {
      method: "put",
      body: formData,
      credentials: "include",
    });
    const updatedPost = await reponse.json();
    setPost(updatedPost);
    if (typeof setUpdaedPost === "function") {
      setUpdaedPost(updatedPost);
    }
    setExecuting(false);
    setDisplay(false);
  };

  const openUploading = () => {
    formRef.current.images.click();
  };

  /* Disclaim: Reuse Naithan's function handleImageUpload in <NewPost /> */
  const handleImageUpload = (e) => {
    const maxImageSize = 1000000;
    setImageErrorMsg("");
    setImageSizeValid(true);
    if (e.target.files) {
      const imageList = [];
      // Check image count is valid
      const maxImageCount = 4;
      if (e.target.files.length > maxImageCount) {
        e.target.value = null; // CITATION: https://stackoverflow.com/a/42192710
        // setPreviewImages(previewImages);
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
          setImageErrorMsg(
            "One or more image file size exceed 1MB. Please select files under 1MB."
          );
          setImageSizeValid(false);
          return;
        }
        // Add valid files to the images state
        if (e.target.files[i]) {
          const fileReader = new FileReader();
          fileReader.onload = (event) => {
            imageList.push(event.target.result);
            setPreviewImages([...previewImages, ...imageList]);
          };
          fileReader.readAsDataURL(e.target.files[i]);
        }
      }
    }
  };

  const deleteImage = (event) => {
    const imgSrc = event.target.getAttribute("data-ref");
    const imgIndex = previewImages.indexOf(imgSrc);
    previewImages.splice(imgIndex, 1);
    setPreviewImages([...previewImages]);
  };

  return (
    <Modal show={show} onHide={() => setDisplay(false)}>
      <Form onSubmit={editPost} ref={formRef}>
        <Modal.Header>
          <Modal.Title>{t("Edit Post")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formTitle">
            <Form.Label>{t("Title")}</Form.Label>
            <Form.Control
              placeholder={t("Title")}
              defaultValue={post?.title}
              name="title"
            />
          </Form.Group>

          <Row>
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>{t("Email address")} *</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                defaultValue={post?.email}
                name="email"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPhone">
              <Form.Label>{t("Phone number")}</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
                defaultValue={post?.phone}
                name="phone"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>{t("Address")} *</Form.Label>
              <Form.Control
                required
                placeholder="1961 East Mall"
                defaultValue={post?.address}
                name="address"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="form">
              <Form.Label>{t("Postal Code")} *</Form.Label>
              <Form.Control
                required
                placeholder="A1B 2C3"
                pattern="[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]"
                defaultValue={post?.postalCode}
                name="postalCode"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="formPrice">
              <Form.Label>{t("Price")} *</Form.Label>
              <Form.Control
                required
                type="number"
                min="0"
                placeholder="1000"
                defaultValue={post?.price}
                name="price"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPricePeriod">
              <Form.Label> {t("Payment period")} </Form.Label>
              <Form.Control as="select" name="paymentPeriod">
                <option selected={post?.paymentPeriod === "daily"}>
                  {t("daily")}
                </option>
                <option selected={post?.paymentPeriod === "weekly"}>
                  {t("weekly")}
                </option>
                <option selected={post?.paymentPeriod === "monthly"}>
                  {t("monthly")}
                </option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formLease">
              <Form.Label>{t("Lease length")}</Form.Label>
              <Form.Control as="select" name="leaseLength">
                <option selected={post?.leaseLength === "0"}>
                  {t("no lease")}
                </option>
                <option selected={post?.leaseLength === "6"}>
                  6 {t("months")}
                </option>
                <option selected={post?.leaseLength === "12"}>
                  1 {t("year")}
                </option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBedrooms">
                <Form.Label>{t("Bedrooms")}</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="1"
                  defaultValue={post?.bedrooms}
                  name="bedrooms"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBathrooms">
                <Form.Label>{t("Bathrooms")}</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="1"
                  defaultValue={post?.bathrooms}
                  name="bathrooms"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formSqft">
                <Form.Label>{t("Square ft")}</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="500"
                  defaultValue={post?.sqft}
                  name="sqft"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formUtilities">
                <Form.Check
                  type="checkbox"
                  label={t("Utilities included")}
                  defaultChecked={post?.utilities}
                  name="utilities"
                />
              </Form.Group>

              <Form.Group controlId="formPets">
                <Form.Check
                  type="checkbox"
                  label={t("Pets allowed")}
                  defaultChecked={post?.pets}
                  name="pets"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLaundry">
                <Form.Check
                  type="checkbox"
                  label={t("In suite laundry")}
                  defaultChecked={post?.laundry}
                  name="laundry"
                />
              </Form.Group>
              <Form.Group controlId="formFurnished">
                <Form.Check
                  type="checkbox"
                  label={t("Furnished")}
                  defaultChecked={post?.furnished}
                  name="furnished"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group as={Col} controlId="formImages">
            <Form.File
              id="uploadImagesButton"
              multiple
              label="Upload image(s)"
              accept=".jpg, .jpeg, .png, .tiff"
              style={{ display: "none" }}
              name="images"
              onChange={handleImageUpload}
            />
            <Form.Text className="text-muted">
              {t("Upload 1-4 images")}
            </Form.Text>
            <Form.Text className="text-muted edit-image-errors">
              {imageErrorMsg}
            </Form.Text>
          </Form.Group>

          {previewImages?.map((e) => (
            <span
              key={Math.floor(Math.random() * 9999)}
              className="preview-image"
            >
              <img
                className="editPost-images"
                width="84"
                height="84"
                alt="post-images"
                src={e}
              />
              <img
                className="preview-image-delete"
                width="24"
                data-ref={e}
                src={deleteIcon}
                alt="preview-delete"
                onClick={deleteImage}
              />
            </span>
          ))}
          <img
            id="add-icon"
            width="40"
            height="40"
            src={addIcon}
            alt="add-icon"
            onClick={openUploading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDisplay(false)}>
            {t("Close")}
          </Button>
          <Button disabled={executing} variant="primary" type="submit">
            {t(executing ? "Waiting..." : "Continue")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

EditPost.propTypes = {
  show: PropTypes.bool.isRequired,
  setDisplay: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    postalCode: PropTypes.string,
    price: PropTypes.number,
    paymentPeriod: PropTypes.string,
    bedrooms: PropTypes.string,
    bathrooms: PropTypes.string,
    sqft: PropTypes.string,
    leaseLength: PropTypes.string,
    pets: PropTypes.bool,
    utilities: PropTypes.bool,
    laundry: PropTypes.bool,
    furnished: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
  setPost: PropTypes.func.isRequired,
  setUpdaedPost: PropTypes.func,
};
