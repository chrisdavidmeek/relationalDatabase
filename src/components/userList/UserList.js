import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSort, checkChange } from "../redux/actions/setActions";
import fire from "../firebase/fire";
import { myCart } from "../redux/actions/setActions";

const UserList = () => {
  const db = fire.firestore();
  const emptyArr = [];
  const change = useSelector(state => state.change);
  const [values, setValues] = React.useState([]);
  const dispatch = useDispatch();

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

  return (
    <div>
      {values.map((doc, idx) => {
        return (
          <div>
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
