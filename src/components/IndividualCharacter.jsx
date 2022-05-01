import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { Link } from 'react-router-dom'
import request from "superagent"
import Button from 'react-bootstrap/Button'
import { ListGroupItem } from "react-bootstrap"
import { ToggleButtonGroup, ToggleButton, Spinner, ListGroup, Card, Row, Col, Navbar } from "react-bootstrap"
import '../App.css'



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
        <div className="individual">
            <div className="title-image-container">
                <h1 className="character-title">{splitTitle}</h1>
                    <img src={`/images/${location.state}.webp`} alt='character'/>
            </div>
            <Navbar sticky="top" >
            <div className="nav">
                <div className="button-block"  >
                    <Link to='/'>
                        <Button variant="primary" size="lg" className="character-select">Character Select</Button>
                    </Link>
                    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange} aria-label="Toolbar with button groups">
                        <ToggleButton id="tbg-btn-1" value={1} variant="success" onClick={() => setHitFrames(!hitFrames)}>Frames on hit</ToggleButton>
                        <ToggleButton id="tbg-btn-2" value={2} variant="secondary" onClick={() => setBlockFrames(!blockFrames)}>Frames on block</ToggleButton>
                        <ToggleButton id="tbg-btn-3" value={3} variant="info"  onClick={() => setStartupFrames(!startupFrames)}>Startup Frames</ToggleButton>
                        <ToggleButton id="tbg-btn-4" value={4} variant="danger"  onClick={() => setDamage(!damage)}>Damage</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </Navbar>
        
        {characterData.length < 2 ? <Spinner animation='border' role='staus'><span className="visually-hidden">Loading...</span></Spinner>: 
        <Row md={10} className="g-4" id="moves-container">
        
        {characterData.map(data => {
            return(
             
            <>
            <Card style={{width:'9rem', margin:5}}>
                <Card.Header>Input: <br /> <b>{data.command}</b></Card.Header>
                <ListGroup variant="flush">
                    {hitFrames && data.hit?<ListGroupItem style={{backgroundColor:'#53dfa0' }}>{data.hit}</ListGroupItem>:null}
                    {blockFrames && data.block?<ListGroupItem style={{backgroundColor:'#9fa6ad'}}>{data.block}</ListGroupItem>:null}
                    {startupFrames && data.startup?<ListGroupItem style={{backgroundColor:'#87e5f7'}}>{data.startup}</ListGroupItem>:null}
                    {damage && data.damage?<ListGroupItem style={{backgroundColor: '#e1848d'}}>{data.damage}</ListGroupItem>:null}
                </ListGroup>
            </Card>
            </>
            
            )
        })}
        </Row>
    }   
        </div>
    )

}
