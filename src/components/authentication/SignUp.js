import React from "react";
import fire from "../firebase/fire";
import { useDispatch } from "react-redux";
import { checkChange } from "../redux/actions/setActions";
//on change, set the values of state to the fields
//once state is set, push values using auth methods

const SignUp = () => {
  const db = fire.firestore();
  const [value, setValues] = React.useState({
    email: "",
    password: "",
    name: ""
  });
  const dispatch = useDispatch();
  //create handle change function

  const handleChange = prop => event => {
    setValues({ ...value, [prop]: event.target.value });
  };

  //create submit function with firebase

  const onSubmit = () => {
    db.collection("users")
      .doc(user.uid)
      .collection("favorites")
      .add({ name: user.name });
    fire
      .auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(() => {
        let user = fire.auth().currentUser;

        user
          .updateProfile({
            displayName: value.name
          })
          .then(function() {
            setValues({
              email: "",
              password: "",
              name: ""
            });
            dispatch(checkChange());
          })
          .catch(function(error) {
            //an error happened
          });
      })
      .catch(function(error) {
        //handle errors here
        let errorCode;
        let errorMessage = error.message;
      });
  };
  return (
    <div>
      <input onChange={handleChange("email")} placeholder={"Email..."} />
      <input
        onChange={handleChange("password")}
        placeholder={"Password..."}
        type={"password"}
      />
      <input onChange={handleChange("name")} placeholder={"Name..."} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default SignUp;
