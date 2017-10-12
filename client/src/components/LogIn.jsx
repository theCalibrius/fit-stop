import React from 'react';
import ReactDOM from 'react-dom';
import {
  FormControl,
  Button,
  FormGroup,
  Form,
  Panel,
  Grid,
  Row,
  Col
} from "react-bootstrap";


var Login = (props) => (
  <div className="loginPage">
    <Grid>
      <Row>
        <Col md={6} mdOffset={1}>
          <Panel className="login-panel">
            <h1>Log In</h1>
            <Form horizontal onSubmit={props.login}>
              <FormGroup>
                <Col md={6} mdOffset={3}>
                  <FormControl
                    id="username"
                    type="email"
                    placeholder="Email"
                    name="username"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col md={6} mdOffset={3}>
                  <FormControl
                    d="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col md={12} sm={12}>
                  <Button type="submit">Log in</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>
        </Col>
      </Row>
    </Grid>
  </div>
);


export default Login;
