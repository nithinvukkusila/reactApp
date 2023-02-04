import React from "react";
import user from "../images/image1.png";
import { Link } from "react-router-dom";
const ContactCard = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="uesr" />
      <div className="content">
        <Link to={{
            pathname:`/contact/:id`
            ,state: {contact: props.contact}
        }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        onClick={() => props.clickHandler(id)}
        style={{ float: "right", color: "red", marginTop: "7px" }}
      ></i>
    </div>
  );
};

export default ContactCard;
