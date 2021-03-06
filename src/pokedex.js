import React from 'react'
import './pokedex.css'

class Pokemon extends React.Component{

    render(){
        return(
            <div className="pokemon">
                <h1>{this.props.info.name}</h1>
                {
                    // check if this image available, if null then use alternative image file
                    this.props.info.sprites.other.home.front_default? 
                        <img src={this.props.info.sprites.other.home.front_default} alt="Pokemon Image"/>
                    :
                        this.props.info.sprites.other["official-artwork"].front_default?
                            <img src={this.props.info.sprites.other["official-artwork"].front_default} alt="Pokemon Image2"/>
                        :
                            <img src={this.props.info.sprites.front_default} alt="Pokemon Image2"/>
                }
                <p>Weight: {this.props.info.weight} |  Height {this.props.info.height}</p>
                <p></p>
            </div>
        )
    }

}

class Pokedex extends React.Component{
    /*
        1. fetch one pokemon data and store it in state
        2. pass it as props to display it as a pokemon card
    */
   constructor(props){
    super(props)
    this.state = {Pokemon_data: {}, number_of_pokemons: 900, number_per_batch: 10, matched_keys:[], searching: false, percent_loaded: 0};
   }

   getPokemonDataUsingPackage(){
        let Pokedex = require('pokedex-promise-v2');
        let P = new Pokedex();
        for(let i=1;i<=this.state.number_of_pokemons;i++){
            P.getPokemonByName(i, (response, error) => { // with callback
                if(!error) {
                let name = response.name
                this.setState((prevState) =>({
                    Pokemon_data: {...prevState.Pokemon_data, [name]: response}
                    ,percent_loaded: Math.round((Object.keys(this.state.Pokemon_data).length/898)*100)
                    }))
                } else {
                console.log(error);
                }
            });
        }
    }

    fetchPokemonDataUsingAxios(url){
        const axios = require('axios')
        axios.get(url)
        .then(batch_response => {
            // handle success
            console.log(batch_response.data.results);
            let pokemon_data_batch = batch_response.data.results
            for(let i=0; i<pokemon_data_batch.length;i++){
                axios.get(pokemon_data_batch[i].url)
                    .then(response => {
                        response = response.data
                        console.log(response)
                        let name = response.name
                        this.setState((prevState) =>({
                            Pokemon_data: {...prevState.Pokemon_data, [name]: response}
                            ,percent_loaded: Math.round((Object.keys(this.state.Pokemon_data).length/batch_response.data.count)*100)
                          //   ,matched_keys: Object.keys(this.state.Pokemon_data)
                          }))
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            if(batch_response.data.next){
                this.fetchPokemonDataUsingAxios(batch_response.data.next)
            }
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
    }

   componentDidMount(){
    //    this.getPokemonDataUsingPackage()
        this.fetchPokemonDataUsingAxios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100')
    }


   handleKeyPress(event){
        if(event.target.value===''){
            this.setState({searching: false})
        }
        else{
            let search_string = event.target.value.toLowerCase()
            console.log('key pressed' + event.target.value)
            let total_keys = Object.keys(this.state.Pokemon_data)
            let match_bool = total_keys.map((key) => key.includes(search_string)) // returns an array of bools about whether it has the substring we are looking for
            let results = total_keys.filter((d, ind) => match_bool[ind]).sort() // filters all the keys and returns the keys that contains the substring
            // TODO: can sort by the one with the highest match level
            console.log("hiii")
            console.log(total_keys)
            console.log(match_bool)
            console.log(results)
            this.setState({matched_keys: results, searching: true})
        }
    }

   render(){
       console.log("Searching: ")
       console.log(this.state.searching)
       console.log(Object.keys(this.state.Pokemon_data).length)

       return (
        <div>
            <div className='inputContainer'>
                <input className='inputArea' id='inputBox' placeholder="Find ur Pokemon" onChange={(event) => this.handleKeyPress(event)}></input>
                {
                    this.state.percent_loaded != 100 &&
                    <p>loading Pokemons... {this.state.percent_loaded}% has arrived</p>
                }
            </div>
            <div className='container'> 
                {
                    Object.keys(this.state.Pokemon_data).length >= this.state.number_per_batch &&
                    // if we have loaded a preliminary batch of data we can start displaying them, then we display items depending on whether they are searching for it or not
                    (this.state.searching)? //must wait until each pokemon's information has been fetched from the API
                        this.state.matched_keys.map((pokemon_name, ind) =>
                            <Pokemon key={ind} info={this.state.Pokemon_data[pokemon_name]} ></Pokemon>
                        )
                    :
                        Object.keys(this.state.Pokemon_data).map((pokemon_name, ind) =>
                            <Pokemon key={ind} info={this.state.Pokemon_data[pokemon_name]} ></Pokemon>
                        )
                }
            </div>
        </div>
       )
   }
}

export default Pokedex