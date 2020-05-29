import React, { Component } from 'react'
import '../App.css'

export default class LoginBox extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: ''
        };
      }

      handleUsernameChange = event => {
        let value = event.target.value
        this.setState({
            username: value
          })
          this.props.provideUsername(value)
      }


      handlePasswordChange = event => {
        let value = event.target.value
        this.setState({
            password: event.target.value
          })
        this.props.providePassword(value)
      }

      handleSubmit = event => {
        
      }

      render() {
          return(
              <div id='login-box'>
                    PLEASE LOG IN
                  <br></br>
                  <br></br>

                  <form onSubmit={event => this.handleSubmit(event)}>
                      <label id='username-input' htmlFor='username'>Username: </label>
                      <input type ='text' name='username' id='username' onChange={event => this.handleUsernameChange(event)} value={this.state.username}/>
                      <br></br>
                      <br></br>
                      <label id='password-input' htmlFor='password'>Password: </label>
                      <input type ='password' name='password' id='password' onChange={event => this.handlePasswordChange(event)} value={this.state.password}/>

                      <br></br>
                      <br></br>                      
                  </form>
              </div>

          )
      }
}