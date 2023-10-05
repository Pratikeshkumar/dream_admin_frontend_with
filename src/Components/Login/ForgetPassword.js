import React, { Component } from 'react'
import { NavLink, Navigate, } from 'react-router-dom';
import './Login.css'
import { Container, Form, InputGroup, FormControl, Button, } from 'react-bootstrap';
import { FcLock } from 'react-icons/fc'
import * as authApi from '../../apis/auth'
import WithRouter from '../WithRouter'
class Login extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            email: "",
            password: "",
            loggedIn,
            confirm_password: "",
            otp: "",
            hashedToken: ""
        }
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.sendOtp = this.sendOtp.bind(this)
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async submitForm(e) {
        e.preventDefault()
        try {
            const { email, password, otp, hashedToken } = this.state
            const data = { email, newPassword: password, otp, hashedToken }
            const result = await authApi.completePasswordReset(data)
            if (result.status === 204) {
                alert("Invalid Email")
            } else if (result.status === 203) {
                alert('Wrong OTP')
            } else {
                alert(result.data.message)
                this.props.navigate("/");
            }
        } catch (error) {
            console.log(error)
        }
    }



    async sendOtp() {
        try {
            const { email } = this.state;
            const data = { email }
            if (email) {
                const result = await authApi.forgotPassword(data)
                if (result.status === 204) {
                    alert("Invalid Email")
                } else {
                    alert("OTP Sended Successfully")
                    this.setState({
                        hashedToken: result.data.hashedOTP
                    })
                }
            } else {
                alert('Please Enter Your Email')
            }
        } catch (error) {
            console.log(error)
        }
    }










    render() {
        if (this.state.loggedIn) {
            return <Navigate to='/Dashboard' />
        }
        return (
            <div className='Login-bg'>
                <Container className='form-container'>
                    <h1><span style={{ color: '#198754' }}>Forget </span>Password</h1>
                    <FcLock />



                    <Form onSubmit={this.submitForm}>
                        <Form.Label htmlFor='username'>Email</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i className="fas fa-user"></i></InputGroup.Text>
                            <FormControl
                                placeholder="Email"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="email"
                                name="email"
                                value={this.state.email} onChange={this.onChange}
                                required
                            />
                            <InputGroup.Text>
                                <Button onClick={this.sendOtp} variant="primary">
                                    Send otp
                                </Button>
                            </InputGroup.Text>
                        </InputGroup>

                        <Form.Label htmlFor='otp'>OTP</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i className="fas fa-key"></i></InputGroup.Text>
                            <FormControl
                                placeholder="One time password"
                                aria-label="password"
                                aria-describedby="basic-addon1"
                                type="number"
                                name="otp"
                                value={this.state.otp} onChange={this.onChange}
                                required
                            />
                        </InputGroup>

                        <Form.Label htmlFor='password'>New password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i className="fas fa-key"></i></InputGroup.Text>
                            <FormControl
                                placeholder="New Password"
                                aria-label="password"
                                aria-describedby="basic-addon1"
                                type="password"
                                name="password"
                                value={this.state.password} onChange={this.onChange}
                                required
                            />
                        </InputGroup>
                        <br></br>
                        <button className='btn btn-success'> Confirm </button>
                        <div style={{ marginTop: 15 }}>
                            <NavLink to={'/'}>Login ?</NavLink>
                        </div>
                    </Form>


                </Container>
            </div>
        )
    }
}
export default WithRouter(Login)