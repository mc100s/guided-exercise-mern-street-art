import React, { Component } from 'react';
import { Container } from 'reactstrap'

export default class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {                
    return (
      <Container className="Home text-center">
        <h1>Welcome!</h1>
        <p>This website is an example of a project using the MERN stack.</p>
        <p>It was designed for street arts lovers! You can find and add street arts all around the world!</p>
        <p>Have fun <span role="img" aria-label="smile">😀</span></p>
      </Container>
    );
  }
}
