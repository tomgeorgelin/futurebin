import React from 'react'
import {Nav, Bars, NavLink, NavBtnLink} from './NavbarItems'
import {ReactComponent as Starship} from './../../starship.svg';

const Navbar = () => {
    return (
        <Nav style={{marginBottom:"1rem"}}>
            <div className="box" style={{justifyContent:"start"}} onClick={() => alert("c'est normal que ça fasse rien arrête de toucher à tout")}>
                <Bars/>
            </div>
            <div className="box">
                <NavLink to="/futurebin">
                    <Starship/>
                </NavLink>
            </div>
            <div className="box" style={{justifyContent:"end"}}>
                <NavBtnLink to="/futurebin">
                    Créer un nouveau Futurebin
                </NavBtnLink>
            </div>
        </Nav>
    )
}

export default Navbar
