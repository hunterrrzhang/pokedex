import React from 'react'
import './pokedex.css'

class Pokemon extends React.Component{

    render(){
        // console.log("this pokemon's info:")
        return(
            <div className="pokemon">
                <h1>{this.props.info.name}</h1>
                {/* <img src={this.props.info.sprites.other["official-artwork"].front_default} alt="Pokemon Image"/> */}
                <img src={this.props.info.sprites.other.home.front_default} alt="Pokemon Image"/>
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

   componentDidMount(){
    let Pokedex = require('pokedex-promise-v2');
    let P = new Pokedex();
    for(let i=1;i<=this.state.number_of_pokemons;i++){
        P.getPokemonByName(i, (response, error) => { // with callback
            if(!error) {
              let name = response.name
              this.setState((prevState) =>({
                  Pokemon_data: {...prevState.Pokemon_data, [name]: response}
                  ,percent_loaded: Math.round((Object.keys(this.state.Pokemon_data).length/898)*100)
                //   ,matched_keys: Object.keys(this.state.Pokemon_data)
                }))
            //   console.log(response); 
            } else {
              console.log(error);
            }
          });
    }
    // var interval = {
    //     limit: 10,
    //     offset: 34
    //   }
    // P.getPokemonsList(interval, (response) => {
    //     console.log("list of pokemon:")
    //     console.log(response);
    // })
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
        //    <div></div>
        //    <div>{this.state.Pokemon_data['1'].height}</div> && this.state.number_of_pokemons == Object.keys(this.state.Pokemon_data).length
        <div>
            <div className='inputContainer'>
                <input className='inputArea' id='inputBox' placeholder="Find ur Pokemon" onChange={(event) => this.handleKeyPress(event)}></input>
                {
                    this.state.percent_loaded != 100 &&
                    <p>loading Pokemons... {this.state.percent_loaded}% has arrived</p>
                }
            </div>
            {/* visibility='hidden' display='none' */}
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

// {Object.keys(this.state.Pokemon_data).length == this.state.number_of_pokemons && //must wait until each pokemon's information has been fetched from the API
// Object.keys(this.state.Pokemon_data).map((pokemon_name) =>
//     <Pokemon info={this.state.Pokemon_data[pokemon_name]} ></Pokemon>
// )
// }