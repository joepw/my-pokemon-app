import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPokemonList } from '../../actions/pokemonActions'
import isEmpty from '../../utils/isEmpty'
import LazyLoad from 'react-lazyload'
import './PokemonList.css'

const PokemonList = (props) => {
  const maxPokemonLimit = 893 // Limit API Call until index 893
  const perPage = 24
  const pokemonList = useSelector((state) => state.PokemonList)
  const myPokemonList = useSelector((state) => state.MyPokemon)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isEmpty(pokemonList.data)) fetchData(pokemonList.page)
    // eslint-disable-next-line
  }, [])

  const PokemonListData = () => {
    return (
      <div className='pokemon-list'>
        {pokemonList.data.map((el, i) => {
          return (
            <div className='pokemon-item-container' key={i}>
              <div
                className='pokemon-item'
                onClick={() => props.history.push(`/pokemon/${el.name}`)}
              >
                <LazyLoad height={96} once>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      i + 1
                    }.png`}
                    alt={el.name}
                    width='96'
                    height='96'
                  />
                </LazyLoad>
                <p className='pokemon-name text--capitalize'>{el.name}</p>
                <p className='pokemon-owned'>
                  Owned: <b>{myPokemonList.owned[el.name] || 0}</b>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const PokemonListPlaceholder = () => {
    let res = []
    for (let i = 0; i < 24; i++) {
      res.push(
        <div className='pokemon-item-container' key={i}>
          <div className='pokemon-item' style={{ height: '158px' }}></div>
        </div>
      )
    }
    return pokemonList.loading && <div className='pokemon-list'>{res}</div>
  }

  const LoadMore = () =>
    !pokemonList.loading &&
    !isEmpty(pokemonList.data) &&
    pokemonList.page <= Math.floor(maxPokemonLimit / perPage) && (
      <div className='load-more'>
        <div
          className='load-more__btn'
          onClick={() => fetchData(pokemonList.page + 1)}
        >
          Load More
        </div>
      </div>
    )

  const fetchData = (page = 1) => {
    dispatch(GetPokemonList(page, maxPokemonLimit, perPage))
  }

  return (
    <>
      {PokemonListData()}
      {PokemonListPlaceholder()}
      {pokemonList.errorMsg !== '' && (
        <p className='error-msg'>{pokemonList.errorMsg}</p>
      )}
      {LoadMore()}
    </>
  )
}

export default PokemonList
