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
createdAt | Date (Automaticaly generated)
updatedAt | Date (Automaticaly generated)

#### `StreetArt`
Field | Type
--- | ---
_id | (Automaticaly generated)
pictureUrl | String
location | (GeoJSON)
-> type | `"Point"`
-> coordinates | [Number]
createdAt | Date (Automaticaly generated)
updatedAt | Date (Automaticaly generated)

#### `Visit`
Field | Type
--- | ---
_id | (Automaticaly generated)
_user | Schema.Types.ObjectId
_streetArt | Schema.Types.ObjectId
createdAt | Date (Automaticaly generated at creation)


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

### Iteration 2 | Create the models and seed the database

For this part, we give you the code!

**Update the file `server/models/User.js`**
```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: String,
  password: String
}, {
    timestamps: true
  });

module.exports = mongoose.model('User', schema);
```

**Create a file `server/models/StreetArt.js`**
```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  pictureUrl: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number]
  },
}, {
    timestamps: true
  });

module.exports = mongoose.model('StreetArt', schema);
```

**Create a file `server/models/Visit.js`**
```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _streetArt: {
    type: Schema.Types.ObjectId,
    ref: 'StreetArt'
  },
}, {
    timestamps: {
      createdAt: 'createdAt'
    }
  });

module.exports = mongoose.model('Visit', schema);
```

**Update the file `server/bin/seeds.js`**
```js
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const StreetArt = require("../models/StreetArt");
const Visit = require("../models/Visit");

const bcryptSalt = 10;

require('../configs/database')

let userDocs = [
  new User({
    email: "alice@gmail.com",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    email: "bob@gmail.com",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  })
]

let streetArtDocs = [
  new StreetArt({
    pictureUrl: "https://lh5.googleusercontent.com/p/AF1QipNqlBgeyUgKqGUH_oYogtxRQ0KPTtLAgiCXEUon",
    location: {
      type: "Point",
      coordinates: [ -9.209744,38.696060]
    },
  }),
  new StreetArt({
    pictureUrl: "https://lh5.googleusercontent.com/p/AF1QipO_kynLt94FYjYKmstOul5mZ-fnXyb6O_2Kr7SL",
    location: {
      type: "Point",
      coordinates: [-9.136864,38.720205]
    },
  }),
  new StreetArt({
    pictureUrl: "https://lh5.googleusercontent.com/p/AF1QipONkHmWhUjFjelUXxlekBg1Aq0ccW20yXxBRxxQ",
    location: {
      type: "Point",
      coordinates: [13.451661,52.507734]
    },
  })
]

let visitDocs = [
  new Visit({
    _user: userDocs[0]._id,
    _streetArt: streetArtDocs[0]._id,
  }),
  new Visit({
    _user: userDocs[0]._id,
    _streetArt: streetArtDocs[1]._id,
  }),
  new Visit({
    _user: userDocs[1]._id,
    _streetArt: streetArtDocs[0]._id,
  })
]


Promise.all([
  User.deleteMany(),
  StreetArt.deleteMany(),
  Visit.deleteMany(),
])
  .then(() => {
    console.log('All users, street arts and visits have been deleted')

    return Promise.all([
      User.create(userDocs),
      StreetArt.create(streetArtDocs),
      Visit.create(visitDocs),
    ])
  })
  .then(() => {
    console.log(`${userDocs.length} users created`)
    console.log(`${streetArtDocs.length} street arts created`)
    console.log(`${visitDocs.length} visits created`)
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
```

**Execute the seed**
```sh
$ node server/bin/seeds.js
```

If the command is not working, you probably have to run the following command in a terminal (without killing it)

```sh
$ mongod
```

**Check in your database if you see 2 user documents, 3 street art documents and 3 visit documents. You can use MongoDB Compass for this**

![Imgur](https://i.imgur.com/7YJCkYV.png)

---

![Imgur](https://i.imgur.com/4ibEkyY.png)

---

![Imgur](https://i.imgur.com/UCG2rDY.png)

## TODO
- Create a demo
- Create tests with Cypress