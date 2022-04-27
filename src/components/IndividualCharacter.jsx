import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import request from "superagent"

export function IndividualCharacter() {
    const [characterData, setCharacterData] = useState([{"command":"d/b or d+3 or FC+3","hitRange":"l (TC)","damage":"7","startup":"15s cs6or1~","hit":"-2","block":"-11","counterHit":"-2","notes":""}])
    const [hitFrames, setHitFrames] = useState(false)
    const [blockFrames, setBlockFrames] = useState(false)
    const [startupFrames, setStartupFrames] = useState(false)
    const [damage, setDamage] = useState(false)
    let location = useLocation()
    let splitTitle = (location.state).split('')
    let titleFirstChar = splitTitle[0].toUpperCase()
    splitTitle[0] = titleFirstChar

    useEffect(() => {
        request.get(`http://tkn-api.herokuapp.com/character/${location.state}`)
        .then(res => res.body)
        .then(res => {
            setCharacterData(res)
        })
        .catch(err => {
            console.log(err.message)
        })
    }, [location.state])


    console.log(characterData)
    return(
        <>
        <h1>{splitTitle}</h1>
        <button onClick={() => setHitFrames(!hitFrames)}>Display Frames on hit</button>
        <button onClick={() => setBlockFrames(!blockFrames)}>Display Frames on block</button>
        <button onClick={() => setStartupFrames(!startupFrames)}>Display Startup Frames</button>
        <button onClick={() => setDamage(!damage)}>Display Damage</button>

        {
        characterData.map(data => {
            return(
            <> 
                <ul> 
                    <li key={Math.random()}>Input: {data.command}</li>
                    {hitFrames?<li key={Math.random()}>Frames on hit: {data.hit}</li>: null}
                    {blockFrames?<li key={Math.random()}>Frames on block: {data.block}</li>: null}
                    {startupFrames?<li key={Math.random()}>Startup Frames: {data.startup}</li>: null}
                    {damage?<li key={Math.random()}>Damage: {data.damage}</li>: null}
                </ul>
            </>
            )
        })
    }   
        </>
    )

}
