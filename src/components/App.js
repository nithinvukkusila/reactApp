import "../App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactDetails from "./ContactDetails";
function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [i, setI] = useState(1);
  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: i, ...contact }]);
    setI(i + 1);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContants) {
      setContacts(retriveContants);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
        <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/add"
            exact
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
      
          <Route 
           path="/contact/:id"
           exact
           component={ContactDetails}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
