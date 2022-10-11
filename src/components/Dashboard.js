import './Dashboard.css';
import axios from 'axios';
import PieChart from './charts/DoughnutChart';
import Polar from './charts/Polar';
import { useEffect, useState, useRef } from 'react';
import image from '../components/assets/2833617__1_-removebg-preview.png';



const Dashboard = () => {

    const [data, setData] = useState([]);

    const [percent1, setPercent1] = useState();
    const [percent2, setPercent2] = useState();

    const [rolePercent, setRolePercent] = useState();
    const [rolePercent2, setRolePercent2] = useState();

    const [totalPlayers, setTotalPlayers] = useState();

    const [allTeams, setAllTeams] = useState();

    const [items, setItems] = useState();


    useEffect(() =>{
        axios.get("https://api.sportsdata.io/v3/lol/scores/json/Players?key=94c287b249d74701adf60e03aa398884")
        .then((res) =>{
            let data = res.data;
            console.log(data);

            // Find percentage of how many players come from each country 
            let korean = data.filter((item) => item.Nationality === "Korea Republic").length;
            let american = data.filter((item) => item.Nationality === "United States").length;
            let chinese = data.filter((item) => item.Nationality === "China PR").length;
            let denmark = data.filter((item) => item.Nationality === "Denmark").length;
            let french = data.filter((item) => item.Nationality === "France").length;
            let australian = data.filter((item) => item.Nationality === "Australia").length;
            let japanese = data.filter((item) => item.Nationality === "Japan").length;

            let totalAmount = korean + american + chinese + denmark + french + australian + japanese;

            let koreanPercent = (Math.round(korean * 100) / totalAmount).toFixed(1);
            let denmarkPercent = (Math.round(denmark * 100) / totalAmount).toFixed(1);

            setPercent1(koreanPercent);
            setPercent2(denmarkPercent);

            setTotalPlayers(data.length);
            
        })

        
    }, [])

    useEffect(()=>{
        axios.get("https://api.sportsdata.io/v3/lol/scores/json/Players?key=94c287b249d74701adf60e03aa398884")
        .then((res)=>{
            let data = res.data;

            // Sets the total number of players in each role
            let topLaners = data.filter((item)=> item.Position === "Top").length;
            let junglers = data.filter((item)=> item.Position === "Jungle").length;
            let midLaners = data.filter((item)=> item.Position === "Mid").length;
            let bottomLaners = data.filter((item)=> item.Position === "ADC").length;
            let supports = data.filter((item)=> item.Position === "Support").length;

            let allPlayers = topLaners + junglers + midLaners + bottomLaners + supports;

            // Looks for total number of players in all roles
            let allRoles = [topLaners, junglers, midLaners, bottomLaners, supports].length;

            console.log(allRoles);

            let junglePercent = (Math.round(junglers * 100) / allPlayers).toFixed(1);

            setRolePercent2(junglePercent);
        })
    }, [])

    useEffect(()=>{
        axios.get("https://api.sportsdata.io/v3/lol/scores/json/Teams?key=94c287b249d74701adf60e03aa398884")
        .then((res)=>{
            let data = res.data;

            setAllTeams(data.length);
            
        })

        axios.get("https://api.sportsdata.io/v3/lol/stats/json/Items?key=94c287b249d74701adf60e03aa398884")
        .then((res)=>{
            let itemData = res.data;

            setItems(itemData.length);
        })
    }, [])

    

    return(

    <>
        <div className='intro'>
            <h2>Greetings, Summoner</h2>
            <div className='welcomeMsg'>
                <h3>Welcome to LOLDATA</h3>
                <p className='more-info'>Keep track of your favourite Esport pro's and compare champions to determine the best of the best!</p> 
                <img className='image' src={image}/>
            </div>

        </div>

        {/* Turn into pie chart */}
        <div className='graph-block pie'>
            <h2>Players per Role</h2>
            <h3>How many players, play each role?</h3>
            <PieChart/>
            <h4> Looks like the jungle role has the most players!</h4>
            <h5>Jungle {rolePercent2}%</h5>
        </div>

        {/* MAKE BAR CHART */}
        <div className='graph-block polar'>
            <h2>Players Nationality</h2>
            <h3>Where are these players from?</h3>
            <Polar/>
            <h4>Wow! Most Pro players seem to come from Korea</h4>
            <h5>Korea {percent1}%</h5>
        </div>

        <div className='graph-block total-players'>
            <h3>Other Information</h3>

            <h4>Current Pro Players</h4>
            <h5>{totalPlayers}</h5>

            <h4>Amount of Teams</h4>
            <h5>{allTeams}</h5>

            <h4>Amount of items in the game</h4>
            <h5>{items}</h5>
        </div>

        
    </>
    )
    
}

export default Dashboard;