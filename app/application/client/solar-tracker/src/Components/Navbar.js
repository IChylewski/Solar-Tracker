import '../Style/Navbar.css'

function Navbar(props) {
    return (
        <nav className="d-flex navbar navbar-expand-lg navbar-light bg-light space justify-content-between">
            <div className="d-flex">
                <a className="navbar-brand" href="#">Solar Tracker</a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <button className="btn btn-success" onClick={props.changeTableVis}>Statistic</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-primary" onClick={props.changeGraphVis}>Graph</button>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/test">Test</a>
                    </li>
                </ul>
            </div>
            <button onClick={props.logOff} className="btn btn-primary float-right">Log Off</button>
        </nav>

    )
}

export default Navbar;