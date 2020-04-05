import React from "react";
import fire from "../firebase/fire";
import { useDispatch } from "react-redux";
import { checkChange } from "../redux/actions/setActions";

const Admin = () => {
  const db = fire.firestore;
  const dispatch = useDispatch();

  const [value, setValues] = React.useState({
    name: "",
    console: "",
    image: ""
  });

  const submit = () => {
    if (!isNaN(value.cost.USA)) {
      db.collection("products")
        .add(value)
        .then(() => {
          setValues({
            name: "",
            console: "",
            image: ""
          });
        });
      dispatch(checkChange());
    }
  };

  const handleChange = prop => event => {
    setValues({
      ...value,
      [prop]: event.target.value
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={handleChange("name")}
        value={value.name}
      />
      <input
        type="text"
        placeholder="console"
        onChange={handleChange("console")}
        value={value.cost.USA}
      />
      <input
        type="text"
        placeholder="Image Link"
        onChange={handleChange("imageUrl")}
        value={value.type}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default Admin;
