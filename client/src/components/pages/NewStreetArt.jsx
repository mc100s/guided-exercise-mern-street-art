import React, { Component } from 'react'
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from 'reactstrap'

export default class NewStreetArt extends Component {
  render() {
    return (
      <Container className="NewStreetArt">
        <h1>New Street Art</h1>

        <Button className="my-4" color="danger" block outline>Get Current Coordinates</Button>

        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Coordinates</Label>
          </Col>
          <Col>
            <Input type="number" name="lng" placeholder="Longitude" />
          </Col>
          <Col>
            <Input type="number" name="lat" placeholder="Latitude" />
          </Col>
        </Row>

        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Picture</Label>
          </Col>
          <Col>
            <Input type="file" name="email" placeholder="Longitude" />
          </Col>
        </Row>

        <Button className="my-4" color="danger" block>Add Street Art</Button>

      </Container>
    )
  }
}
