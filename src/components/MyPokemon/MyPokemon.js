import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReleasePokemon } from '../../actions/pokemonActions'
import LazyLoad from 'react-lazyload'
import './MyPokemon.css'

const MyPokemon = (props) => {
  const myPokemon = useSelector((state) => state.MyPokemon)
  const [overlay, setOverlay] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState({})
  const dispatch = useDispatch()

  const MyPokemonData = () => {
    if (myPokemon.data.length) {
      return (
        <div className='pokemon-list'>
          {myPokemon.data.map((el, i) => {
            return (
              <div
                className='pokemon-item'
                onClick={() => props.history.push(`/pokemon/${el.name}`)}
                key={i}
              >
                <LazyLoad height={96} once>
                  <img src={el.sprites} alt={el.name} width='96' height='96' />
                </LazyLoad>
                <p>{el.nickname}</p>
                <div
                  className='release-btn'
                  onClick={(e) => selectPokemon(e, el)}
                >
                  Release
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <p className='error-msg'>
        You have no Pokémon
        <br />
        <Link to={'/'}>Find Pokémon</Link>
      </p>
    )
  }

  const ReleaseModal = () => {
    return (
      <div className={overlay ? 'overlay overlay--visible' : 'overlay'}>
        <section className={overlay ? 'modal modal--open' : 'modal'}>
          <h3 className='modal__title'>Release Pokémon ?</h3>
          <div className='modal__btn' onClick={() => setOverlay(false)}>
            No
          </div>
          <div className='modal__btn' onClick={releasePokemon}>
            Yes
          </div>
        </section>
      </div>
    )
  }

  const selectPokemon = (event, pokemon) => {
    event.stopPropagation()
    setSelectedPokemon(pokemon)
    setOverlay(true)
  }

  const releasePokemon = () => {
    dispatch(ReleasePokemon(selectedPokemon))
    setOverlay(false)
  }

  return (
    <>
      {MyPokemonData()}
      {ReleaseModal()}
    </>
  )
}

export default MyPokemon
