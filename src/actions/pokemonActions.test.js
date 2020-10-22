import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './pokemonActions'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v4 as uuidv4 } from 'uuid'
jest.mock('uuid')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const pokemonListResultData = {
  results: [{ name: 'pokemon1' }],
}
const mock = new MockAdapter(axios, { delayResponse: 500 })
mock
  .onGet('https://pokeapi.co/api/v2/pokemon?limit=24&offset=0')
  .reply(200, pokemonListResultData)

const pokemonDetailResultData = {
  types: [{ type: { name: 'type1' } }, { type: { name: 'type2' } }],
  moves: [{ move: { name: 'move1' } }, { move: { name: 'move2' } }],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
}
mock
  .onGet('https://pokeapi.co/api/v2/pokemon/pokemon1')
  .reply(200, pokemonDetailResultData)

afterAll(() => {
  mock.restore()
})

test('should create an action to get Pokemon list successfully', async () => {
  const store = mockStore({})
  const page = 1,
    maxPokemonLimit = 100,
    perPage = 24
  const expectedActions = [
    { type: 'POKEMON_LIST_LOADING' },
    {
      type: 'POKEMON_LIST_SUCCESS',
      payload: pokemonListResultData,
      page: page,
    },
  ]

  await store.dispatch(actions.GetPokemonList(page, maxPokemonLimit, perPage))
  expect(store.getActions()).toEqual(expectedActions)
})

test('should create an action failing to get Pokemon list', async () => {
  const store = mockStore({})
  const page = 2,
    maxPokemonLimit = 893,
    perPage = 24
  const expectedActions = [
    { type: 'POKEMON_LIST_LOADING' },
    {
      type: 'POKEMON_LIST_FAIL',
    },
  ]

  await store.dispatch(actions.GetPokemonList(page, maxPokemonLimit, perPage))
  expect(store.getActions()).toEqual(expectedActions)
})

test('should create an action to get Pokemon detail successfully', async () => {
  const store = mockStore({})
  const pokemon = 'pokemon1'
  const payload = {
    types: ['type1', 'type2'],
    moves: ['move1', 'move2'],
    sprites:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  }
  const expectedActions = [
    { type: 'POKEMON_DETAIL_LOADING' },
    {
      type: 'POKEMON_DETAIL_SUCCESS',
      payload,
      pokemonName: pokemon,
    },
  ]

  await store.dispatch(actions.GetPokemon(pokemon))
  expect(store.getActions()).toEqual(expectedActions)
})

test('should create an action failing to get Pokemon detail', async () => {
  const store = mockStore({})
  const pokemon = 'pokemon2'
  const expectedActions = [
    { type: 'POKEMON_DETAIL_LOADING' },
    {
      type: 'POKEMON_DETAIL_FAIL',
    },
  ]

  await store.dispatch(actions.GetPokemon(pokemon))
  expect(store.getActions()).toEqual(expectedActions)
})

test('should create an action to add Pokemon to My Pokemon List successfully', () => {
  const store = mockStore({})
  const pokemon = {
    name: 'pokemon1',
    nickname: 'pokemon1',
    sprites:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  }
  uuidv4.mockImplementation(() => 'testid')
  const expectedActions = [
    {
      type: 'POKEMON_ADD_SUCCESS',
      payload: { ...pokemon, id: 'testid' },
    },
  ]

  store.dispatch(actions.AddPokemon(pokemon))
  expect(store.getActions()).toEqual(expectedActions)
})

test('should create an action to remove Pokemon from My Pokemon List successfully', () => {
  const store = mockStore({})
  const pokemon = { name: 'pokemon1' }
  const expectedActions = [
    {
      type: 'POKEMON_RELEASE_SUCCESS',
      payload: pokemon,
    },
  ]

  store.dispatch(actions.ReleasePokemon(pokemon))
  expect(store.getActions()).toEqual(expectedActions)
})
