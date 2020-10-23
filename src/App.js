import React from 'react'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const Navbar = loadable(() => import('./components/Nav/Navbar'))
const PokemonList = loadable(() =>
  import('./components/PokemonList/PokemonList')
)
const PokemonDetail = loadable(() =>
  import('./components/PokemonDetail/PokemonDetail')
)
const MyPokemon = loadable(() => import('./components/MyPokemon/MyPokemon'))

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route path={'/'} exact component={PokemonList} />
        <Route path={'/pokemon/:pokemon'} exact component={PokemonDetail} />
        <Route path={'/my-pokemon'} exact component={MyPokemon} />
        <Redirect to={'/'} />
      </Switch>
    </div>
  )
}

export default App
