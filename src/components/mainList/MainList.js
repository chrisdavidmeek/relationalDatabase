import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSort, checkChange } from "../redux/actions/setActions";
import fire from "../firebase/fire";

const MainList = () => {
  const user = useSelector(state => state.user);
  const realUser = useSelector(state => state.realUser);
  const cart = useSelector(state => state.cart);
  const sort = useSelector(state => state.sort);
  const addedArr = useSelector(state => state.added);
  const dispatch = useDispatch();
  const [items, setItems] = React.useState(cart);
  const db = fire.firestore();

  React.useEffect(() => {
    let sortedList = cart;
    console.log(user.name);

    for (let i in sort) {
      if (sort[i].toggle) {
        sortedList = sortedList.filter(it => {
          return sort[i].val.includes(it[i]);
        });
      }
    }
    setItems(sortedList);
  }, [sort, cart]);

  const addGame = (name, imageUrl, consoles, id) => {
    if (addedArr.includes(id)) {
      console.log("you can't add this");
    } else {
      db.collection("users")
        .doc()
        .add({
          name: name,
          imageUrl: imageUrl,
          console: consoles
        })
        .then(addedArr.push(id));
    }
  };

  let itemsEle = items.map((it, idx) => (
    <div key={idx}>
      <img src={it.imageUrl} height="200px" width="auto"></img>
      <h2>{it.name}</h2>
      <h2>{it.console}</h2>

      <button onClick={() => addGame(it.name, it.imageUrl, it.console, it.id)}>
        Add to favorites
      </button>
    </div>
  ));

  return (
    <div>
      <div>
        <button onClick={() => dispatch(changeSort("console", "ps4"))}>
          PS4 Exclusives
        </button>
        <button onClick={() => dispatch(changeSort("console", "xbox"))}>
          Xbox Exclusives
        </button>
        <button onClick={() => dispatch(changeSort("console", "all"))}>
          Cross Platform
        </button>
      </div>
      {items.length === 0 ? "No Items filtered" : itemsEle}
    </div>
  );
};

export default MainList;
