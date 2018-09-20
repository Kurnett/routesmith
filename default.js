
module.exports = function (obj) {
	const express = require('express');
	const router = express.Router();
	const controller = obj.controller;

	router.post('/',				controller.create);
	router.get('/',					controller.getAll);
	router.get('/:' + obj.id,		controller.get);
	router.put('/:' + obj.id,		controller.update);
	router.delete('/:' + obj.id,	controller.remove);
	
	return router;
};
