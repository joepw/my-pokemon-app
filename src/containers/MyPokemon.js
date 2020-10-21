import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReleasePokemon } from '../actions/pokemonActions'

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
      <div className={overlay ? 'overlay visible' : 'overlay'}>
        <section className='modal-main'>
          <h3>Release Pokemon ?</h3>
          <div className='modal-btn-wrapper'>
            <div className='modal-btn' onClick={() => setOverlay(false)}>
              No
            </div>
            <div className='modal-btn' onClick={Release}>
              Yes
            </div>
          </div>
        </section>
      </div>
    )
  }

  const ShowData = () => {
    if (myPokemonList.data.length) {
      return (
        <div className={'list-wrapper'}>
          {myPokemonList.data.map((el, i) => {
            return (
              <div
                className={'pokemon-item'}
                onClick={() => props.history.push(`/pokemon/${el.name}`)}
                key={i}
              >
                <div className='pokemon-img-wrapper'>
                  <img src={el.sprites.front_default} alt={el.name} />
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
        You have no pokemon
        <br />
        <Link to={'/'}>Find Pokemon</Link>
      </p>
    )
  }

  return <div>{ShowData()}</div>
}

export default MyPokemon
