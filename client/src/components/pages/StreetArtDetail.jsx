import React, { Component } from 'react'
import { Container } from 'reactstrap'
import api from '../../api'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css' // Import of Mapbox CSS

mapboxgl.accessToken = 'pk.eyJ1IjoibWMxMDBzIiwiYSI6ImNqb2E2ZTF3ODBxa3czd2xldHp1Z2FxbGYifQ.U4oatm5RsTXXHQLz5w66dQ'

export default class StreetArtDetail extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      streetArt: null,
      isFullscreen: false
    }
    this.toggleFullscreen = this.toggleFullscreen.bind(this)

    // For the Mapbox configuration
    this.mapRef = React.createRef()
    this.map = null
    this.marker = null
  }
  toggleFullscreen() {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    })
  }
  initMap(lng, lat) {
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10
    })

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())

    // Create a marker on the map with the coordinates ([lng, lat])
    this.marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([lng, lat])
      .addTo(this.map)
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
            alt="Street Art"
            src={this.state.streetArt.pictureUrl} /> 
            
            <hr/>

            <div ref={this.mapRef} style={{height: 400}}></div>
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
        let [lng,lat] = streetArt.location.coordinates
        this.initMap(lng,lat)
      })
  }
}

