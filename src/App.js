import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';


// import FAQ from "./components/FAQ";
// import About from "./components/About";
import Login from "./components/Login";
import UserList from "./components/UserList";
import UserSearch from "./components/UserSearch";
import ProfileDetails from "./components/ProfileDetails";
import FriendsList from "./components/FriendsList";
import ProfileMatch from "./components/ProfileMatch";
import Registration from "./components/Registration";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/gm" exact component={Login} />
                    <Route path="/gm/Login" exact component={Login} />
                    <Route path="/Register" exact component={Registration} />
                    <Route path="/UserList" exact render={(props) => (
                        <UserList {...this.props} />)} />
                    <Route path="/UserSearch" exact render={(props) => (
                        <UserSearch {...this.props} />)} />
                    <Route path="/ProfileDetails" exact render={(props) => (
                        <ProfileDetails {...this.props} />)} />
                    <Route path="/FriendsList" exact render={(props) => (
                        <FriendsList {...this.props} />)} />
                    <Route path="/ProfileMatch" exact render={(props) => (
                        <ProfileMatch {...this.props} />)} />
                    {/* <Route path="/about" exact component={About} />
                    <Route path="/faq" exact component={FAQ} /> */}
                </Switch>
            </Router>
        );
    }
}

export default App;
