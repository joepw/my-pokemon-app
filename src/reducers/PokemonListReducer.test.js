import PokemonListReducer from './PokemonListReducer'

test('should return the initial state', () => {
  expect(PokemonListReducer(undefined, {})).toEqual({
    loading: false,
    data: [],
    errorMsg: '',
    page: 1,
  })
})

test('should handle POKEMON_LIST_LOADING', () => {
  expect(
    PokemonListReducer(
      {},
      {
        type: 'POKEMON_LIST_LOADING',
      }
    )
  ).toEqual({ loading: true, errorMsg: '' })
})

test('should handle POKEMON_LIST_FAIL', () => {
  expect(
    PokemonListReducer(
      {},
      {
        type: 'POKEMON_LIST_FAIL',
      }
    )
  ).toEqual({ loading: false, errorMsg: 'Unable to get Pokémon' })
})

test('should handle POKEMON_LIST_SUCCESS', () => {
  expect(
    PokemonListReducer(
      { data: [] },
      {
        type: 'POKEMON_LIST_SUCCESS',
        payload: { results: [{ name: 'pokemon1' }] },
        page: 1,
      }
    )
  ).toEqual({
    loading: false,
    data: [{ name: 'pokemon1' }],
    errorMsg: '',
    page: 1,
  })

  expect(
    PokemonListReducer(
      { data: [{ name: 'pokemon1' }] },
      {
        type: 'POKEMON_LIST_SUCCESS',
        payload: { results: [{ name: 'pokemon1' }] },
        page: 2,
      }
    )
  ).toEqual({
    loading: false,
    data: [{ name: 'pokemon1' }, { name: 'pokemon1' }],
    errorMsg: '',
    page: 2,
  })

  expect(
    PokemonListReducer(
      { data: [{ name: 'pokemon1' }] },
      {
        type: 'POKEMON_LIST_SUCCESS',
        payload: { results: [{ name: 'pokemon2' }] },
        page: 2,
      }
    )
  ).toEqual({
    loading: false,
    data: [{ name: 'pokemon1' }, { name: 'pokemon2' }],
    errorMsg: '',
    page: 2,
  })
})
