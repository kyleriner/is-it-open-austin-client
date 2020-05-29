import React from 'react'
import Search from './Search'
import Profile from './Profile'

export default class AppMain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: true,
            loggedIn: ''
        }
    }

    


    swapBoard = () => {
        let swapButton = document.getElementById("auth-swap")

        let status = !this.state.search
        this.setState({
            search: status
        })

        if (!status) {
            swapButton.textContent = 'Search Austin'
        } else {
            swapButton.textContent = 'View Profile'
        }
        

    }





    render() {
        return(
        <div>
            <span>{'Welcome ' + localStorage.getItem('user') + '!'}</span>
            <button id="auth-swap" onClick={this.swapBoard}>View Profile</button>
            <button id='log-out' onClick={this.props.logout}>Log Out</button>
            {this.state.search ? <Search/> : <Profile/>}
         </div>

        )
    }

}