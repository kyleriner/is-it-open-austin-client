import React from 'react'
import UserPlace from './UserPlace'
import GenUserPlaces from './GenUserPlaces'

export default class Profile extends React.Component {

    constructor(){
        super()
        this.state={
            userPlaces: [],
            fetchedPlaces: [],
        }
        this.fetchPlaces = this.fetchPlaces.bind(this)
        this.generateUserPlaces = this.fetchPlaces.bind(this)
    }

    

    componentDidMount() {
        console.log('didmount')
        let bearer = 'Bearer ' + localStorage.getItem('userToken')
        fetch('http://localhost:3001/api/v1/profile', {headers: {Authorization: bearer}})
        .then(function(response){
            return response.json()
        })
        .then(json => {
            this.setState({
                userPlaces: json.places
            })
            console.log(json.places)
            this.fetchPlaces(json.places);

        })
    }

    fetchPlaces = (places) => {
        let temp_places = []
        let bearer = 'Bearer ' + localStorage.getItem('userToken')
        console.log(this.state.userPlaces)

        
        places.forEach(place => {

            let userPlaceObj = {
                method: "POST",
                headers: {
                    "Authorization": bearer,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }, 
                body: JSON.stringify({
                    userPlace: place
                })
            }

            fetch('http://localhost:3001/api/v1/get_user_places', userPlaceObj )
            .then(function(response) {
                return response.json()
            })
            .then(function(json){
                temp_places.push(json)
            })
            
        });

        this.setState({
            fetchedPlaces: temp_places,
            
        },
        
        )
        
    }

    isFinished = () => {
        this.generateUserPlaces()
    }

    generateUserPlaces = () => {
        let userPlaces = this.state.fetchedPlaces
        console.log('Generating...')
        console.log(JSON.stringify(userPlaces))

        return userPlaces.map(place => <UserPlace 
           name = {place.result.name}
           business_status = {place.result.business_status}
           icon = {place.result.icon}
           place_id = {place.result.place_id}
           rating = {place.result.rating}
          />
        )
          
    }





    render() {
        return(
            <div>
                {this.generateUserPlaces()}}
            </div>
        )
    }
}