import { getHomePage } from "../api";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Spinner, Card, Row, Col } from "react-bootstrap";
import Banner from "./Banner";

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
    <>
    <Banner />
    <div>
        <h1>Please select a character.</h1>
        {characters.length < 2 ? <Spinner animation='border' role='staus'><span className="visually-hidden">Loading...</span></Spinner>: 
        <Row md={10} className="g-4">
        {characters.map(character => {
            return<>
            <Col >
                <Link to= {`/character/${character.name}`} state={character.name}>
                    <Card style={{width: '9rem'  }}>
                        <Card.Img variant="top" className="character-tile" src={`/images/${character.name}.webp`} width='200px'/>
                            <Card.Body>
                                <Card.Title>
                                    {character.label}
                                </Card.Title>
                                <Card.Text>
                                    {/* {character.description} */}
                                </Card.Text>
                            </Card.Body>
                    </Card>
                </Link>
            </Col>
            
            </>
        })}
        </Row>}
        
 
    </div>
    </>
    
    
    )
}

