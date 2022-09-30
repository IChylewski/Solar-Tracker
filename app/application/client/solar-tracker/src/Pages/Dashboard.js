import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import StatisticsTable from "../Components/StatisticsTable";
import "../Style/Dashboard.css";
import Axios from 'axios';

function Dashboard() {
    const [logged, setLogged] = useState("false");
    const [statisticTableVisible, setStatisticTable] = useState(false);
    const [statistic, setStatistics] = useState([]);
    const navigate = useNavigate();

    function getStatisticData(){
        Axios.get("//localhost:3001/api/dailystat").then((response) => {
            //console.log(response.data);
            setStatistics(response.data);
    })};

    function logOff() {
        setLogged("false");
        localStorage.setItem("logged", "false");
    }

    function changeTableVis() {
        setStatisticTable(!statisticTableVisible);
    }

    useEffect(() => {
        getStatisticData();

        const loggedInUser = localStorage.getItem("logged");

        if (loggedInUser === "true") {
            setLogged(loggedInUser);
        }
    }, []);

    if (logged === "false") {
        navigate("/login");
    } else {
        return (
            <div className="container">
                <Navbar changeTableVis={changeTableVis} logOff={logOff}/>
                {statisticTableVisible == true && <StatisticsTable data={statistic}/>}
            </div>
        )
    }
}
export default Dashboard;