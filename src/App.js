import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import MoviePage from "./components/MoviePage";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/movie/:movieId" component={MoviePage} />
    </Router>
  );
}

export default App;
