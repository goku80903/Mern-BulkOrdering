import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Vendor from '../Vendor';
import Customer from '../Customer';
import { Redirect } from "react-router-dom";
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const Userlogin = {
            username: this.state.username,
            password: this.state.password
        }
        
        axios.post('http://localhost:4000/log-in/check', Userlogin)
            .then(function(res){
                if(res.status===200){
                    console.log("hi");
                    localStorage.setItem('user',res.data.User);
                    localStorage.setItem('type',res.data.Type);
                    // window.location.reload(false);
                }
                else{
                    console.log("res.status");
                }
            });
            this.setState({
                username: '',
                password: '',
            });
        }
        
    render() {
        if(localStorage.getItem('type')==='Vendor'){
            ReactDOM.render( < Vendor/ > , document.getElementById('root'));
            return <Redirect to="/Vendor"/>
        }
        else if(localStorage.getItem('type')==='Customer'){
            ReactDOM.render( < Customer/ > , document.getElementById('root'));
            return <Redirect to="/Customer"/>
        }
        else{
            return (  
                < div >
                <form onSubmit = { this.onSubmit } >
                    <div className = "form-group" >
                        <label > Username: </label> 
                        <input type = "text"
                        className = "form-control"
                        value = { this.state.username }
                        onChange = { this.onChangeUsername }
                        /> 
                    </div >
                    <div className = "form-group" >
                        <label > Password: </label> 
                        <input type = "password"
                        className = "form-control"
                        value = { this.state.password }
                        onChange = { this.onChangePassword }
                        />
                    </div>
                    <div className = "form-group" >
                        <input type = "submit" value = "Log in" className = "btn btn-primary" / >
                    </div>
                </form>
                </div>
            )
        }
    }
}