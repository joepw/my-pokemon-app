import React, { useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import BackButton from '../../img/arrow-left.png'
import MenuButton from '../../img/menu.png'
import './Navbar.css'

const Navbar = () => {
  const history = useHistory()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const NavIcon = () => {
    return location.pathname.match(/\/pokemon\/.*/g) ? (
      <img
        className='nav__icon'
        src={BackButton}
        alt='Back'
        onClick={() => history.goBack()}
      />
    ) : (
      <img
        className='nav__icon nav__icon--menu'
        src={MenuButton}
        alt='Menu'
        onClick={() => setOpen(true)}
      />
    )
  }

  const NavTitle = () => {
    if (location.pathname === '/my-pokemon') {
      return <h3 data-testid='nav-title'>My Pokémon</h3>
    } else if (location.pathname.match(/\/pokemon\/.*/g)) {
      return <h3 data-testid='nav-title'>Pokémon Detail</h3>
    } else {
      return <h3 data-testid='nav-title'>Pokémon List</h3>
    }
  }

  const SideNav = () => {
    return (
      <div
        className={open ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => setOpen(false)}
      >
        <div
          data-testid='sidenav'
          className={open ? 'sidenav sidenav--open' : 'sidenav'}
        >
          <div className='sidenav__header'>
            <img src='/logo192.png' alt='App Logo' width='50' />
            <div className='sidenav__title'>My Pokémon App</div>
            <div className='sidenav__author'>by Jonathan Prasetya</div>
          </div>
          <NavLink className='sidenav__links' exact to={'/'}>
            Pokémon List
          </NavLink>
          <NavLink className='sidenav__links' exact to={'/my-pokemon'}>
            My Pokémon
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <nav className='nav'>
      {NavIcon()}
      {NavTitle()}
      {SideNav()}
      <div style={{ width: '50px' }}></div>
    </nav>
  )
}

export default Navbar
