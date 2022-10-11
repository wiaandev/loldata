import './Nav.css';
import "https://kit.fontawesome.com/3d7d8906d0.js";
import { Link } from 'react-router-dom';
import logo from "../components/assets/new-logo.svg";

const Nav = () => {
    return(
        <nav>
            <img src={logo} width= "100px"/>
            <ul>
                <Link to="/"><li className='dashboard'><i class="fa-solid fa-gauge"></i></li></Link>
                <Link to="Compare"><li className='compare'><i class="fa-solid fa-scale-balanced"></i></li></Link>
                <Link to="Timeline"><li className='timeline'><i class="fa-solid fa-timeline"></i></li></Link>

            </ul>
           
        </nav>
    )
}

export default Nav;