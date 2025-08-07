import React from "react";
import didYouMean from "didyoumean";
import DropDown from "./dropDown";

const Search=({searchTerm , setsearchTerm, genre, setGenre, genreOptions, setGenreOptions})=>{


    return(
        <div className="search">
            <div>
                <img src="/search.svg" alt="search" />
                <input 
                    type="text" 
                    placeholder="Search for your fav movie..." 
                    value={searchTerm}
                    onChange={(e)=> setsearchTerm(e.target.value)}
                />
                <DropDown genre={genre} setGenre={setGenre} genreOptions={genreOptions}/>
            </div>
        </div>
    )
}

export default Search;