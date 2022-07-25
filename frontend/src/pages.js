import React from "react";
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import './App.css';
import {Link, useLocation} from "react-router-dom"
import Emoji from "a11y-react-emoji"
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from "react-bootstrap/Dropdown"
import Card from 'react-bootstrap/Card'
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import CardGroup from 'react-bootstrap/CardGroup'
import FormControl from "react-bootstrap/FormControl"
import FormGroup from "react-bootstrap/esm/FormGroup";

export function Home({movies, setMovies}) {
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="">Movie Reviews</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="viewMovies">See Reviews</Nav.Link>
                        <Nav.Link href="addReview">Add Review</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="text-center" Style={{ padding:"20px"}}>
            <Row style={{ padding:"25px"}}>
                <h1>Home Page</h1>   
            </Row>
            <Row style={{ padding:"10px"}}>
                <h4>Welcome to Movie reviews.</h4>
            </Row>    
            <Row>
                <p>You can click on Add Review to leave a review of any movie you like. Then fill out the form to leave a 
                    rating from 0 to 5 stars, the actors, year the movie was release and upload a picture 
                    of the movie poster.<br></br>Click on See Reviews to view all movie reviews.
                </p> 
            </Row>
                <Emoji symbol="🎥" label="film"/>   
                <Emoji symbol="🎬" label="clip"/> 
                <Emoji symbol="🍿" label="popcorn"/> 
            </Container>
        </div>
    );
}

export function ViewMovies({movies, setMovies}) {
    console.log(movies)

    function handleRemove(name, event) {
        console.log(name)
        const remove = async () => {
            const result = await  fetch("/api/removeMovie",{
                method: "POST",
                body: JSON.stringify({name: name}),
                headers:{"Content-Type": "application/json",}
            });
            const body = await result.json();
            console.log(body);
            setMovies(body.movies)
        }
        remove();
        window.location.reload(false);
      }

    function emjoi(rating){
        if(rating == "0"){
            return <Emoji symbol="💩" label="pile of poo"/>
        }else if(rating == "1"){
            return <Emoji symbol="⭐" label="star"/>
        }else if(rating == "2"){
            return <Emoji symbol="⭐⭐" label="star" />
        }else if(rating == "3"){
            return <Emoji symbol="⭐⭐⭐" label="star" />
        }else if(rating == "4"){
            return <Emoji symbol="⭐⭐⭐⭐" label="star" />
        }else if(rating == "5"){
            return <Emoji symbol="🌟🌟🌟🌟🌟" label="	glowingStar" />
        }
    }
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="">Movie Reviews</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="viewMovies">See Reviews</Nav.Link>
                        <Nav.Link href="addReview">Add Review</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>    
            <Container>
                <Row className="text-center" style={{ padding:"25px"}}>
                <h1>Movie Reviews</h1> 
               </Row>
            </Container>       
            <Row xs={1} md={3} className="g-4">
            { movies.map( (movie) => (
                <CardGroup>
                    <Card>
                        <Card.Img variant="top" src={"./images/" + movie.poster}  />
                        <Card.Body>
                        <Card.Title>{movie.name}</Card.Title>
                        <Card.Text>
                            <p>Release Date: {movie.date}</p>
                            <p>Main Actors: {movie.actors}</p>
                            <p>Rating: {emjoi(movie.rating)}</p>
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="danger" className="delete" onClick={() => handleRemove(movie.name)}>Delete</Button>
                        </Card.Footer>                
                    </Card>
                </CardGroup>
            ))}   
            </Row>        
        </div>
    );
}

export function AddReview({movies, setMovies}) {
    const testPic = (event) =>{
        console.log(event.target.files[0].name)
        console.log(event.target.files[0])
        event.preventDefault();
    }

    const handleSubmit = (event) => {

        const fd = new FormData();
        fd.append("poster", document.getElementById("poster").files[0], document.getElementById("poster").files[0].name);

        axios.post('/api/addPoster',fd)
            .then(res=>{
                console.log(res)
            })
        console.log(document.getElementById("poster").files[0].name)    
        const movieName = document.getElementById("movieName").value
        const releaseDate = document.getElementById("releaseDate").value
        const actors = document.getElementById("actors").value
        const movieRating = document.getElementById("movieRating").value
        const posterName = document.getElementById("poster").files[0].name
        const poster = "swep4.jpg"
        const add = async () => {
            const result = await  fetch('/api/addMovie',{
                method: "POST",
                body: JSON.stringify({name: movieName, date: releaseDate, actors: actors, poster: poster, rating: movieRating}),
                headers:{"Content-Type": "application/json",}
            });
            const body = await result.json();
            console.log(body);
            setMovies(body.movies)
        }
        add();
        console.log(`Movie name, ${movieName}, Relase date ${releaseDate}, actors ${actors}, poster ${poster}, rating ${movieRating}`)  
      }
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="">Movie Reviews</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="viewMovies">See Reviews</Nav.Link>
                        <Nav.Link href="addReview">Add Review</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="text-center">
            <Row style={{ padding:"25px"}}>
                <h1>Add a Star Wars Review</h1>
            </Row>
            <p>Fill out the form below for the movie you wish to review. Then click submit.<br/>You can then see it under See Reviews.</p>
            </Container>
            <Container >
                <Form onSubmit={handleSubmit} >
                    <Row className="mb-3">
                        <FormGroup as={Col}>
                            <Form.Label>Movie Name</Form.Label>
                            <Form.Control type="text" id="movieName" required/>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type="text" id="releaseDate" required/>
                        </FormGroup>
                    </Row>
                    <Row className="mb-3">
                        <FormGroup as={Col} >
                            <Form.Label>Actors</Form.Label>
                            <Form.Control type="text" id="actors" required/>
                        </FormGroup>
                        <Col xs="auto">
                            <Form.Label>Movie Rating</Form.Label>
                            <Form.Select type="text" id="movieRating" required>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Movie Poster</Form.Label>
                        <Form.Control type="file" id="poster" onChange={testPic}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export function PageNotFound() {
    let location = useLocation();
    return (
        <div className="App">
            <nav>
                <Link to="/">View All Reviews</Link>
            </nav>
            <nav>
                <Link to="addReview">Add a Review</Link>
            </nav>
            <h1>Error, this page does not exist!</h1>
            <h2>{location.pathname}</h2>
        </div>
    );
}