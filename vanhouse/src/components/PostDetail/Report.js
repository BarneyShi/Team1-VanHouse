import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import emailjs from "emailjs-com";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Report({ displayReport, setDisplayReport }) {
  const formRef = useRef();
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const submitReport = () => {
    const { spam, scam, harassment, inappropriate, other } = formRef.current;
    const template = {
      postID: id,
      message: `<input type=checkbox ${
        spam.checked ? "checked" : ""
      }/><label> Spam or missleading content</label>
      <br>
      <input type=checkbox ${
        scam.checked ? "checked" : ""
      }/><label> Scam or impersonation to scam</label>
      <br>
      <input type=checkbox ${
        harassment.checked ? "checked" : ""
      }/><label> Harassment or cyberbullying</label>
      <br>
      <input type=checkbox ${
        inappropriate.checked ? "checked" : ""
      }/><label> Inappropriate name, image, or content</label>
      <br>
      <input type=checkbox ${
        other.checked ? "checked" : ""
      }/><label> Other</label>`,
    };

    emailjs
      .send(
        "service_btfbsoh",
        "template_tp03ocm",
        template,
        "user_BZA6UlRume7xE7WZ9pHEE"
      )
      .then((res) => console.log("Email sent! ", res))
      .catch((err) => console.log("Error while sending report email ", err));

    setDisplayReport(false);
  };

  return (
    <Modal show={displayReport} onHide={() => setDisplayReport(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('Report Inappropriate or Violation')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="reportForm" ref={formRef}>
          <Form.Check
            name="spam"
            type="checkbox"
            label={t("Spam or missleading content")}
          />
          <Form.Check
            name="scam"
            type="checkbox"
            label={t("Scam or impersonation to scam")}
          />
          <Form.Check
            name="harassment"
            type="checkbox"
            label={t("Harassment or cyberbullying")}
          />
          <Form.Check
            name="inappropriate"
            type="checkbox"
            label={t("Inappropriate name, image, or content")}
          />
          <Form.Check name="other" type="checkbox" label={t("Other")} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitReport}>{t('Submit')}</Button>
      </Modal.Footer>
    </Modal>
  );
}

Report.propTypes = {
  displayReport: PropTypes.bool.isRequired,
  setDisplayReport: PropTypes.func.isRequired,
};
