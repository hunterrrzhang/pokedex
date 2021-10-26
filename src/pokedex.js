import React from 'react'
import './pokedex.css'

class Pokemon extends React.Component{

    render(){
        console.log("this pokemon's info:")
        return(
            <div className="pokemon">
                <h1>{this.props.info.name}</h1>
                <img src={this.props.info.sprites.other["official-artwork"].front_default}/>
                <p1>Weight {this.props.info.weight}</p1>
                <p1>Height {this.props.info.height}</p1>
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
    this.state = {Pokemon_data: {}, number_of_pokemons: 50};
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
                }))
              console.log(response); 
            } else {
              console.log(error);
            }
          });
    }
   }

   render(){
       console.log("State: ")
       console.log(Object.keys(this.state.Pokemon_data).length)

       return (
        //    <div></div>
        //    <div>{this.state.Pokemon_data['1'].height}</div> && this.state.number_of_pokemons == Object.keys(this.state.Pokemon_data).length
        <div className='container'> 
            {Object.keys(this.state.Pokemon_data).length == this.state.number_of_pokemons && //must wait until each pokemon's information has been fetched from the API
            Object.keys(this.state.Pokemon_data).map((pokemon_name) =>
                <Pokemon info={this.state.Pokemon_data[pokemon_name]}></Pokemon>
            )
            }
        </div>
       )
   }
}

export default Pokedex