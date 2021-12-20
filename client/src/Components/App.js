import Navbar from "./Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Futurebin from "./Futurebin";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:code" element={<Futurebin/>} />
      </Routes>
    </Router>
  );
}

export default App;
