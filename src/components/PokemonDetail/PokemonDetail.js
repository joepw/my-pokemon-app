import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetPokemon, AddPokemon } from '../../actions/pokemonActions'
import isEmpty from '../../utils/isEmpty'
import './PokemonDetail.css'

const PokemonDetail = (props) => {
  const pokemonName = props.match.params.pokemon
  const pokemonState = useSelector((state) => state.Pokemon)
  const [overlay, setOverlay] = useState(false)
  const [catchSuccess, setCatchSuccess] = useState(false)
  const [nickname, setNickname] = useState(pokemonName)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetPokemon(pokemonName))
    // eslint-disable-next-line
  }, [])

  const PokemonData = () => {
    if (pokemonState.loading) {
      return <p className='loading'>Loading...</p>
    }

    if (!isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName]
      return (
        <>
          <h1 data-testid='pokemon-detail-name' className='detail-name text--capitalize'>
            {pokemonName}
          </h1>
          <div className='detail-section'>
            <img
              src={pokeData.sprites}
              alt={pokemonName}
              width='96'
              height='96'
            />
            <div className='catch-btn catch-btn--top' onClick={catchPokemon}>
              <h3 className='catch-btn__title'>Catch !</h3>
            </div>
          </div>
          <div className='detail-section'>
            {pokeData.types.length && (
              <>
                <h2>Types</h2>
                <section className='detail__item-container'>
                  {pokeData.types.map((el, i) => {
                    return (
                      <div className='detail__item' key={i}>
                        {el}
                      </div>
                    )
                  })}
                </section>
              </>
            )}
          </div>
          <div className='detail-section'>
            {pokeData.stats.length && (
              <>
                <h2>Stats</h2>
                <section className='stats'>
                  {pokeData.stats.map((el, i) => {
                    return (
                      <div className='stats__item' key={i}>
                        <span className='stats__title text--capitalize'>
                          {el.name}
                        </span>
                        <span className='stats__value'>{el.stat}</span>
                      </div>
                    )
                  })}
                </section>
              </>
            )}
          </div>
          <div className='moves'>
            {pokeData.moves.length && (
              <>
                <h2>Moves</h2>
                <section className='detail__item-container'>
                  {pokeData.moves.map((el, i) => {
                    return (
                      <div className='detail__item' key={i}>
                        {el}
                      </div>
                    )
                  })}
                </section>
              </>
            )}
          </div>
          <div className='catch-btn catch-btn--bottom' onClick={catchPokemon}>
            <h2>Catch !</h2>
          </div>
        </>
      )
    }

    return (
      <p className='error-msg'>
        {pokemonState.errorMsg || 'Unable to find Pokémon'}
        <br />
        <Link to={'/'}>Find Pokémon</Link>
      </p>
    )
  }

  const CatchModal = () => {
    return (
      <div className={overlay ? 'overlay overlay--visible' : 'overlay'}>
        <section className={overlay ? 'modal modal--open' : 'modal'}>
          <h3 className='modal__title'>
            {catchSuccess ? 'Catch Success !' : 'Catch Failed !'}
          </h3>
          {catchSuccess ? (
            <>
              Give it a nickname ?<br />
              <input
                className='nickname'
                type='text'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <div className='modal__btn' onClick={addPokemon}>
                OK
              </div>
            </>
          ) : (
            <div className='modal__btn' onClick={() => setOverlay(false)}>
              close
            </div>
          )}
        </section>
      </div>
    )
  }

  const catchPokemon = () => {
    const success = Math.random() < 0.5
    setCatchSuccess(success)
    setOverlay(true)
  }

  const addPokemon = () => {
    const { name, sprites } = pokemonState.data[pokemonName]
    const pokeData = { name, sprites, nickname }
    dispatch(AddPokemon(pokeData))
    setOverlay(false)
  }

  return (
    <div className='detail'>
      {PokemonData()}
      {CatchModal()}
    </div>
  )
}

export default PokemonDetail
