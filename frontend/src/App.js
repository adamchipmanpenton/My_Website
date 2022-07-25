import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import {Home, ViewMovies, AddReview, PageNotFound } from "./pages"
import { useState, useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch('/api/movies')
      .then((response) => response.json())
      .then(setMovies)
  }, []);
  return(
    <div>
      <Routes>
        <Route path="/" element={<Home movies={movies} setMovies={setMovies} />}/>
        <Route path="/viewMovies" element={<ViewMovies movies={movies} setMovies={setMovies} />}/>
        <Route path="/addReview" element={<AddReview movies={movies} setMovies={setMovies}/>}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}
export default App;