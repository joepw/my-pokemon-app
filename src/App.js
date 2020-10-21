import React from 'react'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import PokemonList from './containers/PokemonList'
import Pokemon from './containers/Pokemon'
import MyPokemon from './containers/MyPokemon'
import Navbar from './containers/Nav/Navbar'

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
