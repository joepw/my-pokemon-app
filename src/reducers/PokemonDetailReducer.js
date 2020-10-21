const DefaultState = {
  loading: false,
  data: {},
  errorMsg: '',
}

const PokemonDetailReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case 'POKEMON_DETAIL_LOADING':
      return {
        ...state,
        loading: true,
        errorMsg: '',
      }
    case 'POKEMON_DETAIL_FAIL':
      return {
        ...state,
        loading: false,
        errorMsg: 'Unable to find pokemon',
      }
    case 'POKEMON_DETAIL_SUCCESS':
      return {
        ...state,
        loading: false,
        errorMsg: '',
        data: {
          ...state.data,
          [action.pokemonName]: action.payload,
        },
      }
    default:
      return state
  }
}

export default PokemonDetailReducer
