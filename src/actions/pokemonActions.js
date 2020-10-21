import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const GetPokemonList = (page, maxPokemonLimit, perPage) => async (
  dispatch
) => {
  try {
    dispatch({
      type: 'POKEMON_LIST_LOADING',
    })
    const offset = (page - 1) * perPage
    let limit = perPage
    if (offset === Math.floor(maxPokemonLimit / perPage) * perPage)
      limit = maxPokemonLimit % perPage

    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )

    dispatch({
      type: 'POKEMON_LIST_SUCCESS',
      payload: res.data,
      page: page,
    })
  } catch (err) {
    dispatch({
      type: 'POKEMON_LIST_FAIL',
    })
  }
}

export const GetPokemon = (pokemon) => async (dispatch) => {
  try {
    dispatch({
      type: 'POKEMON_DETAIL_LOADING',
    })

    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    dispatch({
      type: 'POKEMON_DETAIL_SUCCESS',
      payload: res.data,
      pokemonName: pokemon,
    })
  } catch (err) {
    dispatch({
      type: 'POKEMON_DETAIL_FAIL',
    })
  }
}

export const AddPokemon = (pokemon) => (dispatch) => {
  const id = uuidv4()

  dispatch({
    type: 'POKEMON_ADD_SUCCESS',
    payload: { ...pokemon, id },
  })
}

export const ReleasePokemon = (pokemon) => (dispatch) => {
  dispatch({
    type: 'POKEMON_RELEASE_SUCCESS',
    payload: pokemon,
  })
}
