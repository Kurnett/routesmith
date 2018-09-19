
module.exports = function (obj) {
	const express = require('express');
	const router = express.Router();
	const controller = obj.controller;

	router.post('/',						controller.create);
	router.get('/',							controller.getAll);
	if (obj.data) {
		router.get('/:' + obj.data.id,		controller.get);
		router.put('/:' + obj.data.id,		controller.update);
		router.delete('/:' + obj.data.id,	controller.remove);
	}
	
	return router;
};
