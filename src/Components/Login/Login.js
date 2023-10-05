import React, { Component } from 'react'
import { NavLink, Navigate } from 'react-router-dom';
import './Login.css'
import { Container, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FcLock } from 'react-icons/fc'
import * as authApi from '../../apis/auth'
export default class Login extends Component {
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
      loggedIn
    }
    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm(e) {
    e.preventDefault()
    const { email, password } = this.state
    const data = {email, password}
    authApi.adminLogin(data)
    .then((r) => {
      localStorage.setItem('token', r?.auth_token)
      this.setState({
        loggedIn: true
      })
    })
    .catch((err) => {
      alert("Invalid Credentials")
    })
  }
  render() {
    if (this.state.loggedIn) {
      return <Navigate to='/dashboard' />
    }
    return (
      <div className='Login-bg'>
        <Container className='form-container'>
          <h1><span style={{ color: '#198754' }}>Admin </span>Login</h1>
          <FcLock />
          <Form onSubmit={this.submitForm}>
            <Form.Label htmlFor='username'>Email</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"><i className="fas fa-user"></i></InputGroup.Text>
              <FormControl
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="text"
                name="email"
                value={this.state.email} onChange={this.onChange}
                required
              />
            </InputGroup>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"><i className="fas fa-key"></i></InputGroup.Text>
              <FormControl
                placeholder="Password"
                aria-label="password"
                aria-describedby="basic-addon1"
                type="password"
                name="password"
                value={this.state.password} onChange={this.onChange}
                required
              />
            </InputGroup>
            <br></br>
            <button className='btn btn-success'> Login </button>
            <div style={{marginTop: 15}}>
              <NavLink to={'/forget_password'}>Forget Password ?</NavLink>
            </div>
          </Form>

          
        </Container>
      </div>
    )
  }
}
