const DefaultState = {
  loading: false,
  data: [],
  errorMsg: '',
  page: 1,
}

const PokemonListReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case 'POKEMON_LIST_LOADING':
      return {
        ...state,
        loading: true,
        errorMsg: '',
      }
    case 'POKEMON_LIST_FAIL':
      return {
        ...state,
        loading: false,
        errorMsg: 'Unable to get Pokémon',
      }
    case 'POKEMON_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload.results],
        errorMsg: '',
        page: action.page,
      }
    default:
      return state
  }
}

export default PokemonListReducer
