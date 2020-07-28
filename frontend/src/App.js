import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Login from './components/log-in.component'
import Vendor from './Vendor'
import Customer from './Customer'


function App() {
  if(localStorage.getItem('type')){
    if(localStorage.getItem('type')==='Vendor'){
      ReactDOM.render(<Router> < Vendor/ > </Router>, document.getElementById('root'));
      return <Redirect to="/Vendor" />
    }
    if(localStorage.getItem('type')==='Customer'){
      ReactDOM.render(<Router> < Customer/ > </Router>, document.getElementById('root'));
      return <Redirect to="/Customer" />
    }
  }
  else{
    return (
      <Router>
        <div className="container" id="main">
          <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
            <Link to="/" className="navbar-brand ml-auto">App</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Users</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create User</Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="navbar-item ml-auto">
                  <Link to="/log-in" className="nav-link">Log in</Link>
                </li>
              </ul>
            </div>
          </nav>
  
          <br/>
          <Route path="/" exact component={UsersList}/>
          <Route path="/create" component={CreateUser}/>
          <Route path="/log-in" component={Login}/>
        </div>
      </Router>
    )
  }
}

export default App;
