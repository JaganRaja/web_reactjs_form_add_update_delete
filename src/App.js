import "./App.css";
import { useCallback, useState } from "react";
import ListDetails from "./ListDetails.js";

function App() {
  const [personalObj, setPersonalObj] = useState({});
  const [fullDetails, setFullDetails] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPersonalObj((previousState) => {
      return { ...previousState, [name]: value };
    });
  };

  console.log("personalObj", personalObj);

  const handleSubmit = (event) => {
    event.preventDefault();
    let id_number = fullDetails.length + 1;
    setFullDetails((previousState) => {
      return [
        ...previousState,
        {
          ...personalObj,
          id: personalObj.phonenumber + "_" + id_number,
        },
      ];
    });
    setPersonalObj((previousState) => {
      return {};
    });
  };

  console.log("fullDetails", fullDetails);

  const handleEdit = useCallback(
    (obj) => {
      console.log("Edit obj", obj);
      setPersonalObj(obj);
      setIsEdit(true);
    },
    [fullDetails]
  );

  const handleUpdate = (event) => {
    event.preventDefault();
    setFullDetails((previousState) => {
      const newState = previousState.map((details) => {
        if (details.id === personalObj.id) {
          console.log("...details", details);
          return { ...details, ...personalObj };
        }

        return details;
      });
      return newState;
    });
    setPersonalObj({});
    setIsEdit(false);
  };

  const handleDelete = useCallback(
    (obj) => {
      //console.log("obj", obj);
      setFullDetails((previousState) =>
        previousState.filter((details) => {
          return details.id !== obj.id;
        })
      );
    },
    [fullDetails]
  );

  // const handleDelete = (obj) => {
  //   console.log("obj", obj);
  //   setFullDetails((previousState) => {
  //     return previousState.filter((details) => {
  //       return details.id !== obj.id;
  //     });
  //   });
  // };

  return (
    // container
    <div className="container">
      {/* form */}
      {/* onSubmit={handleSubmit} */}
      <form>
        <label htmlFor="fullname">First Name</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={personalObj.fullname || ""}
          onChange={handleInputChange}
          placeholder="your name"
          required
        ></input>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={personalObj.email || ""}
          onChange={handleInputChange}
          placeholder="sample@mail.com"
          required
        ></input>
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          type="tel"
          id="phonenumber"
          name="phonenumber"
          value={personalObj.phonenumber || ""}
          onChange={handleInputChange}
          pattern="[0-9]{10}"
          placeholder="1234567890"
          maxLength="10"
          minLength="10"
          required
        ></input>

        {isEdit ? (
          <input type="submit" value="Update" onClick={handleUpdate}></input>
        ) : (
          <input type="submit" value="Submit" onClick={handleSubmit}></input>
        )}
      </form>
      <ListDetails
        data={fullDetails}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
