import React from 'react'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Nav/Navbar'
import PokemonList from './components/PokemonList/PokemonList'
import Pokemon from './components/PokemonDetail/PokemonDetail'
import MyPokemon from './components/MyPokemon/MyPokemon'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route path={'/'} exact component={PokemonList} />
        <Route path={'/pokemon/:pokemon'} exact component={Pokemon} />
        <Route path={'/my-pokemon'} exact component={MyPokemon} />
        <Redirect to={'/'} />
      </Switch>
    </div>
  )
}

export default App
