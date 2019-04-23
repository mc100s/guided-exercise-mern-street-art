# Guided Exercise | MERN Street Art

## Introduction

In this project, we will do a complete fullstack application where users go create/read/update/delete street arts.

A demo is available here: WIP

This project will rely on the following technologies: 
- Front-end:
  - React
  - Bootstrap
  - Mapbox
  - Cloudinary
- Back-end:
  - Express
  - MongoDB and Mongoose


## Overview

### Models

For this project, we will use 3 models:
- `User`: To save basic information about the user (email and password)
- `StreetArt`: To save a picture and the location of a street art
- `Visit`: To save the visit of a specific user with a specific street art

#### `User`
Field | Type
--- | ---
_id | (Automaticaly generated)
email | String
password | String

#### `StreetArt`
Field | Type
--- | ---
_id | (Automaticaly generated)
pictureUrl | String
location | (GeoJSON)
- type | `"Point"`
- coordinates | [Number]

#### `Visit`
Field | Type
--- | ---
_id | (Automaticaly generated)
_user | Schema.Types.ObjectId
_streetArt | Schema.Types.ObjectId


### Backend routes

Route | Type of protection | Description
--- | --- | ---
`POST /api/signup` | Ø | Sign up the user
`POST /api/login` | Ø | Log in the user
`POST /api/logout` | Must be connected | Log out the user
`GET /api/street-arts` | Ø | Get all street arts
`GET /api/street-arts/:streetArtId` | Ø | Get the detail of one street art
`POST /api/street-arts` | Must be connected | Add a street art
`PUT /api/street-arts/:streetArtId` | Must be the owner | Edit one street art
`DELETE /api/street-arts/:streetArtId` | Must be the owner | Delete one street art
`GET /api/my-visits` | Must be connected | Get the visits of the connected user
`POST /api/visits` | Must be connected | Add a visit
`DELETE /api/visits/:visitId` | Must be the owner | Delete a visit


## Iterations

- Initialise with the MERN boilerplate
- Create the models
- Create a seed file
- Create the backend routes
- Include Bootstrap in the project and customise it
- Create a page to create a street art
- Create a page to see all street arts
- Create a page to edit a street art
- ...

## TODO
- Create a demo
- Create tests with Cypress