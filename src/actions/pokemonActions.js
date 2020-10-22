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

    const { name, moves, types, sprites } = res.data

    const payload = {
      name,
      moves: moves.slice(0, 8).map((e) => e.move.name),
      types: types.map((e) => e.type.name),
      sprites: sprites.front_default,
    }

    dispatch({
      type: 'POKEMON_DETAIL_SUCCESS',
      payload,
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
