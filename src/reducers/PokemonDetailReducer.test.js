import PokemonDetailReducer from './PokemonDetailReducer'

test('should return the initial state', () => {
  expect(PokemonDetailReducer(undefined, {})).toEqual({
    loading: false,
    data: {},
    errorMsg: '',
  })
})

test('should handle POKEMON_DETAIL_LOADING', () => {
  expect(
    PokemonDetailReducer(
      {},
      {
        type: 'POKEMON_DETAIL_LOADING',
      }
    )
  ).toEqual({ loading: true, errorMsg: '' })
})

test('should handle POKEMON_DETAIL_FAIL', () => {
  expect(
    PokemonDetailReducer(
      {},
      {
        type: 'POKEMON_DETAIL_FAIL',
      }
    )
  ).toEqual({ loading: false, errorMsg: 'Unable to find Pokémon' })
})

test('should handle POKEMON_DETAIL_SUCCESS', () => {
  expect(
    PokemonDetailReducer(
      { data: {} },
      {
        type: 'POKEMON_DETAIL_SUCCESS',
        payload: { id: '1' },
        pokemonName: 'pokemon1',
      }
    )
  ).toEqual({
    loading: false,
    errorMsg: '',
    data: { pokemon1: { id: '1' } },
  })

  expect(
    PokemonDetailReducer(
      { data: { pokemon1: { id: '1' } } },
      {
        type: 'POKEMON_DETAIL_SUCCESS',
        payload: { id: '1' },
        pokemonName: 'pokemon1',
      }
    )
  ).toEqual({
    loading: false,
    errorMsg: '',
    data: { pokemon1: { id: '1' } },
  })

  expect(
    PokemonDetailReducer(
      { data: { pokemon1: { id: '1' } } },
      {
        type: 'POKEMON_DETAIL_SUCCESS',
        payload: { id: '2' },
        pokemonName: 'pokemon2',
      }
    )
  ).toEqual({
    loading: false,
    errorMsg: '',
    data: { pokemon1: { id: '1' }, pokemon2: { id: '2' } },
  })
})
