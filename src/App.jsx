import React, { useState, useEffect } from "react";
import { useDebounce} from "react-use";
import Search from "./components/search";
import Spinner from "./components/spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL= 'https://api.themoviedb.org/3';

const API_KEY= import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method : 'GET',
  headers : {
    accept : 'application/json',
    Authorization : `Bearer ${API_KEY}`
  }
};

const App= ()=>{
    const [searchTerm, setsearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const[debouncedSearch, setDebouncedSearch] = useState('');
    const[genre, setGenre] = useState('genre');
    const[genreOptions, setGenreOptions] = useState([]);

    useDebounce(()=>setDebouncedSearch(searchTerm),1000,[searchTerm]);
    
    const fetchMovies = async(query='')=>{
      setIsLoading(true);
      setErrorMessage('');
      try {
        const endpoint=query
        ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :genre!='genre'
        ?`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${genre}`
        :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint,API_OPTIONS);
        if(!response.ok){
          throw new Error('Failed to fetch movies');
        }

        const data= await response.json();
        if(data.response==='False'){
          setErrorMessage(data.error || `Failed to fetch data`);
          setMovieList([]);
          return;
        }
        setMovieList(data.results || []);
      } catch (error) {
          console.log(`Error Fetching movies: ${error}`);
          setErrorMessage(`We encountered ${error} in fetching movies`);
      } finally{
        setIsLoading(false);
      }
    }

    const fetchGenre = async()=>{

      try {
        const endpoint=`${API_BASE_URL}/genre/movie/list`;
        const response = await fetch(endpoint, API_OPTIONS);
        if(!response.ok){
          throw new Error('Failed to fetch genre list');
        }
        const data= await response.json();
        if(data.response==='False'){
          // setErrorMessage(data.error || `Failed to fetch genre list data`);
          console.log(`Error in getting data from data.genres`);
          setGenreOptions([]);
          return;
        }
        console.log(data.genres);
        setGenreOptions(data.genres);
        // console.log(genreOptions);
      } catch (error) {
        console.log(`Error ${error} in loading genres`);
      }
    }

    useEffect(()=>{
      fetchGenre();
    },[]);

    useEffect(()=>{
      fetchMovies(debouncedSearch);
    },[debouncedSearch, genre]);

    

    return(
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero bg" />
            <h1>Find <span className="text-gradient">Movies</span> that you Enjoy without Hassle</h1>
            <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} genre={genre} setGenre={setGenre} genreOptions={genreOptions} setGenreOptions={setGenreOptions}/>
          </header>
          <section className=""></section>
          <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>
            {isLoading ? (<Spinner/>) : errorMessage?(<p className="text-red-500">{errorMessage}</p>) :
            <ul>
              {movieList.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul> }
          </section>
        </div>
      </main>
      
    )
}

export default App;