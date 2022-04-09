import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import request from "superagent"

export function IndividualCharacter() {
    const [characterData, setCharacterData] = useState([{"command":"d/b or d+3 or FC+3","hitRange":"l (TC)","damage":"7","startup":"15s cs6or1~","hit":"-2","block":"-11","counterHit":"-2","notes":""}])
    let location = useLocation()
    console.log(location.state)
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
    }, [])
    console.log(characterData)
    return(
        <>
        <h1>{splitTitle}</h1>
        {characterData.map(data =>{
            return <li key={Math.random()}>{data.command}</li>
        })}
        </>
    )

}