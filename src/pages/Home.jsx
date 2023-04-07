import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { Form, Button, Row, Col } from "react-bootstrap";
import { IntlProvider, FormattedMessage } from "react-intl";
const initialState = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  companyName: "",
  ForumName: "",
  submit: "",
};
export const Home = () => {
  const [inputs] = useState(initialState);
  const [apiMessage] = useState("");
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState(null);
  const [data, setData] = useState(null);
useEffect(() => {
  const storedData = localStorage.getItem("data");
  if (storedData) {
    setData(JSON.parse(storedData));
  }
  else {
    axios.get(`https://localhost:7149/api/v1/Multilingual/GetText?langtrans=${locale}`)
    .then(response => {
      const messages = response.data.reduce((obj, { key, text }) => ({ ...obj, [key]: text }), {});
    
      // Merge new messages with existing messages, if any
      const existingMessages = JSON.parse(localStorage.getItem("messages")) || {};
      setMessages(existingMessages);
      localStorage.setItem("messages", JSON.stringify(existingMessages));
      console.log(messages);
      // Clear data in case there were changes in the API
      localStorage.removeItem("data");
    })
    .catch(error => console.log(error));
  }
}, [locale]);
  function handleLocaleChange(e) {
    setLocale(e.target.value);
  }
  return (
    <div>
      <IntlProvider locale={locale} messages={messages}>
        {messages && data && (
          <div>
            {data.map(({ key }) => (
              <FormattedMessage key={key} id={key} />
            ))}
          </div>
        )}
        <NavigationBar handleLocaleChange={handleLocaleChange} />
        <div className="rowStyle">
          <div className="colStyle">
            <br/>
            <Form>
              <h1>
                <FormattedMessage id="forumTitle" />
              </h1>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                  <FormattedMessage id="firstName" />
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="firstName"
                    className="inputForm"
                    value={inputs.firstName}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                  <FormattedMessage id="lastName" />
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="lastName"
                    className="inputForm"
                    value={inputs.lastName}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                  <FormattedMessage id="emailAddress" />
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="emailAddress"
                    className="inputForm"
                    value={inputs.emailAddress}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                  <FormattedMessage id="companyName" />
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="companyName"
                    className="inputForm"
                    value={inputs.companyName}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button className="Btn-style submitButton" type="submit">
                    <FormattedMessage id="submit" />
                  </Button>
                </Col>
              </Form.Group>
            </Form>
            <span>{apiMessage}</span>
          </div>
          <div className="colStyle mt-10"></div>
        </div>
      </IntlProvider>
    </div>
  );
};
export default Home;
