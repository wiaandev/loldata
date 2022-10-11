import React from "react";
import { PolarArea } from "react-chartjs-2";
import 'chart.js/auto';
import axios from 'axios';
import './Polar.css'
import {useState, useEffect} from 'react';

const Polar = () =>{

    const [origin, setOrigin] = useState([]);

    useEffect(() =>{
        axios.get("https://api.sportsdata.io/v3/lol/scores/json/Players?key=94c287b249d74701adf60e03aa398884")
        .then((res) =>{
            let data = res.data;
            console.log(data);

            let korean = data.filter((item) => item.Nationality === "Korea Republic").length;
            let american = data.filter((item) => item.Nationality === "United States").length;
            let chinese = data.filter((item) => item.Nationality === "China PR").length;
            let denmark = data.filter((item) => item.Nationality === "Denmark").length;
            let french = data.filter((item) => item.Nationality === "France").length;
            let australian = data.filter((item) => item.Nationality === "Australia").length;
            let japanese = data.filter((item) => item.Nationality === "Japan").length;

            setOrigin([korean, american, chinese, denmark, french, australian, japanese]);
            
        })

        
    }, [])

    return(
        <div className="exCon chart">
            <PolarArea data={{
                labels: ['Korea', 'United States', 'China', 'Denmark', 'France', 'Australia', 'Japan'],
                datasets: [{
                    label: '# of Votes',
                    data: origin,
                    backgroundColor: [
                        'rgba(51, 16, 249, 1)',
                        'rgba(82, 51, 251, 1)',
                        'rgba(102, 75, 251, 1)',
                        'rgba(119, 95, 252, 1)',
                        'rgba(67, 35, 251, 1)',
                        'rgba(121, 97, 255, 1)',
                        'rgba(144, 125, 255, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 0
                }]}}
                options={{
                    maintainAspectRatio: true,
                    scales: {
                    r: {
                        angleLines: {
                            color: 'white'
                        },
                        grid: {
                            color: 'transparent'
                        },
                        pointLabels:{
                                color: 'rgb(82, 51, 251)',
                                font: 'bold'
                        },
                        ticks: {
                            display: false,
                        } 
                    }
                    }
                }}
            
            />
        </div>
    )
}

export default Polar;