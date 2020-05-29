import React, { Component } from 'react'

export default class SignupBox extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
          confPassword: ''
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

      handleConfPasswordChange = event => {
          let value = event.target.value
          this.setState({
              confPassword: event.target.value
          })
          this.props.providePasswordConfirmation(value)
      }

      handleSubmit = event => {
        
      }

      render() {
          return(
              <div id='login-box'>
                    PLEASE SIGN UP
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
                      <label id='password-confirmation' htmlFor='password-confirmation'>Confirm: </label>
                      <input type ='password' name='password' id='password-confirmation' onChange={event => this.handleConfPasswordChange(event)} value={this.state.confPassword}/>

                      <br></br>
                      <br></br>                      
                  </form>
              </div>

          )
      }
}