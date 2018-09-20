const express = require('express');
//let routes = require('./routes');
//router.use('/', require('routesmith').Initialize(<require routes file here>));

let autoRouter = {};

autoRouter.router = express.Router({mergeParams:true});

autoRouter.CreateRoutes = function (routes, pathBase) {
	routes.forEach((route) => {
		console.log(pathBase + route.path);
		if (route.middleware && route.middleware.length > 0 && route.id) {
			for (let i = 0; i < route.middleware.length; i++) {
				autoRouter.router.use(pathBase + route.path + '/:' + route.id, route.middleware[i]);
			}
		}
		autoRouter.router.use(pathBase + route.path, require('./default')(route));
		if (route.children && route.id) {
			let newPathBase = pathBase + route.path + '/:' + route.id + '/';
			autoRouter.CreateRoutes(route.children, newPathBase);
		}
	});
};

autoRouter.Initialize = function (routes) {
	console.log('Initializing routes...');
	this.CreateRoutes(routes, '/');
	return this.router;
};

module.exports = autoRouter;
