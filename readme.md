#RouteSmith
RouteSmith is a simple routing solution for Express-based apps. It creates routes based off of a list of objects rather than a file structure, allowing you to quickly generate robust routes with easily-assigned controllers, middleware, and parameters.

##Installation
```bash
$ npm install --save routesmith
```

##Usage
```bash
const express = require('express');
const router = express.Router();
const routes = require('./routes.js'); // Require your own routes file here.

const rs = require('routesmith');
router.use('/', rs.Initialize(routes)); // Initialize RouteSmith with your route data.
```
###Route Data
RouteSmith requires an array of JSON objects containing specific information to be defined in order to generate routes.

####Controllers
Controllers are expected to be objects with `create`, `get`, `getAll`, `update`, and `remove` methods, corresponding to basic CRUD operations.

####Middleware
Middleware methods can be inserted via the `middleware` array. Middleware is applied to children of each routes - that is, if you have middleware to check for editing permission on one route, that middleware will also check for permissions on all requests to children of that route.

####Data
The `data` object contains several pieces of information. However, most of the values it contains are not checked by RouteSmith - rather, they are passed into the controller for use later on. This feature will be moved to a separate, but complementary, controller-automation package in the near future.

The `id` field determines the label for parameters in the route's URL. For example, for a route with the `path` `users`, the ID`id:'userID'` would create the following routes:

```bash
/users
/users/:userID
```

The `model` field allows you to define which model will be passed into the controller when the route is accessed, allowing you to find the correct model should the route interact with a database.

The `required` array dictates what values are required in the body of the request. RouteSmith does not validate this - rather, the list is passed to the controller.

The `optional` array dictates what values are optional in the body of the request. RouteSmith does not validate this - rather, the list is passed to the controller.

The `public` array dictates what values are publicly visible in the response to a GET request. RouteSmith does not validate this - rather, the list is passed to the controller.

The `req` array allows developers to define values to look for in the request object, typically added by middleware prior to the route being reached. For example, a global middleware function might retrieve user data and attach it to the request object for future use. The `req` array can then define a new name for the object and the hierarchy through the request object that is needed to retrieve the proper value (for nested values - i.e. `req.user.id`).

####Children
The `children` array contains a list of other routes to be created under the original route.

Child routes do have one additional field in the data object: `belongsTo`. This is used to identify a parent route's `id` for use in the controller, since oftentimes routes describe relationships between models in a database (for example, all posts on a forum would belong to users based on the users' IDs).

###Example Routes
```bash
const routes = [
	{
		path:'users',
		controller:<controller object goes here>,
		middleware:[],
		data:{
			id:'userID',
			model:'Users',
			required:[
				'name',
				'email',
				'password'
			],
			optional:[
				'description',
				'phone',
				'address'
			],
			public:[
				'name',
				'description',
				'email',
				'phone',
				'address'
			],
			req:[
				{
					name:'organizationID',
					hierarchy:[
						'org',
						'id'
					]
				}
			]
		},
		children:[
			{
				path:'posts',
				data:{
					id:'postID',
					belongsTo:'userID',
					model:'Posts',
					required:[
						'content'
					],
					optional:[],
					public:[
						'id',
						'content',
						'userID'
					]
				}
			}
		]
	}
]
```