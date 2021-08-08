import React from "react";
import { Alert } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

export default function NotAuthorized() {
  const { t, i18n } = useTranslation();
  return (

    <Alert variant="danger">
      <Alert.Heading>  {t('NOT AUTHORIZED')} </Alert.Heading>
      <p> {t('Sorry, you are not an admin')} </p>
    </Alert>
  );
}
