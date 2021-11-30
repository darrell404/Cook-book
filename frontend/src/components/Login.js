import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../App'
import '../css/main.css'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        alert("Login details submit!");
    }

    buttonClick() {

    }

    render() {
        return (
            <div className="w-100 h-100 n-0 p-0">
                <div id="login-container" className="d-flex w-100 h-75">
                    <form id="login-form" className="d-flex flex-column w-25 h-25 align-items-center text-center justify-content-center" onSubmit={this.handleSubmit}>
                        <input type="email" id="email" className="text-input border-secondary mb-1 border-2 form-control" name="email" placeholder="Email address" required></input>
                        <input type="password" id="password" className="text-input border-secondary mt-1 border-2 form-control" name="password" placeholder="Password" required></input>
                        <input id="submit" className="m-4 btn-sm btn-secondary" type="submit" value="Login" />
                        <p>If you do not have an account yet, click <Link to='/register'> here </Link> to register</p>
                    </form>
                </div>
            </div>
        )
    }
}
