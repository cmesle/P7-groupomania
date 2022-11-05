import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { FilterContext } from '../../utils/context'

import iconNew from '../../assets/icon-nav/icon-new.avif'
import iconMy from '../../assets/icon-nav/icon-my.avif'
import iconAll from '../../assets/icon-nav/icon-all.avif'
import iconOut from '../../assets/icon-nav/icon-out.avif'

import './Nav.css'


function Nav({userRole}) {

    /*------------------------------------------------------------------- NAV LINKS LOGICS */
    const handleNewClick = () => { localStorage.setItem('PTU', '0') }

    const { toggleFilter, filter } = useContext(FilterContext)
    const handleFilterClick = () => { toggleFilter() }

    const handleLogoutClick = () => {
        localStorage.clear()
    }

    return (
        <nav>
            <ul>
                {userRole !== 'admin' &&
                    <>
                        <li>
                            <NavLink
                                to='newpost'
                                onClick={handleNewClick}>
                                <img className='nav__icon' src={iconNew} alt="icone navigation : nouvelle publication" />
                                <span>nouvelle publication</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to='gallery'
                                onClick={handleFilterClick}>
                                    {filter === 'allPosts' ? 
                                    <img className='nav__icon' src={iconMy} alt='icone navigation : mes publications'/> : 
                                    <img className='nav__icon' src={iconAll} alt='icone navigation : toutes les publications'/> 
                                    }
                                <span>
                                    {filter === 'allPosts' ? 'mes publications' : 'toutes les publications'}
                                </span>
                            </NavLink>
                        </li>
                    </>
                }
                <li>
                    <NavLink to='/' onClick={handleLogoutClick}>
                        <img className='nav__icon' src={iconOut} alt="" />
                        <span>déconnexion</span>
                    </NavLink>
                </li>
            </ul>
        </nav >
    )
}

export default Nav