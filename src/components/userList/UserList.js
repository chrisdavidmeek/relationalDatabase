import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSort,
  checkChange,
  currentUser
} from "../redux/actions/setActions";
import fire from "../firebase/fire";
import { myCart } from "../redux/actions/setActions";
import userPage from "../userPage/userPage";

const UserList = () => {
  const db = fire.firestore();
  const emptyArr = [];
  const change = useSelector(state => state.change);
  const [values, setValues] = React.useState([]);
  const dispatch = useDispatch();

  const realUser = useSelector(state => state.realUser);

  React.useEffect(() => {
    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const object = doc.data();

          let item = {
            name: object.name,
            imageUrl: object.imageUrl,
            console: object.console,
            id: doc.id
          };
          emptyArr.push(item);
        });
        setValues(emptyArr);
      });
  }, [db, change]);

  const removeItem = id => {
    db.collection("users")
      .doc(id)
      .delete()
      .then(() => {
        dispatch(checkChange());
      });
  };
  console.log(realUser.id);

  return (
    <div>
      <div>
        <h1>{realUser.name}'s Favorites</h1>
        Account: {realUser.email}
      </div>
      {values.map((doc, idx) => {
        return (
          <div>
            <br />
            <img src={doc.imageUrl} height="200px" width="auto"></img>
            <h2>{doc.name}</h2>
            <h2>{doc.console}</h2>
            <button onClick={() => removeItem(doc.id)}>
              Remove from Favorites
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
