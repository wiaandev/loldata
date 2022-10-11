import './index.css'
import {Routes, Route} from 'react-router-dom';
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Compare from './components/Compare';
import Timeline from './components/Timeline';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element = {<Dashboard/>}></Route>
        <Route path='/Compare' element = {<Compare/>}></Route>
        <Route path='/Timeline' element = {<Timeline/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
