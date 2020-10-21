import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Store from '../Store'
import MyPokemon from './MyPokemon'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

const pokemon = {
  name: 'pokemon1',
  nickname: 'pokemon1',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
}
beforeEach(() => {
  render(
    <Router history={createMemoryHistory()}>
      <Provider store={Store}>
        <MyPokemon />
      </Provider>
    </Router>
  )
})
afterEach(() => {
  cleanup()
})

test('renders My Pokemon page correctly', () => {
  expect(screen.getByText('You have no pokemon')).toBeInTheDocument()
  expect(screen.queryByText('pokemon1')).not.toBeInTheDocument()
  expect(screen.queryByText('Release')).not.toBeInTheDocument()
  Store.dispatch({
    type: 'POKEMON_ADD_SUCCESS',
    payload: { ...pokemon, id: 1 },
  })
  expect(screen.queryByText('You have no pokemon')).not.toBeInTheDocument()
  expect(screen.getByText('pokemon1')).toBeInTheDocument()
  expect(screen.getByText('Release')).toBeInTheDocument()
})

test('releases a pokemon', () => {
  expect(screen.getByText('pokemon1')).toBeInTheDocument()
  expect(screen.getByText('Release')).toBeInTheDocument()
  expect(screen.queryByText('You have no pokemon')).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('Release'))
  expect(screen.getByText('Release Pokemon ?')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Yes'))
  expect(screen.queryByText('pokemon1')).not.toBeInTheDocument()
  expect(screen.queryByText('Release')).not.toBeInTheDocument()
  expect(screen.getByText('You have no pokemon')).toBeInTheDocument()
})
