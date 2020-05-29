import React from 'react'

export default class Place extends React.Component {


    handleSelect = (event) => {
        event.target.textContent = 'Saved!'
        event.target.style.backgroundColor = 'green'
        let id = event.target.id
        let bearer = 'Bearer ' + localStorage.getItem('userToken')
        
        let placeObj = {
            method: "POST",
            headers: {
                "Authorization": bearer,
               "Content-Type": "application/json",
                "Accept": "application/json"
            },
          
            body: JSON.stringify({
                place: {
                    place_ref: id
                }
            })
          };

        fetch('http://localhost:3001/api/v1/places', placeObj)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            console.log(json)
        })
    }


    render() {
        return(
            <div className='result-box'>
                {console.log(this.props)}
                <div className='result-image'>
                    <img src={this.props.icon} alt='Type Icon'/>
                </div>
                <div className='result-info'>
                    <h3>{this.props.name}</h3>
                    {this.props.business_status}
                    <br/>
                    {this.props.rating} Stars
                </div>
                <div className='select-box'>
                    <button className= 'check-button' id={`${this.props.place_id}`}  onClick={event => this.handleSelect(event)}>Save</button>
                </div>



            </div>
        )
    }
}