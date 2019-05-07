import React, { Component } from 'react'
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom'
import api from '../../api';

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streetArts: null
    }
  }
  renderGoogleMapLink(streetArt) {
    let [lng,lat] = streetArt.location.coordinates
    return <a href={`https://www.google.com/maps/dir//${lat},${lng}/@${lat},${lng},15z`} target="_blank">{lng},{lat}</a>
  }
  render() {
    return (
      <Container>
        <h1 className="mb-4">List of Street Arts</h1>
        {!this.state.streetArts && <div>Loading...</div>}
        {this.state.streetArts && <Table hover className="street-art-list">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Google Maps Direction</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {this.state.streetArts.map(streetArt => <tr key={streetArt._id} >
              <td>
                <img src={streetArt.pictureUrl} alt=""/>
              </td>
              <td>
                {this.renderGoogleMapLink(streetArt)}
              </td>
              <td><Button tag={Link} to={"/street-art-detail/"+streetArt._id} color="danger" outline>Detail</Button></td>
            </tr>)}
          </tbody>
        </Table>}
      </Container>
    )
  }
  componentDidMount() {
    api.getStreetArts()
      .then(streetArts => {
        this.setState({
          streetArts
        })
      })
  }
}
