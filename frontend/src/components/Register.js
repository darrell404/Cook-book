import React, { Component } from 'react'
import '../App'
import '../css/main.css'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            confirmpassword: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleSubmit(event) {
        alert("Login details submit!");
    }

    onChange(event) {
        this.setState({password: event.target.value})
        if (this.state.password.match(this.state.confirmpassword)) {
            console.log("Passwords match")
        }
    }

    render() {
        return (
            <div className="w-100 h-100 n-0 p-0">
                <div id="login-container" className="d-flex w-100 h-75">
                    <form id="login-form" className="d-flex flex-column w-25 h-25 align-items-center text-center justify-content-center" onSubmit={this.handleSubmit}>
                        <input type="email" id="email" className="text-input border-secondary mb-1 border-2 form-control" name="email" placeholder="Email address" required></input>
                        <input type="password" id="password" className="text-input border-secondary mt-1 mb-1 border-2 form-control" name="password" placeholder="Password" required></input>
                        <input onChange={this.onChange} type="password" id="password" className="text-input border-secondary mt-1 border-2 form-control" name="password-retype" placeholder="Confirm Password" required></input>
                        <input id="submit" className="m-4 btn-sm btn-secondary" type="submit" value="Create Account" />
                        
                    </form>
                </div>
            </div>
        )
    }
}
