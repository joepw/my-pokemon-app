import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPokemonList } from '../../actions/pokemonActions'
import isEmpty from '../../utils/isEmpty'
import './PokemonList.css'

const PokemonList = (props) => {
  const maxPokemonLimit = 893
  const perPage = 24
  const dispatch = useDispatch()
  const pokemonList = useSelector((state) => state.PokemonList)
  const myPokemonList = useSelector((state) => state.MyPokemon)
  useEffect(() => {
    if (isEmpty(pokemonList.data)) FetchData(pokemonList.page)
    // eslint-disable-next-line
  }, [])

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page, maxPokemonLimit, perPage))
  }

  const LoadMore = () =>
    !pokemonList.loading &&
    !isEmpty(pokemonList.data) &&
    pokemonList.page <= Math.floor(maxPokemonLimit / perPage) && (
      <div className='load-more'>
        <div
          className='load-more__btn'
          onClick={() => FetchData(pokemonList.page + 1)}
        >
          Load More
        </div>
      </div>
    )

  const ShowData = () => {
    return (
      <div className={'pokemon-list'}>
        {pokemonList.data.map((el, i) => {
          return (
            <div
              className={'pokemon-item'}
              onClick={() => props.history.push(`/pokemon/${el.name}`)}
              key={i}
            >
              <div className='pokemon-img-wrapper'>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    i + 1
                  }.png`}
                  alt={el.name}
                />
              </div>
              <p className='text--capitalize'>{el.name}</p>
              <div>Owned: {myPokemonList.owned[el.name] || 0}</div>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div>
      {ShowData()}
      {pokemonList.loading && <p className='loading'>Loading...</p>}
      {pokemonList.errorMsg !== '' && (
        <p className='error-msg'>{pokemonList.errorMsg}</p>
      )}
      {LoadMore()}
    </div>
  )
}

export default PokemonList
