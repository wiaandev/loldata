import React from 'react';
import './Compare.css';
import axios from 'axios';
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import "https://kit.fontawesome.com/3d7d8906d0.js";
import {useEffect, useState, useRef} from 'react';

const Compare = () => {

    const[getData, setGetData] = useState();
    // const[allChampions, setAllChampions] = useState();
    const [showChampion, setShowChampion] = useState();
    const [championTitle, setChampionTitle] = useState();

    const [showChampionTwo, setShowChampionTwo] = useState();
    const [championTitleTwo, setChampionTitleTwo] = useState();

    const [radarData, setRadarData] = useState([]);
    const [radarData2, setRadarData2] = useState([]);

    const champPeep = useRef();
    const champPeepTwo = useRef();


    useEffect(() => {
        axios.get('https://api.sportsdata.io/v3/lol/stats/json/Champions?key=94c287b249d74701adf60e03aa398884')
        .then((res) => {
            setGetData(res.data)

            console.log(radarData);//|| To get champion info to display on below card and populate chart
            console.log(radarData2);

        
        })
    }, [radarData && radarData2]); //when both radardata AND radardata2 characters have been searched, display them to the DOM
    
    const getChampion = () => {
        for(let i = 0; i < getData.length; i++){
            let individualChamp = champPeep.current.value;
            if(getData[i].Name.toLowerCase() === individualChamp.toLowerCase()){
                console.log(getData);
                console.log(individualChamp);
                
                setShowChampion(individualChamp.toUpperCase());
                setChampionTitle(getData[i].Title);

                let hitPoints = getData[i].Hp
                let attack = getData[i].Attack;
                let defense = getData[i].Defense;
                let attackRange = getData[i].AttackRange;
                let armor = getData[i].Armor;

                setRadarData([hitPoints, attack, defense, attackRange, armor]);
            }

        } //! Have to click search twice to update array to new array

    } //Get Champion name and check to see if it is found in the API

    const getSecondChampion = () => {
        let individualChampTwo = champPeepTwo.current.value;
        console.log(individualChampTwo);

        for(let i = 0; i < getData.length; i++){
            if(getData[i].Name.toLowerCase() === individualChampTwo.toLowerCase()){
                // console.log(getData[i]);
                setShowChampionTwo(individualChampTwo.toUpperCase());
                setChampionTitleTwo(getData[i].Title);

                let hitPoints2 = getData[i].Hp
                let attack2 = getData[i].Attack;
                let defense2 = getData[i].Defense;
                let attackRange2 = getData[i].AttackRange;
                let armor2 = getData[i].Armor;

                setRadarData2([hitPoints2, attack2, defense2, attackRange2, armor2]);
            }
        }
    } //Get Champion name and check to see if it is found in the API

    const filterChampions = () => {

    }

    return(
        <>

            <div className='intro'>
                <h2>Compare</h2>
                <div className='welcomeMsg'>
                <h3>Clash of the Champions</h3>
                <p className='more-info'>Compare various champions up against each other and compare them based on their stats</p> 
            </div>
            </div>
            
            <div className='search-block'>

                {/* Would use this for compare page! */}
                <div>
                    <div className='search'>
                        <input onChange={filterChampions} ref={champPeep} type="search" id='champion-search' placeholder='e.g Annie' />
                    </div>
                    <button onClick={getChampion} className='btn-prim'>Search</button>
                </div>

                <div className='championNames'>
                    <ul>
                        {/* <li>{allChampions}</li> */}
                    </ul>
                </div>

            </div>

            

            <div className='search-block'>

                {/* Would use this for compare page! */}
                <div>

                    <div className='search'>
                        <input ref={champPeepTwo} type="search" id='champion-search' placeholder='e.g Annie'/>
                    </div>
                    <button onClick={getSecondChampion} className='btn-prim'>Search</button>
                </div>

            </div>

            <div className='result'>

            <div className='graph-block radar-block'> 
                <h3>{showChampion}</h3>
                <h4>{championTitle}</h4>
                <div className='radar'>
                    <Radar data={{
                        labels: ['HP', 'Attack', 'Defense', 'Attack Range', 'Armor'],

                        datasets: [{
                            label: showChampion,
                            data: radarData,
                            backgroundColor: [
                                'rgba(82, 51, 251, 0.5)'
                            ],
                            borderColor: [
                                'rgb(82, 51, 251)',
                            ],
                            borderWidth: 2,
                        }],
                        
                    }}
                        height = {400}
                        width = {400}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                            r: {
                                angleLines: {
                                    color: 'white'
                                },
                                grid: {
                                    color: 'white'
                                },
                                pointLabels:{
                                        color: 'rgb(82, 51, 251)',
                                        font: 'bold'
                                },
                                ticks: {
                                    color: 'white', 
                                } 
                            }
                            }
                        }}
                
                    />
                </div>
                <span><p>Hit Points:</p> <h1>{radarData[0]}</h1></span>
                <span><p>Attack:</p> <h1>{radarData[1]}</h1></span>
                <span><p>Defense:</p> <h1>{radarData[2]}</h1></span>
                <span><p>Attack Range:</p> <h1>{radarData[3]}</h1></span>
                <span><p>Armor:</p> <h1>{radarData[4]}</h1></span>
            </div>

            <div className='graph-block radar-block'> 
                <h3>{showChampionTwo}</h3>
                <h4>{championTitleTwo}</h4>
                <div className='radar'>
                    <Radar data={{
                        labels: ['HP', 'Attack', 'Defense', 'Attack Range', 'Armor'],

                        datasets: [{
                            label: showChampionTwo,
                            data: radarData2,
                            backgroundColor: [
                                'rgba(119, 95, 252, 0.6)'
                            ],
                            borderColor: [
                                '#775FFC',
                            ],
                            borderWidth: 2,
                        }],
                    }}
                        height = {400}
                        width = {400}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                            r: {
                                angleLines: {
                                    color: 'white'
                                },
                                grid: {
                                    color: 'white'
                                },
                                pointLabels:{
                                        color: 'rgb(82, 51, 251)',
                                        font: 'bold'
                                },
                                ticks: {
                                    color: 'white', 
                                } 
                            }
                            }
                        }}
                
                    />
                </div>    
                <span><p>Hit Points:</p> <h1>{radarData2[0]}</h1></span>
                <span><p>Attack:</p> <h1>{radarData2[1]}</h1></span>
                <span><p>Defense:</p> <h1>{radarData2[2]}</h1></span>
                <span><p>Attack Range:</p> <h1>{radarData2[3]}</h1></span>
                <span><p>Armor:</p> <h1>{radarData2[4]}</h1></span>
            </div>
                    
            </div>

        </>
    )
}

export default Compare;