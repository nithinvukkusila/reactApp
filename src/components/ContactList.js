import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
const ContactList = (props) => {
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      ></ContactCard>
    );
  });
  const inputEl = useRef("");
  const getSearchTerm = () => {
    
    props.searchKeyWord(inputEl.current.value);
  };
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right"  style={{
            float:'right'
          }}>Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input" style={{
          width: '100%'
        }}>
          <input
            ref={inputEl}
            value={props.term}
            onChange={getSearchTerm}
            type="text"
            placeholder="search contacts"
            className="search"
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList ? renderContactList : "No Contacts Available"}</div>
    </div>
  );
};

export default ContactList;
