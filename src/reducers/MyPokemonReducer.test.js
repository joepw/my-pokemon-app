import MyPokemonReducer from './MyPokemonReducer'

test('should return the initial state', () => {
  expect(MyPokemonReducer(undefined, {})).toEqual({ data: [], owned: {} })
})

test('should handle POKEMON_ADD_SUCCESS', () => {
  expect(
    MyPokemonReducer(
      { data: [], owned: {} },
      {
        type: 'POKEMON_ADD_SUCCESS',
        payload: { name: 'pokemon1' },
      }
    )
  ).toEqual({ data: [{ name: 'pokemon1' }], owned: { pokemon1: 1 } })

  expect(
    MyPokemonReducer(
      { data: [{ name: 'pokemon1' }], owned: { pokemon1: 1 } },
      {
        type: 'POKEMON_ADD_SUCCESS',
        payload: { name: 'pokemon2' },
      }
    )
  ).toEqual({
    data: [{ name: 'pokemon1' }, { name: 'pokemon2' }],
    owned: { pokemon1: 1, pokemon2: 1 },
  })

  expect(
    MyPokemonReducer(
      { data: [{ name: 'pokemon1' }], owned: { pokemon1: 1 } },
      {
        type: 'POKEMON_ADD_SUCCESS',
        payload: { name: 'pokemon1' },
      }
    )
  ).toEqual({
    data: [{ name: 'pokemon1' }, { name: 'pokemon1' }],
    owned: { pokemon1: 2 },
  })
})

test('should handle POKEMON_RELEASE_SUCCESS', () => {
  expect(
    MyPokemonReducer(
      { data: [], owned: {} },
      {
        type: 'POKEMON_RELEASE_SUCCESS',
        payload: { name: 'pokemon1', id: 1 },
      }
    )
  ).toEqual({ data: [], owned: {} })

  expect(
    MyPokemonReducer(
      { data: [{ id: 1 }], owned: { pokemon1: 1 } },
      {
        type: 'POKEMON_RELEASE_SUCCESS',
        payload: { name: 'pokemon1', id: 1 },
      }
    )
  ).toEqual({ data: [], owned: {} })

  expect(
    MyPokemonReducer(
      { data: [{ id: 1 }], owned: { pokemon1: 1 } },
      {
        type: 'POKEMON_RELEASE_SUCCESS',
        payload: { name: 'pokemon2', id: 2 },
      }
    )
  ).toEqual({ data: [{ id: 1 }], owned: { pokemon1: 1 } })
})
