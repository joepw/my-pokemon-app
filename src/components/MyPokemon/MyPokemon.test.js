import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Store } from '../../Store'
import App from '../../App'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const pokemon = {
  name: 'pokemon1',
  nickname: 'pokemon1',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
}

const history = createMemoryHistory()
beforeEach(() => {
  render(
    <Router history={history}>
      <Provider store={Store}>
        <App />
      </Provider>
    </Router>
  )
  history.push('/my-pokemon')
})

test('renders My Pokemon page correctly', () => {
  expect(screen.getByText('You have no Pokémon')).toBeInTheDocument()
  expect(screen.queryByText('pokemon1')).not.toBeInTheDocument()
  expect(screen.queryByText('Release')).not.toBeInTheDocument()

  Store.dispatch({
    type: 'POKEMON_ADD_SUCCESS',
    payload: { ...pokemon, id: 1 },
  })

  expect(screen.queryByText('You have no Pokémon')).not.toBeInTheDocument()
  expect(screen.getByText('pokemon1')).toBeInTheDocument()
  expect(screen.getByText('Release')).toBeInTheDocument()
})

test('releases a Pokemon', () => {
  expect(screen.getByText('pokemon1')).toBeInTheDocument()
  expect(screen.getByText('Release')).toBeInTheDocument()
  expect(screen.queryByText('You have no Pokémon')).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('Release'))
  expect(screen.getByText('Release Pokémon ?')).toBeInTheDocument()
  fireEvent.click(screen.getByText('No'))
  fireEvent.click(screen.getByText('Release'))
  expect(screen.getByText('Release Pokémon ?')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Yes'))
  expect(screen.queryByText('pokemon1')).not.toBeInTheDocument()
  expect(screen.queryByText('Release')).not.toBeInTheDocument()
  expect(screen.getByText('You have no Pokémon')).toBeInTheDocument()
})

test('navigates to Pokemon Details page', async () => {
  const mock = new MockAdapter(axios, { delayResponse: 500 })
  mock.onGet('https://pokeapi.co/api/v2/pokemon/pokemon1').reply(200, {
    types: [{ type: { name: 'type1' } }, { type: { name: 'type2' } }],
    moves: [{ move: { name: 'move1' } }, { move: { name: 'move2' } }],
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
  })
  Store.dispatch({
    type: 'POKEMON_ADD_SUCCESS',
    payload: { ...pokemon, id: 1 },
  })
  fireEvent.click(screen.getByText('pokemon1'))
  expect(screen.getByTestId('nav-title')).toHaveTextContent('Pokémon Detail')
  expect(await screen.findByText('pokemon1')).toBeInTheDocument()
  expect(screen.getByTestId('pokemon-detail-name')).toHaveTextContent(
    'pokemon1'
  )
  mock.restore()
})
