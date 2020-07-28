import React, { Component } from 'react';
import ReactDOM from 'react-dom';   
import axios from 'axios';
import Vendor from '../Vendor';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';
import { Redirect } from 'react-router-dom';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            type: '',
            ratings:0,
            review:[],
            rating_sum:0
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeType(event) {
        this.setState({type: event});
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.username==='' || this.state.email==='' || this.state.password==='' || this.state.type===''){
            alert("please enter all requeired details");
        }
        else{
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type,
                ratings:0,
                rating_sum:0,
                review:[]
            }
            this.setState({
                username: '',
                email: '',
                password: '',
                type: '',
                ratings:0,
                rating_sum:0,
                review:[]
            });
            axios.post('http://localhost:4000/add', newUser)
                .then(res => console.log(res.data));
        }
    }

    render() {
        if(!localStorage.getItem('user')){
            return (  
            <div class="col-lg">
                <form onSubmit = { this.onSubmit } class="form-horizontal">
                <div className = "form-group .form-horizontal" >
                <label class="control-label col-sm-2 .control-label"  for="username"> Username: </label> 
                <div class="col-sm-10">
                    <input type = "text"
                    className = "form-control"
                    placeholder="Enter username"
                    value = { this.state.username }
                    onChange = { this.onChangeUsername }
                    /> 
                </div>
                </div >
                <div className = "form-group .form-horizontal" >
                <label class="control-label col-sm-2 .control-label"  for="email"> Email: </label> 
                <div class="col-sm-10">
                    <input type = "text"
                    className = "form-control"
                    placeholder="Enter email"
                    value = { this.state.email }
                    onChange = { this.onChangeEmail }
                    />
                </div>
                </div >
                <div className = "form-group" >
                <label class="control-label col-sm-2 .control-label"  for="password"> Password: </label> 
                <div class="col-sm-10">
                    <input type = "password"
                    className = "form-control"
                    placeholder="Enter password"
                    value = { this.state.password }
                    onChange = { this.onChangePassword }
                    />
                </div>
                </div>
                <div className="form-group"> 
                Type:
                <RadioGroup onChange={ this.onChangeType } horizontal>
                    <ReversedRadioButton value="Vendor" class="col-sm-10" >Vendor</ReversedRadioButton>
                    <ReversedRadioButton value="Customer" class="col-sm-10">Customer</ReversedRadioButton>
                </RadioGroup>
                </div>
                <div className = "form-group" >
                <input type = "submit" value = "Create User" className = "btn btn-primary btn-lg" / >
                </div>
                </form>
                </div>
            )
        }
        else{
            ReactDOM.render( < Vendor/ > , document.getElementById('root'));
            return <Redirect to="/Vendor" />
        }
    }
}