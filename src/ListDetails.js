import { memo } from "react";
import React from "react";
import "./ListDetails.css";

function ListDetails({ data, handleEdit, handleDelete }) {
  return (
    <div className="ListDetailsContainer">
      <h4>please see what you have added:</h4>
      {console.log("ListDetails function is called...")}
      {data &&
        data.map((item) => {
          return (
            <div key={item.id} className="details">
              <div className="details_left">
                <p>Name: {item.fullname}</p>
                <p>Email: {item.email}</p>
                <p>Phone Number: {item.phonenumber}</p>
              </div>
              <div className="details_right">
                <button type="button" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(item)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default memo(ListDetails);
