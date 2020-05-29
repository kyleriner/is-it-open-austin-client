import React from 'react'
import Place from './Place'

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            places: []
        }
    }

    handleSearch = (event) => {
        this.setState({
            query: event.target.value
        })
    }

    beginSearch = (event) => {
        event.preventDefault();
        console.log('search begun....')
        console.log(this.state.query)

        let bearer = 'Bearer ' + localStorage.getItem('userToken')

        let searchQueryObj = {
            method: "POST",
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify({
                query: this.state.query
            })
        }
        

        fetch('http://localhost:3001/api/v1/get_places', searchQueryObj)
        .then(function(response){
            return response.json()
        })
        .then(json => {
            this.setState({
                places: json.results
            })
        })
    }



    generateResults = () => {
        let results = this.state.places
        return results.map(result => <Place 
           name = {result.name}
           business_status = {result.business_status}
           icon = {result.icon}
           place_id = {result.place_id}
           rating = {result.rating}
          />)
        }

    render() {

        return(
            <div>
                <form>
                    <input type="text" onChange={event => this.handleSearch(event)} value={this.state.query} />
                    <button type='submit' onClick={event => this.beginSearch(event)} />
                </form>

                <div id='results-wrapper'>
                    {this.generateResults()}
                </div>
            </div>
        )
    }
}