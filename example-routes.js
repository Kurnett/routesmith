module.exports = [
	{
		path:'users',
		id:'userID',
		controller:require('routesmith-sequelize')(data),
		middleware:[],
		children:[
			{
				path:'posts',
				controller:{},
				middleware:[]
			}
		]
	}
];