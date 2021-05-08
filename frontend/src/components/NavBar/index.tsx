import * as React from 'react'
import { NavLink } from 'react-router-dom'
/*
interface Props {
    activeRoute: string
}
*/
const inactiveLink = "bg-yellow-500 border-2 rounded border-gray-600 m-2 p-1 font-FredokaOne"
const activeLink = "bg-yellow-600 border-2 rounded border-gray-800 m-2 p-1 font-FredokaOne"
export default function NavBar() {
    return(
        <div className="flex flex-row justify-center bg-cyan-400">
            <NavLink className={inactiveLink} activeClassName={activeLink} exact to="/">Browse</NavLink>
            <NavLink className={inactiveLink} activeClassName={activeLink} exact to="/manage">Manage</NavLink>
            <NavLink className={inactiveLink} activeClassName={activeLink} exact to="/sponsor">Sponsor</NavLink>
        </div>
    )
}