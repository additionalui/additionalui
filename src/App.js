import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from './components/home/Home';
import Contact from './components/Contact';
import Controls from './components/controls/Controls';
import Examples from './components/examples/Examples';

// import "aui-accordion/dist/aui.bundle";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="home" element={<Home />} />
          <Route exact path="contact" element={<Contact />} />
          <Route exact path="components" element={<Controls />} />
          <Route exact path="examples" element={<Examples />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
