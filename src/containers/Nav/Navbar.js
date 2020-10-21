import React, { useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import BackButton from '../../img/arrow-left.png'
import MenuButton from '../../img/menu.png'

const Navbar = () => {
  const history = useHistory()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const NavIcon = () => {
    return location.pathname.match(/\/pokemon\/.*/g) ? (
      <img
        className='nav-icon'
        src={BackButton}
        alt='Back'
        onClick={() => history.goBack()}
      />
    ) : (
      <img
        className='nav-icon'
        src={MenuButton}
        alt='Menu'
        onClick={() => setOpen(true)}
      />
    )
  }

  const NavTitle = () => {
    if (location.pathname === '/my-pokemon') {
      return <h3 data-testid='nav-title'>My Pokemon</h3>
    } else if (location.pathname.match(/\/pokemon\/.*/g)) {
      return <h3 data-testid='nav-title'>Pokemon Detail</h3>
    } else {
      return <h3 data-testid='nav-title'>Pokemon List</h3>
    }
  }

  const SideNav = () => {
    return (
      <div
        className={open ? 'overlay visible' : 'overlay'}
        onClick={() => setOpen(false)}
      >
        <div
          data-testid='sidenav'
          className={open ? 'sidenav open' : 'sidenav'}
        >
          <NavLink exact to={'/'}>
            Pokemon List
          </NavLink>
          <NavLink exact to={'/my-pokemon'}>
            My Pokemon
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <nav>
      {NavIcon()}
      {NavTitle()}
      {SideNav()}
      <div style={{ width: '50px' }}></div>
    </nav>
  )
}

export default Navbar
