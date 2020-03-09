import React from "react";
import "./App.css";
import MainList from "./components/mainList/MainList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initCart } from "../src/components/redux/actions/setActions";
import fire from "../src/components/firebase/fire";

function App() {
  const dispatch = useDispatch();
  const db = fire.firestore();
  const change = useSelector(state => state.change);

  /* your React.useEffect */
  React.useEffect(() => {
    let newItems = [];

    db.collection("masterList")
      .get()
      .then(function(snapshot) {
        snapshot.forEach(function(doc) {
          const object = doc.data();

          let item = {
            name: object.name,
            imageUrl: object.imageUrl,
            console: object.console,
            id: doc.id
          };

          newItems.push(item);
        });
        dispatch(initCart(newItems));
      });
  }, [db, dispatch, change]);
  return (
    <div className="App">
      <Router>
        <div className="App">
          <nav>
            <Link to={"/mainlist"}>Main List</Link>
          </nav>
          <Switch>
            <Route path={"/mainlist"} component={MainList} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
