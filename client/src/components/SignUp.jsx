import React from 'react'
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


var SignUp = (props) => (
  <div className="text-center" onClick={()=> props.hideAlert() }>
    <Grid>
      <Row>
        <Col md={6} mdOffset={3}>
          <Panel className="login-panel">
            <h1>Sign Up</h1>
            <div className={props.alert}>Warning: {props.alertText}</div>
            <Form horizontal onSubmit={props.signup}>
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
                  <Button bsStyle="info" type="submit">Sign up</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>
        </Col>
      </Row>
    </Grid>
    </div>
)

export default SignUp
