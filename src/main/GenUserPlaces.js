import React from 'react'
import UserPlace from './UserPlace'

export default class GenUserPlaces extends React.Component {

    generateUserPlaces = () => {
        let userPlaces = this.props.places
        console.log('why')
        console.log(userPlaces)

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
                {console.log(this.generateUserPlaces())}
            </div>
        )
    }
}