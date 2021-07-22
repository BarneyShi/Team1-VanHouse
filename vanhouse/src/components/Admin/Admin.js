import React, { useEffect, useState } from "react";
import { Tab, Row, Col, Nav, Container, Button } from "react-bootstrap";
import Charts from "./Charts";
import "../../styles/admin.css";
import PostAdmin from "./PostAdmin";
import UserAdmin from "./UserAdmin";

export default function Admin() {
  const [posts, setPosts] = useState();
  const [users, setUsers] = useState();
  useEffect(async () => {
    try {
      const response = await fetch("/posts");
      if (!response.ok) {
        throw Error("FAILED");
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.log("Error while fetch posts for analysis:", err);
    }
  }, []);

  return (
    <Container className="admin-tab" fluid>
      {/* CITATION: https://react-bootstrap.github.io/components/tabs/ */}
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Anaylysis</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Post</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">User</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Charts posts={posts} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <PostAdmin posts={posts} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <UserAdmin users={users} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
