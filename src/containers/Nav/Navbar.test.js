import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import Navbar from './Navbar'

const history = createMemoryHistory()

beforeEach(() => {
  render(
    <Router history={history}>
      <Navbar />
    </Router>
  )
})
afterEach(() => {
  cleanup()
})

test('renders navbar title correctly', () => {
  expect(screen.getByTestId('nav-title')).toHaveTextContent('Pokemon List')
  history.push('/my-pokemon')
  expect(screen.getByTestId('nav-title')).toHaveTextContent('My Pokemon')
  history.push('/pokemon/a')
  expect(screen.getByTestId('nav-title')).toHaveTextContent('Pokemon Detail')
  history.push('/some/bad/route')
  expect(screen.getByTestId('nav-title')).toHaveTextContent('Pokemon List')
})

test('opens side navbar', () => {
  expect(screen.getByTestId('sidenav').className).toBe('sidenav')
  fireEvent.click(screen.getByAltText('Menu'))
  expect(screen.getByTestId('sidenav').className).toBe('sidenav open')
})
