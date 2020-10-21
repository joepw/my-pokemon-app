const DefaultState = {
  data: [],
  owned: {},
}

const MyPokemonReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case 'POKEMON_ADD_SUCCESS':
      return {
        data: [...state.data, action.payload],
        owned: {
          ...state.owned,
          [action.payload.name]: (state.owned[action.payload.name] || 0) + 1,
        },
      }
    case 'POKEMON_RELEASE_SUCCESS':
      let owned = { ...state.owned }
      owned[action.payload.name] -= 1
      if (!owned[action.payload.name]) delete owned[action.payload.name]
      return {
        data: state.data.filter((pokemon) => pokemon.id !== action.payload.id),
        owned,
      }
    default:
      return state
  }
}

export default MyPokemonReducer
