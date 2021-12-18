import Navbar from "./Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;