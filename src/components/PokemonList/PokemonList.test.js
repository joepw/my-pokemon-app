import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from '../../App'
import { Provider } from 'react-redux'
import { Store } from '../../Store'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios, { delayResponse: 500 })
mock.onGet('https://pokeapi.co/api/v2/pokemon?limit=24&offset=0').reply(200, {
  results: [{ name: 'pokemon1' }],
})

mock.onGet('https://pokeapi.co/api/v2/pokemon?limit=24&offset=24').reply(200, {
  results: [{ name: 'pokemon2' }],
})

mock.onGet('https://pokeapi.co/api/v2/pokemon/pokemon1').reply(200, {
  types: [{ type: { name: 'type1' } }, { type: { name: 'type2' } }],
  moves: [{ move: { name: 'move1' } }, { move: { name: 'move2' } }],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
})

beforeEach(() => {
  render(
    <Router history={createMemoryHistory()}>
      <Provider store={Store}>
        <App />
      </Provider>
    </Router>
  )
})
afterAll(() => {
  mock.restore()
})

test('renders Pokemon List correctly', async () => {
  expect(await screen.findByText('pokemon1')).toBeInTheDocument()
  expect(screen.getByText('Load More')).toBeInTheDocument()
})

test('can load more Pokemon', async () => {
  expect(await screen.findByText('pokemon1')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Load More'))
  expect(await screen.findByText('pokemon2'))
  expect(screen.getByText('Load More')).toBeInTheDocument()
})

test('handles server exceptions', async () => {
  fireEvent.click(screen.getByText('Load More'))
  expect(await screen.findByText('Unable to get Pokémon'))
})

test('navigates to Pokemon Details page', async () => {
  fireEvent.click(screen.getByText('pokemon1'))
  expect(screen.getByTestId('nav-title')).toHaveTextContent('Pokémon Detail')
  expect(await screen.findByText('pokemon1')).toBeInTheDocument()
  expect(screen.getByTestId('pokemon-detail-name')).toHaveTextContent(
    'pokemon1'
  )
})
