import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReleasePokemon } from '../../actions/pokemonActions'
import './MyPokemon.css'

const MyPokemon = (props) => {
  const dispatch = useDispatch()
  const [overlay, setOverlay] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState({})
  const myPokemonList = useSelector((state) => state.MyPokemon)

  const Select = (event, pokemon) => {
    event.stopPropagation()
    setSelectedPokemon(pokemon)
    setOverlay(true)
  }

  const Release = () => {
    dispatch(ReleasePokemon(selectedPokemon))
    setOverlay(false)
  }

  const Modal = () => {
    return (
      <div className={overlay ? 'overlay overlay--visible' : 'overlay'}>
        <section className={overlay ? 'modal modal--open' : 'modal'}>
          <h3 className='modal__title'>Release Pokémon ?</h3>
          <div className='modal__btn' onClick={() => setOverlay(false)}>
            No
          </div>
          <div className='modal__btn' onClick={Release}>
            Yes
          </div>
        </section>
      </div>
    )
  }

  const ShowData = () => {
    if (myPokemonList.data.length) {
      return (
        <div className={'pokemon-list'}>
          {myPokemonList.data.map((el, i) => {
            return (
              <div
                className={'pokemon-item'}
                onClick={() => props.history.push(`/pokemon/${el.name}`)}
                key={i}
              >
                <div className='pokemon-item__img-wrapper'>
                  <img src={el.sprites} alt={el.name} />
                </div>
                <p>{el.nickname}</p>
                <div className='release-btn' onClick={(e) => Select(e, el)}>
                  Release
                </div>
              </div>
            )
          })}
          {Modal()}
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

  return <div>{ShowData()}</div>
}

export default MyPokemon
