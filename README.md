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
-> type | `"Point"`
-> coordinates | [Number]

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
- Deploy it

### Iteration 1 | Initialise with the MERN boilerplate

First, create a GitHub repository. We will assume the link is `<https://github.com/user/my-project.git>`

Open your terminal, go in a folder where you want to create the project and execute the following commands.
```sh
# Clone the project with only the last commit and save it in the folder <my-project>
$ git clone --depth=1 https://github.com/mc100s/mern-boilerplate.git mern-street-art

$ cd mern-street-art
$ rm -rf .git
$ git init

# Set your GitHub repository as the "origin" remote repository (remove < and >)
$ git remote add origin <https://github.com/user/my-project.git>
```

Create a file `server/.env`, with for example the following values;

```
PORT=5000
SESSION_SECRET=anyValue
MONGODB_URI=mongodb://localhost/mern-street-art
CLOUDINARY_CLOUD_NAME=......
CLOUDINARY_API_KEY=......
CLOUDINARY_API_SECRET=......
```

**To install all the packages**
```sh
# Install server and client packages + build the React applicatin
$ npm install

# OR you can install manually the server and client packages
$ (cd server && npm install)
$ (cd client && npm install)
```

**To install a package for the server**


```sh
$ cd server
$ npm install axios
```

**To install a package for the client**

```sh
$ cd client
$ npm install axios
```

**To run the server and the client**

```sh
# Open a first terminal
$ npm run dev:server
# Run the server on http://localhost:5000/

# Open a second terminal
$ npm run dev:client
# Run the client on http://localhost:3000/
```

So now you can go to

- http://localhost:5000/api/: A simple API call
- http://localhost:5000/: The website based on client/build (that you can update with `$ (cd client && npm run build)`)
- http://localhost:3000/: The last version of your React application that is calling your API with the base url "http://localhost:5000/api/"



## TODO
- Create a demo
- Create tests with Cypress