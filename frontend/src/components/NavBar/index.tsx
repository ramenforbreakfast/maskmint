import * as React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'
/*
interface Props {
    activeRoute: string
}
*/

export default function NavBar() {
    return (
        <div className="flex flex-row justify-center bg-cyan-400 h-12">
            <NavLink className="navlink" activeClassName="active" exact to="/">About</NavLink>
            <NavLink className="navlink" activeClassName="active" to="/browse">Browse</NavLink>
            <NavLink className="navlink" activeClassName="active" to="/manage">Manage</NavLink>
            <NavLink className="navlink" activeClassName="active" to="/sponsor">Sponsor</NavLink>
        </div>
    )
}