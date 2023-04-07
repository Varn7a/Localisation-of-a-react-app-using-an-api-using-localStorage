
import {React, useState, useEffect} from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import axios from "axios";


export function Testing1() {
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")) || null);

  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  
  
    axios.get(`https://localhost:7149/api/v1/Multilingual/GetText?langtrans=${locale}`)
  .then(response => {
    const messages = response.data.reduce((obj, { key, text }) => ({ ...obj, [key]: text }), {});
    setMessages(messages);
    localStorage.setItem("messages", JSON.stringify(messages));
    const storedMessages = JSON.parse(localStorage.getItem("messages"));
    console.log(storedMessages);
  })
  .catch(error => console.log(error));
  }, [locale]);
  

    

  function handleLocaleChange(e) {
    setLocale(e.target.value);
  }

  return (
    <div>
      <IntlProvider locale={locale} messages={messages}>
        {messages && data &&  (
          <div>
            {data.map(({ key }) => (
              <FormattedMessage key={key} id={key} />
            
            ))}
          
          </div>
          
        )}
        <label ><FormattedMessage id="firstName" /> </label>
        <br/>
        <label><FormattedMessage id="lastName"/></label>
        <select value={locale} onChange={handleLocaleChange}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </IntlProvider>
    </div>
  );
};

export default Testing1;


