import { getHomePage } from "../api";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

export function DisplayHomePage() {
    const [characters, setCharacters] = useState([{"name":"akuma","label":"Akuma","description":"\"You challenge me!?\""}])

    useEffect(() => {
        getHomePage()
        .then(res => {
            setCharacters(res)
        })
        .catch(err => {
            console.log(err.message)
        })
    }, [])
    console.log(characters)
    return(
    
    <div>
        <h1>Please select a character.</h1>
        {characters.map(character =>{
            return <li key={Math.random()}>
                <Link to= {`/character/${character.name}`} state={character.name}>
                    {character.label}
                    <img src={`/images/${character.name}.webp`} alt="character"/>
                    </Link>
                    </li>
        })
    }
    </div>
    
    
    )
}