import React from "react";
import "./App.css";
import MainList from "./components/mainList/MainList";
import UserList from "./components/userList/UserList";
import Admin from "./components/admin/Admin";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  initCart,
  checkSignIn,
  currentUser
} from "../src/components/redux/actions/setActions";
import fire from "../src/components/firebase/fire";

function App() {
  const dispatch = useDispatch();
  const db = fire.firestore();
  const change = useSelector(state => state.change);
  const signedIn = useSelector(state => state.signedIn);

  /*Sign Out */
  const signOut = () => {
    fire
      .auth()
      .signOut()
      .then(function() {
        console.log("Signed Out");
      })
      .catch(function(error) {});
  };

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

  fire.auth().onAuthStateChanged(function(user) {
    if (user) {
      dispatch(checkSignIn(true));
      dispatch(currentUser(user));
    } else {
      dispatch(checkSignIn(false));
      dispatch(currentUser({ name: "" }));
    }
  });

  return (
    <div className="App">
      <Router>
        <div className="App">
          <nav>
            <Link style={{ margin: "10px" }} to={"/mainlist"}>
              Main List
            </Link>
            <Link style={{ margin: "10px" }} to={"/userlist"}>
              My Collection
            </Link>
            <Link style={{ margin: "10px" }} to={"/admin"}>
              Admin
            </Link>

            {!signedIn ? (
              <span>
                {" "}
                <Link style={{ margin: "10px" }} to={"/signup"}>
                  Sign Up
                </Link>
                <Link style={{ margin: "10px" }} to={"/signIn"}>
                  Sign In
                </Link>
              </span>
            ) : (
              <button onClick={signOut}>Sign Out</button>
            )}
          </nav>
          <Switch>
            <Route path={"/mainlist"} component={MainList} />
            <Route path={"/userlist"} component={UserList} />
            <Route path={"/admin"} component={Admin} />
            <Route path={"/signup"} component={SignUp} />
            <Route path={"/signin"} component={SignIn} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
