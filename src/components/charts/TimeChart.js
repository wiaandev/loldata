import React from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
import axios from 'axios';
import './TimeChart.css'
import {useState, useEffect, useRef} from 'react';
import 'chartjs-adapter-date-fns';
import { set } from "date-fns";

// TODO: Get teams from all over the world and append dynamically to dropdown.
// TODO: When clicking on team from dropdown run function to populate chart with its players.
// TODO: Change player real names to IGN using another axios request.
// TODO: Add additional data below chart to contextualise data on chart, e.g, area of team: Australia, and if team is active.
// https://api.sportsdata.io/v3/lol/scores/json/Players?key=94c287b249d74701adf60e03aa398884 TO GET PLAYER IGN 
// https://api.sportsdata.io/v3/lol/scores/json/ActiveMemberships?key=94c287b249d74701adf60e03aa398884 TO GET TEAMS

const TimeChart = () =>{
    const [teams, setTeams] = useState([]);

    const [selectedTeamMates, setSelectedTeamMates] = useState([]);

    const [playtime, setPlayTime] = useState([]);

    const[endtime, setEndTime] = useState([]);

    const[startAndEnd, setStartAndEnd] = useState([]);



    let getTeam = useRef();
    
    useEffect(() =>{
        axios.get("https://api.sportsdata.io/v3/lol/scores/json/Teams?key=94c287b249d74701adf60e03aa398884")
        .then((res) =>{
            let data = res.data;
            console.log(data);
            // setTournament(data.filter(({ Name }) => ["NA LCS", "LEC", "LPL", "LCK", "Mid-Season Invitational", "World Championship"].includes(Name)).map(({ Name }) => Name));
            // console.log(tournament);

            // Get Dates of all tournaments
            
           setTeams(res.data);
        })
    },[])

    const teamMates = () => {
        let selectedTeam = getTeam.current.value;
        console.log(selectedTeam);
        let teamId = '';
        for(let i = 0; i < teams.length; i++ ){
            if(teams[i].Name === selectedTeam){
                teamId = teams[i].TeamId;
            }
        }

        let newRequest = "https://api.sportsdata.io/v3/lol/scores/json/HistoricalMembershipsByTeam/" + teamId + "?key=94c287b249d74701adf60e03aa398884";
        console.log(newRequest);
        axios.get(newRequest)
        .then((res) =>{
            console.log(res.data);
            let data = res.data
            
           setSelectedTeamMates(data.map((item)=> item.PlayerName));
            const chartArray = [];
           for(let i = 0; data.length; i++){
               let playTimeSplit = data[i].StartDate.split("T")[0];
               let playTime = playTimeSplit;
               let endTimeSplit = data[i].EndDate.split("T")[0];
               let endTime = endTimeSplit;

               chartArray.push([playTime, endTime]);
                console.log(chartArray);

                setStartAndEnd(chartArray);
                

            
           }
           console.log(startAndEnd);

           

        //    setPlayTime(data.map((item) => item.StartDate.slice(0, 10)));

        //     console.log(playtime);

        //     setEndTime(data.map((i)=> i.EndDate));

        //     console.log(endtime);

        //     setStartAndEnd([[playtime, endtime]]);

        //     console.log(startAndEnd);
            
        })

    }
    return(
        <>
        <div className="drop-down">
            <select onChange={teamMates} ref={getTeam}>
                {
                    teams.map(item => <option key={item.TeamId}>{item.Name}</option>)
                }
            </select>
        </div>
        <div className="timeChart">
            
            <div className="exCon chart">
                <Bar data={{
                    labels: selectedTeamMates,
                    datasets: [{
                        label: ['Player has been Active'],
                        data: 
                            startAndEnd
                        ,
                        backgroundColor: [
                            '#5233FB',
                            '#775FFC',
                            '#664BFB',
                            '#4323FB',
                            '#3310F9'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        barPercentage: 1
                    }]}}
                    options={{
                        maintainAspectRatio: false,
                        indexAxis : 'y',
                        scales: {
                            x: {
                                min: '2015-01-01',
                                max: '2022-12-31',
                                type: 'time',
                                time: {
                                    unit: 'year'
                                }
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                
                />
            </div>
        </div>
        </>
    )

}

export default TimeChart;