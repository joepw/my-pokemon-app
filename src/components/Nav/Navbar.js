import React, { useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import BackIcon from '../../img/arrow-left.png'
import MenuIcon from '../../img/menu.png'
import CloseIcon from '../../img/close.png'
import SearchIcon from '../../img/magnify.png'
import PokeballIcon from '../../img/pokeball.png'
import AppLogo from '../../img/app-logo.png'
import './Navbar.css'

const Navbar = () => {
  const history = useHistory()
  const location = useLocation()
  const [sidenavOpen, setSidenavOpen] = useState(false)

  const NavIcon = () => {
    return location.pathname.match(/\/pokemon\/.*/g) ? (
      <img
        className='nav__icon'
        src={BackIcon}
        alt='Back'
        width='30'
        height='30'
        onClick={() => history.goBack()}
      />
    ) : (
      <img
        className='nav__icon nav__icon--hidden'
        src={MenuIcon}
        alt='Menu'
        width='30'
        height='30'
        onClick={() => setSidenavOpen(true)}
      />
    )
  }

  const NavTitle = () => {
    let title = 'Pokémon List'
    if (location.pathname === '/my-pokemon') {
      title = 'My Pokémon'
    } else if (location.pathname.match(/\/pokemon\/.*/g)) {
      title = 'Pokémon Detail'
    }
    return <h3 data-testid='nav-title'>{title}</h3>
  }

  const SideNav = () => {
    return (
      <div
        className={sidenavOpen ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => setSidenavOpen(false)}
      >
        <div
          data-testid='sidenav'
          className={sidenavOpen ? 'sidenav sidenav--open' : 'sidenav'}
        >
          <img
            className='sidenav__close-btn nav__icon--hidden'
            src={CloseIcon}
            alt='Close'
            width='30'
            height='30'
            onClick={() => setSidenavOpen(false)}
          />
          <div className='sidenav__header'>
            <img src={AppLogo} alt='App Logo' width='60' height='60' />
            <div className='sidenav__title'>My Pokémon App</div>
            <div className='sidenav__author'>by Jonathan Prasetya</div>
          </div>
          <NavLink className='sidenav__links' exact to={'/'}>
            <img
              className='sidenav__icon'
              src={SearchIcon}
              alt='Pokemon List'
              width='36'
              height='36'
            />
            Pokémon List
          </NavLink>
          <NavLink className='sidenav__links' exact to={'/my-pokemon'}>
            <img
              className='sidenav__icon'
              src={PokeballIcon}
              alt='My Pokemon'
              width='36'
              height='36'
            />
            My Pokémon
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <>
      <nav className='nav'>
        {NavIcon()}
        {NavTitle()}
        <div style={{ width: '48px' }}></div>
      </nav>
      {SideNav()}
    </>
  )
}

export default Navbar
