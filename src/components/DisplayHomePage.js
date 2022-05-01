import { getHomePage } from "../api";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Spinner, Card, Row, Col } from "react-bootstrap";
import Banner from "./Banner";
import '../App.css'

export function DisplayHomePage() {
    const [characters, setCharacters] = useState([''])
    const [q, setQ] = useState('')
    

    useEffect(() => {
        getHomePage()
        .then(res => {
            console.log(res.body)
            setCharacters(res)
        })
        .catch(err => {
            console.log(err.message)
        })
    }, [])
    console.log(characters)

    const handleSearch = (e)  => {
        setQ(e.target.value)
    }
  const filtered = !q 
    ?characters
    :characters.filter((character) => {
       return character.name.includes(q.toLowerCase())
    })

       
       


    return(
    <>
    <Banner />
    <div className="tiles-homepage">
        <h1 className="character-select">CHARACTER SELECT</h1>
        <label htmlFor="search-form">
            <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search for..."
                value={q}
                onChange={handleSearch}
            />
            <span>Character search</span>
            </label>
        {characters.length < 2 ? <Spinner animation='border' role='staus'><span className="visually-hidden">Loading...</span></Spinner>: 
        <Row md={10} className="g-4">
            
        {filtered.map(character => {
            return<>
            <Col >
                <Link to= {`/character/${character.name}`} state={[character.name, character.description]}>
                    <Card style={{width: '9rem'  }}>
                        <Card.Img variant="top" className="character-tile" src={`/images/${character.name}.webp`} width='200px'/>
                            <Card.Body>
                                <Card.Title>
                                    {character.label}
                                </Card.Title>
                                <Card.Text>
                                    {/* {} */}
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

