import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import StatisticsTable from "../Components/StatisticsTable";

function Dashboard() {
    const [logged, setLogged] = useState("false");
    const navigate = useNavigate();

    function logOff() {
        setLogged("false");
        localStorage.setItem("logged", "false");
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("logged");

        if (loggedInUser === "true") {
            setLogged(loggedInUser);
        }
    }, []);

    if (logged === "false") {
        navigate("/login");
    } else {
        return (
            <div>
                <Navbar />
                <StatisticsTable />
                <h1>Hello</h1>
                <button onClick={logOff} className="btn btn-primary">Log Off</button>
            </div>
        )
    }
}
export default Dashboard;