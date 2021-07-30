import React from "react";
import { Alert } from "react-bootstrap";

export default function NotAuthorized() {
  return (
    <Alert variant="danger">
      <Alert.Heading>NOT AUTHORIZED</Alert.Heading>
      <p>Sorry, you're not an admin</p>
    </Alert>
  );
}
