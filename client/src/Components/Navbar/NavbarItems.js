import styled from 'styled-components'
import { NavLink as Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav`
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#EDEDED;
    height:80px;
    z-index:10;
    padding: 0 1rem;
`

export const NavLink = styled(Link)`
`

export const Bars = styled(FaBars)`
    background-color:#4B5E75;
    padding:.8rem;
    color:#EDEDED;
    border-radius:15px;
`

export const NavBtn = styled.nav`
    display:flex;
    align-items:center;
`

export const NavBtnLink = styled(Link)`
    background-color:#4B5E75;
    display:flex;
    border-radius:15px;
    color:#EDEDED;
    padding:.8rem;
    text-decoration:none;

    @media screen and (max-width :768px) {
        display:none;
    }
`