# RouteSmith
RouteSmith is a simple routing solution for Express-based apps. It creates routes based off of a list of objects rather than a file structure, allowing you to quickly generate robust routes with easily-assigned controllers, middleware, and parameters.

## Installation
```bash
$ npm install --save routesmith
```

## Packages
[RouteSmith-Sequelize](https://www.npmjs.com/package/routesmith-sequelize) allows developers to easily create controllers to go along with RouteSmith's routes.
```bash
$ npm install --save routesmith-sequelize
```

## Usage
```bash
const express = require('express');
const router = express.Router();
const routes = require('./routes.js'); // Require your own routes file here.

const rs = require('routesmith');
router.use('/', rs.Initialize(routes)); // Initialize RouteSmith with your route data.
```
### Route Data
RouteSmith requires an array of JSON objects containing specific information to be defined in order to generate routes.

#### Path
The `path` field determines the URL of the endpoints to be generated.


#### ID
The `id` field determines the name to be used for the URL parameter (e.g. `/users/:userID`).

#### Controllers
Controllers are expected to be objects with `create`, `get`, `getAll`, `update`, and `remove` methods, corresponding to basic CRUD operations.

#### Middleware
Middleware methods can be inserted via the `middleware` array. Middleware is applied to children of each routes - that is, if you have middleware to check for editing permission on one route, that middleware will also check for permissions on all requests to children of that route.

#### Children
The `children` array contains a list of other routes to be created under the original route.

Child routes do have one additional field in the data object: `belongsTo`. This is used to identify a parent route's `id` for use in the controller, since oftentimes routes describe relationships between models in a database (for example, all posts on a forum would belong to users based on the users' IDs).

### Example Routes
```bash
const routes = [
	{
		path:'users',
		id:'userID',
		controller:<controller object goes here>,
		middleware:[
			<middleware objects go here>
		],
		children:[
			{
				path:'posts',
				id:'postID',
				controller:<controller object goes here>,
				middleware:[
					<middleware objects go here>
				]
			}
		]
	}
]
```
If we wished to simplify the route structure further, we could strip out unnecessary data (for example, if we had no middleware to apply).
```bash
const routes = [
	{
		path:'users',
		id:'userID',
		controller:<controller object goes here>
		children:[
			{
				path:'posts',
				id:'postID',
				controller:<controller object goes here>
			}
		]
	}
]
```
Based on this structure, we would have the following routes:
```bash
/users
/users/:userID
/users/:userID/posts
/users/:userID/posts/:postID
```
