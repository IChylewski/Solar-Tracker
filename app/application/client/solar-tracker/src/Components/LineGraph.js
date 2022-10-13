import { useState, useEffect } from 'react';
import '../Style/LineGraph.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function LineGraph(props) {
    const [data, setData] = useState(props.data);

    const [graphData, setGraphData] = useState({
        labels: data.map((data) => data.Day),
        datasets: [
            {
                label: "Static Solar Panel",
                data: data.map((data) => data.PanelOne)
            },
            {
                label: "Tracking Solar Panel",
                data: data.map((data) => data.PanelTwo)
            }]
    })

    useEffect(() => {
        setData(props.data);
        //console.log(props.data);
    })

    /*const [graphData, setGraphData] = useState({
        labels: "data.map((data) => data.day)",
        datasets: [{
            label: "Static Solar Panel",
            data: data.map((data) => data.PanelOne)
        }]
    })*/


    return <Line data={graphData} />;

    //console.log(data);

    //return <h1>Hello</h1>;
}

export default LineGraph;