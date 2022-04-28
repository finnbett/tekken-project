import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import request from "superagent"
import Button from 'react-bootstrap/Button'
import { ButtonGroup } from "react-bootstrap"
import { ToggleButtonGroup, ToggleButton, Spinner } from "react-bootstrap"



export function IndividualCharacter() {
    const [characterData, setCharacterData] = useState([{"command":"d/b or d+3 or FC+3","hitRange":"l (TC)","damage":"7","startup":"15s cs6or1~","hit":"-2","block":"-11","counterHit":"-2","notes":""}])
    const [hitFrames, setHitFrames] = useState(false)
    const [blockFrames, setBlockFrames] = useState(false)
    const [startupFrames, setStartupFrames] = useState(false)
    const [damage, setDamage] = useState(false)
    const [value, setValue] = useState([])
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

    const handleChange = (val) => setValue(val)


    // console.log(characterData)
    console.log(location.state)
    return(
        <>
        <h1>{splitTitle}</h1>
        <img src={`/images/${location.state}.webp`} alt='character'/>
        <Button variant="primary">Primary</Button>
        <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange} aria-label="Toolbar with button groups">
            <ToggleButton id="tbg-btn-1" value={1} variant="secondary" onClick={() => setHitFrames(!hitFrames)}>Display Frames on hit</ToggleButton>
            <ToggleButton id="tbg-btn-2" value={2} variant="secondary" onClick={() => setBlockFrames(!blockFrames)}>Display Frames on block</ToggleButton>
            <ToggleButton id="tbg-btn-3" value={3} variant="secondary"  onClick={() => setStartupFrames(!startupFrames)}>Display Startup Frames</ToggleButton>
            <ToggleButton id="tbg-btn-4" value={4} variant="secondary"  onClick={() => setDamage(!damage)}>Display Damage</ToggleButton>
        </ToggleButtonGroup>
        {characterData.length < 2 ? <Spinner animation='border' role='staus'><span className="visually-hidden">Loading...</span></Spinner>: null}

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
