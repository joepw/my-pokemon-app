import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetPokemon, AddPokemon } from '../../actions/pokemonActions'
import isEmpty from '../../utils/isEmpty'
import './PokemonDetail.css'

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
    if (pokemonState.loading) {
      return <p className='loading'>Loading...</p>
    }
    if (!isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName]
      return (
        <div>
          <h1 data-testid='pokemon-detail-name' className='text--capitalize'>
            {pokemonName}
          </h1>
          <img src={pokeData.sprites} alt='' />
          <h2>Types</h2>
          <section className='detail__section'>
            {pokeData.types.map((el, i) => {
              return (
                <div className='detail__item' key={i}>
                  {el}
                </div>
              )
            })}
          </section>
          <h2>Moves</h2>
          <section className='detail__section'>
            {pokeData.moves.map((el, i) => {
              return (
                <div className='detail__item' key={i}>
                  {el}
                </div>
              )
            })}
          </section>
          <div className='catch-btn' onClick={Catch}>
            <h2>Catch !</h2>
          </div>
        </div>
      )
    }

    if (pokemonState.errorMsg !== '') {
      return (
        <p className='error-msg'>
          {pokemonState.errorMsg}
          <br />
          <Link to={'/'}>Find Pokémon</Link>
        </p>
      )
    }

    return (
      <p className='error-msg'>
        Unable to find Pokémon
        <br />
        <Link to={'/'}>Find Pokémon</Link>
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
          className='nickname'
          type='text'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <div className='modal__btn' onClick={AddPoke}>
          OK
        </div>
      </div>
    ) : (
      <div className='modal__btn' onClick={() => setOverlay(false)}>
        close
      </div>
    )
  }

  const Modal = () => {
    return (
      <div className={overlay ? 'overlay overlay--visible' : 'overlay'}>
        <section className={overlay ? 'modal modal--open' : 'modal'}>
          <h3 className='modal__title'>
            {catchSuccess ? 'Catch Success !' : 'Catch Failed !'}
          </h3>
          {ModalContent()}
        </section>
      </div>
    )
  }

  const AddPoke = () => {
    const { name, sprites } = pokemonState.data[pokemonName]
    const pokeData = { name, sprites, nickname }
    dispatch(AddPokemon(pokeData))
    setOverlay(false)
  }

  return (
    <div className='detail'>
      {ShowData()}
      {Modal()}
    </div>
  )
}

export default Pokemon
