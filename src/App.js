import About from './About';
import './App.css';
//import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import CheckWeather from './CheckWeather';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {


return(
 
            <div>
              <Router>
                <Navigation />
                <Routes>
                  <Route path='/home' element={<CheckWeather />}/>
                  <Route path='/about' element={<About />}/>
                </Routes>
              </Router>
            </div>
    
    );

}

export default App;