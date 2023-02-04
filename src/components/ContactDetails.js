import React from "react";
import { Link } from "react-router-dom";
import image1 from "../images/image1.png";
const ContactDetails = (props) => {
    const {name, email} = props.location.state.contact
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={image1} alt="user"/>
        </div>
        <div className="content">
            <div className="header">
                {name}
            </div>
            <div className="description">
              {email}
            </div>
        </div>
      </div>
      <div className="center">
         <Link to='/'>
         <button className="ui button blue center">Back To Contact List</button>
         </Link>
      </div>
    </div>
  );
};

export default ContactDetails