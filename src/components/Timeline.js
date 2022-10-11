import './Timeline.css'
import TimeChart from './charts/TimeChart';

const Timeline = () => {
    return(
        <>
            <div className='intro'>
                <h2>Timeline</h2>
                <div className='welcomeMsg'>
                <h3>Welcome to the Timeline!</h3>
                <p className='more-info'>Take a look at how long each player played for your favourite team by selecting a team below!</p> 
            </div>
            </div>
            <div className='time-block'>
                <h2>Teams</h2>
                <h3>Select a Team Please</h3>
                
                <TimeChart/>
            </div>
        </>
    )
}

export default Timeline;