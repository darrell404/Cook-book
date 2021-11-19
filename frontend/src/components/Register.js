import React, { Component } from 'react'
import '../App'
import '../css/main.css'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleSubmit(event) {
        alert("Login details submit!");
    }

    onChange(event) {
    }

    render() {
        return (
            <div className="w-100 h-100 n-0 p-0">
                <div id="login-container" className="d-flex w-100 h-75">
                    <form id="login-form" className="d-flex flex-column w-25 h-25 align-items-center text-center justify-content-center" onSubmit={this.handleSubmit}>
                        <input type="text" id="name" className="text-input border-secondary mb-1 border-2 form-control" name="name" placeholder="Email address" required></input>
                        <input onChange={this.onChange} type="password" id="password" className="text-input border-secondary mt-1 border-2 form-control" name="password" placeholder="Password" required></input>
                        <input onChange={this.onChange} type="password" id="password" className="text-input border-secondary mt-1 border-2 form-control" name="password-retype" placeholder="Re-type Password" required></input>
                        <input id="submit" className="m-4 btn-sm btn-secondary" type="submit" value="Create Account" />
                    </form>
                </div>
            </div>
        )
    }
}
