import { combineReducers } from 'redux'
import PokemonListReducer from './PokemonListReducer'
import PokemonDetailReducer from './PokemonDetailReducer'
import MyPokemonReducer from './MyPokemonReducer'

const RootReducer = combineReducers({
  PokemonList: PokemonListReducer,
  Pokemon: PokemonDetailReducer,
  MyPokemon: MyPokemonReducer,
})

export default RootReducer
