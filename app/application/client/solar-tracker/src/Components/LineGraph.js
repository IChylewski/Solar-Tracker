import { useState, useEffect } from 'react';
import '../Style/LineGraph.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function LineGraph(props) {
    const [data, setData] = useState(props.data);

    const [graphData, setGraphData] = useState({
        labels: data.map((data) => data.Time),
        datasets: [
            {
                label: "Tracking Solar Panel",
                data: data.map((data) => data.PanelOneValue),
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Static Solar Panel",
                data: data.map((data) => data.PanelTwoValue),
                fill: false,
                borderColor: "#742774"
            }]
    })

    useEffect(() => {
        setData(props.data);
    })



    return (
        <div>
            <h1>Last 24h</h1>
            <Line data={graphData} />
        </div>
    )
}

export default LineGraph;