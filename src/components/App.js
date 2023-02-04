import "../App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactDetails from "./ContactDetails";
import api from "../api/context";
import EditContact from "./EditContact";

function App() {
  const [contacts, setContacts] = useState([]);

  const retriveContants = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  const addContactHandler = async (contact) => {
    const payload = {
      id: Math.random(),
      ...contact,
    };
    const response = await api.post("/contacts", payload);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
     const response = await api.put(`/contacts/${contact.id}`, contact)
     console.log(response.data)
     const {id, name, email} = response.data
     setContacts(contacts.map((contact)=> {
         return contact.id === id ?  { ...response.data } : contact
     }))
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retriveContants();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
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

          <Route path="/contact/:id" exact component={ContactDetails} />
          <Route
            path="/edit"
            exact
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateContactHandler} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
