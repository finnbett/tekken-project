import { getHomePage } from "./api";
import React, { useState, useEffect } from "react";

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
        <h1>hi</h1>
        {characters.map(character =>{
            return <li key={Math.random()}>{character.name}</li>
        })}
    </div>
    
    
    )
}