import '../Style/Navbar.css'

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Solar Tracker</a>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/test">Statistics</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/test">Graph</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/test">Test</a>
                </li>
            </ul>
        </nav>


        /**/
    )
}

export default Navbar;