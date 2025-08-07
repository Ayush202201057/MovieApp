import React from "react";

const DropDown = ({genre , setGenre, genreOptions})=>{
    return(
        <div >
            <select name="selectedGenre" className="dropdown" value={genre} onChange={(e)=>setGenre(e.target.value)}>
                <option value="">Genre</option>
                {genreOptions.map((genreOption)=>(
                    <option key={genreOption.id} value={genreOption.name}>
                        {genreOption.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropDown;