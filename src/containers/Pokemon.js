import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetPokemon, AddPokemon } from '../actions/pokemonActions'
import isEmpty from '../utils/isEmpty'

const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemon
  const dispatch = useDispatch()
  const pokemonState = useSelector((state) => state.Pokemon)
  const [overlay, setOverlay] = useState(false)
  const [catchSuccess, setCatchSuccess] = useState(false)
  const [nickname, setNickname] = useState(pokemonName)
  useEffect(() => {
    dispatch(GetPokemon(pokemonName))
    // eslint-disable-next-line
  }, [])

  const ShowData = () => {
    if (!isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName]
      return (
        <div>
          <h1 data-testid='pokemon-detail-name' className='text-capitalize'>
            {pokemonName}
          </h1>
          <img src={pokeData.sprites.front_default} alt='' />
          <h2>Types</h2>
          <div className='item-wrapper'>
            {pokeData.types.map((el, i) => {
              return <p key={i}>{el.type.name}</p>
            })}
          </div>
          <h2>Moves</h2>
          <div className='item-wrapper'>
            {pokeData.moves.map((el, i) => {
              return <p key={i}>{el.move.name}</p>
            })}
          </div>
          <div className='catch-btn' onClick={Catch}>
            <h2>Catch !</h2>
          </div>
        </div>
      )
    }

    if (pokemonState.loading) {
      return <p className='loading'>Loading...</p>
    }

    if (pokemonState.errorMsg !== '') {
      return (
        <p className='error-msg'>
          {pokemonState.errorMsg}
          <br />
          <Link to={'/'}>Find Pokemon</Link>
        </p>
      )
    }

    return (
      <p className='error-msg'>
        Unable to find pokemon
        <br />
        <Link to={'/'}>Find Pokemon</Link>
      </p>
    )
  }

  const Catch = () => {
    const success = Math.random() < 0.5
    setCatchSuccess(success)
    setOverlay(true)
  }

  const ModalContent = () => {
    return catchSuccess ? (
      <div>
        Give it a nickname ?<br />
        <input
          className='input'
          type='text'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <div className='modal-btn-wrapper'>
          <div className='modal-btn' onClick={AddPoke}>
            OK
          </div>
        </div>
      </div>
    ) : (
      <div className='modal-btn-wrapper'>
        <div className='modal-btn' onClick={() => setOverlay(false)}>
          close
        </div>
      </div>
    )
  }

  const Modal = () => {
    return (
      <div className={overlay ? 'overlay visible' : 'overlay'}>
        <section className='modal-main'>
          <h3>{catchSuccess ? 'Catch Success !' : 'Catch Failed !'}</h3>
          {ModalContent()}
        </section>
      </div>
    )
  }

  const AddPoke = () => {
    const pokeData = pokemonState.data[pokemonName]
    pokeData.nickname = nickname
    dispatch(AddPokemon(pokeData))
    setOverlay(false)
  }

  return (
    <div className={'poke'}>
      {ShowData()}
      {Modal()}
    </div>
  )
}

export default Pokemon
