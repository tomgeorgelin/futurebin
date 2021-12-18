import React from 'react'
import {Nav, Bars, NavLink, NavBtnLink} from './NavbarItems'
import {ReactComponent as Starship} from './../../starship.svg';

const Navbar = () => {
    return (
        <Nav>
            <div className="box" style={{justifyContent:"start"}}>
                <Bars/>
            </div>
            <div className="box">
                <NavLink to="/">
                    <Starship/>
                </NavLink>
            </div>
            <div className="box" style={{justifyContent:"end"}}>
                <NavBtnLink to="/">
                    Create a new one
                </NavBtnLink>
            </div>
        </Nav>
    )
}

export default Navbar
