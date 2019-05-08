import React, { Component } from 'react'
import { Container } from 'reactstrap'
import api from '../../api'

export default class StreetArtDetail extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      streetArt: null,
      isFullscreen: false
    }
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }
  toggleFullscreen() {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    })
  }
  render() {
    let imgClassName = "street-art-overview"
    if (this.state.isFullscreen) imgClassName += " fullscreen"
    let lng,lat;
    if (this.state.streetArt)
      [lng,lat] =  this.state.streetArt.location.coordinates
    return (
      <div>
        <Container>
          <h1 className="mb-4">Street Art Detail</h1>
          {!this.state.streetArt && <div>Loading...</div>}
          {this.state.streetArt && <div>
            <img 
            className={imgClassName} 
            onClick={this.toggleFullscreen}
            src={this.state.streetArt.pictureUrl} /> 
            
            <hr/>
            <p>Longitude: {lng}</p>
            <p>Latitude: {lat}</p>
          </div>}

        </Container>
      </div>
    )
  }
  componentDidMount() {
    api.getStreetArt(this.props.match.params.streetArtId)
      .then(streetArt => {
        this.setState({
          streetArt: streetArt
        })
      })
  }
}

