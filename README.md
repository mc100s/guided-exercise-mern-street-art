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
`POST /api/street-arts` | Ø | Add a street art
`GET /api/my-visits` | Must be connected | Get the visits of the connected user
`POST /api/visits` | Must be connected | Add a visit
`DELETE /api/visits/:visitId` | Must be the owner | Delete a visit


## Iterations

- Initialise with the MERN boilerplate
- Create the models
- Create a seed file
- Create the backend routes
- Include Bootstrap in the project and customise it
- Create a page to see all street arts in a list
- Create a page to see all street arts in a map
- Create a page to add a new street art
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

### Iteration 2 | Backend |  Create the models and seed the database

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

![Imgur](https://i.imgur.com/47GAyyM.png)


### Iteration 3 | Backend | `GET /api/street-arts`

The goal of this iteration is to create a backend route `GET /api/street-arts` where we can access all street arts.

First, update the file `server/app.js`

```js
// server/app.js

// ...

app.use('/api', require('./routes/index'))
app.use('/api', require('./routes/auth'))
app.use('/api/street-arts', require('./routes/street-arts')) // NEW LINE: take all the routes defined in './routes/street-arts' and prefix them by '/api/street-arts'

// ...
```

Then, create a file `server/routes/street-arts.js` and write the necessary code for the route.

```js
// server/routes/street-arts.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  // TODO
});

module.exports = router;
```


When you are done, you can test with Postman `GET http://localhost:5000/api/street-arts`


![Imgur](https://i.imgur.com/oSDgvgS.png)


### Iteration 4 | Backend | `GET /api/street-arts/:streetArtId`

For this iteration, we have to do something very similar and create to route `GET /api/street-arts/:streetArtId`.

You can create it directly in the file `server/routes/street-arts.js`.


To make sure your route is working, you should test it with Postman!
![Imgur](https://i.imgur.com/V1tMjG1.png)


### Iteration 5 | Backend | `POST /api/street-arts`

In the route `POST /api/street-arts`, we will create a new street art by send 3 informations:
- `lat`: The latitude
- `lng`: The longitude
- `picture`: A file with the picture

To save the file, we will rely on Cloudinary.

For this, you have to install some packages:
```sh
$ cd server
$ npm install cloudinary multer-storage-cloudinary multer
```

Then, you have to go on Cloudinary and find your credentials on the main page: https://cloudinary.com/console. You have to past the crendentials in `server/.env` file.

```
PORT=5000
SESSION_SECRET=anyValue
MONGODB_URI=mongodb://localhost/mern-street-art
CLOUDINARY_NAME=......
CLOUDINARY_KEY=......
CLOUDINARY_SECRET=......
```

Then, you can create a file `server/configs/cloudinary.js`

```js
// server/configs/cloudinary.js
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'street-art-pictures',
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb) => {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploader = multer({ storage });
module.exports = uploader;
```

Then, you have to create a route in `server/routes/street-arts.js`
```js
// Route to create a street art
// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`
router.post('/', uploader.single('picture'), (req, res, next) => {
  let { lat, lng } = req.body
  let pictureUrl = req.file.url
  
  // TODO: continue
  // ...
});
```

When you are done, you can try with Postman. You will have to send the data with "`Body` > `form-data`" and choose type "`File`" for the `picture`.

![](https://i.imgur.com/aqwobhl.png)

After doing the request in Postman, you should see a new document with the information you wrote!


![Imgur](https://i.imgur.com/gVhtsxK.png)



### Iteration 6 | Backend | `GET /api/my-visits`

The goal of the route `GET /api/my-visits` is to display all the visits of the connected user, with informations of the street-art.

First, you have to create a file `server/routes/visits.js`
```js
const express = require('express');
const StreetArt = require('../models/StreetArt');
const Visit = require('../models/Visit');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
  // TODO: continue
  // You should use `.populate`
});

module.exports = router;
```


Then, add the following line in `server/app.js`: 
```js
app.use('/api', require('./routes/visits'))
```

Now, it's time to test with Postman. Be careful, you need to be connected to test.

**`POST /api/login`**: to connect the user
![Imgur](https://i.imgur.com/26pPitg.png)


**`GET /api/my-vistits`**: to get all the visits with the information of the street-arts. Make sure you only have the visits of the connected user.
![Imgur](https://i.imgur.com/VRnit8T.png)


### Iteration 7 | Backend | `POST /api/visits`

Create a route `POST /api/visits` (with a `_streetArt` field) that creates a new visit for the connected user.

This is what you should see with Postman when you are done.
![Imgur](https://i.imgur.com/eocXrj2.png)


### Iteration 8 | Backend | `DELETE /api/visits/:visitId`

Create a route `DELETE /api/visits/:visitId` that deletes the specified visit. Be careful, only the owner of the visit can delete his visit.

This is what you should see with Postman when you are done.
![Imgur](https://i.imgur.com/fnTtbFy.png)


### Iteration 9 | Frontend | Add of Bootstrap + Reactstrap + `MainNavbar` 

Now it's time to start the front-end part 🔥

In this iteration, we will just add [Bootstrap](https://getbootstrap.com) with [Reactstrap](http://reactstrap.github.io).

For this, you have to install 2 packages:
```sh
$ cd client
$ npm install bootstrap reactstrap
``` 

Then, add the following line in your `client/src/index.scss`:
```scss
@import '../node_modules/bootstrap/scss/bootstrap.scss';
```

Then you can create a navbar in the file `client/src/MainNavbar.jsx`.

The Navbar contains the following links:
- `/` (logo on the left)
- `/list`
- `/map`
- `/new-street-art`
- `/signup`
- `/login`


![Imgur](https://i.imgur.com/NHPUi5Y.png)


### Iteration 10 | Frontend | Simple page `List`

The goal of this iteration is to create a simple page "/list".

First, in `client/src/api.js`, you have to create a method `getStreetArts`
```js
// client/src/api.js
// ...


  getStreetArts() {
    return service
      .get('/street-arts')
      .then(res => res.data)
      .catch(errHandler)
  },
```


Then, in `client/src/components/App.jsx`, add a `<Route />` for a `List` component.


Finally, you have to create the `List` component in `client/src/components/pages/List.jsx`. It should display a table with all street arts from the backend, thanks to `api.getStreetArts()`.

Your table will have 3 columns at this stage:
- A small version of the picture
- The coordinates with a link to Google Maps. Example of a link: https://www.google.com/maps/dir//38.69606,-9.209744/@38.69606,-9.209744,15z
- A button link to the future detail page. Example of a link: http://localhost:3000/street-art-detail/5cc046767f07704e3d51c64f


You can preview the page here: 

![Imgur](https://i.imgur.com/m6J0OOb.png)

<!-- 
## TODO
- Create a demo
-->

