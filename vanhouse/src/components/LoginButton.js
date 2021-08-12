import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/login.css";
import { useTranslation } from "react-i18next";

function LoginButton({ handleLoginClicked, user }) {
  const { t, i18n } = useTranslation();
  if (user !== null) {
    return <h2></h2>;
  }
  return (
    <Button
      type="button"
      variant="outline-secondary"
      onClick={handleLoginClicked}
    >
      {t("Login")}
    </Button>
  );
}

LoginButton.defaultProps = {};

LoginButton.propTypes = {
  handleLoginClicked: PropTypes.func.isRequired,
  // https://stackoverflow.com/questions/52864510/react-warning-failed-prop-type-invalid-prop-of-type-object-supplied
  // Accessed July 27, 2021
  user: PropTypes.shape({ firstName: PropTypes.string }),
};

export default LoginButton;
