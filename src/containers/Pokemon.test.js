import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from '../App'
import { Provider } from 'react-redux'
import Store from '../Store'
import { Router } from 'react-router-dom'
import axios from 'axios'
import { createMemoryHistory } from 'history'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios, { delayResponse: 500 })
mock.onGet('https://pokeapi.co/api/v2/pokemon/pokemon1').reply(200, {
  types: [{ type: { name: 'type1' } }, { type: { name: 'type2' } }],
  moves: [{ move: { name: 'move1' } }, { move: { name: 'move2' } }],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
})

const history = createMemoryHistory()
beforeEach(() => {
  render(
    <Router history={history}>
      <Provider store={Store}>
        <App />
      </Provider>
    </Router>
  )
  history.push('/pokemon/pokemon1')
})
afterEach(() => {
  cleanup()
})
afterAll(() => {
  mock.restore()
})

test('renders Pokemon Detail page correctly', async () => {
  expect(await screen.findByText('pokemon1')).toBeInTheDocument()
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  expect(screen.getByText('Types')).toBeInTheDocument()
  expect(screen.getByText('type1')).toBeInTheDocument()
  expect(screen.getByText('type2')).toBeInTheDocument()
  expect(screen.getByText('Moves')).toBeInTheDocument()
  expect(screen.getByText('move1')).toBeInTheDocument()
  expect(screen.getByText('move2')).toBeInTheDocument()
  expect(screen.getByText('Catch !')).toBeInTheDocument()
})

test('handles Pokemon Detail not found', async () => {
  history.push('/pokemon/pokemon2')
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  expect(await screen.findByText('Unable to find pokemon')).toBeInTheDocument()
  expect(screen.getByText('Find Pokemon')).toBeInTheDocument()
  expect(screen.queryByText('Types')).not.toBeInTheDocument()
  expect(screen.queryByText('Moves')).not.toBeInTheDocument()
  expect(screen.queryByText('Catch !')).not.toBeInTheDocument()
})

test('handles failed Pokemon catch', () => {
  global.Math.random = () => 1
  fireEvent.click(screen.getByText('Catch !'))
  expect(screen.getByText('Catch Failed !')).toBeInTheDocument()
})

test('handles successful Pokemon catch', () => {
  global.Math.random = () => 0
  fireEvent.click(screen.getByText('Catch !'))
  expect(screen.getByText('Catch Success !')).toBeInTheDocument()
  expect(screen.getByText('Give it a nickname ?')).toBeInTheDocument()
  expect(screen.getByDisplayValue('pokemon1')).toBeInTheDocument()
  fireEvent.click(screen.getByText('OK'))
  history.push('/my-pokemon')
  expect(screen.getByText('pokemon1')).toBeInTheDocument()
})

test('change nickname of the caught pokemon', () => {
  global.Math.random = () => 0
  fireEvent.click(screen.getByText('Catch !'))
  fireEvent.change(screen.getByDisplayValue('pokemon1'), {
    target: { value: 'new pokemon' },
  })
  fireEvent.click(screen.getByText('OK'))
  history.push('/my-pokemon')
  expect(screen.getByTestId('nav-title')).toHaveTextContent('My Pokemon')
  expect(screen.getByText('new pokemon')).toBeInTheDocument()
})
