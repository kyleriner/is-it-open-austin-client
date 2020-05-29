import React from 'react'
import LoginBox from './LoginBox'
import SignupBox from './SignupBox'
import '../App.css';

export default class Authentication extends React.Component {


    constructor(props) {
        super(props);
    
        this.state = {
          signUp: false,
          username: '',
          password: '',
          confPassword: ''
        };
      }

      swapAuth = () => {
          let swapButton = document.getElementById("auth-swap")
          let authButton = document.getElementById('authenticate')
          this.setState({
              signUp: !this.state.signUp
          })

          if (this.state.signUp) {
              swapButton.textContent = 'Sign Up'
              authButton.textContent = 'Log In'
          } else {
              swapButton.textContent = 'Log In'
              authButton.textContent = 'Sign Up'
          }

          
      }

      provideUsername = (username) => {
        this.setState({
            username: username,
        })
      }

      providePassword = (password) => {
          this.setState({
            password: password
          })
      }

      providePasswordConfirmation = (confPassword) => {
          this.setState({
              confPassword: confPassword
          })
      }

      authentication = () => {
          if (this.state.signUp) {

              let UserSignupObj = {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                    "Accept": "application/json"
                },
              
                body: JSON.stringify({
                    user: {
                   username: this.state.username,
                   password: this.state.password
                    }
                })
              };


              fetch('http://localhost:3001/api/v1/users', UserSignupObj)
              .then(function(response) {
                  return response.json()
              })
              .then(function(json) {
                localStorage.clear()

                console.log(json)
                localStorage.setItem('userToken', json.jwt)
                localStorage.setItem('user', json.user.username)
                localStorage.setItem('userId', json.user.id)
              })

          } else {
              console.log(this.state.username)


        let UserLoginObj = {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
                "Accept": "application/json"
            },
          
            body: JSON.stringify({
                user: {
               username: this.state.username,
               password: this.state.password
                }
            })
          };

        fetch('http://localhost:3001/api/v1/login', UserLoginObj)
        .then(function(response) {
            return response.json()
        })
        .then(json =>{
            window.localStorage.clear()
            window.localStorage.setItem('userToken', json.jwt)
            window.localStorage.setItem('user', json.user.username)
            this.props.loginComplete();

            let bearer = 'Bearer ' + localStorage.getItem('userToken')

            fetch('http://localhost:3001/api/v1/profile', {headers: {"Authorization": bearer}})
            .then(function(response) {
                console.log(response)
                return response.json()
            })
            .then(function(json){
                console.log(json)
                
            })
        })

          }

      }

    render() {

        return(
            <div id='auth-box'>
                {this.state.signUp ? <SignupBox
                provideUsername={this.provideUsername} 
                providePassword={this.providePassword} 
                providePasswordConfirmation={this.providePasswordConfirmation}
                />
                : 
                < LoginBox 
                provideUsername={this.provideUsername} 
                providePassword={this.providePassword} 
                />
                }

                <span id='submission-buttons'>
                <button id="auth-swap" onClick={this.swapAuth}>Sign Up</button>
                <button id="authenticate" onClick={this.authentication}>Log in</button>
                </span>

            </div>
            
        )
    }
}